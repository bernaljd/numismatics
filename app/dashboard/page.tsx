import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import CoinCard from "../components/CoinCard"
import BanknoteCard from "../components/BanknoteCard"
import { signOut } from "../actions/auth"
import type { Banknote, Coin } from "@prisma/client"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [coins, banknotes] = await Promise.all([
    prisma.coin.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.banknote.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
  ])

  const totalItems = coins.length + banknotes.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Mi Colección Numismática
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate max-w-xs sm:max-w-none">
                Bienvenido, {user.user_metadata?.name || user.email}
              </p>
            </div>
            <form action={signOut} className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de piezas
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalItems}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Monedas
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {coins.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Billetes
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {banknotes.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <a
            href="/dashboard/agregar-moneda"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl">🪙</span>
            Agregar Moneda
          </a>
          <a
            href="/dashboard/agregar-billete"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-xl">💵</span>
            Agregar Billete
          </a>
        </div>

        {/* Collection */}
        {totalItems === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <div className="text-4xl sm:text-6xl mb-4">📭</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tu colección está vacía
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Comienza agregando tu primera moneda o billete
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tu Colección ({totalItems} piezas)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coins.map((coin: Coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
              {banknotes.map((banknote: Banknote) => (
                <BanknoteCard key={banknote.id} banknote={banknote} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

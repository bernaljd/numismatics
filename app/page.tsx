import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🪙</span>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                Colección Numismática
              </h1>
            </div>
            <nav className="flex gap-2 sm:gap-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 sm:px-6 rounded-lg transition-colors text-xs sm:text-base"
                >
                  Mi Colección
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-3 sm:px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors text-xs sm:text-base"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 sm:px-6 rounded-lg transition-colors text-xs sm:text-base"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">💰🪙💵</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
            Tu Colección Numismática
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Organizada y Segura
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Gestiona tu colección de monedas y billetes, organiza por país, año y denominación.
            Todo en un solo lugar, de forma privada y segura.
          </p>
          {!user && (
            <Link
              href="/registro"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Comenzar Ahora - Es Gratis
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🪙</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Registra Monedas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Añade tus monedas con detalles como país, año, denominación y estado de conservación.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💵</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Gestiona Billetes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organiza tu colección de billetes con información detallada y notas personalizadas.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              100% Privado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tu colección es completamente privada. Solo tú tienes acceso a tus piezas.
            </p>
          </div>
        </div>

        {/* CTA */}
        {!user && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 sm:p-12 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              ¿Listo para organizar tu colección?
            </h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-indigo-100">
              Únete ahora y comienza a gestionar tus monedas y billetes de forma profesional
            </p>
            <Link
              href="/registro"
              className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Crear Cuenta Gratis
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Colección Numismática. Sprint 1 - Sistema de Gestión de Colecciones.
          </p>
        </div>
      </footer>
    </div>
  )
}

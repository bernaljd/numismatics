"use client"

import { deleteCoin } from "@/app/actions/collection"
import { useState } from "react"

type Coin = {
  id: string
  pais: string
  anio: number
  denominacion: string
  estado: string
  descripcion?: string | null
}

interface CoinCardProps {
  coin: Coin
}

export default function CoinCard({ coin }: CoinCardProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    await deleteCoin(coin.id)
    setShowConfirm(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {coin.denominacion}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {coin.pais} • {coin.anio}
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Moneda
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Estado:</span>
          <span className="font-medium text-gray-900 dark:text-white">{coin.estado}</span>
        </div>
        {coin.descripcion && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {coin.descripcion}
          </p>
        )}
      </div>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            ¿Estás seguro?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sí, eliminar
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

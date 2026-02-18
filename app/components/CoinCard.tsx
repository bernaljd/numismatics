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
  imagen: string
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
        <img
          src={coin.imagen}
          alt={`${coin.denominacion} - ${coin.pais}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Si la imagen falla al cargar, mostrar un placeholder
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext fill='%23999' font-family='Arial' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      
      <div className="p-6">
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
        <div className="flex gap-2">
          <a
            href={`/dashboard/editar-moneda/${coin.id}`}
            className="flex-1 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-200 font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Editar
          </a>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
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
    </div>
  )
}

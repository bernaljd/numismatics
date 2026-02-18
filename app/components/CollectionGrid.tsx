"use client"

import { useState, useMemo } from "react"
import CoinCard from "./CoinCard"
import BanknoteCard from "./BanknoteCard"
import type { Coin, Banknote } from "@prisma/client"

interface CollectionGridProps {
  coins: Coin[]
  banknotes: Banknote[]
}

export default function CollectionGrid({ coins, banknotes }: CollectionGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "coins" | "banknotes">("all")
  const [filterCountry, setFilterCountry] = useState("")

  // Obtener lista de países únicos
  const countries = useMemo(() => {
    const allCountries = [
      ...coins.map(c => c.pais),
      ...banknotes.map(b => b.pais)
    ]
    return Array.from(new Set(allCountries)).sort()
  }, [coins, banknotes])

  // Filtrar colección
  const filteredItems = useMemo(() => {
    let items: Array<(Coin | Banknote) & { type: 'coin' | 'banknote' }> = []

    if (filterType === "all" || filterType === "coins") {
      items = [...items, ...coins.map(c => ({ ...c, type: 'coin' as const }))]
    }
    if (filterType === "all" || filterType === "banknotes") {
      items = [...items, ...banknotes.map(b => ({ ...b, type: 'banknote' as const }))]
    }

    // Filtrar por país
    if (filterCountry) {
      items = items.filter(item => item.pais === filterCountry)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      items = items.filter(item =>
        item.pais.toLowerCase().includes(term) ||
        item.denominacion.toLowerCase().includes(term) ||
        item.anio.toString().includes(term) ||
        item.estado?.toLowerCase().includes(term) ||
        item.descripcion?.toLowerCase().includes(term)
      )
    }

    return items
  }, [coins, banknotes, searchTerm, filterType, filterCountry])

  const totalItems = coins.length + banknotes.length

  if (totalItems === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 sm:p-12 text-center">
        <div className="text-4xl sm:text-6xl mb-4">📭</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tu colección está vacía
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Comienza agregando tu primera moneda o billete
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Filtros de búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="space-y-4">
          {/* Búsqueda */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por país, denominación, año..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todos</option>
                <option value="coins">Solo Monedas</option>
                <option value="banknotes">Solo Billetes</option>
              </select>
            </div>

            <div>
              <label htmlFor="filterCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                País
              </label>
              <select
                id="filterCountry"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos los países</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {(searchTerm || filterType !== "all" || filterCountry) && (
            <button
              onClick={() => {
                setSearchTerm("")
                setFilterType("all")
                setFilterCountry("")
              }}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {filteredItems.length === totalItems
            ? `Tu Colección (${totalItems} piezas)`
            : `Resultados (${filteredItems.length} de ${totalItems} piezas)`}
        </h2>
      </div>

      {/* Grid de items */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Intenta con otros términos de búsqueda o filtros
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            item.type === 'coin' ? (
              <CoinCard key={item.id} coin={item as any} />
            ) : (
              <BanknoteCard key={item.id} banknote={item as any} />
            )
          ))}
        </div>
      )}
    </div>
  )
}

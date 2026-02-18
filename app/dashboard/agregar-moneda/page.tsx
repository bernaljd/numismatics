"use client"

import { addCoin } from "@/app/actions/collection"
import YearInput from "@/app/components/YearInput"

const estados = ["Excelente", "Muy Bueno", "Bueno", "Regular", "Pobre"]

const paises = [
  "Argentina", "Bolivia", "Brasil", "Canadá", "Chile", "Colombia", "Costa Rica",
  "Cuba", "Ecuador", "El Salvador", "España", "Estados Unidos", "Guatemala",
  "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú",
  "Puerto Rico", "República Dominicana", "Uruguay", "Venezuela",
  "Alemania", "Francia", "Italia", "Reino Unido", "Portugal", "Grecia",
  "Suiza", "Bélgica", "Holanda", "Austria", "Suecia", "Noruega",
  "China", "Japón", "Corea del Sur", "India", "Tailandia", "Singapur",
  "Australia", "Nueva Zelanda", "Sudáfrica", "Egipto", "Marruecos"
]

export default function AddCoinPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Registrar Moneda
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Añade una nueva moneda a tu colección
            </p>
          </div>

          <form action={addCoin} className="space-y-6">
            <div>
              <label htmlFor="pais" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                País
              </label>
              <select
                id="pais"
                name="pais"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecciona un país</option>
                {paises.map(pais => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="anio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Año
              </label>
              <YearInput />
            </div>

            <div>
              <label htmlFor="denominacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Denominación
              </label>
              <input
                type="text"
                id="denominacion"
                name="denominacion"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="ej. 1 Peso, 50 Centavos"
              />
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado de conservación
              </label>
              <select
                id="estado"
                name="estado"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecciona un estado</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Notas adicionales sobre la moneda..."
              />
            </div>

            <div>
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Imagen de la moneda
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                required
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-200"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Sube una imagen de la moneda (JPG, PNG, WEBP, etc.)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
              >
                Guardar Moneda
              </button>
              <a
                href="/dashboard"
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center text-sm sm:text-base"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

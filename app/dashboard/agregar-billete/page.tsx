import { addBanknote } from "@/app/actions/collection"

const estados = ["Excelente", "Muy Bueno", "Bueno", "Regular", "Pobre"]

export default function AddBanknotePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Registrar Billete
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Añade un nuevo billete a tu colección
            </p>
          </div>

          <form action={addBanknote} className="space-y-6">
            <div>
              <label htmlFor="pais" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                País
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="ej. México, España, Argentina"
              />
            </div>

            <div>
              <label htmlFor="anio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Año
              </label>
              <input
                type="number"
                id="anio"
                name="anio"
                required
                min="1"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="ej. 2010"
              />
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
                placeholder="ej. 100 Pesos, 20 Euros"
              />
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado de conservación (opcional)
              </label>
              <select
                id="estado"
                name="estado"
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
                placeholder="Notas adicionales sobre el billete..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
              >
                Guardar Billete
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

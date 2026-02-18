"use client"

import { loginUser } from "../actions/auth"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setIsLoading(true)
    
    const result = await loginUser(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
    // Si no hay error, el redirect manejará la navegación automáticamente
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Accede a tu colección
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}

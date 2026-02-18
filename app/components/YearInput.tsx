"use client"

interface YearInputProps {
  defaultValue?: number
  required?: boolean
}

export default function YearInput({ defaultValue, required = true }: YearInputProps) {
  return (
    <input
      type="text"
      id="anio"
      name="anio"
      required={required}
      maxLength={4}
      defaultValue={defaultValue}
      onInput={(e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
      }}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      placeholder="ej. 1985"
    />
  )
}

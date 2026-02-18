"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Esquema de validación para registro
const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

// Esquema de validación para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

export async function registerUser(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: "Datos inválidos. Por favor verifica los campos." }
  }

  const { name, email, password } = validatedFields.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    // Mensaje amigable en lugar del error técnico
    if (error.message.includes("already registered") || error.message.includes("User already registered")) {
      return { error: "Este correo electrónico ya está registrado. Por favor, inicia sesión." }
    }
    return { error: "No se pudo crear la cuenta. Por favor, intenta de nuevo." }
  }

  redirect("/login")
}

export async function loginUser(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: "Por favor ingresa email y contraseña válidos" }
  }

  const { email, password } = validatedFields.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Mensaje amigable en lugar del error técnico de la base de datos
    return { error: "Usuario o contraseña incorrectos. Por favor, intenta de nuevo." }
  }

  revalidatePath('/', 'layout')
  redirect("/dashboard")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect("/")
}

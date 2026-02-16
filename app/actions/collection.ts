"use server"

import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Esquema de validación para monedas
const coinSchema = z.object({
  pais: z.string().min(2, "El país es requerido"),
  anio: z.coerce.number().min(1, "El año es requerido").max(new Date().getFullYear(), "El año no puede ser futuro"),
  denominacion: z.string().min(1, "La denominación es requerida"),
  estado: z.string().min(1, "El estado es requerido"),
  descripcion: z.string().optional(),
})

// Esquema de validación para billetes
const banknoteSchema = z.object({
  pais: z.string().min(2, "El país es requerido"),
  anio: z.coerce.number().min(1, "El año es requerido").max(new Date().getFullYear(), "El año no puede ser futuro"),
  denominacion: z.string().min(1, "La denominación es requerida"),
  estado: z.string().optional(),
  descripcion: z.string().optional(),
})

async function getUserId() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error("No autenticado")
  }
  
  return user.id
}

export async function addCoin(formData: FormData) {
  const userId = await getUserId()

  const validatedFields = coinSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado"),
    descripcion: formData.get("descripcion"),
  })

  if (!validatedFields.success) {
    throw new Error("Datos inválidos. Por favor verifica los campos.")
  }

  await prisma.coin.create({
    data: {
      ...validatedFields.data,
      userId,
    }
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function addBanknote(formData: FormData) {
  const userId = await getUserId()

  const validatedFields = banknoteSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado"),
    descripcion: formData.get("descripcion"),
  })

  if (!validatedFields.success) {
    throw new Error("Datos inválidos. Por favor verifica los campos.")
  }

  await prisma.banknote.create({
    data: {
      ...validatedFields.data,
      userId,
    }
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function deleteCoin(id: string) {
  const userId = await getUserId()

  await prisma.coin.delete({
    where: {
      id,
      userId,
    }
  })

  revalidatePath("/dashboard")
}

export async function deleteBanknote(id: string) {
  const userId = await getUserId()

  await prisma.banknote.delete({
    where: {
      id,
      userId,
    }
  })

  revalidatePath("/dashboard")
}

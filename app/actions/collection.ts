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
  imagen: z.string().min(1, "La imagen es requerida"),
})

// Esquema de validación para billetes
const banknoteSchema = z.object({
  pais: z.string().min(2, "El país es requerido"),
  anio: z.coerce.number().min(1, "El año es requerido").max(new Date().getFullYear(), "El año no puede ser futuro"),
  denominacion: z.string().min(1, "La denominación es requerida"),
  estado: z.string().optional(),
  descripcion: z.string().optional(),
  imagen: z.string().min(1, "La imagen es requerida"),
})

async function getUserId() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error("No autenticado")
  }
  
  return user.id
}

// Función para subir imagen a Supabase Storage
async function uploadImage(file: File, userId: string): Promise<string> {
  const supabase = await createClient()
  
  // Crear un nombre único para el archivo
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('numismatic-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Error al subir imagen: ${error.message}`)
  }

  // Obtener la URL pública de la imagen
  const { data: { publicUrl } } = supabase.storage
    .from('numismatic-images')
    .getPublicUrl(data.path)

  return publicUrl
}

// Función para eliminar imagen de Supabase Storage
async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // No intentar eliminar imágenes placeholder o data URLs
    if (!imageUrl || imageUrl.startsWith('data:')) {
      return
    }

    const supabase = await createClient()
    
    // Extraer el path del archivo de la URL
    // URL ejemplo: https://xxx.supabase.co/storage/v1/object/public/numismatic-images/userId/filename.jpg
    const url = new URL(imageUrl)
    const pathname = url.pathname
    
    // Buscar el path después de '/public/numismatic-images/'
    const match = pathname.match(/\/public\/numismatic-images\/(.+)$/)
    
    if (!match || !match[1]) {
      console.error('No se pudo extraer el path de la imagen:', imageUrl)
      return
    }
    
    const filePath = match[1]
    
    console.log('Eliminando imagen:', filePath)
    
    const { error } = await supabase.storage
      .from('numismatic-images')
      .remove([filePath])
    
    if (error) {
      console.error('Error al eliminar imagen de storage:', error.message)
    } else {
      console.log('Imagen eliminada exitosamente:', filePath)
    }
  } catch (error) {
    console.error('Error al procesar eliminación de imagen:', error)
  }
}

export async function addCoin(formData: FormData) {
  const userId = await getUserId()

  // Subir imagen
  const imageFile = formData.get("imagen") as File
  if (!imageFile || imageFile.size === 0) {
    throw new Error("Debes seleccionar una imagen")
  }
  
  const imageUrl = await uploadImage(imageFile, userId)

  const validatedFields = coinSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado"),
    descripcion: formData.get("descripcion") || undefined,
    imagen: imageUrl,
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

  // Subir imagen
  const imageFile = formData.get("imagen") as File
  if (!imageFile || imageFile.size === 0) {
    throw new Error("Debes seleccionar una imagen")
  }
  
  const imageUrl = await uploadImage(imageFile, userId)

  const validatedFields = banknoteSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado") || undefined,
    descripcion: formData.get("descripcion") || undefined,
    imagen: imageUrl,
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

  // Obtener la moneda para eliminar su imagen
  const coin = await prisma.coin.findUnique({
    where: { id, userId }
  })

  if (coin && coin.imagen) {
    await deleteImage(coin.imagen)
  }

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

  // Obtener el billete para eliminar su imagen
  const banknote = await prisma.banknote.findUnique({
    where: { id, userId }
  })

  if (banknote && banknote.imagen) {
    await deleteImage(banknote.imagen)
  }

  await prisma.banknote.delete({
    where: {
      id,
      userId,
    }
  })

  revalidatePath("/dashboard")
}

export async function updateCoin(id: string, formData: FormData) {
  const userId = await getUserId()

  // Verificar si se subió una nueva imagen
  const imageFile = formData.get("imagen") as File
  let imageUrl = formData.get("imagenActual") as string
  
  if (imageFile && imageFile.size > 0) {
    // Eliminar la imagen anterior si existe
    if (imageUrl) {
      await deleteImage(imageUrl)
    }
    imageUrl = await uploadImage(imageFile, userId)
  }

  const validatedFields = coinSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado"),
    descripcion: formData.get("descripcion") || undefined,
    imagen: imageUrl,
  })

  if (!validatedFields.success) {
    throw new Error("Datos inválidos. Por favor verifica los campos.")
  }

  await prisma.coin.update({
    where: {
      id,
      userId,
    },
    data: validatedFields.data,
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function updateBanknote(id: string, formData: FormData) {
  const userId = await getUserId()

  // Verificar si se subió una nueva imagen
  const imageFile = formData.get("imagen") as File
  let imageUrl = formData.get("imagenActual") as string
  
  if (imageFile && imageFile.size > 0) {
    // Eliminar la imagen anterior si existe
    if (imageUrl) {
      await deleteImage(imageUrl)
    }
    imageUrl = await uploadImage(imageFile, userId)
  }

  const validatedFields = banknoteSchema.safeParse({
    pais: formData.get("pais"),
    anio: formData.get("anio"),
    denominacion: formData.get("denominacion"),
    estado: formData.get("estado") || undefined,
    descripcion: formData.get("descripcion") || undefined,
    imagen: imageUrl,
  })

  if (!validatedFields.success) {
    throw new Error("Datos inválidos. Por favor verifica los campos.")
  }

  await prisma.banknote.update({
    where: {
      id,
      userId,
    },
    data: validatedFields.data,
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

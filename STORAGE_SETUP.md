# Configuración de Supabase Storage para Imágenes

Para que la subida de imágenes funcione, necesitas crear un bucket en Supabase Storage.

## Pasos para configurar:

### 1. Ve a tu proyecto en Supabase
https://supabase.com/dashboard

### 2. Ve a Storage en el menú lateral

### 3. Crea un nuevo bucket
- Haz clic en "New bucket"
- Nombre: `numismatic-images`
- **Importante**: Marca "Public bucket" (para que las imágenes sean accesibles públicamente)

### 4. Configura las políticas de acceso

Ve a la pestaña "Policies" del bucket y crea las siguientes políticas:

#### Política 1: Permitir INSERT (subir imágenes)
```sql
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'numismatic-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Política 2: Permitir SELECT (ver imágenes)
```sql
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'numismatic-images');
```

#### Política 3: Permitir DELETE (eliminar propias imágenes)
```sql
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'numismatic-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Alternativa: Crear desde SQL Editor

Puedes ejecutar esto en el SQL Editor de Supabase:

```sql
-- Crear el bucket (si no lo has creado desde la UI)
INSERT INTO storage.buckets (id, name, public)
VALUES ('numismatic-images', 'numismatic-images', true);

-- Política para subir imágenes
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'numismatic-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para ver imágenes
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'numismatic-images');

-- Política para eliminar imágenes propias
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'numismatic-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## ¡Listo!

Una vez configurado, las imágenes se subirán automáticamente cuando agregues monedas o billetes.

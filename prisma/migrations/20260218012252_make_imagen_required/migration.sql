/*
  Warnings:

  - Made the column `imagen` on table `Banknote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagen` on table `Coin` required. This step will fail if there are existing NULL values in that column.

*/

-- Primero actualizar los valores NULL existentes con una imagen placeholder
UPDATE "Banknote" SET "imagen" = 'data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 200 200''%3E%3Crect fill=''%23ddd'' width=''200'' height=''200''/%3E%3Ctext fill=''%23999'' font-family=''Arial'' font-size=''16'' x=''50%25'' y=''50%25'' text-anchor=''middle'' dominant-baseline=''middle''%3EImagen no disponible%3C/text%3E%3C/svg%3E' WHERE "imagen" IS NULL;

UPDATE "Coin" SET "imagen" = 'data:image/svg+xml,%3Csvg xmlns=''http://www.w3.org/2000/svg'' width=''200'' height=''200'' viewBox=''0 0 200 200''%3E%3Crect fill=''%23ddd'' width=''200'' height=''200''/%3E%3Ctext fill=''%23999'' font-family=''Arial'' font-size=''16'' x=''50%25'' y=''50%25'' text-anchor=''middle'' dominant-baseline=''middle''%3EImagen no disponible%3C/text%3E%3C/svg%3E' WHERE "imagen" IS NULL;

-- Ahora hacer la columna NOT NULL
ALTER TABLE "Banknote" ALTER COLUMN "imagen" SET NOT NULL;

ALTER TABLE "Coin" ALTER COLUMN "imagen" SET NOT NULL;

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "denominacion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banknote" (
    "id" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "denominacion" TEXT NOT NULL,
    "estado" TEXT,
    "descripcion" TEXT,
    "imagen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Banknote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Coin_userId_idx" ON "Coin"("userId");

-- CreateIndex
CREATE INDEX "Banknote_userId_idx" ON "Banknote"("userId");

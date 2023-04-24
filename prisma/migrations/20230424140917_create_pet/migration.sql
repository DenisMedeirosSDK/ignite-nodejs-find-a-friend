-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('SMALL', 'MEDIUM', 'HIGH', 'EXTRA_HIGH');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "age" INTEGER NOT NULL,
    "energy" "Level" NOT NULL,
    "size" "Level" NOT NULL,
    "level_of_independence" "Level" NOT NULL,
    "ambient" "Level" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "institution_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets_galleries" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pets_galleries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets_galleries" ADD CONSTRAINT "pets_galleries_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

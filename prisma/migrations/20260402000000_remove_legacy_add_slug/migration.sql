-- Drop foreign keys from tables being removed
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- Drop legacy tables
DROP TABLE "public"."VerificationToken";
DROP TABLE "public"."Session";
DROP TABLE "public"."Account";

-- Drop legacy indexes
DROP INDEX "public"."User_legacyId_key";
DROP INDEX "public"."Category_legacyId_key";
DROP INDEX "public"."Temple_legacyId_key";

-- Drop legacy columns from User
ALTER TABLE "public"."User" DROP COLUMN "legacyId";
ALTER TABLE "public"."User" DROP COLUMN "emailVerified";

-- Drop legacy columns from Category and Temple
ALTER TABLE "public"."Category" DROP COLUMN "legacyId";
ALTER TABLE "public"."Temple" DROP COLUMN "legacyId";

-- Add slug to Category (nullable first, then populate, then enforce NOT NULL + unique)
ALTER TABLE "public"."Category" ADD COLUMN "slug" TEXT;
UPDATE "public"."Category"
  SET "slug" = lower(regexp_replace(regexp_replace(trim("name"), '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
ALTER TABLE "public"."Category" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- Add slug to Temple (nullable first, then populate, then enforce NOT NULL + unique)
ALTER TABLE "public"."Temple" ADD COLUMN "slug" TEXT;
UPDATE "public"."Temple"
  SET "slug" = lower(regexp_replace(regexp_replace(trim("name"), '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
ALTER TABLE "public"."Temple" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Temple_slug_key" ON "public"."Temple"("slug");

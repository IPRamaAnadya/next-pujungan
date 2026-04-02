-- Remove EDITOR from UserRole enum
-- PostgreSQL requires renaming the old enum, creating a new one, and migrating the column

ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."UserRole" USING "role"::text::"public"."UserRole";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
DROP TYPE "public"."UserRole_old";

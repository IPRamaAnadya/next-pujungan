import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/route-guards";
import { normalizeWhatsappNumber } from "@/lib/phone";

const SITE_ID = "singleton";

export async function GET() {
  const site = await prisma.site.findUnique({ where: { id: SITE_ID } });
  const whatsappNumber =
    site?.whatsappNumber ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null;

  return NextResponse.json({ whatsappNumber });
}

const patchSchema = z.object({
  whatsappNumber: z.string().min(1, "Nomor tidak boleh kosong"),
});

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = patchSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Input tidak valid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const normalized = normalizeWhatsappNumber(parsed.data.whatsappNumber);
  if (!normalized) {
    return NextResponse.json(
      {
        message:
          "Nomor WhatsApp tidak valid. Gunakan format Indonesia, contoh: 0812-3456-7890 atau 628123456789",
      },
      { status: 400 },
    );
  }

  const site = await prisma.site.upsert({
    where: { id: SITE_ID },
    create: { id: SITE_ID, whatsappNumber: normalized },
    update: { whatsappNumber: normalized },
  });

  return NextResponse.json({ whatsappNumber: site.whatsappNumber });
}

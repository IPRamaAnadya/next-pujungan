import { randomUUID } from "crypto";
import path from "path";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { requireAdminSession } from "@/lib/route-guards";
import { s3, S3_BUCKET, S3_PUBLIC_BASE } from "@/lib/s3";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (!files.length) {
    return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
  }

  const uploaded: Array<{ path: string; name: string; size: number }> = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File ${file.name} exceeds max size of 5MB` },
        { status: 400 },
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { message: `Unsupported extension for ${file.name}` },
        { status: 400 },
      );
    }

    const key = `uploads/${Date.now()}-${randomUUID()}-${sanitizeFileName(file.name)}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      }),
    );

    uploaded.push({
      path: `${S3_PUBLIC_BASE}/${key}`,
      name: file.name,
      size: file.size,
    });
  }

  return NextResponse.json({ files: uploaded }, { status: 201 });
}


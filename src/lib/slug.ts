export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  const slug = toSlug(base);
  if (!(await exists(slug))) return slug;
  let counter = 1;
  while (await exists(`${slug}-${counter}`)) {
    counter++;
  }
  return `${slug}-${counter}`;
}

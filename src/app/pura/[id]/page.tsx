import { redirect } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function PuraLegacyDetailRedirectPage({ params }: Params) {
  const { id } = await params;
  redirect(`/temples/${id}`);
}
import { redirect } from "next/navigation";
import { getDoc, getAllChapters } from "@/lib/docs";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ docId: string }>;
}

export default async function DocIndexPage({ params }: PageProps) {
  const { docId } = await params;
  const doc = getDoc(docId);
  if (!doc) notFound();
  const chapters = getAllChapters(doc);
  redirect(`/docs/${docId}/${chapters[0].id}`);
}

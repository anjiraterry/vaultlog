import { notFound, redirect } from "next/navigation";
import { getDoc, getAllChapters } from "@/lib/docs";
import ChapterView from "@/components/ChapterView";
import NavButtons from "@/components/NavButtons";

interface PageProps {
  params: Promise<{ docId: string; chapterId: string }>;
}

export async function generateStaticParams() {
  const { allDocs } = await import("@/lib/docs");
  const paths: { docId: string; chapterId: string }[] = [];
  for (const doc of allDocs) {
    for (const phase of doc.phases) {
      for (const chapter of phase.chapters) {
        paths.push({ docId: doc.id, chapterId: chapter.id });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  const { docId, chapterId } = await params;
  const doc = getDoc(docId);
  if (!doc) return { title: "Not found" };
  const chapter = getAllChapters(doc).find((c) => c.id === chapterId);
  return {
    title: `${chapter?.title ?? "Chapter"} — vaultlog`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { docId, chapterId } = await params;
  const doc = getDoc(docId);
  if (!doc) notFound();

  const chapters = getAllChapters(doc);
  const idx = chapters.findIndex((c) => c.id === chapterId);
  if (idx === -1) notFound();

  const chapter = chapters[idx];
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  return (
    <>
      <ChapterView
        content={chapter.content}
        tag={chapter.tag}
        tagColor={chapter.tagColor}
      />
      <NavButtons
        docId={docId}
        prevChapterId={prev?.id}
        prevTitle={prev?.title}
        nextChapterId={next?.id}
        nextTitle={next?.title}
      />
    </>
  );
}

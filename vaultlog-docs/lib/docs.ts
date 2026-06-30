import { DocData, Chapter } from "@/types/docs";
import doc1 from "@/public/data/doc1.json";
import doc2 from "@/public/data/doc2.json";
import doc3 from "@/public/data/doc3.json";

export const allDocs: DocData[] = [
  doc1 as DocData,
  doc2 as DocData,
  doc3 as DocData,
];

export const docMeta = [
  { id: "doc1", title: "CLI → API → Database", subtitle: "The full three-phase guide" },
  { id: "doc2", title: "Rust for JS/TS devs", subtitle: "10-chapter mental shift" },
  { id: "doc3", title: "Deep Concepts", subtitle: "Ownership, lifetimes, traits" },
];

export function getDoc(id: string): DocData | undefined {
  return allDocs.find((d) => d.id === id);
}

export function getAllChapters(doc: DocData): Chapter[] {
  return doc.phases.flatMap((p) => p.chapters);
}

export function getChapter(doc: DocData, chapterId: string): Chapter | undefined {
  return getAllChapters(doc).find((c) => c.id === chapterId);
}

export function getChapterIndex(doc: DocData, chapterId: string): number {
  return getAllChapters(doc).findIndex((c) => c.id === chapterId);
}

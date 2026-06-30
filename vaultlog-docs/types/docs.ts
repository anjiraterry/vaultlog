export type TagColor = "cli" | "axum" | "db" | "day" | "concept" | "foundation" | "ownership" | "borrowing" | "lifetimes" | "traits" | "js";

export interface ComparePane {
  label: string;
  lang: "js" | "rs";
  code: string;
}

export type SectionItem =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; text: string }
  | { type: "compare"; left: ComparePane; right: ComparePane }
  | { type: "callout"; variant: string; head: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; items: string[] };

export interface ChapterContent {
  heading: string;
  lead: string;
  intro?: string;
  sections: SectionItem[];
}

export interface Chapter {
  id: string;
  num: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: TagColor;
  content: ChapterContent;
}

export interface Phase {
  id: string;
  label: string;
  chapters: Chapter[];
}

export interface DocData {
  id: string;
  title: string;
  subtitle: string;
  phases: Phase[];
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { allDocs, getAllChapters } from "@/lib/docs";
import { DocData, Chapter, Phase } from "@/types/docs";

const DOC_LABELS: Record<string, { short: string; accent: string }> = {
  doc1: { short: "CLI→API→DB", accent: "#f0a34b" },
  doc2: { short: "JS→Rust", accent: "#8f7ee6" },
  doc3: { short: "Deep Concepts", accent: "#3dd68c" },
};

export default function Sidebar() {
  const params = useParams();
  const currentDocId = params?.docId as string;
  const currentChapterId = params?.chapterId as string;

  return (
    <aside
      style={{
        width: 260,
        minWidth: 260,
        height: "100vh",
        background: "var(--bg-sidebar)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "28px 20px 16px 24px",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.3px",
              background: "linear-gradient(135deg,#ffffff 30%,var(--accent-red) 80%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            vaultlog
          </div>
        </Link>
        <div
          style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 6, letterSpacing: "0.2px" }}
        >
          Rust Learning Guide
        </div>
      </div>

      {/* Doc switcher */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--border-light)",
          display: "flex",
          gap: 6,
        }}
      >
        {allDocs.map((doc) => {
          const meta = DOC_LABELS[doc.id];
          const isActive = doc.id === currentDocId;
          const firstChapter = getAllChapters(doc)[0];
          return (
            <Link
              key={doc.id}
              href={`/docs/${doc.id}/${firstChapter.id}`}
              style={{
                flex: 1,
                padding: "6px 8px",
                borderRadius: 10,
                textDecoration: "none",
                background: isActive ? "var(--bg-active)" : "transparent",
                border: isActive ? `1px solid ${meta.accent}33` : "1px solid var(--border-light)",
                textAlign: "center",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: isActive ? meta.accent : "var(--text-tertiary)",
                }}
              >
                {meta.short}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Chapter navigation for current doc */}
      {currentDocId && (
        <DocChapterList
          doc={allDocs.find((d) => d.id === currentDocId)!}
          currentChapterId={currentChapterId}
        />
      )}

      {/* Footer */}
      <div
        style={{
          padding: "12px 18px",
          borderTop: "1px solid var(--border-light)",
          fontSize: 10,
          color: "var(--text-tertiary)",
          lineHeight: 1.7,
          marginTop: "auto",
        }}
      >
        All examples from vaultlog source code
      </div>
    </aside>
  );
}

function DocChapterList({
  doc,
  currentChapterId,
}: {
  doc: DocData;
  currentChapterId: string;
}) {
  if (!doc) return null;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "8px 0 16px" }}>
      {doc.phases.map((phase: Phase) => (
        <div key={phase.id}>
          {/* Phase label */}
          <div
            style={{
              padding: "10px 22px 6px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              borderBottom: "1px solid var(--border-light)",
              marginBottom: 4,
            }}
          >
            {phase.label}
          </div>

          {/* Chapters */}
          <div style={{ padding: "4px 10px 8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {phase.chapters.map((chapter: Chapter) => {
              const isActive = chapter.id === currentChapterId;
              return (
                <Link
                  key={chapter.id}
                  href={`/docs/${doc.id}/${chapter.id}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 12,
                    textDecoration: "none",
                    background: isActive ? "var(--bg-active)" : "transparent",
                    boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                    transition: "all 0.15s ease",
                  }}
                  className="sidebar-chapter-btn"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: isActive ? "var(--accent-red)" : "var(--text-tertiary)",
                      background: "rgba(255,255,255,0.05)",
                      padding: "2px 6px",
                      borderRadius: 20,
                      flexShrink: 0,
                    }}
                  >
                    {chapter.num}
                  </span>
                  <span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? 550 : 500,
                        color: isActive ? "white" : "var(--text-secondary)",
                        display: "block",
                        lineHeight: 1.35,
                      }}
                    >
                      {chapter.title}
                    </span>
                    <span
                      style={{
                        fontSize: 10.5,
                        color: "var(--text-tertiary)",
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      {chapter.desc}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

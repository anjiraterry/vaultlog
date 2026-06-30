import Link from "next/link";
import { allDocs, getAllChapters } from "@/lib/docs";

const DOC_ACCENTS: Record<string, { color: string; border: string; desc: string; badge: string }> = {
  doc1: {
    color: "#f0a34b",
    border: "rgba(240,163,75,0.25)",
    desc: "Phase 1: CLI → Phase 2: Axum Web API → Phase 3: sqlx + Supabase. Error handling, async, extractors, shared state, migrations — everything.",
    badge: "14 chapters",
  },
  doc2: {
    color: "#8f7ee6",
    border: "rgba(143,126,230,0.25)",
    desc: "Variables, structs, enums, functions, error handling, ownership, iterators, pattern matching — all mapped to your existing JS/TS knowledge.",
    badge: "10 chapters",
  },
  doc3: {
    color: "#3dd68c",
    border: "rgba(61,214,140,0.25)",
    desc: "Stack vs Heap, Ownership, Move Semantics, Borrowing, Borrow Rules, Lifetimes, Traits, Generics — all grounded in vaultlog source code.",
    badge: "9 chapters",
  },
};

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px 80px",
      }}
    >
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 60, maxWidth: 560 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--accent-red)",
            marginBottom: 16,
          }}
        >
          Rust Learning Guide
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            background: "linear-gradient(145deg,#fff 40%,#a0aec0)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: 18,
          }}
        >
          vault
          <span style={{ color: "var(--accent-red)", WebkitTextFillColor: "var(--accent-red)" }}>
            log
          </span>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.65,
          }}
        >
          Three complete guides to learning Rust — from CLI to REST API to
          database, with every concept grounded in a real project.
        </p>
      </div>

      {/* Doc cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          maxWidth: 980,
          width: "100%",
        }}
      >
        {allDocs.map((doc) => {
          const meta = DOC_ACCENTS[doc.id];
          const chapters = getAllChapters(doc);
          const firstChapter = chapters[0];
          return (
            <Link
              key={doc.id}
              href={`/docs/${doc.id}/${firstChapter.id}`}
              style={{
                background: "var(--bg-elevated)",
                border: `1px solid ${meta.border}`,
                borderRadius: 20,
                padding: "24px 26px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  fontSize: 10,
                  fontWeight: 600,
                  color: meta.color,
                  background: `${meta.color}18`,
                  padding: "3px 10px",
                  borderRadius: 20,
                  letterSpacing: "0.3px",
                }}
              >
                {meta.badge}
              </div>

              {/* Doc number */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  marginBottom: 10,
                }}
              >
                {doc.id.replace("doc", "0")}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 650,
                  color: "white",
                  marginBottom: 4,
                  letterSpacing: "-0.3px",
                }}
              >
                {doc.subtitle}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-tertiary)",
                  lineHeight: 1.65,
                  margin: "10px 0 18px",
                }}
              >
                {meta.desc}
              </p>

              {/* Phase list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {doc.phases.map((phase) => (
                  <div
                    key={phase.id}
                    style={{
                      fontSize: 11,
                      color: "var(--text-tertiary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: meta.color,
                        opacity: 0.6,
                        flexShrink: 0,
                      }}
                    />
                    {phase.label}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border-light)",
                  fontSize: 12.5,
                  color: meta.color,
                  fontWeight: 500,
                }}
              >
                Start reading →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

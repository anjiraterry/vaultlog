import Link from "next/link";

interface NavButtonsProps {
  docId: string;
  prevChapterId?: string;
  nextChapterId?: string;
  prevTitle?: string;
  nextTitle?: string;
}

export default function NavButtons({
  docId,
  prevChapterId,
  nextChapterId,
  prevTitle,
  nextTitle,
}: NavButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 48,
        paddingTop: 22,
        borderTop: "1px solid var(--border-light)",
        alignItems: "center",
      }}
    >
      {prevChapterId ? (
        <Link
          href={`/docs/${docId}/${prevChapterId}`}
          style={{
            padding: "9px 20px",
            borderRadius: 40,
            border: "1px solid var(--border-light)",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: 13.5,
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          ← {prevTitle}
        </Link>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {nextChapterId && (
        <Link
          href={`/docs/${docId}/${nextChapterId}`}
          style={{
            padding: "9px 20px",
            borderRadius: 40,
            background: "var(--accent-red)",
            border: "1px solid var(--accent-red)",
            color: "white",
            fontSize: 13.5,
            fontWeight: 500,
            textDecoration: "none",
            boxShadow: "0 2px 6px rgba(229,72,77,0.3)",
            marginLeft: "auto",
            transition: "all 0.2s",
          }}
        >
          {nextTitle} →
        </Link>
      )}
    </div>
  );
}

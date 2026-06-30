import type { ComparePane as ComparePaneType } from "@/types/docs";

export default function CompareBlock({ left, right }: { left: ComparePaneType; right: ComparePaneType }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        margin: "20px 0 24px",
      }}
    >
      <PaneBlock pane={left} />
      <PaneBlock pane={right} />
    </div>
  );
}

function PaneBlock({ pane }: { pane: ComparePaneType }) {
  const isJs = pane.lang === "js";
  const dotColor = isJs ? "#f0a34b" : "#e5484d";
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid var(--border-light)",
        background: "var(--bg-elevated)",
      }}
    >
      <div
        style={{
          padding: "9px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid var(--border-light)",
          background: "rgba(255,255,255,0.02)",
          color: dotColor,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: dotColor,
            boxShadow: `0 0 4px ${dotColor}`,
            flexShrink: 0,
          }}
        />
        {pane.label}
      </div>
      <pre
        style={{
          margin: 0,
          borderRadius: 0,
          border: "none",
          fontSize: 11.5,
          padding: 14,
          background: "var(--bg-code)",
          boxShadow: "none",
        }}
      >
        <code>{pane.code}</code>
      </pre>
    </div>
  );
}

export default function Callout({
  variant,
  head,
  text,
}: {
  variant: string;
  head: string;
  text: string;
}) {
  return (
    <div
      className={`callout-${variant}`}
      style={{
        borderRadius: 20,
        padding: "16px 20px",
        margin: "24px 0",
      }}
    >
      <div
        className="callout-head"
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {head}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </p>
    </div>
  );
}

import { SectionItem, ChapterContent, TagColor } from "@/types/docs";
import CodeBlock from "./CodeBlock";
import CompareBlock from "./CompareBlock";
import Callout from "./Callout";

export default function ChapterView({
  content,
  tag,
  tagColor,
}: {
  content: ChapterContent;
  tag: string;
  tagColor: TagColor;
}) {
  return (
    <article>
      {/* Tag */}
      <span
        className={`tag-${tagColor}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRadius: 40,
          fontSize: 10.5,
          fontWeight: 600,
          marginBottom: 18,
          letterSpacing: "0.3px",
        }}
      >
        {tag}
      </span>

      {/* Heading */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 650,
          letterSpacing: "-0.5px",
          marginBottom: 12,
          lineHeight: 1.2,
          background: "linear-gradient(145deg,#fff 40%,#cbd5e6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        dangerouslySetInnerHTML={{ __html: content.heading }}
      />

      {/* Lead */}
      <p
        style={{
          fontSize: 15.5,
          color: "var(--text-secondary)",
          marginBottom: 24,
          lineHeight: 1.65,
        }}
      >
        {content.lead}
      </p>

      {/* Intro box */}
      {content.intro && (
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-light)",
            borderRadius: 18,
            padding: "14px 18px",
            marginBottom: 22,
          }}
        >
          <p
            style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: content.intro }}
          />
        </div>
      )}

      {/* Sections */}
      {content.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </article>
  );
}

function Section({ section }: { section: SectionItem }) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          style={{
            fontSize: 21,
            fontWeight: 600,
            margin: "32px 0 12px",
            letterSpacing: "-0.2px",
            color: "var(--text-primary)",
          }}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      );

    case "h3":
      return (
        <h3
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent-gold)",
            margin: "24px 0 10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {section.text}
        </h3>
      );

    case "p":
      return (
        <p
          style={{
            lineHeight: 1.7,
            marginBottom: 16,
            fontSize: 14.5,
            color: "var(--text-secondary)",
          }}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      );

    case "code":
      return <CodeBlock code={section.text} />;

    case "compare":
      return <CompareBlock left={section.left} right={section.right} />;

    case "callout":
      return <Callout variant={section.variant} head={section.head} text={section.text} />;

    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "20px 0" }}>
          <table>
            <thead>
              <tr>
                {section.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: cell }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "list":
      return (
        <ul
          style={{
            paddingLeft: 22,
            marginBottom: 18,
          }}
        >
          {section.items.map((item, i) => (
            <li
              key={i}
              style={{
                lineHeight: 1.7,
                marginBottom: 7,
                fontSize: 14.5,
                color: "var(--text-secondary)",
              }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );

    default:
      return null;
  }
}

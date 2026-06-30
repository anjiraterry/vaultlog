import Sidebar from "@/components/Sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "40px 48px 80px",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

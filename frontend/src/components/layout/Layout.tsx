import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "#ffffff",
          zIndex: 100,
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 0",
            fontWeight: 700,
            fontSize: "22px",
          }}
        >
          씀씀이
        </div>
      </header>

      <main
        style={{
          background: "#F1F1F1",
          paddingTop: "80px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
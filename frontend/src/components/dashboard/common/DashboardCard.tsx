import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const AnalysisCard = ({ title, subtitle, children }: Props) => {
  return (
    <section
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "16px",
      }}
    >
      <h3>{title}</h3>
      {subtitle && <p style={{ color: "#6b7280" }}>{subtitle}</p>}
      <div style={{ marginTop: "12px" }}>{children}</div>
    </section>
  );
};

export default AnalysisCard;

import type { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

const DashboardLayout = ({ left, right }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
      }}
    >
      <section>{left}</section>
      <section>{right}</section>
    </div>
  );
};

export default DashboardLayout;

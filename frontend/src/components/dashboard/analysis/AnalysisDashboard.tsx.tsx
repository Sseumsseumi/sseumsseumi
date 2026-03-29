import AuthSection from "../../user/AuthSection";
// import SummarySection from "./SummarySection";
import AccountSection from "../../user/AccountSection";

const LeftDashboard = () => {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "10px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
       <>
          <AuthSection />
          {/* <SummarySection /> */}
          <AccountSection />
        </>

    </section>
  );
};

export default LeftDashboard;
const SummarySection = () => {
  return (
    <div>
      <h3 style={{ marginBottom: "8px" }}>소비 요약</h3>
      <p style={{ color: "#6b7280", marginBottom: "12px" }}>
        이번 달에 무슨 일이 있었나요?
      </p>

      <ul style={{ paddingLeft: "18px", lineHeight: "1.6" }}>
        <li>총 지출: 1,240,000원 (전월 대비 +12%)</li>
        <li>상위 소비 카테고리: 식비 · 교통 · 구독</li>
        <li>고정비 48% / 변동비 52%</li>
        <li>주말 지출 비중이 평일 대비 높음</li>
      </ul>
    </div>
  );
};

export default SummarySection;
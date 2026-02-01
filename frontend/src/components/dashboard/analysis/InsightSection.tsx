import AnalysisCard from "./AnalysisCard";

const InsightSection = () => {
  return (
    <AnalysisCard title="소비 성향 분석">
      <p>
        외식·배달 비중이 높고, 주말에 지출이 집중되는 소비 패턴입니다.
      </p>

      <ul>
        <li>감정/편의 기반 소비: 다소 높음</li>
        <li>즉흥 소비 비율: 평균 이상</li>
      </ul>
    </AnalysisCard>
  );
};

export default InsightSection;

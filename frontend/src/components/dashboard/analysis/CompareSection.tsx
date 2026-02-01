import AnalysisCard from "../common/DashboardCard";

const CompareSection = () => {
  return (
    <AnalysisCard title="비교 분석">
      <ul>
        <li>전월 대비 지출 증가폭: +12%</li>
        <li>최근 6개월 평균 대비: +8%</li>
        <li>동일 연령대 평균보다 식비 비중이 높음</li>
      </ul>
    </AnalysisCard>
  );
};

export default CompareSection;

const TransactionSummary = () => {
  return (
    <div className="card">
      <h3>최근 거래 내역</h3>
      <ul>
        <li>커피 - 4,500원</li>
        <li>편의점 - 12,000원</li>
        <li>교통 - 55,000원</li>
      </ul>
      <button>전체 보기</button>
    </div>
  );
};

export default TransactionSummary;

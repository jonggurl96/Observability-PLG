type StatusPanelProps = {
  title: string;
  value: string;
  description: string;
  detail: string;
};

export function StatusPanel({
  title,
  value,
  description,
  detail,
}: StatusPanelProps) {
  // 대시보드 카드 표현을 공통 컴포넌트로 분리해 상태 섹션 확장이 쉬운 구조를 만든다.
  return (
    <article className="status-card">
      <h2>{title}</h2>
      <p className="status-value">{value}</p>
      <p className="status-description">{description}</p>
      <p className="status-detail">{detail}</p>
    </article>
  );
}

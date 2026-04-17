import { StatusPanel } from "../components/status-panel";
import { loadMonitoringSummary } from "../services/monitoring";

// 상태 화면은 요청 시점 데이터를 보여줘야 하므로 정적 캐시를 사용하지 않는다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const summary = await loadMonitoringSummary();

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Observability PLG</p>
        <h1>README 기반 기본 관측성 아키텍처</h1>
        <p className="hero-copy">
          Spring Boot는 health/prometheus 엔드포인트를 제공하고, Next.js는 BFF와
          프론트엔드 메트릭 엔드포인트를 제공하며, Prometheus와 Loki가 이를
          수집하도록 구성했습니다.
        </p>
      </section>

      <section className="status-grid">
        <StatusPanel
          title="Backend"
          value={summary.backendStatus}
          description="Spring Boot 상태 응답과 actuator 지표를 확인합니다."
          detail={summary.backendCheckedAt}
        />
        <StatusPanel
          title="Frontend"
          value="UP"
          description="Next.js App Router, BFF, 커스텀 /api/metrics 경로를 제공합니다."
          detail="GET /api/health, GET /api/metrics"
        />
        <StatusPanel
          title="Observability"
          value="READY"
          description="Prometheus, Loki, Promtail, Grafana, Nginx 구성이 저장소에 추가되었습니다."
          detail="Grafana :3001 / Prometheus :9090 / Loki :3100"
        />
      </section>

      <section className="endpoint-panel">
        <h2>핵심 엔드포인트</h2>
        <ul>
          <li>Backend health: <code>/health</code></li>
          <li>Backend metrics: <code>/prometheus</code></li>
          <li>Frontend health: <code>/api/health</code></li>
          <li>Frontend metrics: <code>/api/metrics</code></li>
          <li>BFF proxy: <code>/api/backend/status</code></li>
        </ul>
      </section>
    </main>
  );
}

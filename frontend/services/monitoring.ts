import { writeAppLog } from "./logger";

type BackendStatusPayload = {
  name: string;
  status: string;
  checkedAt: string;
};

type MonitoringSummary = {
  backendStatus: string;
  backendCheckedAt: string;
};

function resolveFrontendBaseUrl() {
  return process.env.APP_BASE_URL ?? "http://frontend:3000";
}

function resolveBackendBaseUrl() {
  return process.env.BACKEND_INTERNAL_URL ?? "http://backend:8080";
}

async function fetchViaBff() {
  return fetch(`${resolveFrontendBaseUrl()}/api/backend/status`, {
    cache: "no-store",
  });
}

async function fetchDirectly() {
  return fetch(`${resolveBackendBaseUrl()}/api/platform/status`, {
    cache: "no-store",
  });
}

export async function loadMonitoringSummary(): Promise<MonitoringSummary> {
  try {
    // UI는 BFF를 우선 사용하고, 내부 서버 렌더링 환경에서만 직접 호출을 보조 경로로 사용한다.
    const bffResponse = await fetchViaBff();
    const selectedResponse = bffResponse.ok ? bffResponse : await fetchDirectly();

    if (!selectedResponse.ok) {
      throw new Error(`backend request failed with ${selectedResponse.status}`);
    }

    const payload = (await selectedResponse.json()) as BackendStatusPayload;

    await writeAppLog(
      "page",
      `홈 화면에서 백엔드 상태를 조회했다. status=${payload.status}`
    );

    return {
      backendStatus: payload.status,
      backendCheckedAt: payload.checkedAt,
    };
  } catch (error) {
    await writeAppLog(
      "page",
      `홈 화면 상태 조회에 실패했다. reason=${String(error)}`
    );

    return {
      backendStatus: "UNKNOWN",
      backendCheckedAt: "백엔드 연결 실패",
    };
  }
}

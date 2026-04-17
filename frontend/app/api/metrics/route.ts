import { NextResponse } from "next/server";
import { writeAppLog } from "../../../services/logger";

// 프로세스 시작 시각을 고정해 Prometheus가 서비스 재시작 여부를 판단할 수 있게 한다.
const processStartTimeSeconds = Math.floor(Date.now() / 1000);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function resolveBackendBaseUrl() {
  return process.env.BACKEND_INTERNAL_URL ?? "http://backend:8080";
}

async function isBackendUp() {
  try {
    const response = await fetch(`${resolveBackendBaseUrl()}/health`, {
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function GET() {
  const backendUp = await isBackendUp();

  await writeAppLog(
    "metrics",
    `프론트엔드 메트릭 요청을 처리했다. backendUp=${backendUp}`
  );

  const payload = [
    "# HELP frontend_application_up 프론트엔드 애플리케이션의 기본 가용성 지표",
    "# TYPE frontend_application_up gauge",
    "frontend_application_up 1",
    "# HELP frontend_backend_up 프론트엔드가 확인한 백엔드 연결 상태",
    "# TYPE frontend_backend_up gauge",
    `frontend_backend_up ${backendUp ? 1 : 0}`,
    "# HELP frontend_process_start_time_seconds 프론트엔드 프로세스 시작 시각",
    "# TYPE frontend_process_start_time_seconds gauge",
    `frontend_process_start_time_seconds ${processStartTimeSeconds}`,
  ].join("\n");

  return new NextResponse(`${payload}\n`, {
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
    },
  });
}

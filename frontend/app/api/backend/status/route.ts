import { NextResponse } from "next/server";
import { writeAppLog } from "../../../../services/logger";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function resolveBackendBaseUrl() {
  return process.env.BACKEND_INTERNAL_URL ?? "http://backend:8080";
}

export async function GET() {
  // 브라우저는 백엔드 내부 주소를 몰라도 되도록 Next.js가 BFF 역할을 수행한다.
  const response = await fetch(`${resolveBackendBaseUrl()}/api/platform/status`, {
    cache: "no-store",
  });

  const payload = await response.json();

  await writeAppLog(
    "bff",
    `백엔드 상태 응답을 프록시했다. status=${payload.status ?? "UNKNOWN"}`
  );

  return NextResponse.json(payload, { status: response.status });
}

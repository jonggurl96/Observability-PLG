import { NextResponse } from "next/server";
import { writeAppLog } from "../../../services/logger";

// 헬스 체크는 모니터링 시스템이 즉시 호출하므로 항상 동적 응답을 반환한다.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  await writeAppLog("health", "프론트엔드 헬스 체크 요청을 처리했다.");

  return NextResponse.json({
    name: "observability-frontend",
    status: "UP",
    checkedAt: new Date().toISOString(),
  });
}

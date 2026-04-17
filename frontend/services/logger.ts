import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

function resolveLogDirectory() {
  // 컨테이너와 로컬 실행 모두 같은 코드로 처리할 수 있도록 환경 변수 우선 전략을 사용한다.
  return process.env.APP_LOG_DIR ?? path.join(process.cwd(), "logs");
}

export async function writeAppLog(source: string, message: string) {
  const logDirectory = resolveLogDirectory();
  const logFilePath = path.join(logDirectory, "application.log");
  const logLine = `${new Date().toISOString()} [${source}] ${message}\n`;

  await mkdir(logDirectory, { recursive: true });
  await appendFile(logFilePath, logLine, { encoding: "utf-8" });
}

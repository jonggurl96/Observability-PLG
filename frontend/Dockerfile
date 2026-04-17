# 의존성을 먼저 설치해 캐시 효율을 높인다.
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm install

# 빌드 단계에서 Next.js standalone 출력을 생성한다.
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 실행 단계는 standalone 결과물만 복사해 가볍게 유지한다.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

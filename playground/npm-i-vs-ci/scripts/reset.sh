#!/usr/bin/env bash
#
# reset.sh — 실험 환경을 깨끗한 상태로 되돌립니다.
#
# 각 실험은 node_modules 와 package-lock.json 을 만들거나 바꿉니다.
# 다음 실험을 처음부터 관찰하려면 이 스크립트로 초기화하세요.
#
# 사용법:  bash scripts/reset.sh

set -e

# 스크립트 위치 기준으로 demo-app 경로를 잡습니다 (어디서 실행하든 동작).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../demo-app"

cd "$APP_DIR"

echo "🧹 demo-app 초기화 중..."
rm -rf node_modules
rm -f package-lock.json
rm -f package-lock.json.bak

echo "✅ 완료. 현재 상태:"
echo "   - node_modules:       $( [ -d node_modules ] && echo '있음' || echo '없음' )"
echo "   - package-lock.json:  $( [ -f package-lock.json ] && echo '있음' || echo '없음' )"
echo ""
echo "package.json 의존성 선언은 그대로 유지됩니다:"
node -e "const d=require('./package.json').dependencies; console.log(JSON.stringify(d, null, 2))"

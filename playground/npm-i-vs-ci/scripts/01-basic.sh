#!/usr/bin/env bash
#
# 실험 1: npm i 와 npm ci 의 기본 동작 차이
#
# 관찰 포인트
#   1) lock 파일이 없을 때, 각 명령은 어떻게 반응하는가?
#   2) lock 파일이 있을 때, node_modules 를 어떻게 처리하는가?
#   3) 설치 속도/방식은 어떻게 다른가?
#
# 사용법:  bash scripts/01-basic.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../demo-app"
cd "$APP_DIR"

line() { echo ""; echo "============================================================"; echo "$1"; echo "============================================================"; }

# ------------------------------------------------------------------
line "STEP 0. 완전 초기 상태로 리셋 (lock 없음, node_modules 없음)"
rm -rf node_modules package-lock.json
echo "lock 파일:      $( [ -f package-lock.json ] && echo '있음' || echo '없음 ✅')"
echo "node_modules:  $( [ -d node_modules ] && echo '있음' || echo '없음 ✅')"

# ------------------------------------------------------------------
line "STEP 1. lock 파일이 없는 상태에서 'npm ci' 를 시도하면?"
echo "👉 npm ci 는 package-lock.json 이 반드시 있어야 합니다. 없으면 에러로 멈춥니다."
echo "   (아래는 의도된 실패입니다 — 에러 메시지를 직접 확인하세요)"
echo ""
# npm ci 는 lock 이 없으면 비정상 종료하므로, 스크립트가 죽지 않게 || true 처리
npm ci || echo ">>> 예상대로 npm ci 가 실패했습니다. (lock 파일이 없기 때문)"

# ------------------------------------------------------------------
line "STEP 2. 'npm i' 로 최초 설치 → lock 파일이 '생성'된다"
echo "👉 npm i 는 lock 이 없으면 package.json 을 보고 버전을 해석한 뒤,"
echo "   package-lock.json 을 새로 '생성'합니다."
echo ""
time npm i
echo ""
echo "결과: lock 파일 $( [ -f package-lock.json ] && echo '생성됨 ✅' || echo '없음 ❌')"

# ------------------------------------------------------------------
line "STEP 3. 이제 lock 이 있는 상태에서 'npm ci' 를 실행하면?"
echo "👉 npm ci 는 기존 node_modules 를 '통째로 삭제'한 뒤,"
echo "   lock 파일에 적힌 그대로 정확히 재설치합니다."
echo ""
echo "[관찰 트릭] node_modules 안에 표식 파일을 하나 만들어 둡니다."
echo "   npm ci 가 node_modules 를 정말 지운다면, 이 표식도 같이 사라져야 합니다."
touch node_modules/__나의_표식__.txt
echo "   표식 생성됨: $( [ -f node_modules/__나의_표식__.txt ] && echo '있음 ✅' )"
echo ""
time npm ci
echo ""
echo "[관찰] ci 실행 후 표식 파일은?"
if [ -f node_modules/__나의_표식__.txt ]; then
  echo "   표식: 아직 있음 ❓ (예상과 다름)"
else
  echo "   표식: 사라짐 ✅ → npm ci 가 node_modules 를 통째로 지우고 재설치했다는 증거"
fi

# ------------------------------------------------------------------
line "정리"
cat <<'EOF'
- npm ci  : lock 파일이 '필수'. 없으면 실패.
            기존 node_modules 를 지우고 lock 그대로 재현 설치.
- npm i   : lock 이 없으면 package.json 해석 → lock '생성'.
            lock 이 있으면 그것을 참고하되, 필요 시 갱신할 수 있음 (다음 실험에서 확인).

다음 실험:  bash scripts/02-lock-mismatch.sh
EOF

#!/usr/bin/env bash
#
# 실험 3: 버전 범위(^, ~) 해석과 lock 의 역할
#
# package.json 의 ^3.0.0, ~7.5.0 같은 표기는 "정확한 버전"이 아니라 "범위"입니다.
# 그렇다면 실제로 어떤 버전이 깔릴지는 누가 정할까요?
#   - lock 이 없으면  → npm 이 '범위 내 최신'을 골라 깐다 (설치 시점에 따라 달라질 수 있음)
#   - lock 이 있으면  → lock 에 '고정된 버전'을 깐다 (언제 깔든 동일)
#
# 이게 npm ci 가 "재현 가능한 설치"를 보장하는 핵심 원리입니다.
#
# 범위 표기 복습:
#   ^3.0.0  → 3.x.x 중 최신 (major 고정, minor/patch 는 올라갈 수 있음)
#   ~7.5.0  → 7.5.x 중 최신 (major.minor 고정, patch 만 올라갈 수 있음)
#
# 사용법:  bash scripts/03-version-range.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../demo-app"
cd "$APP_DIR"

line() { echo ""; echo "============================================================"; echo "$1"; echo "============================================================"; }

# ------------------------------------------------------------------
line "STEP 0. package.json 의 '범위' 선언 확인"
node -e "const d=require('./package.json').dependencies; console.log(JSON.stringify(d, null, 2))"
cat <<'EOF'

  is-odd: ^3.0.0  → 3.x.x 중 최신을 허용
  semver: ~7.5.0  → 7.5.x 중 최신을 허용
EOF

# ------------------------------------------------------------------
line "STEP 1. 레지스트리에 실제로 어떤 버전들이 있는지 본다"
echo "👉 npm view 로 배포된 버전 목록을 확인합니다 (범위가 고를 수 있는 후보들)."
echo ""
echo "[is-odd 의 3.x 계열]"
npm view is-odd versions --json 2>/dev/null | node -e "
const v=JSON.parse(require('fs').readFileSync(0,'utf8'));
console.log('  ', v.filter(x=>x.startsWith('3.')).join(', ') || '(3.x 없음)');
"
echo "[semver 의 7.5.x 계열]"
npm view semver versions --json 2>/dev/null | node -e "
const v=JSON.parse(require('fs').readFileSync(0,'utf8'));
console.log('  ', v.filter(x=>x.startsWith('7.5.')).join(', ') || '(7.5.x 없음)');
"

# ------------------------------------------------------------------
line "STEP 2. lock 없이 'npm i' → 범위 내 최신이 선택되어 lock 에 '고정'된다"
rm -rf node_modules package-lock.json
npm i >/dev/null 2>&1
echo "설치되어 lock 에 고정된 실제 버전:"
node -e "
const l=require('./package-lock.json');
console.log('  is-odd :', l.packages['node_modules/is-odd'].version, '  (^3.0.0 범위에서 선택됨)');
console.log('  semver :', l.packages['node_modules/semver'].version, '  (~7.5.0 범위에서 선택됨)');
"
echo "👉 범위 선언은 그대로지만, lock 에는 '정확한 한 버전'이 박혔습니다."
echo "   이제부터 npm ci 는 이 박힌 버전을 그대로 재현합니다."

# ------------------------------------------------------------------
line "STEP 3. lock 이 '단일 진실'이라는 의미"
echo "👉 방금 npm i 로 lock 에 is-odd 3.0.1, semver 7.5.4 가 '박혔습니다'."
echo "   이제 node_modules 를 통째로 지우고 npm ci 를 돌려도,"
echo "   lock 에 박힌 그 버전이 '그대로' 재현됩니다."
echo ""
rm -rf node_modules
npm ci >/dev/null 2>&1
node -e "
console.log('  npm ci 재설치 결과:');
console.log('    is-odd :', require('./node_modules/is-odd/package.json').version, '(lock 그대로)');
console.log('    semver :', require('./node_modules/semver/package.json').version, '(lock 그대로)');
"
echo ""
echo "핵심 통찰 — 같은 package.json(^3.0.0) 이라도:"
echo "  · lock 을 커밋해 두면  → 모두가 동일한 버전을 받는다 (npm ci 가 보장)"
echo "  · lock 없이 npm i 만 쓰면 → 설치 '시점'에 따라 범위 내 다른 버전이 깔릴 수 있다"
echo "    (오늘은 3.0.1 이지만, 내일 3.0.2 패치가 나오면 그게 깔릴 수 있음)"

# ------------------------------------------------------------------
line "정리"
cat <<'EOF'
- package.json 의 ^, ~ 는 '범위'일 뿐, 정확한 버전이 아니다.
- lock 이 없으면: 설치 시점의 '범위 내 최신'이 선택된다 → 시점에 따라 달라질 수 있음.
- lock 이 있으면: lock 에 고정된 '정확한 버전'이 설치된다 → 항상 동일.
- npm ci 는 항상 lock 기준으로만 설치하므로 '재현 가능한 빌드'를 보장한다.

초기화:  bash scripts/reset.sh
EOF

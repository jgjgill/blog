#!/usr/bin/env bash
#
# 실험 2: package.json 과 package-lock.json 이 '어긋났을 때'
#
# 실무에서 가장 자주 마주치는 상황입니다.
#   - 누군가 package.json 의 버전을 바꿨는데 lock 을 갱신하지 않고 커밋했다.
#   - 그 상태에서 다른 사람이 받아 설치하면?
#
# 관찰 포인트
#   - npm i  : 어긋난 lock 을 '수정'하면서 설치를 진행한다 (관대함).
#   - npm ci : "lock 과 package.json 이 안 맞는다"며 '에러로 멈춘다' (엄격함).
#
# 사용법:  bash scripts/02-lock-mismatch.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../demo-app"
cd "$APP_DIR"

line() { echo ""; echo "============================================================"; echo "$1"; echo "============================================================"; }

# ------------------------------------------------------------------
line "STEP 0. 정상 상태 준비 (lock 생성)"
rm -rf node_modules package-lock.json
npm i >/dev/null 2>&1
echo "✅ 깨끗한 lock 생성 완료"
echo "현재 lock 의 is-odd 버전:"
node -e "const l=require('./package-lock.json'); console.log('  ', l.packages['node_modules/is-odd'].version)"

# ------------------------------------------------------------------
line "STEP 1. package.json 만 바꿔서 lock 과 '어긋나게' 만든다"
echo "👉 is-odd 의 요구 버전을 ^3.0.0 → ^2.0.0 으로 낮춥니다."
echo "   (package.json 만 수정하고 lock 은 그대로 두어 불일치를 만듭니다)"
echo ""
# package.json 백업 후 버전 변경 (node 로 안전하게 편집)
cp package.json package.json.bak
node -e "
const fs=require('fs');
const p=require('./package.json');
p.dependencies['is-odd']='^2.0.0';
fs.writeFileSync('./package.json', JSON.stringify(p, null, 2) + '\n');
"
echo "변경 후 package.json 의 is-odd 선언:"
node -e "console.log('  ', require('./package.json').dependencies['is-odd'])"
echo "그대로 둔 lock 의 is-odd 버전:"
node -e "const l=require('./package-lock.json'); console.log('  ', l.packages['node_modules/is-odd'].version)"
echo "👉 지금 package.json(^2.0.0) 과 lock(3.x) 이 어긋난 상태입니다."

# ------------------------------------------------------------------
line "STEP 2. 이 어긋난 상태에서 'npm ci' 를 실행하면?"
echo "👉 npm ci 는 둘이 안 맞으면 설치를 거부하고 에러로 멈춥니다."
echo "   (아래는 의도된 실패 — 에러 메시지를 꼭 읽어보세요)"
echo ""
npm ci || echo ">>> 예상대로 npm ci 가 실패했습니다. (package.json 과 lock 불일치)"

# ------------------------------------------------------------------
line "STEP 3. 같은 상태에서 'npm i' 를 실행하면?"
echo "👉 npm i 는 어긋남을 발견하면 lock 을 '수정'하면서 설치를 진행합니다."
echo ""
npm i
echo ""
echo "설치 후 lock 의 is-odd 버전 (2.x 로 바뀌었는지 확인):"
node -e "const l=require('./package-lock.json'); console.log('  ', l.packages['node_modules/is-odd'].version)"
echo "👉 npm i 는 lock 을 package.json 에 맞춰 갱신했습니다."

# ------------------------------------------------------------------
line "STEP 4. 원복"
mv package.json.bak package.json
echo "✅ package.json 을 원래대로 (^3.0.0) 복구했습니다."
echo "   (lock 은 지금 2.x 로 갱신된 상태이니, 깨끗이 하려면 reset 하세요)"

# ------------------------------------------------------------------
line "정리"
cat <<'EOF'
같은 '불일치' 상황에서:
  - npm ci : 에러로 멈춤. → "lock 은 신뢰할 수 있는 단일 진실"이라는 전제를 지킴.
             누군가 lock 갱신을 깜빡한 채 커밋했다면 CI 가 즉시 잡아준다.
  - npm i  : lock 을 조용히 수정하며 설치 진행. → 로컬 개발에는 편하지만,
             "내 PC 에서는 됐는데" 같은 환경 차이의 원인이 되기도 한다.

원복/초기화:  bash scripts/reset.sh
다음 실험:    bash scripts/03-version-range.sh
EOF

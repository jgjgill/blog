import { APP_NAME, VERSION } from "./config";

// chalk v5+는 ESM 전용 패키지
// CJS 환경에서 require()로 변환되므로 ERR_REQUIRE_ESM 에러 발생
// 아래 import 주석을 해제하면 에러를 직접 확인할 수 있다
//
// import chalk from 'chalk';
// console.log(chalk.green('성공'));

console.log(`[${APP_NAME}] v${VERSION}`);
console.log("모듈 시스템: CommonJS");
console.log("컴파일러: tsc");
console.log("");
console.log("chalk import를 활성화하면:");
console.log("  Error [ERR_REQUIRE_ESM]: require() of ES Module not supported");

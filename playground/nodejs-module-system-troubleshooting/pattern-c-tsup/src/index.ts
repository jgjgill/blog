import { APP_NAME, VERSION } from './config';
// tsup이 빌드 타임에 내부 파일을 인라인으로 합침 → 확장자 생략 가능
// chalk v5+ (ESM 전용) import 성공
import chalk from 'chalk';

console.log(`[${APP_NAME}] v${VERSION}`);
console.log('모듈 시스템: ESM (번들러)');
console.log('번들러: tsup');
console.log('');
console.log(chalk.green('chalk ESM 전용 패키지 import 성공'));
console.log('');
console.log('패턴 B와 달리 내부 파일 확장자 생략 가능:');
console.log("  import { config } from './config'  ← 확장자 불필요");

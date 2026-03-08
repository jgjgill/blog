import { APP_NAME, VERSION } from './config.js';
// package.json에 "type": "module" → Node.js가 ESM으로 실행
// chalk v5+ (ESM 전용) import 성공
import chalk from 'chalk';

console.log(`[${APP_NAME}] v${VERSION}`);
console.log('모듈 시스템: ESM (NodeNext)');
console.log('컴파일러: tsc');
console.log('');
console.log(chalk.green('chalk ESM 전용 패키지 import 성공'));
console.log('');
console.log('주의: 내부 파일은 .js 확장자 필수');
console.log("  import { config } from './config.js'  ← .js 명시 필요");

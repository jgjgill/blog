// 의존성이 실제로 설치/동작하는지 확인하는 용도의 작은 앱입니다.
// 실험의 핵심은 "어떤 버전이 설치되었는가" 이므로, 설치된 버전을 같이 출력합니다.

const isOdd = require("is-odd");
const semver = require("semver");

// 각 패키지의 실제 설치 버전을 package.json 에서 읽어옵니다.
const isOddVersion = require("is-odd/package.json").version;
const semverVersion = require("semver/package.json").version;

console.log("--- demo-app 실행 결과 ---");
console.log(`is-odd 동작 확인: isOdd(3) = ${isOdd(3)}`);
console.log(`semver 동작 확인: semver.valid("1.2.3") = ${semver.valid("1.2.3")}`);
console.log("");
console.log("--- 실제 설치된 버전 (실험의 핵심 관찰 포인트) ---");
console.log(`is-odd : ${isOddVersion}   (package.json 선언: ^3.0.0)`);
console.log(`semver : ${semverVersion}   (package.json 선언: ~7.5.0)`);

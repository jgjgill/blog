/**
 *
 * @description reading-time 라이브러리 참고
 *
 * https://github.com/ngryman/reading-time/blob/5f9f6fb2382a7238f89de401f8057c5a26087bd9/src/reading-time.ts#L97-L113
 */

export function readingTimeWithCount(words: string) {
  const wordsCount = words.split(' ').length
  const wordsPerMinute = 200

  const minutes = wordsCount / wordsPerMinute

  const time = Math.round(minutes * 60 * 1000)
  const displayed = Math.ceil(parseFloat(minutes.toFixed(2)))

  return {
    minutes: displayed,
    time,
  }
}

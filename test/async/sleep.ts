/**
 *
 * 지정한 시간(ms) 동안 비동기 흐름을 일시 정지시키는 유틸 함수.
 * Promise 기반으로 동작하며, await 키워드와 함께 사용하면
 * 비동기 함수 내부에서 자연스러운 지연 처리에 활용
 *
 * @param sec - 대기할 시간(ms). 기본값은 1000ms(1초)
 * @returns 지정된 시간이 지난 뒤 resolve되는 Promise<void>
 *
 * @example
 * async function fetchWithDelay() {
 *   console.log("요청 전");
 *   await sleep(500); // 0.5초 대기
 *   console.log("요청 시작");
 * }
 *
 */
export function sleep(ms: number = 1000): Promise<void>{
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
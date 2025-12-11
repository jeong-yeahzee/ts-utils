/**
 * 
 * 지정한 시간이 지나기 전에 반복 호출되면 마지막 호출만 실행되도록 만드는 유틸 함수.
 * 
 * @template T - 콜백 함수 타입 (가변 파라미터 지원)
 * @param callback - 지연 후 실행할 함수
 * @param delay - 마지막 호출 후 실행까지 대기할 시간(ms)
 * @returns 디바운싱된 함수. 호출 시 delay 동안 추가 호출이 없으면 callback 실행.
 *
 * @example
 * const onInput = debounce(() => {}, 300);
 * 
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };

  debounced.cancel = () => {
    if(timeout) clearTimeout(timeout);
  }

  return debounced;
}
/**
 * 문자열을 엄격한 기준으로 숫자로 변환하는 함수
 * - 허용 패턴: -123, 123.45, -123.45
 * - 숫자/소수점/음수 부호 외의 문자 제거 후,
 * - 정상적인 숫자 형태인지 정규식으로 최종 검증
 * 
 * 정상적인 숫자가 아니면 NaN 반환
 */
export function toNumberStrict(value: unknown): number {
  if (typeof value === "number") return value;

  // 문자 속 숫자 / '.' / '-'만 추출
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  // -123.45 같은 정상적인 숫자 패턴만 허용
  const validNumberPattern = /^-?\d+(\.\d+)?$/;

  // 정규식으로 정상적인 숫자인지 확인
  if (!validNumberPattern.test(cleaned)) return NaN;

  return Number(cleaned);
}
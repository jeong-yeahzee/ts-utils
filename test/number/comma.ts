import { toNumberStrict } from "./toNumberStrict.test";

// 한국어 표기(3자리 콤마)로 변환
const formatterKR = new Intl.NumberFormat("ko-KR");

/**
 * 숫자 또는 숫자형 문자열을 콤마 형식으로 변환
 * 정상적인 숫자형식이 아니면 fallback 반환
 *
 * @param value - 숫자 또는 숫자로 변환 가능한 값
 * @param defValue - null/undefined일 때 반환할 기본 값 (기본값: "0")
 */
export function comma<T>(value: T, fallback: string = "0"): string {
  if (value == null) return fallback;

  const num = toNumberStrict(value);

  if (isNaN(num)) return fallback;

  return formatterKR.format(num);
}
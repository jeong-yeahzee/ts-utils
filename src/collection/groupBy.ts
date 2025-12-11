/**
 * 배열 형태의 객체 데이터를 특정 키 기준으로 그룹화하여 객체 형태로 변환
 *
 * 예시:
 * const data = [
 *   { id: 1, name: "nexi", order: 1 },
 *   { id: 1, name: "nexi2", order: 2 },
 *   { id: 2, name: "nexi3", order: 3 }
 * ];
 *
 * convertKeyArray(data, "id");
 * // 결과:
 * {
 *   "1": [
 *     { id: 1, name: "nexi", order: 1 },
 *     { id: 1, name: "nexi2", order: 2 }
 *   ],
 *   "2": [
 *     { id: 2, name: "nexi3", order: 3 }
 *   ]
 * }
 *
 * @template T - 객체 배열 요소의 타입
 * @param list - 변환 대상 객체 배열 또는 JSON 문자열 배열
 * @param key - 그룹화 기준이 될 필드명
 * @returns 주어진 키를 기준으로 배열 요소를 그룹화한 객체
 */
export function groupBy<T extends Record<string, any>, K extends keyof T>(list: T[], key: K): Record<string, T[]>{
  return list.reduce((acc, item) => {
    const k = item[key];

    // null / undefined만 걸러냄 ( 0, "" 허용 )
    if(k == null) return acc;
    const keyStr = String(k);

    if(!acc[keyStr]) acc[keyStr] = [];
    acc[keyStr].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}
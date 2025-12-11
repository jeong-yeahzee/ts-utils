/**
 * 배열 형태의 객체 데이터를 특정 키 기준으로 객체 형태로 변환
 *
 * 예시:
 * const data = [
 *   { id: 1, name: "nexi1", order: 1 },
 *   { id: 2, name: "nexi2", order: 2 },
 *   { id: 3, name: "nexi3", order: 3 }
 * ];
 *
 * convertKeyValue(data, "id", ["name", "id"]);
 * // 결과:
 * {
 *   "1": { id: 1, name: "nexi1" },
 *   "2": { id: 2, name: "nexi2" },
 *   "3": { id: 3, name: "nexi3" }
 * }
 *
 * @template T - 객체 배열의 요소 타입
 * @param list - 변환할 객체 배열
 * @param key - 결과 객체의 키로 사용할 필드명
 * @param includeKeys - 결과 객체의 값으로 포함할 필드 목록 (생략 시 전체 객체 사용)
 * @returns 주어진 키를 기준으로 구성된 객체. 각 키에 해당하는 값은 지정된 필드만 포함하거나 전체 객체
 */
export function keyBy<T extends Record<string, any>, K extends keyof T>(list: T[], key: K, includeKeys?: K[]): Record<string, Partial<T>>{
  return list.reduce((acc, item)=>{
    const k = item[key];

    // null / undefined만 걸러냄 ( 0, "" 허용 )
    if(k == null) return acc;
    const keyStr = String(key);

    // includeKeys 있을 경우 -> Partial<T>로만 구성
    if (includeKeys && includeKeys.length > 0) {
      const picked = includeKeys.reduce((obj, curKey) => {
        // 존재하는 키만 복사
        if (curKey in item) {
          obj[curKey] = item[curKey];
        }
        return obj;
      }, {} as Partial<T>);

      acc[keyStr] = picked;
      return acc;
    }

    // 전체 item 저장
    acc[keyStr] = item;
    return acc;
  }, {} as Record<string, Partial<T>>);
}
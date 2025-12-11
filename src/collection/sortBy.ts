type SortOrder = "desc" | "asc";
type NullOrder = "first" | "last" | "ignore";

interface SortOptions {
  order?: SortOrder; // 정렬 방향
  nulls?: NullOrder; // null/undefiend 정렬 위치
}

/**
 * 배열을 지정한 key 기준으로 정렬
 * - 숫자는 숫자 비교
 * - 문자열은 localeCompare 사용
 * - null/undefined는 옵션(nulls)으로 처리
 */
export function sortBy<T, K extends keyof T>(
  list: T[],
  key: K,
  options: SortOptions = {}
): T[] {
  const { order = "asc", nulls = "last" } = options;
  const multiplier = order === "asc" ? 1 : -1;

  return list.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    const aNull = aValue == null;
    const bNull = bValue == null;

    // --- null 처리 ---
    if(aNull || bNull){
      if(nulls === "ignore") return 0;

      if(aNull && bNull) return 0;
      if(aNull) return nulls === "first" ? -1 : 1;
      if(bNull) return nulls === "first" ? 1 : -1;
    }

    // --- 숫자 비교 ---
    const aNum = typeof aValue === "number" ? aValue : Number(aValue);
    const bNum = typeof bValue === "number" ? bValue : Number(bValue);

    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      return (aNum - bNum) * multiplier;
    }

    // --- 문자열 비교 ---
    const aStr = String(aValue);
    const bStr = String(bValue);

    return aStr.localeCompare(bStr) * multiplier;
  });
}

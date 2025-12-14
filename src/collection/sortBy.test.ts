import { describe, it, expect } from "vitest";
import { sortBy } from "./sortBy";

describe("sortBy", () => {
  it("숫자 key 기준으로 오름차순 정렬한다 (기본 옵션)", () => {
    const data = [{ id: 3 }, { id: 1 }, { id: 2 }];

    const result = sortBy(data, "id");

    expect(result.map((v) => v.id)).toEqual([1, 2, 3]);
  });

  it("숫자 key 기준으로 내림차순 정렬한다", () => {
    const data = [{ id: 1 }, { id: 3 }, { id: 2 }];

    const result = sortBy(data, "id", { order: "desc" });

    expect(result.map((v) => v.id)).toEqual([3, 2, 1]);
  });

  it("숫자형 문자열도 숫자로 변환하여 정렬한다", () => {
    const data = [{ value: "10" }, { value: "2" }, { value: "1" }];

    const result = sortBy(data, "value");

    expect(result.map((v) => v.value)).toEqual(["1", "2", "10"]);
  });

  it("문자열 key는 localeCompare 기준으로 정렬한다", () => {
    const data = [{ name: "banana" }, { name: "apple" }, { name: "cherry" }];

    const result = sortBy(data, "name");

    expect(result.map((v) => v.name)).toEqual(["apple", "banana", "cherry"]);
  });

  it("null / undefined는 기본적으로 마지막에 위치한다", () => {
    const data = [
      { value: 2 },
      { value: null },
      { value: 1 },
      { value: undefined }
    ];

    const result = sortBy(data, "value");

    expect(result.map((v) => v.value)).toEqual([1, 2, null, undefined]);
  });

  it("nulls 옵션이 first일 경우 null / undefined를 앞에 배치한다", () => {
    const data = [{ value: 2 }, { value: null }, { value: 1 }];

    const result = sortBy(data, "value", { nulls: "first" });

    expect(result.map((v) => v.value)).toEqual([null, 1, 2]);
  });

  it("nulls 옵션이 ignore일 경우 null 비교를 무시한다", () => {
    const data = [{ value: 2 }, { value: null }, { value: 1 }];

    const result = sortBy(data, "value", { nulls: "ignore" });

    const numbers = result
      .filter((v) => v.value != null)
      .map((v) => v.value)
      .sort(); // 테스트에서만 정렬

    expect(numbers).toEqual([1, 2]);
  });

  it("문자열 + 숫자가 섞인 경우 숫자 우선 비교 후 문자열 비교를 수행한다", () => {
    const data = [{ value: "20" }, { value: "apple" }, { value: "3" }];

    const result = sortBy(data, "value");

    expect(result.map((v) => v.value)).toEqual(["3", "20", "apple"]);
  });

  it("원본 배열을 직접 변경한다 (in-place 정렬)", () => {
    const data = [{ id: 2 }, { id: 1 }];

    const result = sortBy(data, "id");

    expect(result).toBe(data); // 같은 참조
    expect(data.map((v) => v.id)).toEqual([1, 2]);
  });

  it("빈 배열을 전달하면 빈 배열을 반환한다", () => {
    const result = sortBy([], "id" as any);
    expect(result).toEqual([]);
  });
});

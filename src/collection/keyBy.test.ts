import { describe, it, expect } from "vitest";
import { keyBy } from "./keyBy";

describe("keyBy", () => {
  it("지정한 키 기준으로 객체 배열을 객체로 변환한다", () => {
    const data = [
      { id: 1, name: "nexi1", order: 1 },
      { id: 2, name: "nexi2", order: 2 },
      { id: 3, name: "nexi3", order: 3 }
    ];

    const result = keyBy(data, "id");

    expect(result).toEqual({
      "1": { id: 1, name: "nexi1", order: 1 },
      "2": { id: 2, name: "nexi2", order: 2 },
      "3": { id: 3, name: "nexi3", order: 3 }
    });
  });

  it("includeKeys를 지정하면 해당 키만 포함한 객체를 값으로 사용한다", () => {
    const data = [
      { id: 1, name: "nexi1", order: 1 },
      { id: 2, name: "nexi2", order: 2 }
    ];

    const result = keyBy(data, "id", ["id", "name"]);

    expect(result).toEqual({
      "1": { id: 1, name: "nexi1" },
      "2": { id: 2, name: "nexi2" }
    });
  });

  it("includeKeys에 존재하지 않는 키가 포함되어 있어도 무시한다", () => {
    const data = [{ id: 1, name: "nexi1" }];

    const result = keyBy(data, "id", ["id", "unknown" as any]);

    expect(result).toEqual({
      "1": { id: 1 }
    });
  });

  it("키 값이 문자열인 경우에도 정상적으로 동작한다", () => {
    const data = [
      { code: "A", value: 10 },
      { code: "B", value: 20 }
    ];

    const result = keyBy(data, "code");

    expect(result).toEqual({
      A: { code: "A", value: 10 },
      B: { code: "B", value: 20 }
    });
  });

  it('키 값이 0 또는 빈 문자열("")인 경우도 정상적으로 포함한다', () => {
    const data = [
      { id: 0, name: "zero" },
      { id: "", name: "empty" }
    ];

    const result = keyBy(data, "id");

    expect(result).toEqual({
      "0": { id: 0, name: "zero" },
      "": { id: "", name: "empty" }
    });
  });

  it("키 값이 null 또는 undefined인 항목은 제외한다", () => {
    const data = [
      { id: 1, name: "valid" },
      { id: null as any, name: "null" },
      { id: undefined as any, name: "undefined" }
    ];

    const result = keyBy(data, "id");

    expect(result).toEqual({
      "1": { id: 1, name: "valid" }
    });
  });

  it("빈 배열을 전달하면 빈 객체를 반환한다", () => {
    const result = keyBy([], "id" as any);
    expect(result).toEqual({});
  });
});

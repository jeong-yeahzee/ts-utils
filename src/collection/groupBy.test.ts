import { describe, it, expect } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy", () => {
  it("지정한 키 기준으로 객체 배열을 그룹화한다", () => {
    const data = [
      { id: 1, name: "nexi", order: 1 },
      { id: 1, name: "nexi2", order: 2 },
      { id: 2, name: "nexi3", order: 3 }
    ];

    const result = groupBy(data, "id");

    expect(result).toEqual({
      "1": [
        { id: 1, name: "nexi", order: 1 },
        { id: 1, name: "nexi2", order: 2 }
      ],
      "2": [{ id: 2, name: "nexi3", order: 3 }]
    });
  });

  it("키 값이 문자열인 경우에도 정상적으로 그룹화한다", () => {
    const data = [
      { type: "A", value: 1 },
      { type: "A", value: 2 },
      { type: "B", value: 3 }
    ];

    const result = groupBy(data, "type");

    expect(result).toEqual({
      A: [
        { type: "A", value: 1 },
        { type: "A", value: 2 }
      ],
      B: [{ type: "B", value: 3 }]
    });
  });

  it("키 값이 0인 경우도 정상적으로 그룹화한다", () => {
    const data = [
      { id: 0, name: "zero" },
      { id: 1, name: "one" }
    ];

    const result = groupBy(data, "id");

    expect(result).toEqual({
      "0": [{ id: 0, name: "zero" }],
      "1": [{ id: 1, name: "one" }]
    });
  });

  it('키 값이 빈 문자열("")인 경우도 정상적으로 그룹화한다', () => {
    const data = [
      { category: "", value: 1 },
      { category: "", value: 2 }
    ];

    const result = groupBy(data, "category");

    expect(result).toEqual({
      "": [
        { category: "", value: 1 },
        { category: "", value: 2 }
      ]
    });
  });

  it("키 값이 null 또는 undefined인 항목은 제외한다", () => {
    const data = [
      { id: 1, name: "valid" },
      { id: null as any, name: "null" },
      { id: undefined as any, name: "undefined" }
    ];

    const result = groupBy(data, "id");

    expect(result).toEqual({
      "1": [{ id: 1, name: "valid" }]
    });
  });

  it("빈 배열을 전달하면 빈 객체를 반환한다", () => {
    const result = groupBy([], "id" as any);
    expect(result).toEqual({});
  });
});

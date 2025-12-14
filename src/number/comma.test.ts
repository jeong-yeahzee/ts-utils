import { describe, it, expect } from "vitest";
import { comma } from "./comma";

describe("comma", () => {
  it("number 타입을 전달하면 한국어 콤마 형식으로 변환한다", () => {
    expect(comma(1000)).toBe("1,000");
    expect(comma(1234567)).toBe("1,234,567");
  });

  it("숫자 문자열을 전달하면 콤마 형식으로 변환한다", () => {
    expect(comma("1000")).toBe("1,000");
    expect(comma("1234567")).toBe("1,234,567");
  });

  it('0은 정상적으로 "0"을 반환한다', () => {
    expect(comma(0)).toBe("0");
    expect(comma("0")).toBe("0");
  });

  it("음수도 정상적으로 콤마 형식으로 변환한다", () => {
    expect(comma(-1000)).toBe("-1,000");
  });

  it("null 또는 undefined일 경우 fallback 값을 반환한다", () => {
    expect(comma(null)).toBe("0");
    expect(comma(undefined)).toBe("0");
    expect(comma(null, "-")).toBe("-");
  });

  it("숫자로 변환할 수 없는 값은 fallback 값을 반환한다", () => {
    expect(comma("abc")).toBe("0");
    expect(comma({} as any)).toBe("0");
  });

  it("fallback 값을 명시하면 해당 값을 반환한다", () => {
    expect(comma(null, "N/A")).toBe("N/A");
    expect(comma("invalid", "N/A")).toBe("N/A");
  });

  it("통화 기호나 문자 포함 숫자도 정상적으로 변환한다", () => {
    expect(comma("₩1,234원")).toBe("1,234");
  });
});

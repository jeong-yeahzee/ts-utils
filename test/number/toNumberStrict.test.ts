import { describe, it, expect } from "vitest";
import { toNumberStrict } from "../../src";

describe("toNumberStrict", () => {
  describe("숫자 타입 입력", () => {
    it("양의 정수를 그대로 반환한다", () => {
      expect(toNumberStrict(123)).toBe(123);
    });

    it("음의 정수를 그대로 반환한다", () => {
      expect(toNumberStrict(-123)).toBe(-123);
    });

    it("소수를 그대로 반환한다", () => {
      expect(toNumberStrict(123.45)).toBe(123.45);
    });

    it("음의 소수를 그대로 반환한다", () => {
      expect(toNumberStrict(-123.45)).toBe(-123.45);
    });

    it("0을 그대로 반환한다", () => {
      expect(toNumberStrict(0)).toBe(0);
    });
  });

  describe("유효한 문자열 입력", () => {
    it("양의 정수 문자열을 숫자로 변환한다", () => {
      expect(toNumberStrict("123")).toBe(123);
    });

    it("음의 정수 문자열을 숫자로 변환한다", () => {
      expect(toNumberStrict("-123")).toBe(-123);
    });

    it("소수 문자열을 숫자로 변환한다", () => {
      expect(toNumberStrict("123.45")).toBe(123.45);
    });

    it("음의 소수 문자열을 숫자로 변환한다", () => {
      expect(toNumberStrict("-123.45")).toBe(-123.45);
    });

    it("숫자와 불필요한 문자가 섞인 경우 숫자만 추출한다", () => {
      expect(toNumberStrict("$123.45")).toBe(123.45);
      expect(toNumberStrict("123원")).toBe(123);
      expect(toNumberStrict("price: 99.99")).toBe(99.99);
    });
  });

  describe("무효한 입력 - NaN 반환", () => {
    it("빈 문자열은 NaN을 반환한다", () => {
      expect(toNumberStrict("")).toBeNaN();
    });

    it("숫자가 없는 문자열은 NaN을 반환한다", () => {
      expect(toNumberStrict("abc")).toBeNaN();
    });

    it("여러 개의 소수점이 있으면 NaN을 반환한다", () => {
      expect(toNumberStrict("12.34.56")).toBeNaN();
    });

    it("여러 개의 음수 부호가 있으면 NaN을 반환한다", () => {
      expect(toNumberStrict("--123")).toBeNaN();
    });

    it("음수 부호가 중간에 있으면 NaN을 반환한다", () => {
      expect(toNumberStrict("12-34")).toBeNaN();
    });

    it("소수점만 있으면 NaN을 반환한다", () => {
      expect(toNumberStrict(".")).toBeNaN();
    });

    it("음수 부호만 있으면 NaN을 반환한다", () => {
      expect(toNumberStrict("-")).toBeNaN();
    });

    it("null은 NaN을 반환한다", () => {
      expect(toNumberStrict(null)).toBeNaN();
    });

    it("undefined는 NaN을 반환한다", () => {
      expect(toNumberStrict(undefined)).toBeNaN();
    });

    it("객체는 NaN을 반환한다", () => {
      expect(toNumberStrict({})).toBeNaN();
    });

    it("배열은 NaN을 반환한다", () => {
      expect(toNumberStrict([])).toBeNaN();
    });
  });

  describe("엣지 케이스", () => {
    it("0으로 시작하는 숫자 문자열을 처리한다", () => {
      expect(toNumberStrict("0123")).toBe(123);
    });

    it("공백이 포함된 문자열을 처리한다", () => {
      expect(toNumberStrict(" 123 ")).toBe(123);
    });

    it("매우 작은 소수를 처리한다", () => {
      expect(toNumberStrict("0.001")).toBe(0.001);
    });

    it("boolean 값은 NaN을 반환한다", () => {
      expect(toNumberStrict(true)).toBeNaN();
      expect(toNumberStrict(false)).toBeNaN();
    });
  });
});

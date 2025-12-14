import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sleep } from "./sleep";

describe("sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("기본값으로 1000ms 후 resolve된다", async () => {
    const promise = sleep();

    // 아직 resolve 안 됨
    let resolved = false;
    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(999);
    await Promise.resolve(); // microtask flush
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await Promise.resolve();

    expect(resolved).toBe(true);
  });

  it("지정한 ms 이후에 resolve된다", async () => {
    const promise = sleep(500);

    let resolved = false;
    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(500);
    await Promise.resolve();

    expect(resolved).toBe(true);
  });

  it("await와 함께 사용하면 비동기 흐름을 지연시킨다", async () => {
    const order: string[] = [];

    const asyncFn = async () => {
      order.push("before");
      await sleep(300);
      order.push("after");
    };

    const task = asyncFn();

    // 아직 after 실행 안 됨
    vi.advanceTimersByTime(299);
    await Promise.resolve();
    expect(order).toEqual(["before"]);

    vi.advanceTimersByTime(1);
    await task;

    expect(order).toEqual(["before", "after"]);
  });

  it("0ms를 전달하면 즉시 resolve된다", async () => {
    const promise = sleep(0);

    vi.advanceTimersByTime(0);
    await promise;

    // 에러 없이 완료되면 성공
    expect(true).toBe(true);
  });
});

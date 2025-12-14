import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("지정된 delay 이후에 callback을 한 번 실행한다", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();

    // 아직 실행 안 됨
    expect(callback).not.toHaveBeenCalled();

    // 시간 경과
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("delay 안에 여러 번 호출되면 마지막 호출만 실행된다", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("마지막 호출의 인자만 callback에 전달된다", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced(1);
    debounced(2);
    debounced(3);

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith(3);
  });

  it("delay 이전에 cancel을 호출하면 callback이 실행되지 않는다", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(300);

    expect(callback).not.toHaveBeenCalled();
  });

  it("cancel 후 다시 호출하면 정상적으로 동작한다", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    debounced.cancel();

    debounced("run");

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("run");
  });
});

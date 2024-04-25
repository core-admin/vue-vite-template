/**
 * 在每个动画帧调用时执行回调函数，支持停止与继续
 */
export function recordAnimationFrames(callback: () => void, autoStart = true) {
  let running = false;
  let raf: number;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
}

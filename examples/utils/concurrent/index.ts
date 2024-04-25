/* eslint-disable @typescript-eslint/no-unused-vars */

function randomNumberInRange(min = 0, max = 100) {
  return Math.random() * (max - min + 1) + min;
}

function sleep(time = 0) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}

function apiFn() {
  return sleep(randomNumberInRange(1, 3) * 1000);
}

/**
 * 模拟 15 个请求
 */
let tasks = Array.from({ length: 15 }, (_, i) => i).map(i => {
  return () => {
    console.log(`请求 ${i + 1} 开始执行`);
    return apiFn().then(() => {
      console.log(`请求 ${i + 1} 执行成功`);
      return `第 ${i + 1} 个请求结果`;
    });
  };
});

// 五个为一组
const tasksGroup = chunk(tasks, 5);
const results: string[] = [];

async function main() {
  // 分组为串行，组内为并发执行
  for (const taskGroup of tasksGroup) {
    const result = await Promise.all(taskGroup.map(task => task()));
    results.push(...result);
    console.log('----------------------------------');
  }
  console.log('请求完毕执行完毕，执行结果：', results);
}

main();

/**
 * 需求，按照 5 个请求为一组，依次执行，每组内并发执行，组与组之间串行执行，也就是下一组的请求需要等待上一组的请求执行完毕后才能执行
 */

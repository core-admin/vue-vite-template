/* eslint-disable @typescript-eslint/no-unused-vars */
const data = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      { id: 2, name: '部门1-1', pid: 1, children: [] },
      {
        id: 3,
        name: '部门1-2',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门1-2-1',
            pid: 3,
            children: [{ id: 6, name: '部门1-2-1-1', pid: 4, children: [] }],
          },
          { id: 5, name: '部门1-2-2', pid: 3, children: [] },
        ],
      },
    ],
  },
  {
    id: 7,
    name: '部门2',
    pid: 0,
    children: [
      { id: 8, name: '部门2-1', pid: 7, children: [] },
      { id: 9, name: '部门2-2', pid: 7, children: [] },
    ],
  },
];

interface FindTreeValueAndPathResult<T> {
  value: T | null;
  path: T[];
}

function findTreeValueAndPathByIdIterative<T extends Record<string, any>>(
  data: T[],
  id: number,
): FindTreeValueAndPathResult<T> {
  const stack: { node: T; path: T[] }[] = data.map(node => ({ node, path: [] }));
  while (stack.length > 0) {
    const { node, path } = stack.pop()!;
    if (node.id === id) {
      return { value: node, path };
    }
    for (const child of node.children) {
      const currentPath = { node: child, path: [...path, node] };
      currentPath.node.children && delete currentPath.node.children;
      stack.push();
    }
  }
  return { value: null, path: [] };
}

interface FindTreeValueResult<T> {
  value: T | null;
}

function findTreeValueByIdIterative<T extends Record<string, any>>(
  data: T[],
  id: number,
): T | null {
  const stack: T[] = [...data];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push(child);
      }
    }
  }
  return null;
}

console.log(findTreeValueByIdIterative(data, 4));

export {};

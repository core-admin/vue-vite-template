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

function findTreeNodeIterative<T extends Record<string, any>>(
  data: T[],
  cb: (node: T) => boolean,
): T | null {
  const stack: T[] = [...data];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (cb(node)) {
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

console.log(findTreeNodeIterative(data, node => node.id === 5));

function findParentNodeIterative<T extends Record<string, any>>(
  roots: T[],
  isParentCallback: (node: T) => boolean,
): T | null {
  const stack: T[] = [...roots];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (currentNode.children && currentNode.children.length > 0) {
      for (const child of currentNode.children) {
        if (isParentCallback(child)) {
          return currentNode;
        }
        stack.push(child);
      }
    }
  }

  return null;
}

console.log(findParentNodeIterative(data, node => node.id === 6));

export {};

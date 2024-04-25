/* eslint-disable @typescript-eslint/no-unused-vars */

/*
案例1：部门树

let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

转成如下结构：

let result = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      { id: 2, name: '部门2', pid: 1, children: [] },
      { id: 3, name: '部门3', pid: 1, children: [] }
    ]
  }
]

*/

interface Department {
  id: number;
  name: string;
  pid: number;
}

interface TreeDepartment extends Department {
  children: TreeDepartment[];
}

export function toTree(arr: Department[]): TreeDepartment[] {
  const map = new Map<number, TreeDepartment>();
  const root: TreeDepartment[] = [];

  arr.forEach(item => {
    // 确保每个节点都被创建，并且有 children 数组
    if (!map.has(item.id)) {
      map.set(item.id, { ...item, children: [] });
    }
    const currentNode = map.get(item.id)!;

    if (item.pid === 0) {
      // 如果是根节点，直接添加到 root 数组
      root.push(currentNode);
    } else {
      // 如果不是根节点，找到父节点并添加到其 children 数组
      if (!map.has(item.pid)) {
        // 如果父节点还未被创建，则先创建一个临时的父节点
        map.set(item.pid, { id: item.pid, name: '', pid: 0, children: [currentNode] });
      } else {
        // 如果父节点已存在，直接添加到其 children 数组
        map.get(item.pid)!.children.push(currentNode);
      }
    }
  });

  return root;
}

const data: Department[] = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门1-1', pid: 1 },
  { id: 3, name: '部门1-2', pid: 1 },
  { id: 4, name: '部门1-2-1', pid: 3 },
  { id: 5, name: '部门1-2-2', pid: 3 },
  { id: 6, name: '部门1-2-1-1', pid: 4 },
  { id: 7, name: '部门2', pid: 0 },
  { id: 8, name: '部门2-1', pid: 7 },
  { id: 9, name: '部门2-2', pid: 7 },
];

// console.log(JSON.stringify(toTree(data), null, 2));

type TreeNode<T> = T & {
  children: TreeNode<T>[];
};

function buildTree<T extends Record<string | number, any>>(
  arr: T[],
  options?: { selfKey?: string; parentKey?: string; rootValue?: string | number },
) {
  const { selfKey = 'id', parentKey = 'pid', rootValue = 0 } = options ?? {};
  const map = new Map<string | number, TreeNode<T>>();
  const result: TreeNode<T>[] = [];

  arr.forEach(item => {
    if (!map.has(item[selfKey])) {
      map.set(item[selfKey], { ...item, children: [] });
    }
    const currentNode = map.get(item[selfKey])!;

    if (item[parentKey] === rootValue) {
      result.push(currentNode);
    } else {
      if (!map.has(item[parentKey])) {
        // @ts-expect-error
        map.set(item[parentKey], { children: [currentNode] });
      } else {
        map.get(item[parentKey])!.children.push(currentNode);
      }
    }
  });

  return result;
}

const res = buildTree(data);

// console.log(JSON.stringify(res, null, 2));

export {};

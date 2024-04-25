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

function toTree(arr: Department[]): TreeDepartment[] {
  const map = new Map<number, TreeDepartment>();
  const root: TreeDepartment[] = [];

  arr.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  arr.forEach(item => {
    const current = map.get(item.id);
    const parent = map.get(item.pid);
    if (parent) {
      current && parent.children.push(current);
    } else {
      current && root.push(current);
    }
  });

  return root;
}

const data: Department[] = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

console.log(JSON.stringify(toTree(data), null, 2));

export {};

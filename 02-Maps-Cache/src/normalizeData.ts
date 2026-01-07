interface User {
  id: string;
  name: string;
}

export default function normalizeData<T, K extends keyof T>(
  data: T[],
  key: K
): Map<T[K], T> {
  const map = new Map<T[K], T>();

  for (const item of data) {
    map.set(item[key], item);
  }

  return map;
}

const usersArray: User[] = [
  { id: "u1", name: "Alex" },
  { id: "u2", name: "Juan" },
];

const usersMap = normalizeData(usersArray, "id");
console.log(usersMap);
console.log(usersMap.get("u1")); // { id: 'u1', name: 'Alex' } immediately O(1)

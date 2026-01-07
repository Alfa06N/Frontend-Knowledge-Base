interface User {
  id: number;
  name: string;
}

const userCache = new Map<string, User>();

const getOrFetchUser = (name: string): User => {
  if (userCache.has(name)) {
    console.log("Returning cached user");
    return userCache.get(name)!;
  }

  console.log("Not found. Saving to cache");
  const newUser = { id: Date.now(), name };
  userCache.set(name, newUser);
  return newUser;
};

console.log(getOrFetchUser("Alex")); // Not found...
console.log(getOrFetchUser("Alex")); // Returning cached user...

function withCache<T>(fn: (arg: string) => T) {
  const internalMap = new Map<string, T>();

  return (arg: string): T => {
    if (internalMap.has(arg)) {
      return internalMap.get(arg)!;
    } else {
      const result = fn(arg);
      internalMap.set(arg, result);
      return result;
    }
  };
}

const fastFetch = withCache((name) => {
  console.log("Heavy processing");
  return name.toUpperCase();
});

console.log(fastFetch("pedro")); // Prints "Heavy processing" and "PEDRO"
console.log(fastFetch("pedro")); // Prints only "PEDRO"

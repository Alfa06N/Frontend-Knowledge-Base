function createCounter(name) {
  let count = 0;

  return function () {
    count += 1;
    console.log(`Counter [${name}]: ${count}`);
    return count;
  };
}

const premiumClick = createCounter("Premium Button");
premiumClick(); // "Counter: [Premium Button]: 1"
premiumClick(); // "Counter: [Premium Button]: 2"

// It keeps alive the count variable even when createCounter has finished

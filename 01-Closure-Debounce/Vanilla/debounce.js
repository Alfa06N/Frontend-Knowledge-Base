export default function debounce(callback, delay) {
  let timer; // This is the closure

  const executedFunction = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };

  executedFunction.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return executedFunction;
}

const mySearch = debounce((text) => console.log("Searching:", text), 500);

mySearch("a");
mySearch("ab");
mySearch("abc");

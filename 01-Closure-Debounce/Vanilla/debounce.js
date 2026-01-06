export default function debounce(callback, delay) {
  let timer; // This is the closure

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => callback(...args), delay);
  };
}

const mySearch = debounce((text) => console.log("Searching:", text), 500);

mySearch("a");
mySearch("ab");
mySearch("abc");

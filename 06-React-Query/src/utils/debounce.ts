type Timer = ReturnType<typeof setTimeout>;
interface DebouncedFunction<T extends (...args: never[]) => void> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export default function debounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): DebouncedFunction<T> {
  let timer: Timer | null;

  const executedFunction = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };

  executedFunction.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return executedFunction;
}

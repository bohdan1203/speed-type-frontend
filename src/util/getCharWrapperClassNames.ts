export function getCharWrapperClassNames(
  i: number,
  currentIndex: number,
  typed: string,
  text: string
): string {
  if (i === currentIndex) {
    return "bg-black text-white";
  }

  if (currentIndex < i) {
    return "bg-light";
  }

  if (typed[i] === text[i]) {
    return "bg-success opacity-75";
  } else {
    return "bg-danger opacity-75";
  }
}

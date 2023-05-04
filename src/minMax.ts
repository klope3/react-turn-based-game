type Callback<TArg> = (arg: TArg) => any;
type ComparisonType = "min" | "max";
const lessThan = (a: number, b: number) => a < b;
const greaterThan = (a: number, b: number) => a > b;

export const minBy = <TElement>(array: TElement[], cb: Callback<TElement>) => {
  return minOrMaxBy(array, cb, "min");
};

export function maxBy<TElement>(array: TElement[], cb: Callback<TElement>) {
  return minOrMaxBy(array, cb, "max");
}

function minOrMaxBy<TElement>(
  array: TElement[],
  cb: Callback<TElement>,
  comparisonType: ComparisonType
) {
  let best = array[0];
  if (best === undefined) return undefined;
  let bestValue = cb(best);
  const compare = comparisonType === "min" ? lessThan : greaterThan;

  for (const element of array) {
    const elementValue = cb(element);
    if (compare(elementValue, bestValue)) {
      best = element;
      bestValue = elementValue;
    }
  }

  return best;
}

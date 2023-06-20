export function calculateRoundedFloat(number: number) {
  return Number((number * 1000 * 60).toFixed(2));
}

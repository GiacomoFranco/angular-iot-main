export function parseSelectFilter(value: string) {
  return value.toLowerCase().replace(" ", "-");
}

export function parseTextFilter(value: string) {
  return value.toLowerCase().trim();
}

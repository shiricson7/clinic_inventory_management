export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric"
  }).format(date);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function isWithinDays(value: string, days: number) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const diff = date.getTime() - Date.now();
  return diff <= days * 24 * 60 * 60 * 1000 && diff >= 0;
}

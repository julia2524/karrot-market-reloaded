export function formmaToOne(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToAgo(date: string): string {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = time - now;

  const formatter = new Intl.RelativeTimeFormat("ko");

  const MinInMs = 1000 * 60;
  const hourInMs = 1000 * 60 * 60;
  const dayInMs = 1000 * 60 * 60 * 24;
  if (Math.floor(Math.abs(diff / dayInMs)) !== 0) {
    return formatter.format(Math.floor(diff / dayInMs), "days");
  }
  if (Math.floor(Math.abs(diff / hourInMs)) !== 0) {
    return formatter.format(Math.floor(diff / hourInMs), "hours");
  }
  if (Math.floor(Math.abs(diff / MinInMs)) !== 0) {
    return formatter.format(Math.floor(diff / MinInMs), "minutes");
  }
  return "방금 전";
}

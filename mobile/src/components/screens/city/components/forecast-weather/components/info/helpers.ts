export function formattedDate(index: number, date?: string): string {
  if (date) {
    return new Date(date).toLocaleDateString().slice(0, -5);
  }

  const dayOffset = index * 86400000;

  return new Date(Date.now() + dayOffset).toDateString().slice(0, 3);
}

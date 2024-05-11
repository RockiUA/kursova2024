export function formattedDate(): string {
  const date = new Date();
  const time = date.toLocaleTimeString().slice(0, -3);
  const day = date.toLocaleDateString().replaceAll('.', '/').slice(0, -5);

  return `${time} • ${day}`;
}

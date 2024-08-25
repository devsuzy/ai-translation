export function convertBytes(bytes: number) {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;

  if (gb >= 1) {
    return `${gb.toFixed(2)}GB`;
  } else if (mb >= 1) {
    return `${mb.toFixed(2)}MB`;
  } else if (kb >= 1) {
    return `${kb.toFixed(2)}KB`;
  } else {
    return `${bytes.toFixed(2)}B`;
  }
}

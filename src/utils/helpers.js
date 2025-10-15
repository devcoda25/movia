export const constructMagnetLink = (hash, title) => {
  if (!hash || !title) {
    return null;
  }
  const tracker = 'udp://glotorrents.pw:6969/announce'; // Example tracker
  const encodedTitle = encodeURIComponent(title);
  return `magnet:?xt=urn:btih:${hash}&dn=${encodedTitle}&tr=${tracker}`;
};

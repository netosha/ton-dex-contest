const formatNumber = (n: number) => {
  const abs = Math.abs(n);
  if (abs > 1000000000) return `${(n / 1000000000).toFixed(2)}b`;
  if (abs > 1000000) return `${(n / 1000000).toFixed(2)}m`;
  if (abs > 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toFixed(2).toString();
};

export default formatNumber;

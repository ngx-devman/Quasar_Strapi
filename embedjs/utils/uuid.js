//? creates a set of random hex digits 'l' length
const _r = (l) => {
  const pattern = "0123456789abcdef";
  let r = "";
  for (let i = 0; i < l; i++) {
    r += pattern[Math.floor(Math.random() * pattern.length)];
  }
  return r;
};

//? generates a v4 UUID (i.e 466e669d-f3a3-4e46-59b0-cdbaecf0fc34)
const uuid = () => {
  return `${_r(8)}-${_r(4)}-4${_r(3)}-${_r(4)}-${_r(12)}`;
};

export default uuid;

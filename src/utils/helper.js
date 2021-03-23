const difficulty = {
  easy: 0,
  medium: 1,
  hard: 2
}

export default difficulty

export const rndPermute = (v_) => {
  let v = v_.slice();
  let r = [];
  while (v.length > 0) {
    let i = Math.floor(Math.random() * v.length);
    if (i < v.length - 1) {
      r.push(v[i]);
      v[i] = v.pop();
    } else {
      r.push(v.pop());
    }
  };
  return r;
};
const breakpoints =
  "0: allowTouchMove=false&grabCursor=true; 767: allowTouchMove=true; 988: allowTouchMove=true";

const parse = (attr) => {
  const res = {};
  const bps = attr.split(";");
  bps.forEach((s) => {
    const params = {};
    const n = s.split(":")[0].trim();
    const q = s.split(":")[1].trim();

    const sp = new URLSearchParams(q);
    const e = sp.entries();
    while (true) {
      try {
        const { value, done } = e.next();
        if (done) break;

        let [k, v] = value;
        if (v === "true") v = true;
        else if (v === "false") v = false;

        params[k] = v;
      } catch (error) {
        break;
      }
    }

    res[+n] = params;
  });
  return res;
};

console.log(parse(breakpoints));

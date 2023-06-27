window.addEventListener("load", () => {
  const inputEl = document.getElementById("input");
  const displayEl = document.getElementById("num");

  const formatInput = (text) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(+text);
  };
  const getNum = (text) => {
    return +text.replace(/,/g, "");
  };
  const onInput = (ev) => {
    // console.log(ev);

    let value = ev.target.value;
    const { data } = ev;
    const regex = /[0-9]+/g;
    if (!regex.test(data)) {
      value = value.replace(data, "");
    }
    value = value.replace(/,/g, "");

    ev.target.value = formatInput(value);

    displayEl.textContent = getNum(ev.target.value);
  };

  inputEl.addEventListener("input", onInput);
});

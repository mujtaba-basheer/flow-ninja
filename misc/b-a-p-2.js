window.addEventListener("load", () => {
  const b = ["First-Name"];
  for (const c of b) {
    const b = $(`#${c}`),
      d = $(`#${c} + label`);
    {
      const a = b.val();
      b.css({ "border-color": "#d9dbe9" });
      if (a) {
        d.css({ color: "#a0a3bd" });
      } else {
        d.css({ top: 11, color: "#a0a3bd", "font-size": 13 });
      }
    }
    b.on("input", function () {
      const c = this.value;
      c &&
        (d.css({ top: -10 }),
        (b.css({ "border-color": "#6c3ef8", outline: "0" }),
        d.css({ "z-index": 3, color: "#6c3ef8" })));
    }),
      b.on("focusout", function () {
        const a = this.value;
        b.css({ "border-color": "#d9dbe9" });
        a
          ? d.css({ color: "#a0a3bd" })
          : d.css({ top: 11, color: "#a0a3bd", "font-size": 13 });
      }),
      b.on("focusin", function () {
        d.css({ top: -10, "z-index": 3, color: "#6c3ef8", "font-size": 12 }),
          b.css({ "border-color": "#6c3ef8", outline: "0" });
      });
  }
});

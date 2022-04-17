const formDesc = [
  {
    id: "n",
    type: "radio",
    required: true,
  },
  {
    id: "o",
    type: "radio",
    required: true,
  },
  {
    id: "p",
    type: "radio",
    required: true,
  },
  {
    id: "q",
    type: "radio",
    required: true,
  },
  {
    id: "r",
    type: "radio",
    required: true,
  },
  {
    id: "s",
    type: "radio",
    required: true,
  },
  {
    id: "t",
    type: "radio",
    required: true,
  },
];
const formId = "wf-form-Soul-Form";

window.addEventListener("load", () => {
  const ls = new LocalStorage();
  ls.fillForm(formDesc);

  const formEl = document.getElementById(formId);
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    if (ls.valiateForm(formDesc)) {
      ls.setFormData(formDesc);

      setTimeout(
        () => (window.location.pathname = "/module-recommendations"),
        1000
      );
    } else console.log("Form Invalid!");
  });
});

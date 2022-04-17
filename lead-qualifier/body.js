const formDesc = [
  {
    id: "a",
    type: "sltext",
    required: true,
  },
  {
    id: "b",
    type: "number",
    required: true,
  },
  {
    id: "c",
    type: "mltext",
    required: true,
  },
  {
    id: "d",
    type: "radio",
    required: true,
  },
  {
    id: "e",
    type: "number",
    required: true,
  },
  {
    id: "f",
    type: "radio",
    required: true,
  },
  {
    id: "g",
    type: "radio",
    required: true,
  },
];
const formId = "wf-form-Mind-Form";

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

      setTimeout(() => (window.location.pathname = "/questions-mind"), 1000);
    } else console.log("Form Invalid!");
  });
});

const formDesc = [
  {
    id: "h",
    type: "radio",
    required: true,
  },
  {
    id: "i",
    type: "checkbox",
    required: true,
  },
  {
    id: "j",
    type: "radio",
    required: true,
  },
  {
    id: "k",
    type: "radio",
    required: true,
  },
  {
    id: "l",
    type: "radio",
    required: true,
  },
  {
    id: "m",
    type: "checkbox",
    required: true,
  },
];
const i_h_Map = {
  B2B: ["i1", "i2", "i3", "i4", "i5", "i6"],
  B2C: ["i7", "i8", "i9", "i10", "i11"],
  Both: ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10", "i11"],
};
const formId = "wf-form-Mind-Form";
const selectSel = ".checkbox-message";

const checkProductSel = () => {
  const inputDiv = document.getElementById("m");
  const inputEls = inputDiv.querySelectorAll('label input[type="checkbox"]');
  let numSelected = 0;
  for (const inputEl of inputEls) {
    if (inputEl.checked) numSelected++;
  }
  const msgEl = document.querySelector(selectSel);

  if (numSelected === 0) msgEl.style.display = "block";
  else msgEl.style.display = "none";
};

window.addEventListener("load", () => {
  const ls = new LocalStorage();
  ls.fillForm(formDesc);

  document
    .querySelectorAll('div#m label input[type="checkbox"]')
    .forEach((inputEl) => inputEl.addEventListener("change", checkProductSel));

  const formEl = document.getElementById(formId);
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    if (ls.valiateForm(formDesc)) {
      ls.setFormData(formDesc);
      ls.setBusinessComplexity();
      ls.setBusinessDifficulty();

      setTimeout(() => (window.location.pathname = "/questions-soul"), 1000);
    } else {
      console.log("Form Invalid!");
      checkProductSel();
    }
  });

  {
    // handle brand address change
    const handleBrandSel = (ev) => {
      const val = ev.target.value;
      const radioArr = i_h_Map[val];
      document
        .querySelectorAll("div#i label.checkbox-field")
        .forEach((radioInput) => {
          const id = radioInput.getAttribute("id");
          if (radioArr.includes(id)) {
            radioInput.style.display = "flex";
          } else {
            if (radioInput.classList.contains("radio-selected")) {
              $(radioInput).trigger("click");
            }
            radioInput.classList.remove("radio-selected");
            radioInput
              .querySelector("div")
              .classList.remove("w--redirected-checked");
            radioInput.querySelector("input").checked = false;
            radioInput.style.display = "none";
          }
        });
    };
    document
      .querySelectorAll('div#h input[type="radio"]')
      .forEach((inputEl) => inputEl.addEventListener("change", handleBrandSel));
  }
});

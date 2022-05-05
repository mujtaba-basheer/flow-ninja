const formId = "wf-form-Modules-Form";

const resizeCustBtns = () => {
  const moduleGroups = document.querySelectorAll(
    "div.modules-row:not(:first-child)"
  );
  moduleGroups.forEach((moduleGroup) => {
    const numSelected = moduleGroup.querySelectorAll(
      "label.w--redirected-checked"
    ).length;

    if (numSelected === 0)
      moduleGroup.querySelector(
        "div.module-customize-button"
      ).style.gridColumn = "1 / 3";
  });
};

window.addEventListener("load", () => {
  const ls = new LocalStorage();

  let { form_data, results } = ls;
  let modulesSet;
  console.log(JSON.stringify(form_data));

  ls.setBusinessComplexity();
  ls.setBusinessDifficulty();
  ls.setTypology();
  ls.setModules();
  results = ls.results;
  const {
    typology: {
      business_name,
      type: { img_src, gen_txt, desc_txt },
    },
    modules,
  } = results;

  if (form_data.selected_modules)
    modulesSet = new Set(form_data.selected_modules);
  else modulesSet = new Set(modules);

  // setting typology
  document.getElementById(
    "result-heading"
  ).textContent = `${business_name} is the ...`;
  document.getElementById("result-image").src = img_src;
  document.getElementById("archetype-intro").textContent = gen_txt;
  document.getElementById("archetype-body").textContent = desc_txt;

  // modifying modules based on applicability
  const moduleEls = document.querySelectorAll("div.module-wrapper");
  moduleEls.forEach((moduleEl) => {
    const moduleNo = moduleEl.id && Number(moduleEl.id);

    const inputEl = moduleEl.querySelector("input");
    const labelEl = moduleEl.querySelector("label div.w-checkbox-input");

    if (modulesSet.has(moduleNo)) {
      inputEl.checked = true;
      labelEl.classList.add("w--redirected-checked");
      moduleEl.classList.remove("module-inactive");
    } else {
      inputEl.checked = false;
      labelEl.classList.remove("w--redirected-checked");
      moduleEl.classList.add("module-inactive");
      moduleEl.classList.add("module-hidden");
    }
  });

  // increasind width of customize button when no modules are selected
  resizeCustBtns();

  // setting brand-name
  document.querySelector("div.modules-brand-name").textContent = ls.form_data.a;

  // modifying visualizaion tree
  const treeLabels = document.querySelectorAll("div.module-list-item");
  treeLabels.forEach((treeLabel) => {
    const moduleNo = Number(treeLabel.getAttribute("data-module"));
    let opacity = "1.0",
      fontWeight = "600";
    if (!modulesSet.has(moduleNo)) {
      opacity = "0.5";
      fontWeight = "400";
    }
    treeLabel.style.opacity = opacity;
    treeLabel.style.fontWeight = fontWeight;
  });

  // adding event listeners on module selection/removal
  moduleEls.forEach((moduleEl) => {
    const moduleNo = moduleEl.id;
    const treeLeafEl = document.querySelector(
      `div.module-list-item[data-module="${moduleNo}"]`
    );

    const inputEl = moduleEl.querySelector("input");
    inputEl.addEventListener("change", (ev) => {
      let opacity = "0.5",
        fontWeight = "400";
      if (ev.target.checked) {
        opacity = "1.0";
        fontWeight = "600";
      }

      treeLeafEl.style.opacity = opacity;
      treeLeafEl.style.fontWeight = fontWeight;

      resizeCustBtns();
    });
  });

  // handling form submission
  const formEl = document.getElementById(formId);
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    ls.setSelectedModules();

    setTimeout(() => (window.location.pathname = "/contact-details"), 1000);
  });
});

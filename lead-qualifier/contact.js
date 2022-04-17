const formId = "wf-form-Contact-Form";

const fillHiddenFields = (data) => {
  const ids = [
    "COMPANYNAME",
    "COMPANYACTIVITY",
    "COMPANYFOUNDINGYEAR",
    "COMPANYDIGITAL",
    "COMPANYPRODUCT",
  ];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];

    const fieldEl = document.getElementById(id);
    if (fieldEl) {
      fieldEl.value = data[i];
    }
  }
};

const fillModules = (selectedModules = []) => {
  const modulesArray = [
    "",
    "Benchmarking",
    "Logo",
    "Fonts",
    "Colors",
    "Visual DNA",
    "Signature Assets",
    "UX Design",
    "Benchmarking",
    "Naming",
    "Positioning",
    "Story",
    "Personality",
    "Narratives",
    "Tone of Voice",
    "Packaging / Core UI",
    "Image Pool Concept",
    "Website Content",
    "Social Tool Kit",
    "Ads Tool Kit",
    "Key Visuals",
    "Video & Motion Graphics",
    "Research Panel",
    "Lowcode Website",
    "Consumer Insights",
    "Marketing Strategy",
    "Marketing Organisation",
    "Branded Promotion",
    "Social Activation",
    "Brand Partnerships",
    "Performance Campaigns",
    "POS Promotion",
    "PR Campaigns",
    "Special Editions",
    "Influencer Marketing",
    "Audio & Music",
    "Data & Research",
    "Public Relations",
    "Paid Media",
  ];
  const data = {
    "brand-design": [],
    "brand-strategy": [],
    "brand-content": [],
    "3rd-party-services": [],
    "consulting-services": [],
    "brand-activation": [],
    "extended-jvm-services": [],
  };

  for (const module of [...selectedModules]) {
    if (module <= 7) data["brand-design"].push(modulesArray[module]);
    else if (module <= 14) data["brand-strategy"].push(modulesArray[module]);
    else if (module <= 19) data["brand-content"].push(modulesArray[module]);
    else if (module <= 23)
      data["3rd-party-services"].push(modulesArray[module]);
    else if (module <= 26)
      data["consulting-services"].push(modulesArray[module]);
    else if (module <= 33) data["brand-activation"].push(modulesArray[module]);
    else if (module <= 38)
      data["extended-jvm-services"].push(modulesArray[module]);
  }

  for (const key of Object.keys(data)) {
    document.getElementById(key).value =
      data[key].length > 0 ? data[key].join(", ") : "none";
  }
};

window.addEventListener("load", () => {
  const formEl = document.getElementById(formId);

  const ls = new LocalStorage();
  const { form_data } = ls;
  const { a, b, c, l, m } = form_data;
  fillModules(form_data.selected_modules);
  fillHiddenFields([a, c, b, l, m.length > 0 ? m.join(", ") : "none"]);

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();

    ls.clearData();
  });
});

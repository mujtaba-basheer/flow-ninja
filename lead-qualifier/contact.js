const formId = "wf-form-Result-Form";

const fillHiddenFields = (data) => {
  const ids = [
    "COMPANYNAME",
    "FOUNDED",
    "PRODUCTDESCRIPTION",
    "CURRENTSTAGE",
    "MARKETINGPEOPLE",
    "MARKETINGBUDGET",
    "MEDIABUDGET",
    "TARGETGROUP",
    "KEYSTAKEHOLDER",
    "MARKETSIZE",
    "COMPETITIONSTATUS",
    "HOWDIGITAL",
    "COMPANYUSPS",
    "STATUSDESIGN",
    "DESIGNSUPPORT",
    "STATUSSTRATEGY",
    "STRATEGYSUPPORT",
    "PERFORMANCEMARKETING",
    "BRANDMARKETING",
    "MARKETINGSUPPORT",
    "ARCHETYPE",
  ];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];

    const fieldEl = document.getElementById(id);
    if (fieldEl) {
      fieldEl.value = data[i];
    }
  }
};

const difficultyMap = {
  Easy: "S",
  Medium: "M",
  Hard: "L",
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
    BRANDDESIGN: [],
    BRANDSTRATEGY: [],
    BRANDCONTENT: [],
    THIRDPARTYSERVICES: [],
    CONSULTINGSERVICES: [],
    BRANDACTIVATION: [],
    EXTENDEDJVMSERVICES: [],
  };

  for (const module of [...selectedModules]) {
    if (module <= 7) data["BRANDDESIGN"].push(modulesArray[module]);
    else if (module <= 14) data["BRANDSTRATEGY"].push(modulesArray[module]);
    else if (module <= 19) data["BRANDCONTENT"].push(modulesArray[module]);
    else if (module <= 23)
      data["THIRDPARTYSERVICES"].push(modulesArray[module]);
    else if (module <= 26)
      data["CONSULTINGSERVICES"].push(modulesArray[module]);
    else if (module <= 33) data["BRANDACTIVATION"].push(modulesArray[module]);
    else if (module <= 38)
      data["EXTENDEDJVMSERVICES"].push(modulesArray[module]);
  }

  for (const key of Object.keys(data)) {
    document.getElementById(key).value =
      data[key].length > 0 ? data[key].join(", ") : "none";
  }
};

window.addEventListener("load", () => {
  const formEl = document.getElementById(formId);

  const ls = new LocalStorage();
  const {
    form_data,
    results: {
      typology: {
        type: { type_name },
      },
      business_difficulty,
    },
  } = ls;
  const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t } =
    form_data;
  fillModules(form_data.selected_modules);
  fillHiddenFields([
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i.length > 0 ? i.join(", ") : "none",
    j,
    k,
    l,
    m.length > 0 ? m.join(", ") : "none",
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    `${type_name}, ${difficultyMap[business_difficulty]}`,
  ]);

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();

    ls.clearData();
  });
});

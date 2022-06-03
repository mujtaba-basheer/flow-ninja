const test_cases = [
  null,
  {
    a: "Test Company",
    b: 2022,
    c: "Sells cats",
    d: "Launch",
    e: 5,
    f: ">100k",
    g: "< 50k",
    h: "B2B",
    i: ["Press & government", "Investors", "Employers"],
    j: "<2M",
    k: "Earlydays",
    l: "Mostly Digital",
    m: ["Cheap", "Healthy", "Green"],
    n: "Yes",
    o: "Full Rework",
    p: "No",
    q: "Extension",
    r: "Not at all",
    s: "In the past",
    t: "Influencer marketing",
  },
  {
    a: "Hanswurst",
    b: 2000,
    c: "Qwerty",
    d: "Growth",
    e: 3,
    f: "50-100k",
    g: ">100k",
    h: "Both",
    i: ["Larger companies"],
    j: ">20M",
    k: "Competitive",
    l: "Mostly Analogue",
    m: ["Fast", "Cheap", "Green", "Safe"],
    n: "Partially",
    o: "Extension",
    p: "Partially",
    q: "Extension",
    r: "Ongoing",
    s: "Ongoing",
    t: "Build up Inhouse Marketing",
  },
  null,
  null,
  null,
  {
    a: "Wayasana",
    b: 2010,
    c: "Top Secret",
    d: "Growth",
    e: 5,
    f: ">100k",
    g: ">100k",
    h: "B2B",
    i: ["Freelancer or SME's"],
    j: ">20M",
    k: "Earlydays",
    l: "Mostly Analogue",
    m: ["Fast", "Social"],
    n: "Partially",
    o: "Full Rework",
    p: "Yes",
    q: "Extension",
    r: "Not at all",
    s: "Not at all",
    t: "Build up Inhouse Marketing",
  },
  {
    a: "Sybilles",
    b: 2020,
    c: "Sells diamonds",
    d: "Prelaunch",
    e: 10,
    f: "< 50k",
    g: ">100k",
    h: "B2C",
    i: ["Special interest groups"],
    j: "<2M",
    k: "Unsolved",
    l: "Mostly Analogue",
    m: ["Healthy", "Social", "Green", "Safe"],
    n: "No",
    o: "Extension",
    p: "No",
    q: "Extension",
    r: "In the past",
    s: "Not at all",
    t: "Building a website",
  },
];

class LocalStorage {
  constructor(form_data) {
    this.form_data = form_data;
    this.results = {};
  }

  setBusinessComplexity() {
    const form_data = Object.assign({}, this.form_data);
    const results = Object.assign({}, this.results);

    const { h, i } = form_data;

    if (!h || !i || i.length === 0) throw new Error("Insufficient Data!");

    let business_complexity = "Simple";
    switch (h) {
      case "B2C": {
        if (i.length > 1) business_complexity = "Complex";
        break;
      }
      case "B2B": {
        if (i.length > 2) business_complexity = "Complex";
        break;
      }
      case "Both": {
        if (i.length > 0) business_complexity = "Complex";
        break;
      }
    }

    results.business_complexity = business_complexity;
    this.results = results;
  }

  setBusinessDifficulty() {
    const form_data = Object.assign({}, this.form_data);
    const results = Object.assign({}, this.results);

    const { j, k } = form_data;

    if (!j || !k) throw new Error("Insufficient Data!");

    let business_difficulty = "Hard";
    let sum = 0;
    switch (j) {
      case "<2M": {
        sum += 1;
        break;
      }
      case "2M-5M": {
        sum += 2;
        break;
      }
      case "5M-20M": {
        sum += 3;
        break;
      }
      case ">20M": {
        sum += 4;
        break;
      }
    }
    switch (k) {
      case "Unsolved": {
        sum += 4;
        break;
      }
      case "Earlydays": {
        sum += 3;
        break;
      }
      case "Competitive": {
        sum += 2;
        break;
      }
      case "Overcrowded": {
        sum += 1;
        break;
      }
    }

    if (sum > 4 && sum < 7) business_difficulty = "Medium";
    else if (sum >= 7) business_difficulty = "Easy";

    results.business_difficulty = business_difficulty;
    this.results = results;
  }

  setTypology() {
    const form_data = Object.assign({}, this.form_data);
    const results = Object.assign({}, this.results);

    const { a, d, h } = form_data;
    const { business_difficulty } = results;

    if (!a || !d || !h) throw new Error("Insufficient Data!");

    const typology = {
      business_name: a,
      type: null,
    };
    const phaseMap = {
      Prelaunch: 1,
      Launch: 2,
      Growth: 3,
      Expansion: 4,
    };
    const phase = phaseMap[d];
    let type = 1;

    if (!phase) throw new Error("Invalid Phase!");

    switch (h) {
      case "B2C": {
        type = phase < 3 ? 0 : 1;
        break;
      }
      case "B2B": {
        type = phase < 3 ? 2 : 3;
        break;
      }
      case "Both": {
        type = 4;
        break;
      }
      default: {
        break;
      }
    }

    const typeArray = [
      {
        type_name: "NEW KID",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebeac7b7e11fd5d6b76_New%20Kid.svg",
        gen_txt: `New kids need to build their brand, while finding a product market fit. Therefore, branding needs to be kept at a minimum, in order to stay flexible.`,
        desc_txt: {
          Hard: `From a strategic perspective the market seems to be challenging. Branding will therefore play a vital role in withstanding the competition.`,
          Easy: `From a strategic perspective the market seems to be rather kind, which means that you have the chance to become a category-defining brand.`,
          Medium: `From a strategic perspective the market seems to be challenging, which is why you should also differentiate yourself on a brand level.`,
        },
      },
      {
        type_name: "TRENDSETTER",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebe495e4d8783021732_Trendsetter.svg",
        gen_txt: `Trendsetters are already confident with their product, but struggle to leave an impression. Creative marketing is the ideal boost.`,
        desc_txt: {
          Hard: `From a strategic perspective the market seems to be challenging, which means that branding will play a vital role to become and/or stay one of the leading players.`,
          Easy: `From a strategic perspective the market is rather kind, which means that you still have the chance to become a category-defining brand.`,
          Medium: `From a strategic perspective the market seems to be challenging, which means that you have to differentiate yourself more than usual on a brand level.`,
        },
      },
      {
        type_name: "SMART ASS",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebee08cc4ea7125cd1e_Smart%20Ass.svg",
        gen_txt: `Smart asses found a market that they can win. The problem often lies in finding the right story and measures that effectively address decision makers.`,
        desc_txt: {
          Hard: `From a strategic perspective the market seems to be challenging. Branding will therefore play a vital role in withstanding the competition.`,
          Easy: `From a strategic perspective the market is rather kind, which means that you still have the chance to become a category-defining brand.`,
          Medium: `From a strategic perspective the market seems to be challenging, which means that you have to differentiate yourself more than usual on a brand level.`,
        },
      },
      {
        type_name: "KICK ASS",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebee37c739d71334e83_Kick%20Ass.svg",
        gen_txt: `Kick asses are already very successful. They have a product that sells itself. Nearly. In order to grow and break through the glass ceiling, a strong brand will help.`,
        desc_txt: {
          Hard: `From a strategic perspective the market seems to be challenging, which means that branding will play a vital role to become and/or stay one of the leading players.`,
          Easy: `From a strategic perspective the market is rather kind, which means that you still have the chance to become a category-defining brand.`,
          Medium: `From a strategic perspective the market seems to be challenging, which means that you have to differentiate yourself more than usual on a brand level.`,
        },
      },
      {
        type_name: "HYBRID",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209eb524c0603f48ccca5a_Hybrid.svg",
        gen_txt: `Hybrids have a complex business model. This means they have to tell numerous stories simultaneously, to different stakeholder. This can be confusing. A strong brand can provide common ground for a holistic approach.`,
        desc_txt: {
          Hard: `From a strategic perspective the market seems to be challenging, which means that branding will play a vital role to become and/or stay one of the leading players.`,
          Easy: `From a strategic perspective the market is rather kind, which means that becoming a category-defining brand should be your objective now.`,
          Medium: `From a strategic perspective the market seems to be challenging, which means that you have to differentiate yourself more than usual on a brand level in order to convince your heterogenous audience.`,
        },
      },
    ];

    typology.type = {
      ...typeArray[type],
      desc_txt: typeArray[type].desc_txt[business_difficulty],
    };

    results.typology = typology;
    this.results = results;
  }

  setModules() {
    const form_data = Object.assign({}, this.form_data);
    const results = Object.assign({}, this.results);

    const { f, g, h, n, o, p, q, r, s, t } = form_data;
    const { business_complexity } = results;

    if (
      !(f && g && h && n && o && p && q && r && s && t && business_complexity)
    )
      throw new Error("Insufficient Data!");

    const modules = new Set();

    switch (n) {
      case "No": {
        modules.add(1);
        modules.add(2);
        modules.add(3);
        modules.add(4);
        modules.add(5);
        break;
      }
      case "Partially": {
        if (f === ">100k" || f === "50-100k") {
          modules.add(1);
          modules.add(5);
          modules.add(6);
        }
        break;
      }
    }

    switch (o) {
      case "Extension": {
        modules.add(1);
        modules.add(5);
        modules.add(6);
        break;
      }
      case "Full Rework": {
        modules.add(1);
        modules.add(2);
        modules.add(3);
        modules.add(4);
        modules.add(5);
        switch (f) {
          case "< 50k": {
            break;
          }
          default: {
            modules.add(16);
            modules.add(20);
            break;
          }
        }
        break;
      }
      case "No": {
        if (f === "< 50k") {
          modules.delete(1);
          modules.delete(2);
          modules.delete(3);
          modules.delete(4);
          modules.delete(5);
          modules.delete(6);
        }
        break;
      }
      default: {
        break;
      }
    }

    if (p === "No" || p === "Partially") {
      modules.add(8);
      modules.add(10);
      modules.add(11);

      const complexity_budget_Map = {
        Simple: {
          "< 50k": "A",
          "50-100k": "A",
          ">100k": "C",
        },
        Complex: {
          "< 50k": "A",
          "50-100k": "B",
          ">100k": "D",
        },
      };

      switch (complexity_budget_Map[business_complexity][f]) {
        case "A": {
          break;
        }
        case "B":
        case "C": {
          modules.add(13);
          break;
        }
        case "D": {
          modules.add(12);
          modules.add(13);
          break;
        }
      }
    }

    switch (q) {
      case "Extension": {
        modules.add(8);
        modules.add(11);
        modules.add(12);
        break;
      }
      case "Full Rework": {
        modules.add(8);
        modules.add(10);
        modules.add(11);
        switch (f) {
          case "< 50k": {
            break;
          }
          default: {
            modules.add(12);
            modules.add(13);
            break;
          }
        }
        break;
      }
      case "No": {
        if (f === "< 50k") {
          modules.delete(8);
          modules.delete(10);
          modules.delete(11);
          modules.delete(12);
          modules.delete(13);
        }
        break;
      }
      default: {
        break;
      }
    }

    if (r !== "Ongoing") {
      switch (h) {
        case "B2B": {
          break;
        }
        default: {
          if (f === "50-100k") {
            modules.add(19);
            switch (g) {
              case "< 50k": {
                break;
              }
              default: {
                modules.add(37);
                break;
              }
            }
          }
          break;
        }
      }
    }

    if (s !== "Ongoing") {
      if (f === ">100k") {
        switch (h) {
          case "B2B": {
            modules.add(31);
            break;
          }
          default: {
            modules.add(26);
            break;
          }
        }
      }
    }

    switch (t) {
      case "Enable social media toolkit in house": {
        if (f !== "< 50k") {
          modules.add(18);
        }
        break;
      }
      case "Enable performance ad toolkit in house": {
        if (f !== "< 50k") {
          modules.add(19);
        }
        break;
      }
      case "PR content strategy & support": {
        switch (f) {
          case "50-100k": {
            modules.add(25);
            break;
          }
          case ">100k": {
            modules.add(31);
            modules.add(36);
            break;
          }
        }
        break;
      }
      case "Promotional campaigning": {
        if (f !== "< 50k") {
          modules.add(30);
        }
        break;
      }
      case "Brand campaigning": {
        if (f !== "< 50k") {
          modules.add(26);
        }
        break;
      }
      case "Content marketing": {
        if (f !== "< 50k") {
          modules.add(27);
        }
        break;
      }
      case "Influencer marketing": {
        if (f !== "< 50k") {
          modules.add(34);
        }
        break;
      }
      case "Build up Inhouse Marketing": {
        if (f !== "< 50k") {
          modules.add(26);
        }
        break;
      }
      case "Consumer Insight": {
        switch (f) {
          case "50-100k": {
            modules.add(24);
            break;
          }
          case ">100k": {
            modules.add(22);
            break;
          }
        }
        break;
      }
      case "Building a website": {
        switch (f) {
          case "50-100k": {
            modules.add(23);
            break;
          }
          case ">100k": {
            modules.add(17);
            modules.add(23);
            break;
          }
        }
        break;
      }
    }

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
    for (const module of [...modules]) {
      if (module <= 7)
        data["brand-design"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 14)
        data["brand-strategy"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 19)
        data["brand-content"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 23)
        data["3rd-party-services"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 26)
        data["consulting-services"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 33)
        data["brand-activation"].push(`${modulesArray[module]} (${module})`);
      else if (module <= 38)
        data["extended-jvm-services"].push(
          `${modulesArray[module]} (${module})`
        );
    }

    results.modules = data;
    this.results = results;
  }
}

const ls = new LocalStorage(test_cases[6]);

ls.setBusinessComplexity();
ls.setBusinessDifficulty();
ls.setTypology();
ls.setModules();

console.log(JSON.stringify(ls.results));
console.log(JSON.stringify(ls.form_data));

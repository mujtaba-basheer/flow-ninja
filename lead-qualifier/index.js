class LocalStorage {
  constructor() {
    this.form_data = JSON.parse(sessionStorage.getItem("form_data") || "{}");
    this.results = JSON.parse(sessionStorage.getItem("results") || "{}");
  }

  wait(time) {
    return new Promise((res) => {
      setTimeout(() => res(null), time);
    });
  }

  confirmStorage(key, value) {
    return new Promise(async (resolve) => {
      while (true) {
        const item =
          sessionStorage.getItem(key) &&
          JSON.parse(sessionStorage.getItem(key));
        if (item) {
          let flag = true;
          for (const k1 of Object.keys(value)) {
            if (!item[k1]) {
              flag = false;
              break;
            }
          }
          if (flag) resolve(true);
        }
        await this.wait(100);
      }
    });
  }

  clearData() {
    this.form_data = {};
    this.results = {};

    sessionStorage.removeItem("form_data");
    sessionStorage.removeItem("results");
  }

  async setFormData(formDesc = []) {
    const form_data = Object.assign({}, this.form_data);

    for (const formD of formDesc) {
      const { id, type } = formD;
      const inputDiv = document.getElementById(id);

      switch (type) {
        case "sltext": {
          const inputEl = inputDiv.querySelector("input.input");
          form_data[id] = inputEl.value;
          break;
        }
        case "mltext": {
          const inputEl = inputDiv.querySelector("textarea.text-area");
          form_data[id] = inputEl.value;
          break;
        }
        case "number": {
          const inputEl = inputDiv.querySelector("input.input");
          form_data[id] = inputEl.valueAsNumber;
          break;
        }
        case "radio": {
          const inputEl = inputDiv.querySelector(
            'label.radio-selected input[type="radio"]'
          );
          form_data[id] = inputEl.value;
          break;
        }
        case "checkbox": {
          const inputEls = inputDiv.querySelectorAll(
            'label.radio-selected input[type="checkbox"]'
          );
          const values = [];
          for (const inputEl of inputEls) {
            values.push(inputEl.getAttribute("data-name"));
          }
          form_data[id] = values;
          break;
        }
        default: {
          break;
        }
      }
    }

    this.form_data = form_data;
    sessionStorage.setItem("form_data", JSON.stringify(form_data));
    await this.confirmStorage("form_data", form_data);
  }

  fillForm(formDesc = []) {
    const form_data = Object.assign({}, this.form_data);

    for (const formEl of formDesc) {
      const { id, type } = formEl;
      if (form_data[id]) {
        const inputDiv = document.getElementById(id);

        switch (type) {
          case "sltext": {
            const inputEl = inputDiv.querySelector("input.input");
            inputEl.value = form_data[id];
            break;
          }
          case "mltext": {
            const inputEl = inputDiv.querySelector("textarea.text-area");
            inputEl.value = form_data[id];
            break;
          }
          case "number": {
            const inputEl = inputDiv.querySelector("input.input");
            inputEl.value = form_data[id];
            break;
          }
          case "radio": {
            const inputEl = inputDiv.querySelector(
              `label input[type="radio"][value="${form_data[id]}"]`
            );
            inputEl.checked = true;

            const parentEl = inputEl.parentElement;
            parentEl.classList.add("radio-selected");

            const divEl = parentEl.querySelector("div");
            divEl.classList.add("w--redirected-checked");

            break;
          }
          case "checkbox": {
            const values = form_data[id];
            for (const value of values) {
              const inputEl = inputDiv.querySelector(
                `input[type="checkbox"][data-name="${value}"]`
              );
              inputEl.checked = true;

              const parentEl = inputEl.parentElement;
              parentEl.classList.add("radio-selected");

              const divEl = parentEl.querySelector("div");
              divEl.classList.add("w--redirected-checked");
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }

  valiateForm(formDesc) {
    let flag = true;
    const errEls = [];
    for (const formD of formDesc) {
      const { id, type, required } = formD;
      let loc_flag = true;

      if (!required) continue;

      const inputDiv = document.getElementById(id);

      switch (type) {
        case "sltext": {
          const inputEl = inputDiv.querySelector("input.input");
          if (!inputEl.value) loc_flag = flag = false;
          break;
        }
        case "mltext": {
          const inputEl = inputDiv.querySelector("textarea.text-area");
          if (!inputEl.value) loc_flag = flag = false;
          break;
        }
        case "number": {
          const inputEl = inputDiv.querySelector("input.input");
          if (!inputEl.value) loc_flag = flag = false;
          break;
        }
        case "radio": {
          const inputEl = inputDiv.querySelector(
            'label.radio-selected input[type="radio"]'
          );
          if (!inputEl) loc_flag = flag = false;
          break;
        }
        case "checkbox": {
          const inputEls = inputDiv.querySelectorAll(
            'label.radio-selected input[type="checkbox"]'
          );
          if (inputEls.length === 0) loc_flag = flag = false;
          break;
        }
        default: {
          break;
        }
      }

      if (!loc_flag) errEls.push(inputDiv);
    }

    if (errEls.length > 0) console.log(errEls);
    return flag;
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
        if (i.length === 11) business_complexity = "Complex";
        break;
      }
    }

    results.business_complexity = business_complexity;
    this.results = results;
    sessionStorage.setItem("results", JSON.stringify(results));
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
    sessionStorage.setItem("results", JSON.stringify(results));
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
        gen_txt: `New kids need to build their brand, while they are still finding product market fit. Therefore branding needs to stick to a minimum, in order to stay flexibel.`,
        desc_txt: {
          Hard: `From a marketing perspective the marktet seems to be rather hard, which means that, branding will play an important role to withstand the competition.`,
          Easy: `From a marketing perspective the market seems to be rather kind, which means, that you have the chance to become a category defining brand.`,
          Medium: `From a marketing perspective the marktet seems to be not easy, which means that you have to differentiate yourself also on a brand level.`,
        },
      },
      {
        type_name: "TRENDSETTER",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebe495e4d8783021732_Trendsetter.svg",
        gen_txt: `Trendsetters are already confident with their product, but still struggle in climbing up the hype cycle. Creative marketing can give a boost for this.`,
        desc_txt: {
          Hard: `From a marketing perspective the marktet seems to be rather hard, which means that, branding will play an important role to become and/or stay one of the leading players.`,
          Easy: `From a marketing perspective the market seems to be rather kind, which means, that you still have the chance to become a category defining brand.`,
          Medium: `From a marketing perspective the marktet seems to be not easy, which means that you have to differentiate yourself more than before on a brand level.`,
        },
      },
      {
        type_name: "SMART ASS",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebee08cc4ea7125cd1e_Smart%20Ass.svg",
        gen_txt: `Smart asses found a market, that they can win. The problem often lies in finding the right selling story and measures, that effectivly adress decision makers.`,
        desc_txt: {
          Hard: `The market seems to be very difficult from a marketing perspective, therefore branding will play a vital in withstanding the competition.`,
          Easy: `From a marketing perspective the market seems to be rather kind, which means, that you have the chance to become a category defining brand.`,
          Medium: `From a marketing perspective the marktet seems to be not easy, which means that you have to differentiate yourself also on a brand level.`,
        },
      },
      {
        type_name: "KICK ASS",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209ebee37c739d71334e83_Kick%20Ass.svg",
        gen_txt: `Kick asses are already very successful. They have product that nearly sells by it self. Nearly. In order to grow through the glass sealing a strong brand can help.`,
        desc_txt: {
          Hard: `From a marketing perspective the marktet seems to be rather hard, which means that, branding will play an important role to become and/or stay one of the leading players`,
          Easy: `From a marketing perspective the market seems to be rather kind, which means, that you still have the chance to become a category defining brand.`,
          Medium: `From a marketing perspective the marktet seems to be not easy, which means that you have to differentiate yourself more then before on a brand level.`,
        },
      },
      {
        type_name: "HYBRID",
        img_src:
          "https://uploads-ssl.webflow.com/61e5a19a1262b42867b82528/62209eb524c0603f48ccca5a_Hybrid.svg",
        gen_txt: `Hybrids have found a comlpex business model, that means very different things for each of the stakeholders. When telling different stories at the same time, brand provides the common ground, that keeps it all together.`,
        desc_txt: {
          Hard: `From a marketing perspective the marktet seems to be rather hard, which means that, branding will play an important role to become and/or stay one of the leading players.`,
          Easy: `From a marketing perspective the market seems to be rather kind, which means, that becoming a category defining brand should be your objective now.`,
          Medium: `From a marketing perspective the marktet seems to be not easy, which means that you have to differentiate yourself also through branding, in order to convince your heterogenous audience.`,
        },
      },
    ];

    typology.type = {
      ...typeArray[type],
      desc_txt: typeArray[type].desc_txt[business_difficulty],
      gen_txt: typeArray[type].gen_txt,
    };

    results.typology = typology;
    this.results = results;
    sessionStorage.setItem("results", JSON.stringify(results));
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
        if (f === "< 50k" || f === "50-100k") {
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

    results.modules = [...modules];
    this.results = results;
    sessionStorage.setItem("results", JSON.stringify(results));
  }

  setSelectedModules() {
    const form_data = Object.assign({}, this.form_data);

    const selected_modules = [];

    const moduleEls = document.querySelectorAll("div.module-wrapper");
    moduleEls.forEach((moduleEl) => {
      const inputEl = moduleEl.querySelector("input");
      if (inputEl && inputEl.checked)
        selected_modules.push(Number(moduleEl.id && Number(moduleEl.id)));
    });

    form_data.selected_modules = selected_modules;
    this.form_data = form_data;
    sessionStorage.setItem("form_data", JSON.stringify(form_data));
  }
}

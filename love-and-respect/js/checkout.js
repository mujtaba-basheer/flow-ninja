window.addEventListener("load", () => {
  const state = {
    sections: [
      {
        selector: "email",
        fields: [
          {
            id: "email",
            type: "email",
          },
        ],
        isValid: false,
        formId: "your-email-block",
      },
      {
        selector: "address",
        fields: [
          {
            id: "full-name",
          },
          {
            id: "address",
          },
          {
            id: "city",
          },
          {
            id: "zip",
          },
        ],
        isValid: false,
        formId: "your-email-block",
      },
      {
        selector: "payments",
        conditionCheck: "use-shipping-address-target",
        fields: [
          {
            id: "billing-full-name",
          },
          {
            id: "billing-address",
          },
          {
            id: "billing-city",
          },
          {
            id: "billing-zip",
          },
        ],
        isValid: false,
      },
      {
        selector: "review-and-purchase",
        conditionCheck: "use-shipping-address-target",
        fields: [],
        isValid: false,
      },
    ],
  };

  const validateSection = (index) => {
    console.log(`validateSection: ${index}`);
    const section = state.sections[index];
    let doValidate = true,
      isValid = true;
    if (section.conditionCheck) {
      const checkEl = document.getElementById(section.conditionCheck);
      doValidate = !checkEl.checked;
    }
    if (doValidate) {
      for (const field of section.fields) {
        let isFieldValid = true;
        const inputEl = document.getElementById(field.id);
        const value = inputEl.value;
        if (field.type === "email") {
          const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          isFieldValid = re.test(value);
          isValid = isValid && isFieldValid;
        } else {
          isFieldValid = value.length > 0;
          isValid = isValid && isFieldValid;
        }

        if (!isFieldValid) {
          inputEl.classList.add("invalid");
          inputEl.style.outline = "1px solid red";
        } else {
          inputEl.classList.remove("invalid");
          inputEl.style.outline = "none";
        }
      }
    }

    section.isValid = isValid;
    return isValid;
  };

  const handleEditClick = (index) => {
    console.log(`handleEditClick: ${index}`);
    for (let i = 0; i < state.sections.length; i++) {
      const section = state.sections[i];
      const sectionEl = document.querySelector(
        `div.checkout-content-block.${section.selector}`
      );

      sectionEl
        .querySelector(".checkout-dropdown-list")
        .classList.add("closed");
      if (section.isValid && i !== 3) {
        sectionEl
          .querySelector(".checkout-text-only-wrap")
          .classList.remove("closed");
      }
    }

    const currentSection = state.sections[index];
    const currentSectionEl = document.querySelector(
      `div.checkout-content-block.${currentSection.selector}`
    );
    currentSectionEl
      .querySelector(".checkout-dropdown-list")
      .classList.remove("closed");
    currentSectionEl
      .querySelector(".checkout-text-only-wrap")
      .classList.add("closed");
  };

  const handleContinueClick = (index) => {
    console.log(`handleContinueClick: ${index}`);
    const isSectionValid = validateSection(index);
    if (isSectionValid) {
      const currentSection = state.sections[index];
      const currentSectionEl = document.querySelector(
        `div.checkout-content-block.${currentSection.selector}`
      );
      currentSectionEl
        .querySelector(".checkout-dropdown-list")
        .classList.add("closed");
      currentSectionEl
        .querySelector(".checkout-text-only-wrap")
        .classList.remove("closed");

      for (let i = index + 1; i < state.sections.length; i++) {
        const section = state.sections[i];
        if (!section.isValid) {
          const sectionEl = document.querySelector(
            `div.checkout-content-block.${section.selector}`
          );

          sectionEl
            .querySelector(".checkout-dropdown-list")
            .classList.remove("closed");
          if (i !== 3) {
            sectionEl
              .querySelector(".checkout-text-only-wrap")
              .classList.add("closed");
          }

          break;
        }
      }
    }
  };

  for (let i = 0; i < state.sections.length; i++) {
    const section = state.sections[i];
    const sectionEl = document.querySelector(
      `div.checkout-content-block.${section.selector}`
    );
    if (sectionEl) {
      const editBtn = sectionEl.querySelector("div.edit-checkout-text");
      const continueBtn = sectionEl.querySelector("div.checkout-button");

      if (editBtn) editBtn.addEventListener("click", () => handleEditClick(i));
      if (continueBtn)
        continueBtn.addEventListener("click", () => handleContinueClick(i));
    }
  }
});

// export {};

type FormState = {
  [id: string]: {
    onComplete?: (any?: any) => void;
  };
};
// @ts-ignore
declare global {
  interface Window {
    formState: FormState;
  }
}

// @ts-ignore
window.formState = window.formState || {};

window.addEventListener("load", () => {
  const formEls = document.querySelectorAll<HTMLFormElement>(
    `form[form-validation="true"]`
  );

  const state: boolean[] = new Array(formEls.length);

  const isInViewport: (element: Element) => boolean = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const validateForm = (
    formEl: HTMLFormElement,
    index: number,
    onSubmit?: boolean
  ) => {
    state[index] = true;

    formEl
      .querySelector(`input[type="submit"]`)
      ?.classList?.remove("filled-form");

    // managing input fields
    const inputFields = formEl.querySelectorAll<HTMLInputElement>(
      `input.w-input:not([type="submit"])`
    );
    for (const inputField of inputFields) {
      let flag = true;

      // TODO: Remove this temp. hack
      if (inputField.id === "Country") continue;

      if (
        inputField.hasAttribute("required") &&
        inputField.getAttribute("required") !== "false" &&
        !inputField.value
      ) {
        flag = false;
        state[index] = false;
        if (!onSubmit) return;
      }

      // handling email inputs
      if (flag && inputField.type === "email") {
        const re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        flag = re.test(inputField.value);

        const isBusiness = inputField.getAttribute("business");
        const exlcude = inputField.getAttribute("exclude");
        if (isBusiness === "true" && exlcude) {
          const toExlcude = exlcude.split(",").map((e) => "@" + e.trim());
          for (const end of toExlcude) {
            flag = !inputField.value.endsWith(end);
            if (!flag) break;
          }
        }
      }

      // handling tel/mobile inputs
      if (flag && inputField.type === "tel") {
        const re1 = /^(\+|)[0-9][-0-9\s]*[0-9]$/g;
        const re2 = /^(\+)[0-9]+$/g;
        flag = re1.test(inputField.value) || re2.test(inputField.value);
      }
      // console.log({ flag, el: inputField });

      // handling patterns
      let inputPattern = inputField.getAttribute("data-pattern");
      if (flag && inputPattern) {
        flag = inputField.value.startsWith(inputPattern);
      }

      // handling native regex pattern
      if (flag) {
        flag = inputField.checkValidity();
      }

      inputPattern = inputField.getAttribute("pattern");
      if (flag && inputPattern) {
        const re = new RegExp(inputPattern);
        flag = re.test(inputField.value);
      }

      if (!flag) {
        state[index] = false;
        if (!onSubmit) return;
      }

      // changing UI as per validation result
      const errorEl = formEl.querySelector(
        `div[error-label="${inputField.id}"]`
      );
      if (flag) {
        inputField.classList.remove("error");
        if (errorEl) {
          errorEl.classList.remove("error-active");
          errorEl.classList.add("no-error");
        }
      } else {
        inputField.classList.add("error");
        if (errorEl) {
          errorEl.classList.add("error-active");
          errorEl.classList.remove("no-error");
        }
      }
    }

    // managing select dropdowns
    const selectFields =
      formEl.querySelectorAll<HTMLSelectElement>("select.w-select");
    for (const selectField of selectFields) {
      const nextEl = selectField.nextElementSibling;
      if (nextEl) {
        if (nextEl.classList.contains("nice-select")) {
          let flag = true;
          if (
            selectField.hasAttribute("required") &&
            selectField.getAttribute("required") !== "false" &&
            !selectField.value
          ) {
            flag = false;
          }

          if (!flag) {
            state[index] = false;
            if (!onSubmit) return;
          }

          // changing UI as per validation result
          const errorEl = nextEl.nextElementSibling;
          if (flag) {
            nextEl.classList.remove("error");
            nextEl.classList.add("selected");
            if (errorEl) {
              errorEl.classList.remove("error-active");
              errorEl.classList.add("no-error");
            }
          } else {
            nextEl.classList.add("error");
            nextEl.classList.remove("selected");
            if (errorEl) {
              errorEl.classList.add("error-active");
              errorEl.classList.remove("no-error");
            }
          }
        } else {
          let flag = true;
          if (
            selectField.hasAttribute("required") &&
            selectField.getAttribute("required") !== "false" &&
            !selectField.value
          ) {
            flag = false;
          }

          if (!flag) {
            state[index] = false;
            if (!onSubmit) return;
          }

          // changing UI as per validation result
          const errorEl = nextEl;
          if (flag) {
            selectField.classList.remove("error");
            selectField.classList.add("selected");
            errorEl.classList.remove("error-active");
            errorEl.classList.add("no-error");
          } else {
            selectField.classList.add("error");
            selectField.classList.remove("selected");
            errorEl.classList.add("error-active");
            errorEl.classList.remove("no-error");
          }
        }
      }
    }

    // managing radio buttons
    const radioGrps = formEl.querySelectorAll("div.radio-wrapper");
    for (const radioGrp of radioGrps) {
      let flag = false;

      const radioBtns =
        radioGrp.querySelectorAll<HTMLInputElement>(`input[type="radio"]`);
      for (const radioBtn of radioBtns) {
        if (radioBtn.checked) flag = true;
      }

      if (!flag) {
        state[index] = false;
        if (!onSubmit) return;
      }

      // changing UI as per validation result
      const errorEl = radioGrp.querySelector(
        `div[error-label="${radioGrp.id}"]`
      );
      if (flag) {
        radioBtns.forEach((radioBtn) => radioBtn.classList.remove("error"));
        if (errorEl) {
          errorEl.classList.remove("error-active");
          errorEl.classList.add("no-error");
        }
      } else {
        radioBtns.forEach((radioBtn) => radioBtn.classList.add("error"));
        if (errorEl) {
          errorEl.classList.add("error-active");
          errorEl.classList.remove("no-error");
        }
      }
    }

    // managing checkboxes
    const checkboxEls = formEl.querySelectorAll<HTMLInputElement>(
      `div.checkbox-wrapper input[type="checkbox"]`
    );
    for (const checkboxEl of checkboxEls) {
      let flag = true;

      if (
        checkboxEl.hasAttribute("required") &&
        checkboxEl.getAttribute("required") !== "false" &&
        !checkboxEl.checked
      ) {
        flag = false;
      }

      if (!flag) {
        state[index] = false;
        if (!onSubmit) return;
      }

      // changing UI as per validation result
      const errorEl = checkboxEl?.parentElement?.nextElementSibling;
      if (flag) {
        checkboxEl.classList.remove("error");
        if (errorEl) {
          errorEl.classList.remove("error-active");
          errorEl.classList.add("no-error");
        }
      } else {
        checkboxEl.classList.add("error");
        if (errorEl) {
          errorEl.classList.add("error-active");
          errorEl.classList.remove("no-error");
        }
      }
    }

    // managing textareas
    const textAreas =
      formEl.querySelectorAll<HTMLInputElement>("textarea.w-input");
    for (const textArea of textAreas) {
      let flag = true;
      if (
        textArea.hasAttribute("required") &&
        textArea.getAttribute("required") !== "false" &&
        !textArea.value
      ) {
        flag = false;
      }

      if (!flag) {
        state[index] = false;
        if (!onSubmit) return;
      }

      // changing UI as per validation result
      const errorEl = formEl.querySelector(`div[error-label="${textArea.id}"]`);
      if (flag) {
        textArea.classList.remove("error");
        if (errorEl?.getAttribute("error-label") === "message") {
          errorEl.classList.remove("error-active");
          errorEl.classList.add("no-error");
        }
      } else {
        textArea.classList.add("error");
        if (errorEl?.getAttribute("error-label") === "message") {
          errorEl.classList.add("error-active");
          errorEl.classList.remove("no-error");
        }
      }
    }

    formEl
      .querySelector(`input[type="submit"]`)
      ?.classList?.[state[index] ? "add" : "remove"]("filled-form");
    formEl.querySelector(`input[type="submit"]`)?.classList?.remove("no-error");
  };

  for (let i = 0; i < formEls.length; i++) {
    const formEl = formEls[i];
    // formEl.reset();
    state[i] = false;

    // removing HTML tooltips
    formEl.setAttribute("novalidate", "");
    const formId: string = formEl.id;

    // managing input fields
    const inputFields = formEl.querySelectorAll<HTMLInputElement>(
      `input.w-input:not([type="submit"])`
    );
    for (const inputField of inputFields) {
      const inputValidator = () => {
        // console.log("here: inputValidator");

        let flag = true;
        if (
          inputField.hasAttribute("required") &&
          inputField.getAttribute("required") !== "false" &&
          !inputField.value
        ) {
          flag = false;
        }

        // handling email inputs
        if (flag && inputField.type === "email") {
          const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
          flag = re.test(inputField.value);

          const isBusiness = inputField.getAttribute("business");
          const exlcude = inputField.getAttribute("exclude");
          if (isBusiness === "true" && exlcude) {
            const toExlcude = exlcude.split(",").map((e) => "@" + e.trim());
            for (const end of toExlcude) {
              flag = !inputField.value.endsWith(end);
              if (!flag) break;
            }
          }
        }

        // handling tel/mobile inputs
        if (flag && inputField.type === "tel") {
          const re = /^(\+|)[0-9][-0-9\s]*[0-9]$/g;
          flag = re.test(inputField.value);
        }

        // handling patterns
        const inputPattern = inputField.getAttribute("data-pattern");
        if (flag && inputPattern) {
          flag = inputField.value.startsWith(inputPattern);
        }

        // handling native regex pattern
        if (flag) {
          flag = inputField.checkValidity();
        }

        // changing UI as per validation result
        const errorEl = formEl.querySelector(
          `div[error-label="${inputField.id}"]`
        );
        // console.log("here", { flag, errorEl });
        if (flag) {
          inputField.classList.remove("error");
          if (errorEl) {
            errorEl.classList.remove("error-active");
            errorEl.classList.add("no-error");
          }
        } else {
          inputField.classList.add("error");
          if (errorEl) {
            errorEl.classList.add("error-active");
            errorEl.classList.remove("no-error");
          }
        }

        validateForm(formEl, i);
      };
      const checkingStrategy = inputField.getAttribute("trigger");
      if (checkingStrategy) {
        inputField.addEventListener("focusin", () => {
          const errorEl = formEl.querySelector(
            `div[error-label="${inputField.id}"]`
          );
          inputField.classList.remove("error");
          if (errorEl) {
            errorEl.classList.remove("error-active");
            errorEl.classList.add("no-error");
          }
        });
      }
      inputField.addEventListener(checkingStrategy || "input", inputValidator);
    }

    // managing select dropdowns
    const selectFields =
      formEl.querySelectorAll<HTMLSelectElement>("select.w-select");
    for (const selectField of selectFields) {
      const nextEl = selectField.nextElementSibling;
      if (nextEl) {
        if (nextEl.classList.contains("nice-select")) {
          $(selectField).on("change", function () {
            let flag = true;
            if (
              selectField.hasAttribute("required") &&
              selectField.getAttribute("required") !== "false" &&
              !selectField.value
            ) {
              flag = false;
            }

            // changing UI as per validation result
            const errorEl = nextEl.nextElementSibling;
            if (flag) {
              nextEl.classList.remove("error");
              nextEl.classList.add("selected");
              if (errorEl) {
                errorEl.classList.remove("error-active");
                errorEl.classList.add("no-error");
              }
            } else {
              nextEl.classList.add("error");
              nextEl.classList.remove("selected");
              if (errorEl) {
                errorEl.classList.add("error-active");
                errorEl.classList.remove("no-error");
              }
            }

            validateForm(formEl, i);
          });
        } else {
          selectField.addEventListener("change", () => {
            let flag = true;
            if (
              selectField.hasAttribute("required") &&
              selectField.getAttribute("required") !== "false" &&
              !selectField.value
            ) {
              flag = false;
            }

            // changing UI as per validation result
            const errorEl = nextEl;
            if (flag) {
              selectField.classList.remove("error");
              selectField.classList.add("selected");
              errorEl.classList.remove("error-active");
              errorEl.classList.add("no-error");
            } else {
              selectField.classList.add("error");
              selectField.classList.remove("selected");
              errorEl.classList.add("error-active");
              errorEl.classList.remove("no-error");
            }

            validateForm(formEl, i);
          });
        }
      }
    }

    // managing radio buttons
    const radioGrps = formEl.querySelectorAll("div.radio-wrapper");
    for (const radioGrp of radioGrps) {
      const radioBtns =
        radioGrp.querySelectorAll<HTMLInputElement>(`input[type="radio"]`);
      for (const radioBtn of radioBtns) {
        radioBtn.addEventListener("change", () => {
          if (radioBtn.checked) {
            const errorEl = radioGrp.querySelector(
              `div[error-label="${radioGrp.id}"]`
            );
            if (errorEl) {
              errorEl.classList.remove("error-active");
              errorEl.classList.add("no-error");
            }
            radioBtns.forEach((radioBtn) => radioBtn.classList.remove("error"));
          }

          validateForm(formEl, i);
        });
      }
    }

    // managing checkboxes
    const checkboxEls = document.querySelectorAll<HTMLInputElement>(
      `div.checkbox-wrapper input[type="checkbox"]`
    );
    for (const checkboxEl of checkboxEls) {
      checkboxEl.addEventListener("change", () => {
        let flag = true;

        if (
          checkboxEl.hasAttribute("required") &&
          checkboxEl.getAttribute("required") !== "false" &&
          !checkboxEl.checked
        ) {
          flag = false;
        }

        // changing UI as per validation result
        const errorEl = checkboxEl?.parentElement?.nextElementSibling;
        if (flag) {
          checkboxEl.classList.remove("error");
          if (errorEl) {
            errorEl.classList.remove("error-active");
            errorEl.classList.add("no-error");
          }
        } else {
          checkboxEl.classList.add("error");
          if (errorEl) {
            errorEl.classList.add("error-active");
            errorEl.classList.remove("no-error");
          }
        }

        validateForm(formEl, i);
      });
    }

    // managing textareas
    const textAreas =
      formEl.querySelectorAll<HTMLInputElement>("textarea.w-input");
    for (const textArea of textAreas) {
      textArea.addEventListener("input", () => {
        let flag = true;
        if (
          textArea.hasAttribute("required") &&
          textArea.getAttribute("required") !== "false" &&
          !textArea.value
        ) {
          flag = false;
        }

        // changing UI as per validation result
        const errorEl = formEl.querySelector(
          `div[error-label="${textArea.id}"]`
        );
        if (flag) {
          textArea.classList.remove("error");
          if (errorEl?.getAttribute("error-label") === "message") {
            errorEl.classList.remove("error-active");
            errorEl.classList.add("no-error");
          }
        } else {
          textArea.classList.add("error");
          if (errorEl?.getAttribute("error-label") === "message") {
            errorEl.classList.add("error-active");
            errorEl.classList.remove("no-error");
          }
        }

        validateForm(formEl, i);
      });
    }

    // handling submit
    formEl.addEventListener("submit", (ev) => {
      if (!state[i]) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.stopPropagation();

        // console.log("Invalid!");
        validateForm(formEl, i, true);
        const firstErrorEl = formEl.querySelector(`.error-active[error-label]`);
        const errorParentEl = firstErrorEl ? firstErrorEl.parentElement : null;
        if (errorParentEl && !isInViewport(errorParentEl)) {
          let y = errorParentEl.getBoundingClientRect().top;
          errorParentEl.scrollIntoView({ behavior: "smooth" });
          const navEl = document.querySelector(".w-nav");
          if (navEl) y -= navEl.getBoundingClientRect().height;

          window.scrollBy({
            top: y,
            behavior: "smooth",
          });
        }
      } else {
        // @ts-ignore
        if (window.formState[formId]) {
          // @ts-ignore
          const { onComplete } = window.formState[formId];
          if (onComplete) onComplete();
        }
      }
    });
  }
});

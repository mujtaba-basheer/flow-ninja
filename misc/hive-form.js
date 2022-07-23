const formEls = document.querySelectorAll("form#wf-form-Calculator");
for (const formEl of formEls) {
  // Get language code
  let langElement = document.querySelector("[lang]");
  let langCode = langElement.getAttribute("lang");
  formEl.querySelector("#language").value = langCode;

  // Add disabled state to the button
  let inputVal = formEl.querySelectorAll("[required]");
  for (i = 0; i < inputVal.length; i++) {
    inputVal[i].addEventListener("change", function (event) {
      let allAreFilled = true;
      formEl.querySelectorAll("[required]").forEach(function (i) {
        if (!allAreFilled) return;
        if (i.type === "radio") {
          let radioValueCheck = false;
          formEl.querySelectorAll(`[name=${i.name}]`).forEach(function (r) {
            if (r.checked) radioValueCheck = true;
          });
          allAreFilled = radioValueCheck;
          return;
        }
        if (!i.value) {
          allAreFilled = false;
          return;
        }
      });

      if (!allAreFilled) {
        // Disable enable buttons
        let button = formEl.querySelector(".quote-button");
        button.classList.add("disabled");
      } else {
        // Disable enable buttons
        let button = formEl.querySelector(".quote-button");
        button.classList.remove("disabled");
      }
    });
  }

  const picksPerOrder = $(formEl).find("#Picks-per-order");
  function onPickChange() {
    const val = picksPerOrder.val();
    console.log({ val });
    formEl
      .querySelectorAll("img.order-image-box")
      .forEach((x) => (x.style.zIndex = "auto"));
    $(`img.box-${val}`).css("z-index", "1");
  }
  picksPerOrder.on("change", onPickChange);

  // Picks Radio Button paste
  let picksRadio = formEl.querySelectorAll(".order-picks-radio");
  picksRadio.forEach((item) => {
    item.nextSibling.addEventListener("click", function () {
      setTimeout(function () {
        if (item.nextSibling.checked) {
          let name = item.parentNode.lastChild.textContent;
          let orderTitle = formEl.querySelector("#picks-title");
          orderTitle.innerHTML = name;
        } else {
          formEl.querySelector("#picks-title").textContent("Picks per order");
          //
        }
      }, 100);
    });
  });

  // Add and remove checkboxes for platforms
  let platformBox = formEl.querySelectorAll(".platform-fulfill-checkbox");
  platformBox.forEach((item) => {
    item.nextSibling.addEventListener("click", function () {
      setTimeout(function () {
        if (item.nextSibling.checked) {
          let tag = document.createElement("div");
          tag.classList.add("country-tag-template");
          let name = document.createElement("div");
          let countryFlag = document.createElement("img");
          let textContent = item.nextSibling.nextSibling.nextSibling.innerHTML;
          let countryImgUrl = item.nextSibling.nextSibling.src;
          let text = document.createTextNode(textContent);
          let closeToggle = document.createElement("div");
          tag.setAttribute("id", textContent);
          closeToggle.setAttribute("checkbox", textContent);
          countryFlag.setAttribute("src", countryImgUrl);
          countryFlag.classList.add("dropdown-country-label");
          formEl.querySelector("#platform-labels-wrap").appendChild(tag);
          tag.appendChild(countryFlag);
          tag.appendChild(name);
          tag.appendChild(closeToggle).classList.add("close-toggle");
          name.appendChild(text);
          formEl.querySelector(".platform-validator-radio").click();

          // Add close toggle
          closeToggle.addEventListener("click", function () {
            item.click();
          });

          // Remove title form the dropdown

          let pricingToggle = formEl.querySelector("#platform-labels-wrap")
            .children.length;
          if (pricingToggle >= 1) {
            formEl.querySelector("#platform-dropdown-title").style.display =
              "none";
          } else {
            //
          }
        } else {
          let textContent = item.nextSibling.nextSibling.nextSibling.innerHTML;
          formEl.querySelector(`#${textContent}`).remove();
          let pricingToggle = formEl.querySelector("#platform-labels-wrap")
            .children.length;
          if (pricingToggle < 1) {
            formEl.querySelector("#platform-dropdown-title").style.display =
              "block";
          } else {
            //
          }
        }
      }, 100);
    });
  });
  // Add and remove checkboxes for countries
  let countryBox = formEl.querySelectorAll(".country-fulfill-checkbox");
  countryBox.forEach((item) => {
    item.nextSibling.addEventListener("click", function () {
      setTimeout(function () {
        if (item.nextSibling.checked) {
          let tag = document.createElement("div");
          tag.classList.add("country-tag-template");
          let name = document.createElement("div");
          let countryFlag = document.createElement("img");
          let textContent = item.nextSibling.nextSibling.nextSibling.innerHTML;
          let countryImgUrl = item.nextSibling.nextSibling.src;
          let text = document.createTextNode(textContent);
          let closeToggle = document.createElement("div");
          tag.setAttribute("id", textContent.replace(/\s/g, "-"));
          closeToggle.setAttribute("checkbox", textContent);
          countryFlag.setAttribute("src", countryImgUrl);
          countryFlag.classList.add("dropdown-country-label");
          formEl.querySelector("#countries-labels-wrap").appendChild(tag);
          tag.appendChild(countryFlag);
          tag.appendChild(name);
          tag.appendChild(closeToggle).classList.add("close-toggle");
          name.appendChild(text);
          formEl.querySelector(".country-validator-radio").click();

          // Add close toggle
          closeToggle.addEventListener("click", function () {
            item.checked = false;
            $(item).next().trigger("click");
          });

          // Remove title form the dropdown
          let pricingToggle = formEl.querySelector("#countries-labels-wrap")
            .children.length;
          if (pricingToggle >= 1) {
            formEl.querySelector("#countries-dropdown-title").style.display =
              "none";
          } else {
            //
          }
        } else {
          let textContent = item.nextSibling.nextSibling.nextSibling.innerHTML;
          formEl
            .querySelectorAll(`#${textContent.replace(/\s/g, "-")}`)
            .forEach((x) => x.remove());
          let pricingToggle = formEl.querySelector("#countries-labels-wrap")
            .children.length;
          if (pricingToggle < 1) {
            formEl.querySelector("#countries-dropdown-title").style.display =
              "block";
          } else {
            //
          }
        }
      }, 100);
    });
  });
  // Add and remove checkboxes for countries
  let shippingBox = formEl.querySelector(".shipping-checkbox");
  shippingBox.nextSibling.addEventListener("change", function () {
    setTimeout(function () {
      if (shippingBox.nextSibling.checked) {
        let range = formEl.querySelector("#order-slider");
        const value = "100";
        range.value = value;
        let rangeValue = range.value;
        let rangeWidth = (rangeValue * 100) / 50000;
        let rangePercentage = rangeWidth + "%";
        formEl.querySelector("span.slide").style.width = rangePercentage;
        formEl.querySelector("#range-handler").style.marginLeft =
          rangePercentage;
        formEl.querySelector("#demo").textContent = rangeValue;
        console.log(range.value);
      }
    }, 100);
  });

  let rangeListen = formEl.querySelector("#order-slider");
  shippingBox.nextSibling.checked = formEl
    .querySelector(".shipping-checkbox")
    .classList.contains("w--redirected-checked");

  $(formEl).find(".rSlider span").css("width", "0.2%");
  $(formEl).find("#range-handler").css("margin-left", "0.2%");
  rangeListen.value = "100";
  const onSliderValueGt100 = () => {
    formEl.querySelector(".shipping-checkbox").nextSibling.checked = false;
    formEl
      .querySelector(".shipping-checkbox")
      .classList.remove("w--redirected-checked");
  };
  rangeListen.addEventListener("change", function () {
    let rangeValue = formEl.querySelector("#order-slider").value;
    if (rangeValue < 100) {
    } else {
      setTimeout(onSliderValueGt100, 100);
    }
  });
  rangeListen.addEventListener("input", function () {
    let rangeValue = rangeListen.value;
    if (rangeValue < 100) {
      rangeListen.value = "100";
      $(rangeListen).trigger("change");
    }
  });
  onSliderValueGt100();

  var range = $(formEl).find("#order-slider").attr("value");
  $(formEl).find("#demo").html(range);
  $(formEl)
    .find("#order-slider")
    .on("input change", function () {
      $(formEl).find("#demo").html($(this).val());
      var slideWidth = ($(this).val() * 100) / 50000;
      var rangeHandler = formEl.querySelector("#range-handler");
      $(formEl)
        .find(".slide")
        .css("width", slideWidth + "%");
      $(formEl)
        .find("#range-handler")
        .css("margin-left", slideWidth + "%");

      var element = $(formEl).find("#order-slider"),
        value = element.val(),
        min = 0,
        step;

      if (value < 200) {
        step = 100;
      } else if (value < 1999) {
        step = 100;
      } else if (value >= 2000 && value <= 4999) {
        step = 500;
      } else if (value >= 5000) {
        step = 5000;
      }

      element.attr("step", step);
      element.attr("min", min);
    });

  $(formEl).on("submit", function () {
    let actionValue =
      formEl.querySelector("#order-slider").value +
      formEl.querySelector("#Country").value +
      formEl.querySelector("#Picks-per-order").value;
    let eventLabel = formEl.querySelector("#Website-URL").value;

    dataLayer.push({
      event: "GAEvent", //Consant
      eventCategory: "Pricing Calculator - Submit",
      eventAction: actionValue,
      eventLabel: eventLabel,
    });
  });

  // Single country select rules

  setTimeout(function () {
    let mainCountrySelect = formEl.querySelectorAll(".single-country");
    formEl
      .querySelectorAll(".multiple-country input")
      .forEach((x) => (x.checked = false));
    formEl
      .querySelectorAll(".single-country input")
      .forEach((x) => (x.checked = false));

    mainCountrySelect.forEach((item) => {
      let mainCountryText = item.textContent;
      let mainCountryClass = mainCountryText.replace(/\s+/g, "-").toLowerCase();
      item.classList.add(mainCountryClass);
      item.addEventListener("click", countryToggle);
      function countryToggle() {
        formEl
          .querySelector("#single-country")
          .firstChild.classList.remove(
            "germany",
            "italy",
            "france",
            "united-kingdom",
            "spain"
          );
        formEl
          .querySelector("#single-country")
          .firstChild.classList.add(mainCountryClass);
        let additionalCountriesList =
          formEl.querySelectorAll(".multiple-country");
        additionalCountriesList.forEach((country) => {
          country.style.display = "flex";
          if (country.classList.contains(mainCountryClass)) {
            country.style.display = "none";
          }
        });
      }
    });
  }, 500);
}

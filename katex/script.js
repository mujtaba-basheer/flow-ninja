const gdprCountries = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "United Kingdom",
];
const getCountryName = (rawTxt) => {
  if (rawTxt.includes("(")) {
    const index = rawTxt.indexOf("(");
    return rawTxt.substring(0, index).trim();
  } else return rawTxt.substring(0, rawTxt.indexOf(":")).trim();
};

window.addEventListener("load", () => {
  const flagEl = document.querySelector(".iti__selected-flag");
  const countryInput = document.getElementById("Country");

  countryInput.value = getCountryName(flagEl.getAttribute("title"));

  const callback = (mutationList) => {
    mutationList.forEach(function (mutation) {
      switch (mutation.type) {
        case "attributes":
          switch (mutation.attributeName) {
            case "title":
              const countryName = getCountryName(
                mutation.target.getAttribute("title")
              );
              countryInput.value = countryName;
              if (gdprCountries.includes(countryName)) {
                if ($("#Checkbox")[0].checked) {
                  $("#Checkbox").parent().find("div").trigger("click");
                }
                $("#GDPR").css("display", "flex");
              } else {
                if (!$("#Checkbox")[0].checked) {
                  $("#Checkbox").parent().find("div").trigger("click");
                }
                $("#GDPR").css("display", "none");
              }
              break;
          }
          break;
      }
    });
  };
  const config = {
    attributeFilter: ["title"],
    attributeOldValue: true,
    subtree: false,
  };
  const observer = new MutationObserver(callback);
  observer.observe(flagEl, config);
});

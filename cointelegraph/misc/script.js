let allItems;
let extractedValue;
const valuesArr = [];
window.fsAttributes.cmsload.loading.then((data) => {
  allItems = data;

  for (const item of allItems[0].items) {
    const values = item.props.tag.values;
    extractedValue = values.values().next().value;
    valuesArr.push(extractedValue);
  }
  const searchValues = ["Pro", "Premium", "Free"];
  let counter = 0;
  const hasValues = searchValues.map((searchValue) => {
    const hasValue = valuesArr.some(
      (value) => value.trim().toLowerCase() === searchValue.toLowerCase()
    );
    if (hasValue) counter++;
    return {
      hasValue,
      value: searchValue.trim().toLowerCase(),
    };
  });
  if (counter === 1) hasValues.forEach((result) => (result.hasValue = false));
  hasValues.forEach((result) => {
    if (!result.hasValue) {
      const buttonEl = document.querySelector(`label.w-radio.${result.value}`);
      buttonEl.classList.add("disabled");
    }
  });
});

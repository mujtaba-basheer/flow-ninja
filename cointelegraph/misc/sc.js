let str = "Not changed";
const valuesArr = [];
window.fsAttributes.cmsload.loading.then((data) => {
  allItems = data;

  for (const item of allItems[0].items) {
    const values = item.props.tag.values;
    extractedValue = values.values().next().value;
    valuesArr.push(extractedValue);
  }
  str = "Changed";
});
// console.log("Values array length:", valuesArr.length, valuesArr);

console.log({ valuesArr });
console.log({ str });

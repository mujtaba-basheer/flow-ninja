// w--redirected-checked checlist-checkbox
var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues")) || {},
  $checkboxes = $(".checklist-checkbox-wrap input");

$checkboxes.on("change", function () {
  $checkboxes.each(function () {
    checkboxValues[this.id] = this.checked;
  });

  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

// On page load
$.each(checkboxValues, function (key, value) {
  if (value) {
    $("#" + key)
      .parent()
      .trigger("click");
  }
});

const $ = require("jquery");

const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), time);
  });
const checkStep1 = async () => {
  await delay(200);
  const nextBtn = document.querySelectorAll("#hiring-next")[0];

  let flag =
    document.querySelectorAll(".w-dyn-item div.w--redirected-checked").length >
    0;

  flag = flag && document.getElementById("work-email-2").value;

  if (flag) $(nextBtn).addClass("active");
  else $(nextBtn).removeClass("active");
};
const checkStep2 = async () => {
  await delay(200);
  const nextBtn = document.querySelectorAll("#hiring-next")[1];

  const tab2Container = document.getElementById("w-tabs-0-data-w-pane-1");
  let flag = true;
  const textInputs = tab2Container.querySelectorAll("input.w-input");

  for (const textInput of textInputs) {
    if (!textInput.value) {
      flag = false;
      break;
    }
  }

  flag =
    flag &&
    (document.querySelector("input#part-time").checked ||
      document.querySelector("input#full-time").checked);

  flag =
    flag &&
    document
      .querySelector("label.terms-checkbox div.w-checkbox-input")
      .classList.contains("w--redirected-checked");

  if (flag) $(nextBtn).addClass("active");
  else $(nextBtn).removeClass("active");
};

window.addEventListener("load", () => {
  const tabs = [
    $("#w-tabs-0-data-w-tab-0"),
    $("#w-tabs-0-data-w-tab-1"),
    $("#w-tabs-0-data-w-tab-2"),
  ];
  const nextBtns = document.querySelectorAll("#hiring-next");

  // Initializing Step 1
  $('.w-dyn-item input[type="checkbox"]').on("change", checkStep1);
  $("#work-email-2").on("input", checkStep1);
  $(nextBtns[0]).on("click", function () {
    const $this = $(this);
    if ($this.hasClass("active")) tabs[1].trigger("click");
  });

  // Initializing Step 2
  $("input#part-time, input#full-time").on("change", checkStep2);
  $("input#checkbox-20").on("change", checkStep2);
  $("#w-tabs-0-data-w-pane-1 input.w-input").on("input", checkStep2);
  $(nextBtns[1]).on("click", function () {
    const $this = $(this);
    if ($this.hasClass("active")) tabs[2].trigger("click");
  });
});

var onboardingForm = document.querySelector("#wf-form-Onboarding-Form");
var inputs = onboardingForm.querySelectorAll("input[type=radio]");
var data = onboardingForm.querySelectorAll("#wf-form-Onboarding-Form:checked");
$(".get-a-quote-button ").on("click", function () {
  var budget = document.querySelector("#our-budget-is").value;
  var data = onboardingForm.querySelectorAll("input[type=radio]:checked");
  window.dataLayer = window.dataLayer || [];
  const dataToPush = {
    event: "onboarding-form-submit",
    ourBudgetIs: budget,
  };
  data.forEach((input) => {
    const atributeName = input.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    const a = atributeName;
    const b = input.value;
    dataToPush[a] = b;
  });

  console.log(onboardingObj);

  window.dataLayer.push(dataToPush);
});

/* Calc Code */
let steps = document.querySelectorAll(".steps");
let nextBtn = document.getElementById("next-step");
let prevBtn = document.getElementById("prev-step");
let rentPayments = document.getElementById("rent-payments");
let utilities = document.getElementById("utilities");
let healthInsurance = document.getElementById("health-insurance");
let minIncome = document.getElementById("minimum-income");
let holidays = document.getElementById("holiday");
let sickDays = document.getElementById("sick-days");
let minimumID = document.querySelector("#minimum-id div");
let totalID = document.querySelector("#total-id div");
let totalHours = document.getElementById("total-hours");
let heading = document.getElementById("calc-heading");
let resultBig = document.querySelector(".big-result");
let yearIncome = document.querySelector(".yearly-income");
let workingHours = document.querySelector(".working-hours");
let bilableHours = document.querySelector(".bilable-hours");
let steper = document.querySelector(".step-counter");
let backLink = document.querySelector(".backlink");
let stepCounter = 0;
let n = 0;
const staffingSection = document.querySelector(".staffing-calc-section");
const innerContent = document.querySelector(".inner-column");
totalHours.setAttribute("disabled", true);
totalHours.setAttribute("value", 2080);
//minIncome.setAttribute("value", "0,00");
minIncome.setAttribute("disabled", true);

nextBtn.addEventListener("click", function () {
  if (n == steps.length) {
    return;
  } else {
    if (validator()) {
      n++;
      nextPrev();
    }
  }
});
prevBtn.addEventListener("click", function () {
  if (n == 0) {
    return;
  } else {
    n--;
    nextPrev();
  }
});

function nextPrev() {
  $(".steps").removeClass("active");
  steps[n].classList.add("active");
  if (n < 1) {
    steper.innerText = "1";
    prevBtn.classList.add("disabled");
    heading.innerText = "Monthly Expenses";
  }
  if (n == 1) {
    steper.innerText = "2";
    nextBtn.innerText = "Calculate";
    prevBtn.classList.remove("disabled");
    heading.innerText = "Annual Billable Hours";
  } else {
    nextBtn.innerText = "Next";
  }

  if (n > 1) {
    steper.innerText = "3";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    prevBtn.classList.remove("disabled");
    staffingSection.style.display = "block";
    innerContent.style.display = "none";
    heading.innerText = "See Your Estimated Hourly Rate!";
  } else {
    nextBtn.style.display = "block";
    prevBtn.style.display = "block";
    staffingSection.style.display = "none";
    innerContent.style.display = "block";
  }
}

backLink.addEventListener("click", function () {
  n = 0;
  nextPrev(0);
  staffingSection.style.display = "none";
  innerContent.style.display = "block";
  prevBtn.classList.add("disabled");
  heading.innerText = "Monthly Expenses";
});

function validator() {
  let flag = true;
  let inputs = steps[n].querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    if (input.value == "") {
      flag = false;
      console.log(input);
      input.classList.add("invalid");
    }
  });
  return flag;
}
$(".first-calculation").on({
  keyup: function () {
    $(".first-calculation").removeClass("invalid");
    $(minIncome).val(
      Number(
        +removeCommas($(rentPayments).val()) +
          +removeCommas($(utilities).val()) +
          +removeCommas($(healthInsurance).val())
      ).toFixed(2)
    );
    $(minimumID).text(
      separateComma(
        Number(
          +removeCommas($(rentPayments).val()) +
            +removeCommas($(utilities).val()) +
            +removeCommas($(healthInsurance).val())
        ).toFixed(2)
      )
    );
    $(yearIncome).text(
      separateComma(
        Number(
          +removeCommas($(rentPayments).val()) +
            +removeCommas($(utilities).val()) +
            +removeCommas($(healthInsurance).val())
        ) * 12
      )
    );

    if ($(totalHours).val().startsWith("-")) {
      $(resultBig).text(
        "$" + Number(($(minIncome).val() * 12) / 1248).toFixed(0)
      );
    } else {
      $(resultBig).text(
        separateComma(
          Number(
            $(yearIncome).text().replace(",", "").replace(",", "") /
              $(bilableHours).text().replace(",", "").replace(",", "")
          ).toFixed(0)
        )
      );
    }
  },
});
$(".first-calculation").each(function () {
  $(this).on("input", function () {
    const val = $(this).val();
    const formattedVal = formatInput(val);
    $(this).val(formattedVal);
  });
});

$(".second-calculation").on({
  keyup: function () {
    $(".second-calculation").removeClass("invalid");
    $(totalHours).val(
      2080 - Number(+$(sickDays).val() + +$(holidays).val()) * 8
    );
    $(totalID).text(
      separateComma(
        (2080 - Number(+$(sickDays).val() + +$(holidays).val()) * 8).toFixed(2)
      )
    );
    $(workingHours).text(
      separateComma(2080 - Number(+$(sickDays).val() + +$(holidays).val()) * 8)
    );

    let $numb =
      (2080 - Number(+$(sickDays).val() + +$(holidays).val()) * 8) * 0.6;

    $(bilableHours).text(separateComma(Number($numb).toFixed(0)));

    if ($(totalHours).val().startsWith("-")) {
      $(resultBig).text(Number(($(minIncome).val() * 12) / 1248).toFixed(0));
    } else {
      $(resultBig).text(
        separateComma(
          Number(
            $(yearIncome).text().replace(",", "").replace(",", "") /
              $(bilableHours).text().replace(",", "").replace(",", "")
          ).toFixed(0)
        )
      );
    }
  },
});
function separateComma(val) {
  var sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }

  let num = val.toString().includes(".")
    ? val.toString().split(".")[0]
    : val.toString();
  let len = num.toString().length;
  let result = "";
  let count = 1;

  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = "," + result;
    }
    count++;
  }

  if (val.toString().includes(".")) {
    result = result + "." + val.toString().split(".")[1];
  }

  return sign < 0 ? "-" + result : result;
}
function formatInput(val = "") {
  let int = "",
    deci = "";
  if (val.includes(".")) {
    [int, deci] = val.split(".");
    deci = "." + (deci.length > 2 ? deci.substring(0, 2) : deci);
    if (int === "") int = "0";
  } else {
    int = val;
  }
  let temp = int;
  int = "";

  for (let i = 0; i < temp.length; i++) {
    const charCode = temp.charCodeAt(i);
    if (charCode === 44 || (charCode > 47 && charCode < 58)) {
      int += temp.charAt(i);
    }
  }
  int = int.replace(/,/g, "");
  int = separateComma(int);

  return int + deci;
}
function removeCommas(val = "") {
  return val.replace(/,/g, "").replace(/[a-zA-Z]/g, "");
}

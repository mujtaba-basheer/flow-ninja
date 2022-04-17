// const $ = require("jquery");

const nftd = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  currency: "USD",
});

const calculatePhoneTagCost = (outbound_calls_per_day, calls_connected) => {
  const timePerCall = 3,
    hourlyWageForCalling = 15;

  if (isNaN(Number(outbound_calls_per_day)) && isNaN(Number(calls_connected)))
    return false;

  const result =
    (+outbound_calls_per_day *
      (1 - +calls_connected / 100) *
      hourlyWageForCalling *
      timePerCall *
      20 *
      12) /
    60;

  return result;
};

const calculateAbandonedCallsCost = (
  inbound_calls_per_day,
  calls_abandoned
) => {
  const callsAboutScheduling = 0.35,
    avRevPerAppt = 150;

  if (isNaN(Number(inbound_calls_per_day)) && isNaN(Number(calls_abandoned)))
    return false;

  const result =
    (+inbound_calls_per_day *
      +calls_abandoned *
      callsAboutScheduling *
      avRevPerAppt *
      20 *
      12) /
    100;

  return result;
};

const calculateNoShowCost = (appts_per_day, no_shows) => {
  const avRevPerAppt = 150;

  if (isNaN(Number(appts_per_day)) && isNaN(Number(no_shows))) return false;

  const result = (+appts_per_day * +no_shows * avRevPerAppt * 20 * 12) / 100;

  return result;
};

const updateSavingsChart = ({
  phone_tag_savings,
  abandoned_calls_savings,
  no_show_savings,
}) => {
  const data = [phone_tag_savings, abandoned_calls_savings, no_show_savings];
  const total = data.reduce((p, c) => p + c, 0);
  let c = 0;
  const degrees = data.map((x) => {
    c += (x / total) * 360;
    return c;
  });
  const percents = data.map((x) => {
    const p = (x / total) * 100;
    return Math.round(p);
  });
  let [x, y] = degrees;

  $("#savings-pie-chart").css(
    "background-image",
    `conic-gradient(white ${x}deg, #F4CECE 0 ${y}deg, #C69999 0)`
  );

  [x, y] = percents;
  $("span.phone-tag").text(x);
  $("span.abandoned-calls").text(y);
  $("span.appointment-no-shows").text(Math.round(100 - x - y));
};

const updateRoiChart = ({ net_profit, total_cost }) => {
  let thirdRoiHeight = 100,
    thirdInvHeight = 100;
  if (total_cost > net_profit) {
    thirdRoiHeight = (net_profit / total_cost) * thirdInvHeight;
  } else {
    thirdInvHeight = (total_cost / net_profit) * thirdRoiHeight;
  }

  $(".white-third").css("height", `${thirdRoiHeight}%`);
  $(".rose-third").css("height", `${thirdInvHeight}%`);
  $(".third-year-savings").text(": $" + nftd.format(net_profit * 3));

  const firstRoiHeight = thirdRoiHeight / 3;
  const firstInvHeight = thirdInvHeight / 3;

  $(".white-first").css("height", `${firstRoiHeight}%`);
  $(".rose-first").css("height", `${firstInvHeight}%`);
  $(".first-year-savings").text("$" + nftd.format(net_profit));
};

const showTotalSavings = ({
  phone_tag_cost,
  abandoned_calls_cost,
  no_show_cost,
}) => {
  $("#Charts").removeClass("opacity-30");

  const klara_monthly_charge = 200;
  const noOfProviders =
    ($("#Providers-Start").val() && Number($("#Providers-Start").val())) || 20;
  if (isNaN(Number(noOfProviders))) return;

  // const total_cost = phone_tag_cost + abandoned_calls_cost + no_show_cost;
  const phone_tag_savings = phone_tag_cost * 0.75;
  const abandoned_calls_savings = abandoned_calls_cost * 0.3;
  const no_show_savings = no_show_cost * 0.35;
  const total_savings =
    phone_tag_savings + abandoned_calls_savings + no_show_savings;
  const total_cost = klara_monthly_charge * 12 * noOfProviders;
  const net_profit = total_savings - total_cost;
  let roi_percent = total_savings / total_cost;
  roi_percent = Math.round(roi_percent);

  $("#Savings").html(
    "$" + nftd.format(total_savings) + `<span class="h3-style">/year</span>`
  );
  $("#annual-roi").html(roi_percent + `%`);

  updateSavingsChart({
    phone_tag_savings,
    abandoned_calls_savings,
    no_show_savings,
  });
  updateRoiChart({
    net_profit,
    total_cost,
  });
};

const validateForm = (id) => {
  const inputFields = document.getElementById(id).querySelectorAll("input");
  let flag = true;

  for (const inputField of inputFields) {
    if (inputField.classList.contains("hidden")) continue;

    if (!inputField.checkValidity()) {
      flag = false;
      break;
    }
  }

  return flag;
};

function collectFormData(formId) {
  const data = {};
  data["options"] = {
    debug: false,
    map: true,
    domain: "klara",
    router: "free-demo",
  };
  data["form"] = {};

  const formData = $(formId).serializeArray();

  formData.forEach(function (item) {
    data.form[item.name] = item.value;
  });

  return data;
}

window.addEventListener("load", function () {
  $("#wf-form-Email-Form-first")[0].reset();
  $("#wf-form-Email-Form")[0].reset();
  let flagOne = false,
    flagTwo = false;

  // Handling providers input
  $("#Providers-Start").on("input", function (ev) {
    const numProviders = ev.target.value;
    if (numProviders) {
      $("#go").removeClass("disabled-button");
      flagOne = true;
    } else {
      $("#go").addClass("disabled-button");
      $("#hero-form").addClass("hidden");
      flagOne = false;
    }
  });

  // Handling #go click
  $("#go").on("click", function () {
    if (flagOne) $("#hero-form").removeClass("hidden");
  });

  // Handling #roi-details-submit input
  $("#wf-form-Email-Form-first")
    .find("input:not(#Providers):not(.hidden)")
    .each(function () {
      $(this).on("input", function () {
        flagTwo = validateForm("wf-form-Email-Form-first");
        if (flagTwo) {
          $("#roi-details-submit").removeClass("disabled-button");
        } else {
          $("#roi-details-submit").addClass("disabled-button");
        }
      });
    });

  // Handling #roi-details-submit click
  $("#roi-details-submit").on("click", function () {
    if (flagTwo) {
      $(".disable-div").addClass("disabled-button");
      $("#form-two").removeClass("hidden");
      $("#small-section").removeClass("hidden");
      const formData = {
        "Providers-Start": $("#Providers-Start").val(),
        "First-Name-Details-Start": $("#First-Name-Details-Start").val(),
        "Last-Name-Details-Start": $("#Last-Name-Details-Start").val(),
        "Email-Details-Start": $("#Email-Details-Start").val(),
        "Phone-Details-Start": $("#Phone-Details-Start").val(),
        "Company-Details-Start": $("#Company-Details-Start").val(),
      };
      const leadData = {
        number_of_providers__c: $("#Providers-Start").val(),
        FirstName: $("#First-Name-Details-Start").val(),
        LastName: $("#Last-Name-Details-Start").val(),
        Email: $("#Email-Details-Start").val(),
        Phone: $("#Phone-Details-Start").val(),
        Company: $("#Company-Details-Start").val(),
      };
      Object.keys(formData).forEach((key) =>
        $(`#${key.replace("Start", "Show")}`).val(formData[key])
      );
      fetch("https://api.chilipiper.com/marketing/klara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          options: {
            debug: false,
            map: true,
            domain: "klara",
            router: "free-demo",
          },
          form: leadData,
        }),
      })
        .then((resp) => {
          const { status } = resp;
          if (status === 200 || status === 201) return resp.json();
          else throw new Error(resp.statusText);
        })
        .then((data) => {
          console.log(data);
        })
        .catch(console.error);
    }
  });

  // Handling #show-your-roi click
  $("#show-your-roi").on("click", function () {
    let dataStr = "";
    dataStr += `Phone Tag Cost: ${$("#phone-tag-cost").text()}\n`;
    dataStr += `Abandoned Calls Cost: ${$("#abandoned-call-cost").text()}\n`;
    dataStr += `Appointment No-Show Cost: ${$("#no-show-cost").text()}\n`;
    dataStr += `Total Cost Savings: ${$("#Savings").text()}\n`;
    dataStr += `ROI on Klara: ${$("#annual-roi").text()}\n`;

    $("#ROI-Info").val(dataStr);
    $("#charts-section-old").removeClass("hidden");
    $("#what-next").removeClass("disable-next-button");
  });

  // Handling .see-whats-next-button click
  $(".see-whats-next-button").on("click", function () {
    $("#whats-Next").removeClass("book-a-demo-hidden");

    const leadData = {
      number_of_providers__c: $("#Providers-Start").val(),
      FirstName: $("#First-Name-Details-Show").val(),
      LastName: $("#Last-Name-Details-Show").val(),
      Email: $("#Email-Details-Show").val(),
      Phone: $("#Phone-Details-Show").val(),
      Company: $("#Company-Details-Show").val(),
      Notes: $("#ROI-Info").val(),
    };
    ChiliPiper.submit("klara", "free-demo", {
      lead: leadData,
      domElement: "#chilipiper-date-picker",
      injectRootCss: true,
    });
  });

  // ROI CALCULATOR CODE
  {
    let outbound_calls_per_day = 400,
      calls_connected = 30,
      inbound_calls_per_day = 400,
      calls_abandoned = 10,
      appts_per_day = 200,
      no_shows = 20;

    let phone_tag_cost = 50400,
      abandoned_calls_cost = 1440000,
      no_show_cost = 2880000;

    const yearSup = `<span class="h3-style">/year</span>`;

    {
      // Handling no. of providers input
      $("#Providers-Start").on("input", () =>
        showTotalSavings({ phone_tag_cost, abandoned_calls_cost, no_show_cost })
      );

      // Phone tag cost

      const updatePhoneTagCost = () => {
        let res = calculatePhoneTagCost(
          outbound_calls_per_day,
          calls_connected
        );
        if (res) {
          res = Math.round(res);
          phone_tag_cost = res;
          $("#phone-tag-cost").html("$" + nftd.format(res) + yearSup);
          $("#phone-tag-cost").addClass("gray-900");
          $("#result-div1").removeClass("border-grey-500");
          $("#show-your-roi").removeClass("disabled-button");
          showTotalSavings({
            phone_tag_cost,
            abandoned_calls_cost,
            no_show_cost,
          });
        } else {
          $("#phone-tag-cost").text("NA");
        }
      };

      $("#Calls-make-per-day").on("input", function () {
        outbound_calls_per_day = $(this).val() || 400;
        updatePhoneTagCost();
      });
      $("#Speaking-with-patient").on("input", function () {
        calls_connected = $(this).val() || 30;
        updatePhoneTagCost();
      });
    }

    {
      // Abandoned calls cost

      const updateAbandonedCallsCost = () => {
        let res = calculateAbandonedCallsCost(
          inbound_calls_per_day,
          calls_abandoned
        );
        if (res) {
          res = Math.round(res);
          abandoned_calls_cost = res;
          $("#abandoned-call-cost").html("$" + nftd.format(res) + yearSup);
          $("#abandoned-call-cost").addClass("gray-900");
          $("#result-div2").removeClass("border-grey-500");
          $("#show-your-roi").removeClass("disabled-button");
          showTotalSavings({
            phone_tag_cost,
            abandoned_calls_cost,
            no_show_cost,
          });
        } else {
          $("#abandoned-call-cost").text("NA");
        }
      };

      $("#Calls-receive-per-day").on("input", function () {
        inbound_calls_per_day = $(this).val() || 400;
        updateAbandonedCallsCost();
      });
      $("#Abandoned-calls").on("input", function () {
        calls_abandoned = $(this).val() || 10;
        updateAbandonedCallsCost();
      });
    }

    {
      // No-show cost

      const updateNoShowCost = () => {
        let res = calculateNoShowCost(appts_per_day, no_shows);
        if (res) {
          res = Math.round(res);
          no_show_cost = res;
          $("#no-show-cost").html("$" + nftd.format(res) + yearSup);
          $("#no-show-cost").addClass("gray-900");
          $("#result-div3").removeClass("border-grey-500");
          $("#show-your-roi").removeClass("disabled-button");
          showTotalSavings({
            phone_tag_cost,
            abandoned_calls_cost,
            no_show_cost,
          });
        } else {
          $("#no-show-cost").text("NA");
        }
      };

      $("#Patients-seen-each-day").on("input", function () {
        appts_per_day = $(this).val() || 200;
        updateNoShowCost();
      });
      $("#No-shows").on("input", function () {
        no_shows = $(this).val() || 20;
        updateNoShowCost();
      });
    }
  }
});

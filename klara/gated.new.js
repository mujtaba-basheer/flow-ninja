const nftd = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  currency: "USD",
});
const nftdInd = Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});
const nftdInd1 = Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const getNum = (el, def) => {
  const val = el.val();
  if (val === "") return def;
  else if (val === "0") return 0;
  else return Number(val);
};

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
  let firstRoiHeight = 100,
    firstInvHeight = 100;
  if (total_cost > net_profit) {
    firstRoiHeight = (net_profit / total_cost) * firstInvHeight;
  } else {
    firstInvHeight = (total_cost / net_profit) * firstRoiHeight;
  }

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
    ($("#Providers").val() && Number($("#Providers").val())) || 20;
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
  let roi_percent_3 = Math.round(roi_percent * 100);

  $("#Savings").html("$" + nftd.format(total_savings));
  $("#savings-text").html("$" + nftd.format(total_savings));
  $("#net-profit").html("$" + nftd.format(net_profit));
  $("#net-profit-text").html("$" + nftd.format(net_profit));

  $("#annual-roi").html(nftd.format(roi_percent_3) + `%`);
  $("#roi-on-klara").html(nftdInd1.format(roi_percent) + `x`);

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

window.addEventListener("load", function () {
  let flag = false;
  let formSubmitted = false;

  {
    // passing UTM params
    const searchStr = window.location.search.substring(1);
    const queries = searchStr.split("&");
    for (const query of queries) {
      let [key, value] = query.split("=");
      value = decodeURIComponent(value);

      const inputEl = document.getElementById(key);
      if (inputEl) inputEl.value = value;
    }
  }

  {
    // 1st Section
    const providersInput = $("#Providers"),
      goBtn = $("#calculate-roi");

    providersInput.on("input", function () {
      const providers = $(this).val();

      if (providers && !isNaN(Number(providers))) goBtn.removeClass("disabled");
      else goBtn.addClass("disabled");
    });

    goBtn.on("click", function () {
      $("#bottom-progress-bar").addClass("hidden");

      $("#progress-bar-top")
        .removeClass("hidden")
        .removeClass("box-shadow-white");
      $("#forms-calculator").removeClass("hidden");
      $("#first-progress-dot").removeClass("disabled-progress-bar");
    });
  }

  const showRoiBtn = $("#see-your-roi");
  const checkRoiBtn = () => {
    let flags = [true, true, true];
    const inputValsArr = [
      [$("#Calls-make-per-day").val(), $("#Speaking-with-patient").val()],
      [$("#Calls-receive-per-day").val(), $("#Abandoned-calls").val()],
      [$("#Patients-seen-each-day").val(), $("#No-shows").val()],
    ];

    for (let i = 0; i < inputValsArr.length; i++) {
      const inputVals = inputValsArr[i];
      for (const inputVal of inputVals) {
        if (inputVal === "" || inputVal === "0") {
          flags[i] = false;
          break;
        }
      }
    }

    const flag = flags[0] || flags[1] || flags[2];

    if (flag) showRoiBtn.removeClass("disabled-button");
    else showRoiBtn.addClass("disabled-button");
  };

  {
    // ROI CALCULATOR CODE

    let outbound_calls_per_day = 400,
      calls_connected = 30,
      inbound_calls_per_day = 400,
      calls_abandoned = 10,
      appts_per_day = 200,
      no_shows = 20;

    let phone_tag_cost = 50400,
      abandoned_calls_cost = 504000,
      no_show_cost = 1440000;

    document.getElementById("num-of-providers").reset();
    document.getElementById("wf-form-Forms-Calculator").reset();
    document.getElementById("wf-form-ROI-Lead-Form").reset();

    {
      // Handling no. of providers input
      $("#Providers").on("input", () =>
        showTotalSavings({ phone_tag_cost, abandoned_calls_cost, no_show_cost })
      );

      // Phone tag cost

      const updatePhoneTagCost = () => {
        let res = calculatePhoneTagCost(
          outbound_calls_per_day,
          calls_connected
        );
        if (res !== false) {
          res = Math.round(res);
          phone_tag_cost = res;
          $("#phone-tag-cost").html("$" + nftd.format(res));
          $("#phone-tag-cost").addClass("gray-900");
          $("#result-div1").removeClass("border-grey-500");
          checkRoiBtn();
          $("#card-result-1").removeClass("hidden");
          if (outbound_calls_per_day !== 0 || calls_connected !== 0)
            $("#clear-button-1").removeClass("disabled");
          else $("#clear-button-1").addClass("disabled");
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
        outbound_calls_per_day = getNum($(this), 400);
        updatePhoneTagCost();
      });
      $("#Speaking-with-patient").on("input", function () {
        calls_connected = getNum($(this), 30);
        updatePhoneTagCost();
      });

      $("#clear-button-1").on("click", function () {
        $("#Calls-make-per-day").val("0");
        $("#Speaking-with-patient").val("0");
        outbound_calls_per_day = calls_connected = 0;
        updatePhoneTagCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-1").addClass("hidden");
      });
    }

    {
      // Abandoned calls cost

      const updateAbandonedCallsCost = () => {
        let res = calculateAbandonedCallsCost(
          inbound_calls_per_day,
          calls_abandoned
        );
        if (res !== false) {
          res = Math.round(res);
          abandoned_calls_cost = res;
          $("#abandoned-call-cost").html("$" + nftd.format(res));
          $("#abandoned-call-cost").addClass("gray-900");
          $("#result-div2").removeClass("border-grey-500");
          checkRoiBtn();
          $("#clear-button-2").removeClass("disaled");
          $("#card-result-2").removeClass("hidden");
          if (inbound_calls_per_day || calls_abandoned)
            $("#clear-button-2").removeClass("disabled");
          else $("#clear-button-2").addClass("disabled");
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
        inbound_calls_per_day = getNum($(this), 400);
        updateAbandonedCallsCost();
      });
      $("#Abandoned-calls").on("input", function () {
        calls_abandoned = getNum($(this), 10);
        updateAbandonedCallsCost();
      });

      $("#clear-button-2").on("click", function () {
        $("#Abandoned-calls").val("0");
        $("#Calls-receive-per-day").val("0");
        inbound_calls_per_day = calls_abandoned = 0;
        updateAbandonedCallsCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-2").addClass("hidden");
      });
    }

    {
      // No-show cost

      const updateNoShowCost = () => {
        let res = calculateNoShowCost(appts_per_day, no_shows);
        if (res !== false) {
          res = Math.round(res);
          no_show_cost = res;
          $("#no-show-cost").html("$" + nftd.format(res));
          $("#no-show-cost").addClass("gray-900");
          $("#result-div3").removeClass("border-grey-500");
          checkRoiBtn();
          $("#clear-button-3").removeClass("disaled");
          $("#card-result-3").removeClass("hidden");
          if (appts_per_day || no_shows)
            $("#clear-button-3").removeClass("disabled");
          else $("#clear-button-3").addClass("disabled");
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
        appts_per_day = getNum($(this), 200);
        updateNoShowCost();
      });
      $("#No-shows").on("input", function () {
        no_shows = getNum($(this), 20);
        updateNoShowCost();
      });

      $("#clear-button-3").on("click", function () {
        $("#Patients-seen-each-day").val("0");
        $("#No-shows").val("0");
        appts_per_day = no_shows = 0;
        updateNoShowCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-3").addClass("hidden");
      });
    }
  }

  {
    // 3rd Section
    const chiliPiperForm = $("#wf-form-ROI-Lead-Form"),
      submitBtn = $("#roi-details-submit");

    showRoiBtn.on("click", function () {
      if (!formSubmitted) {
        $("#form-gated").removeClass("hidden");
        $("#second-progress-dot").removeClass("disabled-progress-bar");
        $("#schedule-your-demo").removeClass("disabled");

        $("#first-done-icon").addClass("show");
        $("#first-progress-dot").addClass("show-icon");
        $("#progres-line").addClass("half-full");
      }
    });

    chiliPiperForm.find("input").each(function () {
      $(this).on("input", function () {
        flag = validateForm("wf-form-ROI-Lead-Form");
        if (flag) {
          submitBtn.removeClass("disabled-button");
        } else {
          submitBtn.addClass("disabled-button");
        }
      });
    });

    submitBtn.on("click", function () {
      if (formSubmitted) return;

      formSubmitted = true;

      let dataStr = "";
      dataStr += `Name: ${$("#First-Name-Details-Start").val()} ${$(
        "#Last-Name-Details-Start"
      ).val()}\n\n`;

      dataStr += `Avg outbound calls made per day: ${$(
        "#Calls-make-per-day"
      ).val()}\n`;
      dataStr += `% connected: ${$("#Speaking-with-patient").val()}\n`;
      dataStr += `Inbound patient calls per day: ${$(
        "#Calls-receive-per-day"
      ).val()}\n`;
      dataStr += `Patient call abandonment: ${$("#Abandoned-calls").val()}\n`;
      dataStr += `Appts per day: ${$("#Patients-seen-each-day").val()}\n`;
      dataStr += `PNo show rate: ${$("#No-shows").val()}\n\n`;

      dataStr += `Phone Tag Cost: ${$("#phone-tag-cost").text()}\n`;
      dataStr += `Abandoned Calls Cost: ${$("#abandoned-call-cost").text()}\n`;
      dataStr += `Appointment No-Show Cost: ${$("#no-show-cost").text()}\n`;
      dataStr += `Total Cost Savings: ${$("#Savings").text()}\n`;
      dataStr += `ROI on Klara: ${$("#annual-roi").text()}\n`;

      const leadData = {
        number_of_providers__c: $("#Providers").val(),
        FirstName: $("#First-Name-Details-Start").val(),
        LastName: $("#Last-Name-Details-Start").val(),
        Email: $("#Email-Details-Start").val(),
        Phone: $("#Phone-Details-Start").val(),
        Company: $("#Company-Details-Start").val(),
        EMR__c: $("#EMR-C").val(),
        Notes: dataStr,

        // UTM params
        Asset__c: $("#Asset__c").val(),
        Asset_Title__c: $("#Asset_Title__c").val(),
        gclid: $("#gclid").val(),
        utm_source: $("#utm_source").val(),
        utm_medium: $("#utm_medium").val(),
        utm_campaign: $("#utm_campaign").val(),
        utm_term: $("#utm_term").val(),
      };

      showRoiBtn.attr("href", "#charts-final");

      $("#form-gated").addClass("hidden");

      $("#charts-final").removeClass("hidden");
      $("#small-section").removeClass("hidden");
      $("#roi-footer").removeClass("hidden");

      $("#second-progress-dot").addClass("show-icon");
      $("#second-done-icon").addClass("show");
      $("#third-progress-dot").removeClass("disabled-progress-bar");
      $("#progres-line").addClass("completed-line");

      ChiliPiper.submit("klara", "roi_calculator", {
        lead: leadData,
        domElement: "#chilipiper-date-picker",
        injectRootCss: true,
        title: "Schedule your consultation now",
        onSuccess: function () {
          $("#third-progress-dot").addClass("show-icon");
          $("#third-done-icon").addClass("show");
        },
      });
    });
  }

  {
    // Setting providers if persent from search params

    const url = new URL(document.URL);
    const search = url.search && url.search.substring(1);
    if (search) {
      const params = new URLSearchParams(search);
      const providers = params.get("providers");
      $("#Providers").val(providers);
      $("#Providers").trigger("input");
      setTimeout(() => $("#calculate-roi")[0].click(), 1500);
    }
  }
});

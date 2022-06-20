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
  if (val === "") return 0;
  else if (val === "0") return 0;
  else return Number(val);
};

const calculatePhoneTagCost = (
  outbound_calls_per_day,
  calls_connected,
  time_per_call,
  hourly_wage_calling
) => {
  if (
    isNaN(Number(outbound_calls_per_day)) &&
    isNaN(Number(calls_connected)) &&
    isNaN(Number(time_per_call)) &&
    isNaN(Number(hourly_wage_calling))
  )
    return false;

  const result =
    (+outbound_calls_per_day *
      (1 - +calls_connected) *
      hourly_wage_calling *
      time_per_call *
      20 *
      12) /
    60;

  return result;
};

const calculateAbandonedCallsCost = (
  inbound_calls_per_day,
  calls_abandoned,
  percent_calls_scheduling,
  rev_per_appt
) => {
  if (
    isNaN(Number(inbound_calls_per_day)) &&
    isNaN(Number(calls_abandoned)) &&
    isNaN(Number(percent_calls_scheduling)) &&
    isNaN(Number(rev_per_appt))
  )
    return false;

  const result =
    +inbound_calls_per_day *
    +calls_abandoned *
    percent_calls_scheduling *
    rev_per_appt *
    20 *
    12;

  return result;
};

const calculateNoShowCost = (appts_per_day, no_shows, rev_per_appt) => {
  if (
    isNaN(Number(appts_per_day)) &&
    isNaN(Number(no_shows)) &&
    isNaN(Number(rev_per_appt))
  )
    return false;

  const result = +appts_per_day * +no_shows * rev_per_appt * 20 * 12;

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
    `conic-gradient(#f2ecff ${x}deg, #b39cf7 0 ${y}deg, #625be1 0)`
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

  $(".first-year .white-bar").css("height", `${firstRoiHeight}%`);
  $(".first-year .rose-chart").css("height", `${firstInvHeight}%`);
  $(".first-year-savings").text("$" + nftd.format(net_profit));
};

let percent_phone_tag_savings = 0,
  percent_abandoned_calls_savings = 0,
  percent_no_show_savings = 0;

let outbound_calls_per_day = null,
  calls_connected = null,
  inbound_calls_per_day = null,
  calls_abandoned = null,
  appts_per_day = null,
  no_shows = null;

let phone_tag_cost = null,
  abandoned_calls_cost = null,
  no_show_cost = null,
  time_per_call = null,
  hourly_wage_calling = null,
  percent_calls_scheduling = null,
  rev_per_appt = null;

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
  const phone_tag_savings = phone_tag_cost * percent_phone_tag_savings;
  const abandoned_calls_savings =
    abandoned_calls_cost * percent_abandoned_calls_savings;
  const no_show_savings = no_show_cost * percent_no_show_savings;
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

const downloadPdf = async () => {
  const getData = (id, defaultValue = 0) => {
    let value = $(`#${id}`).val();
    value = value
      ? isNaN(Number(value))
        ? defaultValue
        : Number(value)
      : defaultValue;

    return value;
  };

  const formatNum = (num) => nftd.format(num);
  const formatInd = (num) => {
    const intInd = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return intInd.format(num);
  };

  let phone_tag_savings = phone_tag_cost * percent_phone_tag_savings;
  let abandoned_calls_savings =
    abandoned_calls_cost * percent_abandoned_calls_savings;
  let no_show_savings = no_show_cost * percent_no_show_savings;
  const total_savings_per_year =
    phone_tag_savings + abandoned_calls_savings + no_show_savings;
  let no_of_providers = getData("Providers", 20);
  let total_cost = 200 * 12 * no_of_providers;
  const net_profit_first = total_savings_per_year - total_cost;
  const percent_roi = total_savings_per_year / total_cost;
  const percent_roi_3 = Math.round(percent_roi * 100);

  const postData = {
    no_of_providers: formatInd(no_of_providers),
    outbound_calls_per_day: formatInd(outbound_calls_per_day),
    percent_of_connected_calls: formatInd(calls_connected * 100) + "%",
    average_call_length: `${formatInd(time_per_call)} min`,
    hourly_staff_wage: `$${formatNum(hourly_wage_calling)}`,
    inbound_calls_per_day: formatInd(inbound_calls_per_day),
    percent_of_calls_abandoned: formatInd(calls_abandoned * 100) + "%",
    percent_of_scheduling_calls:
      formatInd(percent_calls_scheduling * 100) + "%",
    appointments_per_day: formatInd(appts_per_day),
    percent_of_noshows: formatInd(no_shows * 100) + "%",
    avg_appt_rev: `$${formatNum(rev_per_appt)}`,
    phone_tag_cost: `$${formatNum(phone_tag_cost)}`,
    abandoned_calls_cost: `$${formatNum(abandoned_calls_cost)}`,
    no_show_cost: `$${formatNum(no_show_cost)}`,
    phone_tag_reduction: formatInd(percent_phone_tag_savings * 100) + "%",
    abandoned_call_reduction:
      formatInd(percent_abandoned_calls_savings * 100) + "%",
    no_show_reduction: formatInd(percent_no_show_savings * 100) + "%",
    total_savings_per_year: `$${formatNum(total_savings_per_year)}`,
    net_profit_first: `$${formatNum(net_profit_first)}`,
    percent_roi: formatInd(percent_roi_3) + "%",
  };

  $("#roi-repport-download div:not(:first-child)").text("Generating PDF...");
  const bodyData = JSON.stringify({
    data: postData,
    logo: false,
  });
  fetch(
    "https://5w7wjn195l.execute-api.us-east-1.amazonaws.com/prod/klata-roi-results",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    }
  )
    .then((res) => {
      if (res.status == 200) return res.json();
      else throw new Error(res.statusText);
    })
    .then(({ data: { Location, Key } }) => {
      fetch(Location, {
        method: "GET",
      })
        .then((res) => res.blob())
        .then(async (file) => {
          $("#roi-repport-download div:not(:first-child)").text(
            "Download Results"
          );

          const pdfUrl = URL.createObjectURL(file);
          const downloadEl = document.createElement("a");
          downloadEl.setAttribute("href", pdfUrl);
          // downloadEl.setAttribute("target", "_blank");
          downloadEl.setAttribute("download", "Klara ROI Results");
          downloadEl.style.display = "none";
          document.body.appendChild(downloadEl);
          downloadEl.click();

          $("#third-progress-dot").addClass("show-icon");
          $("#third-done-icon").addClass("show");

          try {
            const deleteApiCall = await fetch(
              "https://5w7wjn195l.execute-api.us-east-1.amazonaws.com/prod/klara-delete-pdf",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: Key }),
              }
            );
            await deleteApiCall.json();
          } catch (error) {
            console.error(error);
          }
        })
        .catch((err) => {
          console.error(err);
          $("#roi-repport-download div:not(:first-child)").text(
            "Download Results"
          );
        });
    })
    .catch((err) => {
      console.error(err);
      $("#roi-repport-download div:not(:first-child)").text("Download Results");
    });
};

window.addEventListener("load", function () {
  {
    // Higlighting first progress dot
    $("#first-progress-dot").removeClass("disabled-progress-bar");
  }

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

      if (providers && !isNaN(Number(providers)))
        goBtn.removeClass("disabled-button");
      else goBtn.addClass("disabled-button");
    });

    goBtn.on("click", function () {
      $("#bottom-progress-bar").addClass("hidden");

      $("#progress-bar-top")
        .removeClass("hidden")
        .removeClass("box-shadow-white");
      $("#Card-Section").removeClass("hidden");
      $("#first-progress-dot").removeClass("disabled-progress-bar");
    });
  }

  const showRoiBtn = $("#see-your-roi");
  const checkRoiBtn = () => {
    let flag = true;
    const inputValsArr = [
      $("#Calls-Make-Per-Day").val(),
      $("#Speaking-With-Patient").val(),
      $("#Calls-Receive-Per-Day").val(),
      $("#Abandoned-Calls").val(),
      $("#Patients-Seen-Each-Day").val(),
      $("#No-Shows").val(),
      $("#Avg-Time-Per-Call").val(),
      $("#hourlyWage").val(),
      $("#Percentage-Scheduling").val(),
      $("#revenue").val(),
    ];

    for (let i = 0; i < inputValsArr.length; i++) {
      const inputVal = inputValsArr[i];
      if (inputVal === "" || inputVal === "0") {
        flag = false;
        break;
      }
    }

    if (flag) showRoiBtn.removeClass("disabled-button");
    else showRoiBtn.addClass("disabled-button");
  };

  showRoiBtn.on("click", function () {
    $("#sliderSection").removeClass("hidden");
  });

  {
    // ROI CALCULATOR CODE

    {
      $("#roi-repport-download").on("click", function (ev) {
        ev.preventDefault();

        $("#second-progress-dot").addClass("show-icon");
        $("#second-done-icon").addClass("show");
        $("#progres-line").addClass("completed-line");
        $("#third-progress-dot").removeClass("disabled-progress-bar");

        downloadPdf();
      });
    }

    document.getElementById("num-of-providers").reset();
    document.getElementById("roi-calc-form").reset();

    {
      // Handling no. of providers input
      $("#Providers").on("input", () =>
        showTotalSavings({ phone_tag_cost, abandoned_calls_cost, no_show_cost })
      );

      // Phone tag cost

      const updatePhoneTagCost = () => {
        let res = calculatePhoneTagCost(
          outbound_calls_per_day,
          calls_connected,
          time_per_call,
          hourly_wage_calling
        );
        if (res !== false) {
          res = Math.round(res);
          phone_tag_cost = res;
          $("#costOfPhone").html("$" + nftd.format(res));
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
          $("#costOfPhone").text("NA");
        }
      };

      $("#Calls-Make-Per-Day").on("input", function () {
        outbound_calls_per_day = getNum($(this), 400);
        updatePhoneTagCost();
      });
      $("#Speaking-With-Patient").on("input", function () {
        calls_connected = getNum($(this), 30) / 100;
        updatePhoneTagCost();
      });
      $("#Avg-Time-Per-Call").on("input", function () {
        time_per_call = getNum($(this), 3);
        updatePhoneTagCost();
      });
      $("#hourlyWage").on("input", function () {
        hourly_wage_calling = getNum($(this), 3);
        updatePhoneTagCost();
      });

      $("#clear-button-1").on("click", function () {
        $("#Calls-Make-Per-Day").val("0");
        $("#Speaking-With-Patient").val("0");
        outbound_calls_per_day = calls_connected = 0;
        updatePhoneTagCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-1").addClass("hidden");
      });

      // Abandoned calls cost

      const updateAbandonedCallsCost = () => {
        let res = calculateAbandonedCallsCost(
          inbound_calls_per_day,
          calls_abandoned,
          percent_calls_scheduling,
          rev_per_appt
        );
        if (res !== false) {
          res = Math.round(res);
          abandoned_calls_cost = res;
          $("#CostAbandoned").html("$" + nftd.format(res));
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
          $("#CostAbandoned").text("NA");
        }
      };

      $("#Calls-Receive-Per-Day").on("input", function () {
        inbound_calls_per_day = getNum($(this), 400);
        updateAbandonedCallsCost();
      });
      $("#Abandoned-Calls").on("input", function () {
        calls_abandoned = getNum($(this), 10) / 100;
        updateAbandonedCallsCost();
      });
      $("#Percentage-Scheduling").on("input", function () {
        percent_calls_scheduling = getNum($(this), 35) / 100;
        updateAbandonedCallsCost();
      });
      $("#revenue").on("input", function () {
        rev_per_appt = getNum($(this), 150);
        updateAbandonedCallsCost();
        updateNoShowCost();
      });

      $("#clear-button-2").on("click", function () {
        $("#Abandoned-Calls").val("0");
        $("#Calls-Receive-Per-Day").val("0");
        inbound_calls_per_day = calls_abandoned = 0;
        updateAbandonedCallsCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-2").addClass("hidden");
      });

      // No-show cost

      const updateNoShowCost = () => {
        let res = calculateNoShowCost(appts_per_day, no_shows, rev_per_appt);
        if (res !== false) {
          res = Math.round(res);
          no_show_cost = res;
          $("#costNoShows").html("$" + nftd.format(res));
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
          $("#costNoShows").text("NA");
        }
      };

      $("#Patients-Seen-Each-Day").on("input", function () {
        appts_per_day = getNum($(this), 200);
        updateNoShowCost();
      });
      $("#No-Shows").on("input", function () {
        no_shows = getNum($(this), 20) / 100;
        updateNoShowCost();
      });

      $("#clear-button-3").on("click", function () {
        $("#Patients-Seen-Each-Day").val("0");
        $("#No-Shows").val("0");
        appts_per_day = no_shows = 0;
        updateNoShowCost();
        $(this).addClass("disabled");
        checkRoiBtn();
        $("#card-result-3").addClass("hidden");
      });
    }
  }

  {
    // Klara savings percent

    $("#phoneTag").on("input", function () {
      percent_phone_tag_savings = getNum($(this), 75) / 100;
      showTotalSavings({
        phone_tag_cost,
        abandoned_calls_cost,
        no_show_cost,
      });
    });

    $("#abandonedCalls").on("input", function () {
      percent_abandoned_calls_savings = getNum($(this), 75) / 100;
      showTotalSavings({
        phone_tag_cost,
        abandoned_calls_cost,
        no_show_cost,
      });
    });

    $("#noShows").on("input", function () {
      percent_no_show_savings = getNum($(this), 75) / 100;
      showTotalSavings({
        phone_tag_cost,
        abandoned_calls_cost,
        no_show_cost,
      });
    });

    $("#savingsButton").on("click", function () {
      $("#charts-section").removeClass("hidden");
      $("#roi-footer").removeClass("hidden");

      $("#first-progress-dot").addClass("show-icon");
      $("#first-done-icon").addClass("show");
      $("#progres-line").addClass("half-full");
      $("#second-progress-dot").removeClass("disabled-progress-bar");
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

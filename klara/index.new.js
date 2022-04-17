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

const delay = (time) =>
  new Promise((res, rej) => {
    setTimeout(res(null), time);
  });

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
  const formatPercent = (num) => {
    const intInd = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return intInd.format(num);
  };

  const outbound_calls_per_day = getData("Calls-make-per-day", 400);
  const percent_of_connected_calls = getData("Speaking-with-patient", 30);
  const inbound_calls_per_day = getData("Calls-receive-per-day", 400);
  const percent_of_calls_abandoned = getData("Abandoned-calls", 10);
  const appointments_per_day = getData("Patients-seen-each-day", 200);
  const percent_of_noshows = getData("No-shows", 20);

  const phone_tag_cost = calculatePhoneTagCost(
    outbound_calls_per_day,
    percent_of_connected_calls
  );
  const abandoned_calls_cost = calculateAbandonedCallsCost(
    inbound_calls_per_day,
    percent_of_calls_abandoned
  );
  const no_show_cost = calculateNoShowCost(
    appointments_per_day,
    percent_of_noshows
  );

  let phone_tag_savings = phone_tag_cost * 0.75;
  let abandoned_calls_savings = abandoned_calls_cost * 0.3;
  let no_show_savings = no_show_cost * 0.35;
  const total_savings_per_year =
    phone_tag_savings + abandoned_calls_savings + no_show_savings;
  let no_of_providers = getData("Providers", 20);
  let total_cost = 200 * 12 * no_of_providers;
  const net_profit_first = total_savings_per_year - total_cost;
  const net_profit_three = net_profit_first * 3;
  const percent_roi = total_savings_per_year / total_cost;
  const percent_roi_3 = Math.round(percent_roi * 100);

  const postData = {
    outbound_calls_per_day: formatInd(outbound_calls_per_day),
    percent_of_connected_calls: formatInd(percent_of_connected_calls),
    inbound_calls_per_day: formatInd(inbound_calls_per_day),
    percent_of_calls_abandoned: formatInd(percent_of_calls_abandoned),
    appointments_per_day: formatInd(appointments_per_day),
    percent_of_noshows: formatInd(percent_of_noshows),
    phone_tag_cost: formatNum(phone_tag_cost),
    abandoned_calls_cost: formatNum(abandoned_calls_cost),
    no_show_cost: formatNum(no_show_cost),
    total_savings_per_year: formatNum(total_savings_per_year),
    net_profit_first: formatNum(net_profit_first),
    // net_profit_three: formatNum(net_profit_three),
    percent_roi: formatInd(percent_roi_3) + "%",
  };

  $("#roi-repport-download div:not(.download-icon)").text("Generating PDF...");
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
          $("#roi-repport-download div:not(.download-icon)").text(
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
          $("#roi-repport-download div:not(.download-icon)").text(
            "Download Results"
          );
        });
    })
    .catch((err) => {
      console.error(err);
      $("#roi-repport-download div:not(.download-icon)").text(
        "Download Results"
      );
    });
};

window.addEventListener("load", async function () {
  // await delay(2000);

  // const tab1 = document.getElementById("w-tabs-0-data-w-tab-0"),
  //   tab2 = document.getElementById("w-tabs-0-data-w-tab-1"),
  //   tab3 = document.getElementById("w-tabs-0-data-w-tab-2");

  const [tab1, tab2, tab3] = document.querySelectorAll(
    ".w-tabs .w-tab-menu .w-tab-link"
  );

  const progressEls = [
    [
      $("#first-tab .progress-bar-content.first"),
      $("#first-tab .progress-bar-content.second"),
      $("#first-tab .progress-bar-content.third"),
    ],
    [
      $("#second-tab .progress-bar-content.first"),
      $("#second-tab .progress-bar-content.second"),
      $("#second-tab .progress-bar-content.third"),
    ],
    [
      $("#third-tab .progress-bar-content.first"),
      $("#third-tab .progress-bar-content.second"),
      $("#third-tab .progress-bar-content.third"),
    ],
  ];

  // attaching click listeners

  for (let i = 0; i < 3; i++) {
    const [t1, t2, t3] = progressEls[i];
    t1.on("click", function () {
      tab1.click();
      $(tab1).trigger("click");
    });
    t2.on("click", function () {
      tab2.click();
      $(tab2).trigger("click");
    });
    t3.on("click", function () {
      tab3.click();
      $(tab3).trigger("click");
    });
  }

  {
    // 1st Section
    const providersInput = $("#Providers"),
      goBtn = $("#calculate-roi");

    providersInput.val("");

    providersInput.on("input", function () {
      const providers = $(this).val();

      if (providers && !isNaN(Number(providers))) goBtn.removeClass("disabled");
      else goBtn.addClass("disabled");
    });

    goBtn.on("click", function () {
      $("#bottom-progress-bar").addClass("hidden");

      progressEls[0][1].removeClass("disabled");
      progressEls[0][1]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[1][1].removeClass("disabled");
      progressEls[1][1]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[2][1].removeClass("disabled");
      progressEls[2][1]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[0][1].click();
      progressEls[0][1].trigger("click");

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

    {
      $("#roi-repport-download").on("click", function (ev) {
        ev.preventDefault();

        $("#second-progress-dot").addClass("show-icon");
        $("#second-done-icon").addClass("show");
        $("#progres-line").addClass("completed-line");
        $("#third-progress-dot").addClass("show-icon");
        $("#third-done-icon").addClass("show");

        downloadPdf();
      });
    }

    let outbound_calls_per_day = 400,
      calls_connected = 30,
      inbound_calls_per_day = 400,
      calls_abandoned = 10,
      appts_per_day = 200,
      no_shows = 20;

    let phone_tag_cost = 50400,
      abandoned_calls_cost = 504000,
      no_show_cost = 1440000;

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

    showRoiBtn.on("click", function () {
      $("#charts-section").removeClass("hidden");
      $("#small-section").removeClass("hidden");
      $("#roi-footer").removeClass("hidden");
      $("#second-progress-dot").removeClass("disabled-progress-bar");
      $("#download-result").removeClass("disabled");

      progressEls[0][2].removeClass("disabled");
      progressEls[0][2]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[1][2].removeClass("disabled");
      progressEls[1][2]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[2][2].removeClass("disabled");
      progressEls[2][2]
        .find(".progress-bar-dot")
        .removeClass("disabled-progress-bar");
      progressEls[1][2].click();

      $("#first-done-icon").addClass("show");
      $("#first-progress-dot").addClass("show-icon");
      $("#progres-line").addClass("half-full");
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
    }
  }
});

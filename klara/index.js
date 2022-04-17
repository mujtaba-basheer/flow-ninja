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
  $("#show-your-roi").removeClass("disabled-button");

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

const downloadPdf = async (ev) => {
  ev.preventDefault();

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
  const percent_roi = formatNum(total_savings_per_year / total_cost) + "%";

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
    net_profit_three: formatNum(net_profit_three),
    percent_roi,
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

window.addEventListener("load", () => {
  {
    document.getElementById("email-form-2").reset();
  }

  {
    $("#roi-repport-download").on("click", downloadPdf);
  }

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
    $("#Providers").on("input", () =>
      showTotalSavings({ phone_tag_cost, abandoned_calls_cost, no_show_cost })
    );

    // Phone tag cost

    const updatePhoneTagCost = () => {
      let res = calculatePhoneTagCost(outbound_calls_per_day, calls_connected);
      if (res) {
        res = Math.round(res);
        phone_tag_cost = res;
        $("#phone-tag-cost").html("$" + nftd.format(res) + yearSup);
        $("#phone-tag-cost").addClass("gray-900");
        $("#result-div1").removeClass("border-grey-500");
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
});

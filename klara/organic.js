const nftd = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  currency: "USD",
});

const getNum = (el, def) => {
  const val = el.val();
  if (val === "") return def;
  else if (val === "0") return 0;
  else if (isNaN(Number(val))) return "NA";
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

const validateForm1 = (id) => {
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
    // ROI CALCULATOR CODE

    document.getElementById("wf-form-Free-Demo").reset();

    {
      // Phone tag cost

      let outbound_calls_per_day = 400,
        calls_connected = 0.3,
        time_per_call = 3,
        hourly_wage_calling = 15;

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
          $("#phoneTagCost")
            .html("$" + nftd.format(res))
            .removeClass("inactive");
          $("#phoneTagHeading").removeClass("inactive");
          $("#phoneTagBorder").removeClass("inactive");
        } else {
          $("#phoneTagCost").text("NA").addClass("inactive");
          $("#phoneTagHeading").addClass("inactive");
          $("#phoneTagBorder").addClass("inactive");
        }
      };

      $("#phoneProviders").on("input", function () {
        no_of_providers = getNum($(this), 20);
        updatePhoneTagCost();
      });
      $("#phonePractice").on("input", function () {
        outbound_calls_per_day = getNum($(this), 400);
        updatePhoneTagCost();
      });
      $("#speakingWithPatient").on("input", function () {
        calls_connected = getNum($(this), 30) / 100;
        updatePhoneTagCost();
      });
      $("#callLength").on("input", function () {
        time_per_call = getNum($(this), 3);
        updatePhoneTagCost();
      });
      $("#staffWage").on("input", function () {
        hourly_wage_calling = getNum($(this), 15);
        updatePhoneTagCost();
      });
    }

    {
      // Abandoned calls cost

      let inbound_calls_per_day = 400,
        calls_abandoned = 0.1,
        percent_calls_scheduling = 0.35,
        rev_per_appt = 150;

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
          $("#abandonedTagCost")
            .html("$" + nftd.format(res))
            .removeClass("inactive");
          $("#abandonedTagHeading").removeClass("inactive");
          $("#abandonedTagBorder").removeClass("inactive");
        } else {
          $("#abandonedTagCost").text("NA").addClass("inactive");
          $("#abandonedTagHeading").addClass("inactive");
          $("#abandonedTagBorder").addClass("inactive");
        }
      };

      $("#abandonedPractice").on("input", function () {
        inbound_calls_per_day = getNum($(this), 400);
        updateAbandonedCallsCost();
      });
      $("#abandonedPerecentage").on("input", function () {
        calls_abandoned = getNum($(this), 10) / 100;
        updateAbandonedCallsCost();
      });
      $("#patientScheduling").on("input", function () {
        percent_calls_scheduling = getNum($(this), 35) / 100;
        updateAbandonedCallsCost();
      });
      $("#abandonedRevenue").on("input", function () {
        rev_per_appt = getNum($(this), 150);
        updateAbandonedCallsCost();
      });
    }

    {
      // No-show cost

      let appts_per_day = 200,
        no_shows = 0.2,
        rev_per_appt = 150;

      const updateNoShowCost = () => {
        let res = calculateNoShowCost(appts_per_day, no_shows, rev_per_appt);
        if (res !== false) {
          res = Math.round(res);
          no_show_cost = res;
          $("#noShowsTagCost")
            .html("$" + nftd.format(res))
            .removeClass("inactive");
          $("#noShowsTagHeading").removeClass("inactive");
          $("#noShowsTagBorder").removeClass("inactive");
        } else {
          $("#noShowsTagCost").text("NA").addClass("inactive");
          $("#noShowsTagHeading").addClass("inactive");
          $("#noShowsTagBorder").addClass("inactive");
        }
      };

      $("#noShowsPatients").on("input", function () {
        appts_per_day = getNum($(this), 200);
        updateNoShowCost();
      });
      $("#noShows").on("input", function () {
        no_shows = getNum($(this), 20) / 100;
        updateNoShowCost();
      });
      $("#revenue").on("input", function () {
        no_shows = getNum($(this), 20) / 100;
        updateNoShowCost();
      });
    }
  }

  {
    // Chilipiper Form

    const chiliPiperForm = $("#wf-form-Free-Demo"),
      submitBtn = $("#roi-details-submit");

    chiliPiperForm.find("input").each(function () {
      $(this).on("input", function () {
        flag = validateForm1("wf-form-Free-Demo");
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
      dataStr += `Name: ${$("#FirstName").val()} ${$("#LastName").val()}\n\n`;

      dataStr += `No. of providers (Phone Tag): ${$(
        "#phoneProviders"
      ).val()}\n`;
      dataStr += `No. of providers (Abandoned Calls): ${$(
        "#abandonedProviders"
      ).val()}\n`;
      dataStr += `No. of providers (No Shows): ${$(
        "#noShowsProviders"
      ).val()}\n`;

      dataStr += `Avg outbound calls made per day: ${$(
        "#phonePractice"
      ).val()}\n`;
      dataStr += `% connected: ${$("#speakingWithPatient").val()}\n`;
      dataStr += `Inbound patient calls per day: ${$(
        "#abandonedPractice"
      ).val()}\n`;
      dataStr += `Patient call abandonment: ${$(
        "#abandonedPerecentage"
      ).val()}\n`;
      dataStr += `Appts per day: ${$("#noShowsPatients").val()}\n`;
      dataStr += `PNo show rate: ${$("#noShows").val()}\n\n`;

      dataStr += `Phone Tag Cost: ${$("#phoneTagCost").text()}\n`;
      dataStr += `Abandoned Calls Cost: ${$("#abandonedTagCost").text()}\n`;
      dataStr += `Appointment No-Show Cost: ${$("#noShowsTagCost").text()}\n`;

      const leadData = {
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        Email: $("#Email").val(),
        Phone: $("#Phone").val(),
        Company: $("#Company").val(),
        State: $("#State").val(),
        number_of_providers__c: $("#number_of_providers__c").val(),
        EMR__c: $("#EMR__c").val(),
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

      ChiliPiper.submit("klara", "Test_router", {
        lead: leadData,
        injectRootCss: true,
        title: "Schedule your consultation now",
        map: true,
        onSuccess: function () {
          setTimeout(
            () => $("#wf-form-Free-Demo").css("display", "none"),
            7000
          );
          setTimeout(
            () =>
              $("div.klara-organic-success-message")
                .removeClass("hidden")
                .css("z-index", "2"),
            8000
          );
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

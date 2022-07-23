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

let inbound_calls_per_day = null,
  calls_abandoned = null,
  appts_per_day = null,
  no_shows = null;

let abandoned_calls_cost = null,
  no_show_cost = null,
  percent_calls_scheduling = null,
  rev_per_appt = null;

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

      $("#phonePractice").on("input", function () {
        outbound_calls_per_day = getNum($(this), 400);
        updatePhoneTagCost();
      });
      $("#speakingWithPatient").on("input", function () {
        calls_connected = getNum($(this), 30) / 100;
        updatePhoneTagCost();
      });
      $("#callLength-2").on("input", function () {
        time_per_call = getNum($(this), 3);
        updatePhoneTagCost();
      });
      $("#staffWage").on("input", function () {
        hourly_wage_calling = getNum($(this), 15);
        updatePhoneTagCost();
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

      dataStr += `No. of providers: ${$("#phoneProviders").val()}\n`;
      dataStr += `Avg outbound calls made per day: ${$(
        "#phonePractice"
      ).val()}\n`;
      dataStr += `% connected: ${$("#speakingWithPatient").val()}\n`;

      dataStr += `Phone Tag Cost: ${$("#phoneTagCost").text()}\n`;

      const leadData = {
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        Email: $("#Email").val(),
        Phone: $("#Phone").val(),
        Company: $("#Company").val(),
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
        onError: function () {
          console.log("Error occured!");
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

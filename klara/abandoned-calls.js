const nftd = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  currency: "USD",
});

const getNum = (el, def) => {
  const val = el.val();
  console.log({ val });
  if (val === "") return def;
  else if (val === "0") return 0;
  else if (isNaN(Number(val))) return "NA";
  else return Number(val);
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

      dataStr += `No. of providers: ${$("#abandonedProviders").val()}\n`;
      dataStr += `Inbound patient calls per day: ${$(
        "#abandonedPractice"
      ).val()}\n`;
      dataStr += `Patient call abandonment: ${$(
        "#abandonedPerecentage"
      ).val()}\n`;

      dataStr += `Abandoned Calls Cost: ${$("#abandonedTagCost").text()}\n`;

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

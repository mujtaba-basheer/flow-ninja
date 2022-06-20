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
        } else {
          $("#noShowsTagCost").text("NA").addClass("inactive");
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
        flag = validateForm("wf-form-Free-Demo");
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

      dataStr += `No. of providers: ${$("#noShowsProviders").val()}\n`;
      dataStr += `Appts per day: ${$("#noShowsPatients").val()}\n`;
      dataStr += `PNo show rate: ${$("#noShows").val()}\n\n`;

      dataStr += `Appointment No-Show Cost: ${$("#noShowsTagCost").text()}\n`;

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

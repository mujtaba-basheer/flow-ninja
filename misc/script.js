(function () {
  var didInit = false;

  function initMunchkin() {
    if (didInit === false) {
      didInit = true;
      Munchkin.init("518-RKL-392");
    }
  }
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "//munchkin.marketo.net/munchkin.js";
  s.onload = initMunchkin;
  s.onreadystatechange = function () {
    if (this.readyState == "complete" || this.readyState == "loaded") {
      initMunchkin();
    }
  };
  document.getElementsByTagName("head")[0].appendChild(s);
})();

const chilipiperSubmit = (lead) => {
  return new Promise((res, rej) => {
    ChiliPiper.submit("upwork", "inbound-router", {
      lead,
      onSuccess: function () {
        res(null);
      },
      onError: function () {
        rej(null);
      },
    });
  });
};

var onSuccessSubmit = async function () {
  function format(value) {
    var hours = parseInt(value, 10);
    if (hours === 0) {
      hours = "00";
    } else if (hours > 0) {
      hours = hours < 10 ? "+0" + hours : "+" + hours; // add a plus sign and perhaps an extra 0
    } else {
      hours = hours > -10 ? "-0" + Math.abs(hours) : hours; // add an extra 0 if needed
    }
    var mins = Math.abs(value - parseInt(value, 10)) * 60;
    mins = mins < 10 ? "0" + mins : mins;
    return hours + ":" + mins;
  }

  function getTimeOffset(dailightSavingsTime) {
    //default to standard time; dailightSavingsTime === false
    var month = !!dailightSavingsTime ? 6 : 0;
    var now = new Date();
    var gmt = new Date(now.getFullYear(), month, 1, 0, 0, 0, 0); // jan 1st
    var tmp = gmt.toGMTString();
    var local = new Date(tmp.substring(0, tmp.lastIndexOf(" ")));
    return (gmt - local) / (1000 * 60 * 60);
  }

  function getStdTimeOffset() {
    return getTimeOffset();
  }

  function getDaylightTimeOffset() {
    return getTimeOffset(true);
  }

  function detectTimezone() {
    var stdTimeOffset = getStdTimeOffset();
    var daylightTimeOffset = getDaylightTimeOffset();
    var dst;
    if (stdTimeOffset === daylightTimeOffset) {
      dst = "0"; // daylight savings time is NOT observed
    } else {
      // positive is southern, negative is northern hemisphere
      var hemisphere = stdTimeOffset - daylightTimeOffset;
      if (hemisphere >= 0) {
        stdTimeOffset = daylightTimeOffset;
      }
      dst = "1"; // daylight savings time is observed
    }
    return format(stdTimeOffset) + "," + dst;
  }
  var submittedDataJson = window.localStorage.getItem(`marketo-form-data-1154`);
  var parsedData;
  var result;
  if (submittedDataJson) {
    parsedData = JSON.parse(submittedDataJson)?.data;

    if (clearbit) {
      clearbit.identify(
        typeof visitorId !== "undefined" ? visitorId : parsedData.Email,
        {
          email: parsedData.Email,
          submittedContactUsForm: true,
          company:
            clearbitDetails && clearbitDetails.company
              ? clearbitDetails.company.name
              : undefined,
        }
      );
    }

    if (parsedData) {
      result = {
        firstName: parsedData.FirstName,
        lastName: parsedData.LastName,
        email: parsedData.Email,
        title: parsedData.Title,
        company: parsedData.Company,
        country: parsedData.Country,
        phone: parsedData.Phone,
      };
      try {
        await this.httpClient()
          .url(`/i/api/storage/marketo-enterprise/`)
          .post(result)
          .res();
      } catch (err) {
        console.error(`[VS Marketo] Could not save to segmentation: ${err}`);
      }
    }
  }
  var submittedData = await this.mktoService.getSubmittedData("1154");
  if (submittedData) {
    var kvlData = this.mktoService.convertValuesFromMarketo(submittedData);
    var numberOfEmployees;
    switch (String(kvlData.numberOfEmployees)) {
      default:
      case "25":
        numberOfEmployees = "1-49";
        break;
      case "100":
        numberOfEmployees = "50-149";
        break;
      case "175":
        numberOfEmployees = "150-249";
        break;
      case "750":
        numberOfEmployees = "250-999";
        break;
      case "1000":
        numberOfEmployees = "1000+";
        break;
    }
    try {
      var data = await this.httpClient()
        .url("/i/api/reg-flow/save-initial/?mode=mkto")
        .post({
          signup_bogus_form: {
            ...kvlData,
            numberOfEmployees,
            timezone: detectTimezone(),
            referrer: window.location.href,
          },
        })
        .json();
      if (data.success && data.KVLKey) {
        window.localStorage.setItem("marketo-ent-kvl", data.KVLKey);
      }

      const cp_countries = [
        "United States",
        "Australia",
        "United Kingdom",
        "Canada",
        "Israel",
      ];
      if (
        numberOfEmployees === "250-999" ||
        numberOfEmployees === "1000+" ||
        (numberOfEmployees === "150-249" &&
          cp_countries.includes(kvlData?.Country))
      ) {
        try {
          await chilipiperSubmit({
            map: true,
            ...kvlData,
            numberOfEmployees: this.numberOfEmployeesUpdated.id,
          });
          var SELECT_URL = "enterprise/contact-us/thank-you-2";
          var MARKETPLACE_URL = "enterprise/contact-us/thank-you-3";
          var SELECT_QUALIFIED_COUNTRIES = ["US", "CA", "GB", "AU", "IL"];
          if (
            ["750", "1000"].indexOf(this.numberOfEmployeesUpdated.id) !== -1
          ) {
            window.location.pathname = SELECT_URL;
          } else if (
            SELECT_QUALIFIED_COUNTRIES.includes(
              this.countriesService.getIso(this.countryHidden.id)
            )
          ) {
            window.location.pathname = SELECT_URL;
          } else {
            window.location.pathname = MARKETPLACE_URL;
          }
        } catch (error) {}
      }
    } catch (err) {
      console.error(`[VS Marketo] Could not save to KVL: ${err}`);
    }
  }
  var ENT_URL = "enterprise/contact-us/thank-you-1";
  var SELECT_URL = "enterprise/contact-us/thank-you-2";
  var MARKETPLACE_URL = "enterprise/contact-us/thank-you-3";
  var SELECT_QUALIFIED_COUNTRIES = ["US", "CA", "GB", "AU", "IL"];
  if (["750", "1000"].indexOf(this.numberOfEmployeesUpdated.id) !== -1) {
    window.location.pathname = ENT_URL;
  } else if (
    SELECT_QUALIFIED_COUNTRIES.includes(
      this.countriesService.getIso(this.countryHidden.id)
    )
  ) {
    window.location.pathname = SELECT_URL;
  } else {
    window.location.pathname = MARKETPLACE_URL;
  }
};

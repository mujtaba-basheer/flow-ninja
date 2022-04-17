const formId = "Bring-My-Phone-Form";
const successId = "success";
const errorId = "error";
const warningId = "IMEI-error";
const buySimId = "buy-sim";

const validateImei = (values) => {
  const regexESNHex = /^[0-9a-fA-F]{8}$/; // Hex ESN (eight digit mixed case hex)
  const regexESNDec = /^[0-9]{11}$/; // Decimal ESN candidate (eleven decimal digits further validation is possible)
  const regexIMEINoCheckDec = /^[0-9]{14}$/; // Decimal IMEI with no check digit (fourteen digit decimal)
  const regexMEIDNoCheckHex = /^[0-9a-fA-F]{14}$/; // Hex MEID with no check digit (fourteen digit mixed case hex)
  const regexIMEIWithCheckDec = /^[0-9]{15}$/; // Decimal IMEI with check digit (fifteen digit decimal)
  const regexMEIDWithCheckHex = /^[0-9a-fA-F]{15}$/; // Hex MEID with with check digit (fifteen digit mixed case hex)
  const regexMEIDDec = /^[0-9]{18}$/; // Decimal MEID (eighteen digit decimal)
  if (values) {
    const cleanValues = values.replace(/[\s-]+/g, "");
    if (
      !(
        regexESNHex.test(cleanValues) ||
        regexESNDec.test(cleanValues) ||
        regexIMEINoCheckDec.test(cleanValues) ||
        regexMEIDNoCheckHex.test(cleanValues) ||
        regexIMEIWithCheckDec.test(cleanValues) ||
        regexMEIDWithCheckHex.test(cleanValues) ||
        regexMEIDDec.test(cleanValues)
      )
    ) {
      return {
        status: false,
        message: "Invalid IMEI/MEID/ESN",
      };
    }
  } else {
    return {
      status: false,
      message: "You must enter an IMEI/MEID/ESN",
    };
  }
  return {
    status: true,
    message: "Success",
  };
};
const removeWarning = () => {
  if (document.getElementById(warningId))
    document.getElementById(warningId).style.display = "none";
};
const onSuccess = (url) => {
  removeWarning();

  document.getElementById(formId).style.display = "none";
  document.getElementById(errorId).style.display = "none";
  document.getElementById(successId).style.display = "block";
  document
    .querySelector(`#${successId} div.bring-my-phone-second-col`)
    .scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth",
    });

  document.getElementById(buySimId).setAttribute("href", url);
};
const showWarning = (msg) => {
  let warningEl = document.getElementById(warningId);
  if (!warningEl) {
    warningEl = document.createElement("label");
    warningEl.setAttribute("id", "IMEI-error");
    warningEl.setAttribute("for", "IMEI");
    warningEl.classList.add("error");

    document.getElementById("IMEI").after(warningEl);
  }

  warningEl.style.display = "block";
  if (msg) warningEl.textContent = msg;
};

window.addEventListener("load", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const formEl = document.getElementById(formId);
  const inputEl = document.getElementById("IMEI");
  formEl.reset();

  inputEl.addEventListener("input", removeWarning);

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    const imeiNumber = inputEl.value;
    const { status, message } = validateImei(imeiNumber);

    if (status) {
      const postData = JSON.stringify({
        device_id: imeiNumber,
      });

      fetch(
        `https://${window.location.hostname}/api/wireless/byod/v2/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": postData.length,
          },
          body: postData,
        }
      )
        .then((resp) => {
          if (resp.status !== 500) return resp.json();
          throw new Error(resp.statusText);
        })
        .then((data) => {
          const result = data.validation_result;
          const error_code = data.error_code;
          if (result) {
            switch (result) {
              case "VALIDATION_SIM_REQUIRED": {
                onSuccess(
                  `https://${window.location.hostname}/wireless/checkout?plan_id=0&product_id=${data.sim_product_id}`
                );
                break;
              }
              case "VALIDATION_CANNOT_ACTIVATE": {
                showWarning("Sorry, this phone is not compatible.");
                break;
              }
            }
          } else if (error_code) {
            switch (error_code) {
              case "DEVICE_ID_INVALID": {
                showWarning("Invalid IMEI/MEID/ESN");
                break;
              }
              case "DEVICE_NOT_SUPPORTED": {
                showWarning(
                  "Sorry, your phone isn't currently supported by TextNow"
                );
                break;
              }
              case "DEVICE_ID_REQUIRED": {
                showWarning("You must enter an IMEI/MEID/ESN");
                break;
              }
              case "ICCID_INVALID": {
                showWarning("Invalid SIM Number / ICCID");
                break;
              }
              default: {
                showWarning(
                  "Oops, something appears to be wrong. Please try again later."
                );
                break;
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
          showWarning(
            "Oops, something appears to be wrong. Please try again later."
          );
        });
    } else showWarning(message);
  });
});

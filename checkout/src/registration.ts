const DEFAULT_BUSINESS_MODEL = "merchant";
const DUPLICATE_EMAIL_RESPONSE_CODE = "client_with_same_email_already_exists";
const EMAIL_IN_USE_ERROR_CODE =
  "email_address_is_already_registered_as_admin_on_another_client";
const LAMBDA_PROXY_URL =
  // "https://0a50cfhnal.execute-api.us-east-1.amazonaws.com/sandbox";
  "https://checkout-website-cko-web.vercel.app";

const formSubmissionStatus = {
  emailExistsError: 1,
  submitted: 2,
  unknownError: 3,
};

// Current form submission status
let formStatus: null | number = null;

/**
 * Returns data corresponding to all fields specified in the array.
 * @param gate GC instance to interact with.
 * @param keys Keys of the fields to pull data from.
 * @returns
 */
const getGCFormValues = (gate, keys) => {
  return keys.map((k) => gate.form.getFieldById(k)?.getValue());
};

const isAPIErrorException = (error) => {
  return error.request_id !== undefined;
};

const setView = () => {
  const defaultView = document.getElementById(
    "default-block"
  ) as HTMLDivElement;
  const errorView = document.getElementById("error-block") as HTMLDivElement;
  const formView = document.querySelector(
    `div[gcdc-processed]`
  ) as HTMLDivElement;
  switch (formStatus) {
    case 2: {
      defaultView.style.display = "flex";
      errorView.style.display = "none";
      break;
    }
    default: {
      defaultView.style.display = "none";
      errorView.style.display = "flex";
      formView.remove();
      break;
    }
  }
};

const preFormSubmission = async (event) => {
  // event.preventDefault();

  const gateInstance = event.detail;

  const [first_name, last_name, work_email, trading_name] = getGCFormValues(
    gateInstance,
    ["first_name", "last_name", "email", "company"]
  );

  const nasApiData = {
    first_name,
    last_name,
    work_email,
    trading_name,
    business_model: DEFAULT_BUSINESS_MODEL,
  };

  if (work_email.endsWith("@checkout.com")) {
    formStatus = formSubmissionStatus.emailExistsError;
    return;
  }

  try {
    //This maps to our API route within the NextJS app, will need changing.
    const apiRequest = await fetch(
      // `${LAMBDA_PROXY_URL}/register-account`
      `${LAMBDA_PROXY_URL}/api/nas-sandbox-account`,
      {
        method: "POST",
        body: JSON.stringify(nasApiData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!apiRequest.ok) {
      throw await apiRequest.json();
    }
    // const apiResponse = await apiRequest.text();
    formStatus = formSubmissionStatus.submitted;
  } catch (error) {
    console.error(error);
    if (
      isAPIErrorException(error) &&
      (error.error_codes.includes(DUPLICATE_EMAIL_RESPONSE_CODE) ||
        error.error_codes.includes(EMAIL_IN_USE_ERROR_CODE))
    ) {
      formStatus = formSubmissionStatus.emailExistsError;
    } else {
      formStatus = formSubmissionStatus.unknownError;
    }
  }

  setView();
};

window.addEventListener("gcdcGateSubmit", preFormSubmission);

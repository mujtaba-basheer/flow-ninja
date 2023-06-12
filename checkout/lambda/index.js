const axios = require("axios");

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidRequestBody = ({
  first_name,
  last_name,
  work_email,
  trading_name,
  business_model,
}) => {
  const noSpecialCharacters = /[!@#$%^*()_+=\[\]{};:"\\|,<>\/?]+/; // Regex to check if the regex contains special characters
  const isValidFirstName = !noSpecialCharacters.test(first_name);
  const isValidLastName = !noSpecialCharacters.test(last_name);
  const isValidBusinessName = !noSpecialCharacters.test(trading_name);
  const isValidEmail = EMAIL_PATTERN.test(work_email);
  const isValidBusinessModel = business_model === "merchant";

  return (
    isValidFirstName &&
    isValidLastName &&
    isValidEmail &&
    isValidBusinessName &&
    isValidBusinessModel
  );
};

exports.handler = async function (event, context, callback) {
  const body = JSON.parse(event.body);
  if (isValidRequestBody(body)) {
    const { first_name, last_name, work_email, trading_name, business_model } =
      body;

    try {
      const nasAccount = await axios.post(
        process.env.NAS_API_URL || "",
        { first_name, last_name, work_email, trading_name, business_model },
        { headers: { "X-API-KEY": process.env.NAS_API_AUTH_KEY ?? "" } }
      );

      const headers = {};
      for (const key in nasAccount.headers) {
        headers[key] = nasAccount.headers[key];
      }

      callback(null, {
        statusCode: nasAccount.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          status: true,
        }),
      });
    } catch (error) {
      const statusCode = error?.response?.status || 500;
      callback(null, {
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ ...error?.response?.data }),
      });
    }
  } else {
    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ ...error?.response?.data }),
    });
  }
};

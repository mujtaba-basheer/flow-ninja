const axios = require("axios");
const apiEndpoint = `https://api.smartrecruiters.com/v1/companies/${process.env.SMART_RECRUITER_ENV}/postings`;
const limit = 100;

const teams = {
  Finance: 0,
  Technology: 0,
  Commercial: 0,
  Product: 0,
  People: 0,
  Legal: 0,
  Marketing: 0,
};

exports.handler = async function (event, context, callback) {
  try {
    const { data } = await axios.get(apiEndpoint, { params: { limit } });

    let postings = data.content;

    if (data.totalFound > limit) {
      const additionalPostings = await fetchAdditionalPages(data.totalFound);
      postings = postings.concat(additionalPostings);
    }

    for (const job of postings) {
      const customFields = job.customFields;
      if (customFields && Array.isArray(customFields)) {
        const field = customFields.find(
          (field) => field.fieldLabel === "CKO Department"
        );
        if (field) {
          const teamName = field.valueLabel;
          if (Object.keys(teams).includes(teamName)) {
            teams[teamName]++;
          }
        }
      }
    }

    const teamData = Object.entries(teams).map(([t, n]) => ({
      team: t,
      jobs: n,
    }));

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        data: teamData,
      }),
    });
  } catch (error) {
    console.error(error);
    let message;
    if (error.response) {
      message = error.response.data;
    } else message = error.message;
    callback(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: false,
        msg: message,
      }),
    });
  }
};

const fetchAdditionalPages = async (totalFound) => {
  const noOfPages = Math.ceil(totalFound / limit);
  const promises = [];

  for (let i = 0; i < noOfPages - 1; i++) {
    promises.push(
      axios.get(apiEndpoint, {
        params: { limit, offset: limit + i * limit },
      })
    );
  }

  try {
    const additionalPages = await Promise.all(promises);
    return additionalPages.flatMap((page) => page.data.content);
  } catch (error) {
    console.error(error);
    return [];
  }
};

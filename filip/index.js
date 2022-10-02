const https = require("https");

const cmsId = "630d0bf4f807c908f214e0c7";
const tasksId = "630e2c227b03705fe011de0a";
var user = "";

exports.handler = async function (event, context, callback) {
  const body = JSON.parse(event.body);

  try {
    const pass = body.pass;
    switch (pass) {
      case "filipninja":
        user = "Filip Nicic";
        break;
      case "urosninja":
        user = "Uros Mikic";
        break;
      case "kikaninja":
        user = "Kristina Ivanovic";
        break;
      case "markoninja":
        user = "Marko Vukic";
        break;
      case "stefanninja":
        user = "Stefan Mikic";
        break;
      case "tamaraninja":
        user = "Tamara Vitas Mikic";
        break;
      case "ljubisaninja":
        user = "Ljubisa Momcilovic";
        break;
      case "nemanjaninja":
        user = "Nemanja Vasilevski";
        break;
      case "andrijaninja":
        user = "Andrija Djuric";
        break;
      case "pavleninja":
        user = "Pavle Jonic";
        break;
      case "nikolaninja":
        user = "Nikola Nikolic";
        break;
      case "saraninja":
        user = "Sara Stojmenovic";
        break;
      case "mladenninja":
        user = "Mladen Mitic";
        break;
      case "nikolamiticninja":
        user = "Nikola Mitic";
        break;
      case "milanninja":
        user = "Milan Stanojevic";
        break;
      case "milicaninja":
        user = "Milica Djuric";
        break;
      case "milutinninja":
        user = "Milutin Djokic";
        break;
      case "aleksandarninja":
        user = "Aleksandar Markovic";
        break;
      case "ninaninja":
        user = "Katarina Boricic";
        break;
      case "marinkoninja":
        user = "Marko Marinkov";
        break;
      case "lazarninja":
        user = "Lazar Radenkovic";
        break;
      case "mujtabaninja":
        user = "Mujtaba Basheer";
        break;
      case "generalninja":
        user = "*";
        break;
      default:
        user = "";
    }

    if (user !== "" && user) {
      const timeSpent = parseInt(body["time-spent"], 10);
      const currentTime = parseInt(body["current-hours"], 10);
      const newTimeLeft = currentTime - timeSpent;
      const itemId = body.id;
      const itemName = body["client-name"];
      const taskTitle = body["task-title"];
      const pmH = parseInt(body.pmh, 10);
      const desH = parseInt(body.desh, 10);
      const devH = parseInt(body.devh, 10);
      const liveLink = body.link;
      const taskDescription = body.Description;

      const updateCall = updateProject(
        {
          fields: {
            name: `${itemName}`,
            _archived: false,
            _draft: false,
            slug: `${itemId}`,
            "hours-left": newTimeLeft,
          },
        },
        itemId
      );
      const createCall = addTask(
        {
          fields: {
            name: taskTitle,
            _archived: false,
            _draft: false,
            "design-hours": desH,
            "dev-hours": devH,
            "live-link": liveLink,
            "pm-hours": pmH,
            project: itemId,
            "task-description": taskDescription,
          },
        },
        tasksId
      );

      await Promise.all([updateCall, createCall]);

      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "application/json",
        },
        body: {
          status: true,
          message: `Hello ${user}, the task has been created and the hours have been updated`,
        },
      });
    }
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: error.code || error.data.code,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        status: false,
        message: error.message || error.data.msg,
      }),
    });
  }
};

const addTask = (body, tasksId) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: "POST",
        host: "api.webflow.com",
        path: `/collections/${tasksId}/items?live=true`,
        headers: {
          "Accept-Version": "1.0.0",
          Authorization: process.env.API_TOKEN,
          "content-type": "application/json",
        },
      },
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk.toString()));
        resp.on("end", async () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
        resp.on("error", reject);
      }
    );
    request.write(JSON.stringify(body));
    request.end();
  });
};

const updateProject = (body, itemId) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: "PUT",
        host: "api.webflow.com",
        path: `/collections/${cmsId}/items/${itemId}?live=true`,
        headers: {
          "Accept-Version": "1.0.0",
          Authorization: process.env.API_TOKEN,
          "content-type": "application/json",
        },
      },
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk.toString()));
        resp.on("end", async () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
        resp.on("error", reject);
      }
    );
    request.write(JSON.stringify(body));
    request.end();
  });
};

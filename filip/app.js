const https = require("https");

const handler = async () => {};

//webflow credentials
const api_token =
  "5f2ffc4857a825b5e49a5b00c8668000400e742a220abb9913951c3855f5aa63";
const siteId = "630d0aa3894c6a025f5d2b3d";
const cmsId = "630d0bf4f807c908f214e0c7";
const tasksId = "630e2c227b03705fe011de0a";
var user = "";

// Initialize express and define a port
const app = express();
const PORT = 5000;
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use(bodyParser.json());
app.post("/", (req, res) => {
  //validating the user
  var pass = req.body.pass;
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
    console.log(`Welcome ${user}`);
    //console.log(req.body);
    var timeSpent = req.body["time-spent"];
    var currentTime = req.body["current-hours"];
    var newTimeLeft = currentTime - timeSpent;
    var itemId = req.body.id;
    var itemName = req.body["client-name"];
    var taskTitle = req.body["task-title"];
    var pmH = req.body.pmh;
    var desH = req.body.desh;
    var devH = req.body.devh;
    var liveLink = req.body.link;
    var taskDescription = req.body.Description;
    console.log(taskDescription);

    //update item
    const options = {
      method: "PUT",
      url: `https://api.webflow.com/collections/${cmsId}/items/${itemId}`,
      qs: { live: "true" },
      headers: {
        "Accept-Version": "1.0.0",
        Authorization: api_token,
        "content-type": "application/json",
      },
      body: {
        fields: {
          name: `${itemName}`,
          _archived: false,
          _draft: false,
          slug: `${itemId}`,
          "hours-left": newTimeLeft,
        },
      },
      json: true,
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Hours Updated");
      //create a task item

      const options2 = {
        method: "POST",
        url: `https://api.webflow.com/collections/${tasksId}/items`,
        qs: { live: "true" },
        headers: {
          "Accept-Version": "1.0.0",
          Authorization: api_token,
          "content-type": "application/json",
        },
        body: {
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
        json: true,
      };

      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        console.log("task created");
      });
    });
    res.send(
      JSON.stringify(
        `Hello ${user}, the task has been created and the hours have been updated`
      )
    );
    console.log(
      `Hello ${user}, the task has been created and the hours have been updated`
    );
    res.status(200).end();
  } else {
    res.send(JSON.stringify(`Unrecognised User`));
    console.log("User Not Recognised");
    res.status(403).end();
  }
});

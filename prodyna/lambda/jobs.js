const { parseStringPromise } = require("xml2js");
const https = require("https");

const handler = async () => {
  try {
    // get the jobs data
    const xmlUrlEng = `/XMLExport/140?Key=hgGm7tEPY7rJsjatmRw8&CustomerID=5516&SprachID=2&Sprache=eng`;
    const xmlUrlGer = `/XMLExport/140?Key=hgGm7tEPY7rJsjatmRw8&CustomerID=5516&SprachID=1&Sprache=ger`;
    const apiCallEng = callApi(xmlUrlEng),
      apiCallGer = callApi(xmlUrlGer);
    const [xmlJsonEng, xmlJsonGer] = await Promise.all([
      apiCallEng,
      apiCallGer,
    ]);
    const jobsEng = xmlJsonEng.jobs.job.filter(filterJob).map(mapJob);
    const jobsGer = xmlJsonGer.jobs.job.filter(filterJob).map(mapJob);

    console.log(
      JSON.stringify({ jobsEng: jobsEng.length, jobsGer: jobsGer.length })
    );
  } catch (error) {
    console.error(error);
  }
};

const filterJob = (job) => {
  const jobTitle = job.Jobtitel?.[0]?.trim();
  const entryLevel = job.EntryLevel?.[0]?.trim();
  const department = job.Departement?.[0]?.trim();
  const location = job.PlaceOfWork?.[0]?.trim();
  const branchName = job.Branch_Name?.[0]?.trim();
  const applyURL = job.ApplyURL?.[0]?.trim();

  return (
    jobTitle && department && branchName && location && applyURL && entryLevel
  );
};

const mapJob = (job) => {
  const jobTitle = job.Jobtitel?.[0]?.trim();
  const entryLevel = job.EntryLevel?.[0]?.trim();
  const department = job.Departement?.[0]?.trim();
  const location = job.PlaceOfWork?.[0]?.trim();
  const branchName = job.Branch_Name?.[0]?.trim();
  const applyURL = job.ApplyURL?.[0]?.trim();
  const description = job.Textblock1?.[0].trim();
  const tasksTitle = job.TitelTextblock2?.[0].trim();
  const tasks = job.Textblock2?.[0].trim();
  const profileTitle = job.TitelTextblock3?.[0].trim();
  const profile = job.Textblock3?.[0].trim();
  const benefitsTitle = job.TitelTextblock4?.[0].trim();
  const benefits = job.Textblock4?.[0].trim();

  return {
    title: jobTitle,
    level: entryLevel,
    department,
    location,
    branch: branchName,
    url: applyURL,
    text: {
      description,
      tasksTitle,
      tasks,
      profileTitle,
      profile,
      benefitsTitle,
      benefits,
    },
  };
};

const callApi = (path) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: "GET",
        host: "jobs.prodyna.com",
        path,
      },
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk.toString()));
        resp.on("end", async () => {
          try {
            data = await parseStringPromise(data, {});
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
        resp.on("error", reject);
      }
    );
    request.end();
  });
};

handler();

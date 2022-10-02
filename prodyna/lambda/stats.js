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
    const jobsEng = xmlJsonEng.jobs.job;
    const jobsGer = xmlJsonGer.jobs.job;

    const statsEng = getStats(jobsEng);
    const statsGer = getStats(jobsGer);

    console.log(JSON.stringify({ statsEng, statsGer }));
  } catch (error) {
    console.error(error);
  }
};

const getStats = (jobs) => {
  const total = jobs.length;
  const stats = {
    levels: new Map(),
    departments: new Map(),
    locations: new Map(),
  };
  for (const job of jobs) {
    try {
      const entryLevel = job.EntryLevel?.[0]?.trim();
      if (entryLevel) {
        if (stats.levels.has(entryLevel)) {
          stats.levels.set(entryLevel, stats.levels.get(entryLevel) + 1);
        } else {
          stats.levels.set(entryLevel, 1);
        }
      }

      const department = job.Departement?.[0]?.trim();
      if (department) {
        if (stats.departments.has(department)) {
          stats.departments.set(
            department,
            stats.departments.get(department) + 1
          );
        } else stats.departments.set(department, 1);
      }

      const location = job.PlaceOfWork?.[0]?.trim();
      if (location) {
        if (stats.locations.has(location)) {
          stats.locations.set(location, stats.locations.get(location) + 1);
        } else stats.locations.set(location, 1);
      }
    } catch (error) {
      console.error(error);
      continue;
    }
  }

  const levelEntries = stats.levels.entries();
  const levels = [];
  for (const level of levelEntries) {
    const [levelName, openNos] = level;
    levels.push({
      name: levelName,
      openPositions: openNos,
    });
  }
  levels.sort((a, b) => a.openPositions - b.openPositions);

  const departmentEntries = stats.departments.entries();
  const departments = [];
  for (const department of departmentEntries) {
    const [departmentName, openNos] = department;
    departments.push({
      name: departmentName,
      openPositions: openNos,
    });
  }
  departments.sort((a, b) => b.openPositions - a.openPositions);

  const locationEntries = stats.locations.entries();
  const locations = [];
  for (const location of locationEntries) {
    const [locationName, openNos] = location;
    locations.push({
      name: locationName,
      openPositions: openNos,
    });
  }
  locations.sort((a, b) => a.openPositions - b.openPositions);

  return {
    total: total,
    levels: {
      total: stats.levels.size,
      details: levels,
    },
    departments: {
      total: stats.departments.size,
      details: departments,
    },
    locations: {
      total: stats.locations.size,
      details: locations,
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

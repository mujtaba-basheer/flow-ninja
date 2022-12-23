const getJobs = () => {
  return new Promise((res, rej) => {
    fetch("https://kqawvwzayj.execute-api.us-east-1.amazonaws.com/prod/jobs", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(res)
      .catch(rej);
  });
};

const getJobRowEl = (job, isFirst, hasMore) => {
  const { title, url, department, location } = job;

  const departmentEl = document.createElement("div");
  departmentEl.id = "department-wrap";
  departmentEl.className = `careers-item-column ${
    hasMore ? "no-border-bot" : "mobile-border-and-padding-bot"
  } ${
    isFirst ? "mobile-display-none" : ""
  } w-node-_83beb41f-1858-ea9b-add6-8ac858505dfd-413252ef`;
  {
    if (isFirst) {
      const dotImgEl = document.createElement("img");
      dotImgEl.className = "customer-dot";
      dotImgEl.src =
        "https://assets-global.website-files.com/611e5a5da418c8b50790ad21/61e185fbaef6bd816ec1c824_bullet.svg";
      dotImgEl.loading = "lazy";
      dotImgEl.alt = "";

      const departmentTextEl = document.createElement("div");
      departmentTextEl.id = "department";
      departmentTextEl.className = "careers-text";
      departmentTextEl.textContent = isFirst ? department : "";

      departmentEl.appendChild(dotImgEl);
      departmentEl.appendChild(departmentTextEl);
    }
  }

  const jobTitleEl = document.createElement("div");
  jobTitleEl.id = "role-wrap";
  jobTitleEl.className = `careers-item-column mobile-padding-left-15 ${
    hasMore ? "no-border-bot" : ""
  } w-node-ccbcf707-d2b2-7193-f90f-3c005d733fdd-413252ef`;
  {
    const dotImgEl = document.createElement("img");
    dotImgEl.className = "customer-dot";
    dotImgEl.src =
      "https://assets-global.website-files.com/611e5a5da418c8b50790ad21/61e185fbaef6bd816ec1c824_bullet.svg";
    dotImgEl.loading = "lazy";
    dotImgEl.alt = "";

    const linkEl = document.createElement("a");
    linkEl.id = "role";
    linkEl.className = "careers-link-text";
    linkEl.href = url;
    linkEl.target = "_blank";
    linkEl.textContent = title;

    jobTitleEl.appendChild(dotImgEl);
    jobTitleEl.appendChild(linkEl);
  }

  const locationEl = document.createElement("div");
  locationEl.id = "location-wrap";
  locationEl.className = `careers-column mobile-horizontal-center ${
    hasMore ? "no-border-bot" : ""
  } w-node-_1cc697ff-ef7f-5940-2210-47b92cd2c7eb-413252ef`;
  {
    const locationTextEl = document.createElement("div");
    locationTextEl.id = "location";
    locationTextEl.className =
      "careers-label font-weight-400 capitalize-letter";
    locationTextEl.textContent = location;

    locationEl.appendChild(locationTextEl);
  }

  // const empTypeEl = document.createElement("div");
  // empTypeEl.textContent = employment_type;
  // empTypeEl.classList.add("table-data");

  // rowEl.appendChild(jobTitleEl);
  // rowEl.appendChild(locationEl);
  // rowEl.appendChild(departmentEl);

  return [departmentEl, jobTitleEl, locationEl];
};

window.addEventListener("load", async () => {
  try {
    const { data: jobsList } = await getJobs();
    const departments = {};
    for (const job of jobsList) {
      const { department } = job;
      if (departments[department]) {
        departments[department].push(job);
      } else {
        departments[department] = [job];
      }
    }
    const jobTable = document.querySelector("div.fake-careers-grid");

    for (const department of Object.keys(departments)) {
      const jobs = departments[department];
      jobs.forEach((job, i) => {
        const dataEls = getJobRowEl(job, i === 0, i + 1 < jobs.length);
        dataEls.forEach((dataEl) => jobTable.appendChild(dataEl));
        // jobTable.appendChild(jobRowEl);
      });
    }
  } catch (error) {
    console.error(error);
  }
});

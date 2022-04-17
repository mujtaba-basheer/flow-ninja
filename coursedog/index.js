const getJobs = () => {
  return new Promise((res, rej) => {
    fetch("https://4oe7ses5ug.execute-api.us-east-1.amazonaws.com/prod/jobs", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(res)
      .catch(rej);
  });
};

const getJobRowEl = (job, isOdd) => {
  const { employment_type, title, url, department, location } = job;

  const rowEl = document.createElement("a");
  rowEl.setAttribute("href", url);
  rowEl.setAttribute("target", "_blank");
  rowEl.setAttribute("rel", "noreferrer");
  rowEl.classList.add("job-post-link");
  rowEl.classList.add("w-inline-block");
  if (isOdd) rowEl.classList.add("grey-bg");

  const jobTitleEl = document.createElement("div");
  jobTitleEl.textContent = title;
  jobTitleEl.classList.add("table-data");
  jobTitleEl.classList.add("font-500");

  const locationEl = document.createElement("div");
  locationEl.textContent = location;
  locationEl.classList.add("table-data");

  const departmentEl = document.createElement("div");
  departmentEl.textContent = department;
  departmentEl.classList.add("table-data");

  const empTypeEl = document.createElement("div");
  empTypeEl.textContent = employment_type;
  empTypeEl.classList.add("table-data");

  rowEl.appendChild(jobTitleEl);
  rowEl.appendChild(locationEl);
  rowEl.appendChild(departmentEl);
  rowEl.appendChild(empTypeEl);

  return rowEl;
};

window.addEventListener("load", async () => {
  try {
    const { data: jobs } = await getJobs();
    const jobTable = document.querySelector("div.job-table");

    jobs.forEach((job, i) => {
      const jobRowEl = getJobRowEl(job, i % 2 === 0);
      jobTable.appendChild(jobRowEl);
    });
  } catch (error) {
    console.error(error);
  }
});

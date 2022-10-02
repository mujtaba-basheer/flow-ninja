const getJobs = () => {
  return new Promise((res, rej) => {
    fetch("https://6b9d3y1jhj.execute-api.us-east-1.amazonaws.com/prod/jobs", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(res)
      .catch(rej);
  });
};

const renderJobs = (jobs) => {
  const containerEl = document.querySelector(
    ".container > .open-positions-wrapper"
  );

  // removing jobs
  containerEl.querySelectorAll("a#job-link").forEach((x) => x.remove());

  // rendering jobs
  for (let i = jobs.length - 1; i >= 0; i--) {
    const { branch, department, location, title, url } = jobs[i];

    const jobEl = document.createElement("a");
    jobEl.className = "open-position-link w-inline-block";
    jobEl.rel = "noopener";
    jobEl.href = url;
    jobEl.target = "_blank";
    {
      const jobDiv = document.createElement("div");
      jobDiv.className = "column";
      {
        const jobTitle = document.createElement("h3");
        jobTitle.className = "margin-bot-xs";
        jobTitle.textContent = title;

        const jobDetails = document.createElement("div");
        jobDetails.className = "position-details-wrap";
        {
          const branchEl = document.createElement("div");
          branchEl.className = "bold-text";
          branchEl.textContent = branch;

          const departmentEl = document.createElement("div");
          departmentEl.textContent = department;

          const locationEl = document.createElement("div");
          locationEl.textContent = location;

          jobDetails.appendChild(branchEl);
          jobDetails.appendChild(departmentEl);
          jobDetails.appendChild(locationEl);
        }

        jobDiv.appendChild(jobTitle);
        jobDiv.appendChild(jobDetails);
      }

      const imgEl = document.createElement("img");
      imgEl.className = "benefits-dropdown-icon";
      imgEl.src =
        "https://assets-global.website-files.com/6267a1f7a8182aa6e6312ff3/6321ec3b48e94304a0437292_chevron_right.svg";
      imgEl.loading = "lazy";
      imgEl.alt = "";

      jobEl.appendChild(jobDiv);
      jobEl.appendChild(imgEl);
    }

    containerEl.appendChild(jobEl);
  }
};

window.addEventListener("load", async () => {
  try {
    const {
      data: { eng },
    } = await getJobs();

    renderJobs(eng);
  } catch (error) {
    console.error(error);
  }
});

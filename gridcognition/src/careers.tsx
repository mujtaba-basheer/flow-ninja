type JobType = {
  id: string;
  title: string;
  full_title: string;
  shortcode: string;
  code: string | null;
  state: string;
  sample: boolean;
  department: string;
  department_hierarchy: {
    id: number;
    name: string;
  }[];
  url: string;
  application_url: string;
  shortlink: string;
  location: {
    location_str: string;
    country: string;
    country_code: string;
    region: null;
    region_code: null;
    city: null;
    zip_code: null;
    telecommuting: true;
  };
  created_at: string;
  days_since_posted: number;
};

type RespType = {
  status: boolean;
  data: JobType[];
};

const createJobEl = (job: JobType) => {
  const rootEl = document.createElement("div");
  rootEl.classList.add("section");
  rootEl.classList.add("profile-gray");
  rootEl.classList.add("wf-section");
  {
    const containerEl = document.createElement("div");
    containerEl.classList.add("container");
    containerEl.classList.add("grid-job-card");
    {
      const jobPostEl = document.createElement("div");
      jobPostEl.classList.add("job-post-wrap");
      jobPostEl.id = "w-node-_8b4b6cdc-a290-6ff3-b2a6-7a45891e54ff-1e00ef2b";
      {
        const titleEl = document.createElement("div");
        titleEl.className = "profile-label text-black margin-bot-18";
        titleEl.textContent = job.title;

        const timePostedEl = document.createElement("div");
        timePostedEl.classList.add("time-posted-label");
        {
          timePostedEl.textContent = `Posted ${job.days_since_posted} day${
            job.days_since_posted && job.days_since_posted > 1 ? "s" : ""
          } ago`;
        }

        jobPostEl.appendChild(titleEl);
        jobPostEl.appendChild(timePostedEl);
      }

      const jobDesEl = document.createElement("div");
      jobDesEl.classList.add("job-des-wrap");
      jobDesEl.id = "w-node-_8b4b6cdc-a290-6ff3-b2a6-7a45891e5504-1e00ef2b";
      {
        const locationEl = document.createElement("div");
        locationEl.classList.add("job-post-wrap");
        {
          const cityEl = document.createElement("div");
          cityEl.className = "job-description-label margin-bot-20";
          cityEl.textContent =
            job.location.city || job.location.region || job.location.country;

          const countryEl = document.createElement("div");
          countryEl.classList.add("job-description-label");
          countryEl.textContent =
            job.location.city || job.location.region
              ? job.location.country
              : "";

          locationEl.appendChild(cityEl);
          locationEl.appendChild(countryEl);
        }

        const jobInfoEl = document.createElement("div");
        jobInfoEl.classList.add("job-post-wrap");
        {
          const deptEl = document.createElement("div");
          deptEl.className = "job-description-label margin-bot-20";
          deptEl.textContent = job.department;

          const jobTypeEl = document.createElement("div");
          jobTypeEl.classList.add("job-description-label");
          jobTypeEl.textContent = "Fulltime";

          jobInfoEl.appendChild(deptEl);
          jobInfoEl.appendChild(jobTypeEl);
        }

        jobDesEl.appendChild(locationEl);
        jobDesEl.appendChild(jobInfoEl);
      }

      const labelEl = document.createElement("div");
      labelEl.classList.add("label");
      labelEl.classList.add("profile-90-lable");
      labelEl.id = "w-node-_8b4b6cdc-a290-6ff3-b2a6-7a45891e550f-1e00ef2b";
      labelEl.textContent = "remote";

      const buttonEl = document.createElement("div");
      buttonEl.classList.add("profile-button-wrap");
      buttonEl.id = "w-node-_8b4b6cdc-a290-6ff3-b2a6-7a45891e5511-1e00ef2b";
      {
        const linkEl = document.createElement("a");
        linkEl.className = "round-button w-inline-block";
        linkEl.href = job.url;
        linkEl.target = "_blank";
        {
          const btnContentEl = document.createElement("div");
          btnContentEl.classList.add("button-content-wrap");
          {
            const btnTextEl = document.createElement("div");
            btnTextEl.classList.add("button-text");
            btnTextEl.textContent = "Request demo";

            const imgEl = document.createElement("img");
            imgEl.classList.add("round-button-arrow");
            imgEl.src =
              "https://assets.website-files.com/63078873858838fe95a00d2d/63206ac4a7b0abaf06ff6db1_Button-Arrow-Purple.png";
            imgEl.loading = "lazy";
            imgEl.alt = "";

            btnContentEl.appendChild(btnTextEl);
            btnContentEl.appendChild(imgEl);
          }

          linkEl.appendChild(btnContentEl);
        }

        buttonEl.appendChild(linkEl);
      }

      containerEl.appendChild(jobPostEl);
      containerEl.appendChild(jobDesEl);
      containerEl.appendChild(labelEl);
      containerEl.appendChild(buttonEl);
    }

    rootEl.appendChild(containerEl);
  }

  return rootEl;
};

window.addEventListener("load", async () => {
  try {
    const jobsWrapperEl = document.querySelector<HTMLDivElement>(
      ".gray-sections-wrapper"
    );
    if (jobsWrapperEl) {
      jobsWrapperEl
        .querySelectorAll("div.section.profile-gray.wf-section")
        .forEach((x) => x.remove());

      const req = await fetch(
        "https://z5ak1hwsf9.execute-api.us-east-1.amazonaws.com/prod/workable-jobs",
        {
          method: "GET",
        }
      );
      if (req.status !== 200) throw new Error(await req.json());
      const resp = (await req.json()) as RespType;
      if (resp.status) {
        for (const job of resp.data) {
          const timeCreated = new Date(job.created_at).valueOf();
          const timeNow = new Date().valueOf();
          const msLapsed = timeNow - timeCreated;
          const daysLapsed = Math.ceil(msLapsed / (1000 * 60 * 60 * 24));
          job.days_since_posted = daysLapsed;
        }
        resp.data.sort((a, b) => a.days_since_posted - b.days_since_posted);

        for (const job of resp.data) {
          const jobEl = createJobEl(job);
          jobsWrapperEl.appendChild(jobEl);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

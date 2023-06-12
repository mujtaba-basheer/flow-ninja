type JobT = {
  id: string;
  location: string;
  team: string;
  title: string;
  url: string;
};
type JobsAPIRespT =
  | {
      status: true;
      data: JobT[];
    }
  | {
      status: false;
      msg: string;
    };
type DropdownStateT = {
  isEmpty: boolean;
  selected: string[];
};
type StateT = {
  jobs: JobT[];
  filteredJobs: JobT[];
  filters: {
    locations: string[];
    teams: string[];
    input: string;
  };
  dropdowns: {
    location: DropdownStateT;
    team: DropdownStateT;
  };
};

window.addEventListener("load", async () => {
  const state: StateT = {
    jobs: [],
    filteredJobs: [],
    filters: {
      locations: [],
      teams: [],
      input: "",
    },
    dropdowns: {
      location: {
        isEmpty: true,
        selected: [],
      },
      team: {
        isEmpty: true,
        selected: [],
      },
    },
  };

  const renderJobs = () => {
    try {
      const jobsContainer = document.querySelector<HTMLDivElement>(
        "div.careers-job-list"
      );
      const emptyState = document.querySelector<HTMLDivElement>(
        "div.careers-empty-state"
      );

      if (jobsContainer) {
        // clearing previous rendering
        jobsContainer.querySelectorAll("a").forEach((aEl) => aEl.remove());

        // rendering jobs
        for (const job of state.filteredJobs) {
          const rootEl = document.createElement("a");
          rootEl.id = job.id;
          rootEl.className = "careers-table-item w-inline-block";
          rootEl.href = job.url;
          rootEl.target = "_blank";
          {
            const nameEl = document.createElement("div");
            nameEl.textContent = job.title;

            const teamEl = document.createElement("div");
            teamEl.className = "font-weight-300";
            teamEl.textContent = job.team;

            const locationEl = document.createElement("div");
            locationEl.className = "font-weight-300";
            locationEl.style.justifySelf = "end";
            locationEl.textContent = job.location;

            rootEl.appendChild(nameEl);
            rootEl.appendChild(teamEl);
            rootEl.appendChild(locationEl);
          }

          jobsContainer.appendChild(rootEl);
        }

        // updating #jobs
        const numEl = document.getElementById(
          "number-of-jobs"
        ) as HTMLSpanElement;
        if (numEl) numEl.textContent = state.filteredJobs.length + "";

        if (emptyState) {
          if (state.filteredJobs.length) {
            emptyState.style.display = "none";
          } else {
            emptyState.style.display = "block";
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterJobs = () => {
    let filteredJobs: JobT[] = [...state.jobs];
    const { locations, teams, input } = state.filters;

    filteredJobs = filteredJobs.filter((job) => {
      if (locations.length && !locations.includes(job.location)) return false;
      if (teams.length && !teams.includes(job.team)) return false;

      return job.title.toLowerCase().includes(input.toLowerCase());
    });

    state.filteredJobs = filteredJobs;
  };

  const jobsContainer = document.querySelector<HTMLDivElement>(
    "div.careers-job-list"
  );
  if (jobsContainer) {
    // fetching jobs
    try {
      const req = await fetch(
        " https://0a50cfhnal.execute-api.us-east-1.amazonaws.com/sandbox/jobs"
      );
      const res: Awaited<JobsAPIRespT> = await req.json();
      if (res.status) {
        const jobs = res.data;
        jobs.sort((a, b) => a.title.localeCompare(b.title));
        state.jobs = jobs;
        state.filteredJobs = jobs;
        renderJobs();
      } else throw new Error(res.msg);
    } catch (error) {
      console.error(error);
    }

    const inputEl = document.getElementById(
      "careers-search"
    ) as HTMLInputElement;
    if (inputEl) {
      inputEl.addEventListener("input", () => {
        const value = inputEl.value.trim();
        state.filters.input = value;

        filterJobs();
        renderJobs();
      });
    }
  }
});

type JobDetailsT = {
  id: string;
  title: string;
  location: string;
  jobUrl: string;
  applyUrl: string;
  publishedAt: string;
};
type JobsResponseT = {
  jobs: JobDetailsT[];
  apiVersion: `${number}`;
};

const fetchJobs = async () => {
  try {
    const request = await fetch(
      "https://api.ashbyhq.com/posting-api/job-board/acelr8"
    );
    const response: Awaited<JobsResponseT> = await request.json();
    const { jobs } = response;

    const rootEl = document.querySelector<HTMLDivElement>(
      "div.main-grid.z-bump"
    );
    if (rootEl) {
      rootEl.querySelectorAll("a").forEach((el) => el.remove());

      for (const job of jobs) {
        const { id, title, location, jobUrl, applyUrl, publishedAt } = job;

        const jobCardEl = document.createElement<"a">("a");
        jobCardEl.id = id;
        jobCardEl.className = "jobs-card w-inline-block";
        jobCardEl.href = jobUrl;
        jobCardEl.target = "_blank";
        {
          const infoEl_1 = document.createElement("div");
          infoEl_1.className = "row space-between-row";
          {
            const colEl = document.createElement("div");
            colEl.className = "column";
            {
              const headingEl = document.createElement("h3");
              headingEl.className = "heading-5 _5-margin margin-20";
              headingEl.textContent = title;

              const rowEl = document.createElement("div");
              rowEl.className = "row";
              {
                const mapEl = document.createElement("div");
                mapEl.className = "map-graphic";
                {
                  const imgEl = document.createElement("img");
                  imgEl.className = "image fill";
                  imgEl.src =
                    "https://uploads-ssl.webflow.com/5e67f21fadfd9e20f91a9348/6410694355ef7134b030cd21_5f85718e74c409360fc9d7ce_Vector%20(11).svg";
                  imgEl.loading = "lazy";
                  imgEl.alt = "";

                  mapEl.appendChild(imgEl);
                }

                const locationEl = document.createElement("div");
                locationEl.className = "label-small-caps red-2-text no-margin";
                {
                  const textEl = document.createElement("div");
                  textEl.textContent = location;

                  locationEl.appendChild(textEl);
                }

                rowEl.appendChild(mapEl);
                rowEl.appendChild(locationEl);
              }

              colEl.appendChild(headingEl);
              colEl.appendChild(rowEl);
            }

            const logoEl = document.createElement("div");
            logoEl.className = "jobs-logo-wrap";
            {
              const imgEl = document.createElement("img");
              imgEl.className = "image";
              imgEl.src =
                "https://uploads-ssl.webflow.com/5e67f21fadfd9e20f91a9348/5f8571db1bd1d182d4a1ffcf_logo_main.svg";
              imgEl.loading = "lazy";
              imgEl.alt = "";

              logoEl.appendChild(imgEl);
            }

            infoEl_1.appendChild(colEl);
            infoEl_1.appendChild(logoEl);
          }

          const infoEl_2 = document.createElement("div");
          infoEl_2.className = "row space-between-row edit-row";
          {
            const dateEl = document.createElement("div");
            dateEl.className = "label gray-3-text no-margin";
            {
              const textEl = document.createElement("div");
              textEl.textContent = publishedAt.substring(0, 10);

              dateEl.appendChild(textEl);
            }

            const linkEl = document.createElement("div");
            linkEl.className = "button-link horizontal disable-hover space-top";
            {
              const textEl = document.createElement("div");
              textEl.textContent = "see on workable";

              linkEl.appendChild(textEl);
            }

            infoEl_2.appendChild(dateEl);
            infoEl_2.appendChild(linkEl);
          }

          jobCardEl.appendChild(infoEl_1);
          jobCardEl.appendChild(infoEl_2);
        }

        rootEl.appendChild(jobCardEl);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", fetchJobs);

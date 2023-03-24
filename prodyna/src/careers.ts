type StatsItemT = {
  total: number;
  details: {
    name: string;
    openPositions: number;
  }[];
};
type StatsT = {
  total: number;
  levels: StatsItemT;
  departments: StatsItemT;
  locations: StatsItemT;
};
type StatsResponseT = {
  status: boolean;
  data: {
    eng: StatsT;
    ger: StatsT;
  };
};
type FiltersT = {
  role: string;
  entryLevel: string;
  department: string;
  location: string;
};
type WeglotLangChangedCallbactT = (newLang: string, prevLang: string) => void;
interface Weglot {
  getCurrentLang: () => "en" | "de";
  on: (eventName: string, callback: WeglotLangChangedCallbactT) => void;
}

const getStats: () => Promise<StatsResponseT> = () => {
  return new Promise((res, rej) => {
    fetch("https://6b9d3y1jhj.execute-api.us-east-1.amazonaws.com/prod/stats", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(res)
      .catch(rej);
  });
};

const renderFilterOptions = (stats: StatsT) => {
  const formEl = document.getElementById(
    "wf-form-Career-Form"
  ) as HTMLFormElement | null;

  if (formEl) {
    const entryLevelEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field"]'
    );
    if (entryLevelEl) {
      // @ts-ignore
      $(entryLevelEl).niceSelect("destroy");

      entryLevelEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.levels.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        entryLevelEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(entryLevelEl).niceSelect();
    }

    const departmentEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field-2"]'
    );
    if (departmentEl) {
      // @ts-ignore
      $(departmentEl).niceSelect("destroy");

      departmentEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.departments.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        departmentEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(departmentEl).niceSelect();
    }

    const locationEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field-3"]'
    );
    if (locationEl) {
      // @ts-ignore
      $(locationEl).niceSelect("destroy");

      locationEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.locations.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        locationEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(locationEl).niceSelect();
    }
  }
};

window.addEventListener("load", async () => {
  try {
    const {
      data: { eng, ger },
    } = await getStats();

    // @ts-ignore
    const weglot = (window.Weglot || {}) as Weglot;

    const currentLang = weglot.getCurrentLang();

    const loaderEl =
      document.querySelector<HTMLDivElement>("div#jobs-preloader");
    if (loaderEl) loaderEl.style.display = "none";

    const renderStats = (stats: StatsT) => {
      const containerEl = document.getElementById("open-roles");

      if (containerEl) {
        const { total, departments, locations } = stats;

        const h2El = containerEl.querySelector("h2");
        if (h2El) {
          h2El.innerHTML = `${total} Open Positions<br />in ${locations.total} Locations`;
        }

        const h3Els = containerEl.querySelectorAll("h3");
        for (let i = 0; i < h3Els.length; i++) {
          const h3El = h3Els[i];
          const { name, openPositions } = departments.details[i];
          h3El.textContent = `${openPositions} Job${
            openPositions > 1 ? "s" : ""
          } for ${name}`;
        }
      }
    };

    renderFilterOptions(currentLang === "de" ? ger : eng);
    renderStats(currentLang === "de" ? ger : eng);

    const formEl = document.getElementById(
      "wf-form-Career-Form"
    ) as HTMLFormElement | null;
    if (formEl) {
      const onSumbit = () => {
        const filters: FiltersT = {
          role: "",
          entryLevel: "",
          department: "",
          location: "",
        };

        const roleEl =
          formEl.querySelector<HTMLInputElement>('input[name="Role"]');
        if (roleEl) filters.role = roleEl.value;

        const entryLevelEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field"]'
        );
        if (entryLevelEl) filters.entryLevel = entryLevelEl.value;

        const departmentEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field-2"]'
        );
        if (departmentEl) filters.department = departmentEl.value;

        const locationEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field-3"]'
        );
        if (locationEl) filters.location = locationEl.value;

        const sp = new URLSearchParams();
        for (const k of Object.keys(filters)) {
          sp.set(k, filters[k]);
        }

        window.location.href = `https://${
          window.location.hostname
        }/jobs?${sp.toString()}`;
      };

      formEl.addEventListener("submit", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();

        onSumbit();
      });
    }

    weglot.on("languageChanged", (newLang, prevLang) => {
      renderFilterOptions(newLang === "de" ? ger : eng);
      renderStats(newLang === "de" ? ger : eng);
    });
  } catch (error) {
    console.error(error);
  }
});

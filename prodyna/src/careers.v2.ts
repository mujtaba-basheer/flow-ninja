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
  countries: StatsItemT;
};
type StatsResponseT = {
  status: boolean;
  data: StatsT;
};
type FiltersT = {
  role: string;
  country: string;
  office: string;
  career_path: string;
};
type WeglotLangChangedCallbactT = (newLang: string, prevLang: string) => void;
interface Weglot {
  getCurrentLang: () => "en" | "de";
  on: (eventName: string, callback: WeglotLangChangedCallbactT) => void;
}

const getStats: () => Promise<StatsResponseT> = () => {
  return new Promise((res, rej) => {
    fetch(
      "https://6b9d3y1jhj.execute-api.us-east-1.amazonaws.com/prod/stats-v2",
      {
        method: "GET",
      }
    )
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
    const countryEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field"]'
    );
    if (countryEl) {
      // @ts-ignore
      $(countryEl).niceSelect("destroy");

      countryEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.countries.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        countryEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(countryEl).niceSelect();
    }

    const officeEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field-2"]'
    );
    if (officeEl) {
      // @ts-ignore
      $(officeEl).niceSelect("destroy");

      officeEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.locations.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        officeEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(officeEl).niceSelect();
    }

    const careerPathEl = formEl.querySelector<HTMLSelectElement>(
      'select[name="field-3"]'
    );
    if (careerPathEl) {
      // @ts-ignore
      $(careerPathEl).niceSelect("destroy");

      careerPathEl
        .querySelectorAll("option")
        .forEach((o, i) => i !== 0 && o.remove());

      stats.departments.details.forEach((x) => {
        const optionEl = document.createElement("option");
        optionEl.value = x.name;
        optionEl.text = x.name;

        careerPathEl.appendChild(optionEl);
      });

      // @ts-ignore
      $(careerPathEl).niceSelect();
    }
  }
};

window.addEventListener("load", async () => {
  try {
    const { data: stats } = await getStats();

    const loaderEl =
      document.querySelector<HTMLDivElement>("div#jobs-preloader");
    if (loaderEl) loaderEl.style.display = "none";

    renderFilterOptions(stats);

    const formEl = document.getElementById(
      "wf-form-Career-Form"
    ) as HTMLFormElement | null;
    if (formEl) {
      const onSumbit = () => {
        const filters: FiltersT = {
          role: "",
          country: "",
          office: "",
          career_path: "",
        };

        const roleEl =
          formEl.querySelector<HTMLInputElement>('input[name="Role"]');
        if (roleEl) filters.role = roleEl.value;

        const countryEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field"]'
        );
        if (countryEl) filters.country = countryEl.value;

        const officeEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field-2"]'
        );
        if (officeEl) filters.office = officeEl.value;

        const careerPathEl = formEl.querySelector<HTMLSelectElement>(
          'select[name="field-3"]'
        );
        if (careerPathEl) filters.career_path = careerPathEl.value;

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
  } catch (error) {
    console.error(error);
  }
});

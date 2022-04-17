const wait = (time) =>
  new Promise((res) => {
    setTimeout(() => res(null), time);
  });
const numFormat = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

window.addEventListener("load", () => {
  {
    // Dropdown
    const lightboxToggle = $("#nav-lightbox");
    const dropdownToggle = $("#w-dropdown-toggle-0");

    lightboxToggle.on("click", () => dropdownToggle.trigger("mouseup"));
  }

  const tempCount = document.getElementById("templates-count"),
    teamsCount = document.getElementById("teams-count"),
    respCount = document.getElementById("response-time");

  const tempVal = Number(tempCount.getAttribute("data-value")),
    teamsVal = Number(teamsCount.getAttribute("data-value")),
    respVal = Number(respCount.getAttribute("data-value"));

  const tempStep = tempVal / 200,
    teamsStep = teamsVal / 200,
    respStep = respVal / 200;

  const options = { rootMargin: "0px 0px 0px 0px", threshold: 1.0 };

  const tempCb = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        tempCount.textContent = "0";

        let c = 0;
        for (let i = 0; i <= 200 && c <= tempVal; i++) {
          await wait(10);
          tempCount.textContent = numFormat.format(c);
          c += tempStep;
        }
        if (c < tempVal) {
          await wait(10);
          tempCount.textContent = numFormat.format(tempVal);
        }

        observer.unobserve(entry.target);
      }
    });
  };
  const tempObs = new IntersectionObserver(tempCb, options);
  tempObs.observe(tempCount);

  const teamsCb = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        teamsCount.textContent = "0";

        let c = 0;
        for (let i = 0; i <= 200 && c <= teamsVal; i++) {
          await wait(10);
          teamsCount.textContent = numFormat.format(c);
          c += teamsStep;
        }
        if (c < teamsVal) {
          await wait(10);
          teamsCount.textContent = numFormat.format(teamsVal);
        }

        observer.unobserve(entry.target);
      }
    });
  };
  const teamsObs = new IntersectionObserver(teamsCb, options);
  teamsObs.observe(teamsCount);

  const respCb = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        respCount.textContent = "0";

        let c = 0;
        for (let i = 0; i <= 200 && c <= respVal; i++) {
          await wait(10);
          respCount.textContent = numFormat.format(c);
          c += respStep;
        }
        if (c < respVal) {
          await wait(10);
          respCount.textContent = numFormat.format(respVal);
        }

        observer.unobserve(entry.target);
      }
    });
  };
  const respObs = new IntersectionObserver(respCb, options);
  respObs.observe(respCount);
});

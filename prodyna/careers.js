const getStats = () => {
  return new Promise((res, rej) => {
    fetch("https://6b9d3y1jhj.execute-api.us-east-1.amazonaws.com/prod/stats", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then(res)
      .catch(rej);
  });
};

window.addEventListener("load", async () => {
  try {
    const {
      data: { eng },
    } = await getStats();

    const containerEl = document.getElementById("open-roles");

    {
      const { total, departments, levels, locations } = eng;

      const h2El = containerEl.querySelector("h2");
      h2El.innerHTML = `${total} Open Positions<br />in ${locations.total} Locations`;

      const h3Els = containerEl.querySelectorAll("h3");
      for (let i = 0; i < h3Els.length; i++) {
        const h3El = h3Els[i];
        if (departments.details[i]) {
          const { name, openPositions } = departments.details[i];
          h3El.textContent = `${openPositions} Job${
            openPositions > 1 ? "s" : ""
          } for ${name}`;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
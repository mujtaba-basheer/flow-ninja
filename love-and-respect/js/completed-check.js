const check = (completed) => {
  const items = document.querySelectorAll("div.cms-item.devotionals-item");
  items.forEach((item) => {
    const epEl = item.querySelector("div.episode-item-id");
    const checkmarkEl = item.querySelector("img.completed-devotion-checkmark");
    if (epEl) {
      const epId = epEl.textContent.trim();
      if (completed.includes(epId)) checkmarkEl.classList.remove("hide");
      else checkmarkEl.classList.add("hide");
    }
  });
};

window.addEventListener("load", async () => {
  try {
    let completed = [];
    const member = await window.$memberstackDom.getCurrentMember();
    if (member?.data?.metaData?.["Completed Videos"]) {
      completed = member.data.metaData["Completed Videos"];
    }

    const targetNode = document.querySelector("div.cms-list.devotionals");

    const config = {
      attributes: true,
      attributeFilter: ["style"],
      childList: false,
      subtree: false,
    };

    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          const { opacity, display } = targetNode.style;
          if (opacity === "1" && display !== "none") {
            check(completed);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

    check(completed);
  } catch (error) {
    console.error(error);
  }
});

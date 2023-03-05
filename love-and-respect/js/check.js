const check = (completed, lastDateStr) => {
  const msDay = 24 * 60 * 60 * 1000;
  const lastDate = lastDateStr
    ? new Date(lastDateStr).valueOf()
    : new Date().valueOf() - msDay;
  const currDate = new Date().valueOf();
  let flag = true;

  const items = document.querySelectorAll("div.cms-item.devotionals-item");
  for (let i = 0; i < items.length; i++) {
    const item = items.item(i);
    const epEl = item.querySelector("div.episode-item-id");
    const checkmarkEl = item.querySelector("img.completed-devotion-checkmark");
    if (epEl) {
      const epId = epEl.textContent.trim();
      if (completed.includes(epId)) checkmarkEl.classList.remove("hide");
      else {
        checkmarkEl.classList.add("hide");
        if (!flag || currDate - lastDate < msDay) {
          flag = false;
          const overlayEl = item.querySelector("a.devotionals-item-link");
          if (overlayEl) {
            overlayEl.setAttribute("href", "#");
            overlayEl.classList.add("disabled");
          }
        }
        flag = false;
      }
    }
  }
};

const fn = async () => {
  try {
    let completed = [],
      lastDateStr = "";
    const member = await window.$memberstackDom.getCurrentMember();
    if (member?.data?.metaData?.["Completed Devotional Courses"]) {
      console.log(
        `Completed Devotional Courses: `,
        member?.data?.metaData?.["Completed Devotional Courses"]
      );
      completed = member.data.metaData["Completed Devotional Courses"];
    }
    if (member?.data?.metaData?.["Completed Course Date"]) {
      console.log(
        `Completed Course Date: `,
        member?.data?.metaData?.["Completed Course Date"]
      );
      lastDateStr = member.data.metaData["Completed Course Date"];
    }

    check(completed, lastDateStr);
  } catch (error) {
    console.error(error);
  }
};

fn();

window.addEventListener("load", async () => {
  try {
    let completed = [];
    const member = await window.$memberstackDom.getCurrentMember();
    if (member?.data?.metaData?.["Completed Videos"]) {
      completed = member.data.metaData["Completed Videos"];
    }

    check(completed);
  } catch (error) {
    console.error(error);
  }
});

window.$memberstackDom
  .getCurrentMember()
  .then((member) => console.log(member.data));

const getData = () => {
  return new Promise((res, rej) => {
    fetch(
      "https://2jrzokcbqi.execute-api.us-east-1.amazonaws.com/prod/blogs-count",
      {
        method: "GET",
      }
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else throw new Error(resp.statusText);
      })
      .then((data) => {
        if (data.status) res(data.data);
        else throw new Error(data.message);
      })
      .catch((err) => rej(err));
  });
};

window.addEventListener("load", async () => {
  try {
    const { categoryArr, typeArr } = await getData();

    let navEl = document.getElementById("w-dropdown-list-0");
    let listItems = navEl.querySelectorAll("div.w-dyn-item");
    for (const listItem of listItems) {
      const aTag = listItem.querySelector("a");
      const href = aTag.getAttribute("href");
      const slug = href.split("/")[2];
      const catNum = listItem.querySelector("div.cat-number");

      const item = categoryArr.find((x) => x.slug === slug);
      if (item) {
        catNum.textContent = item.count;
      } else catNum.textContent = "0";
    }

    navEl = document.getElementById("w-dropdown-list-1");
    listItems = navEl.querySelectorAll("div.w-dyn-item");
    for (const listItem of listItems) {
      const aTag = listItem.querySelector("a");
      const href = aTag.getAttribute("href");
      const slug = href.split("/")[2];
      const typeNum = listItem.querySelector("div.type-number");

      const item = typeArr.find((x) => x.slug === slug);
      if (item) {
        typeNum.textContent = item.count;
      } else typeNum.textContent = "0";
    }
  } catch (error) {
    console.error(error);
  }
});

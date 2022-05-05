window.addEventListener("load", function () {
  // declaring relevant DOM Elements
  const btnEl = document.querySelector(".w-button");
  const listEl = document.querySelector("ul");

  // adding listener for initial li elements
  listEl.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => li.remove());
  });

  // handling btn click
  btnEl.addEventListener("click", function () {
    const listItem = document.createElement("li");
    listItem.textContent = "This is some text inside of a div block.";

    listEl.appendChild(listItem);

    // adding click listener to remove element for the created li
    listEl.addEventListener("click", (ev) => ev.target.remove());
  });
});

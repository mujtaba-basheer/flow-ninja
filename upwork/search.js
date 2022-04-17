window.addEventListener("load", () => {
  document.getElementById("search-button").addEventListener("click", () => {
    const searchText = document.getElementById("search-field").value;
    let url = "https://www.upwork.com/resources/search",
      query = "?query=";

    if (searchText) {
      query += encodeURIComponent(searchText).replace(/%20/g, "+");
      url += query;
    }

    window.location.pathname = url;
  });
});

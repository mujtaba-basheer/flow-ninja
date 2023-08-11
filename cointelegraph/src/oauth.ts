var login_path = "Webflow path to log in";
var redirect_uri =
  "Where your Webflow users are re-directed after OAuth log in";
var xano_oauth_init_url = "OAuth Init URL";
var xano_oauth_continue_url = "Continue URL";
var formHeaders = [];
var formResponse = [];

window.addEventListener("load", async () => {
  var curUrl = new URL(document.location.href);
  var code = curUrl.searchParams.get("code");
  if (code) {
    continueOauth(code);
  } else {
    const token = await Wized.data.get("c.token");
    if (!token && curUrl.pathname.indexOf("myaccount") !== -1) {
      document.location.href = login_path;
    }
  }
});

function continueOauth(code) {
  var fetchURL = new URL(xano_oauth_continue_url);
  fetchURL.searchParams.set("redirect_uri", redirect_uri);
  fetchURL.searchParams.set("code", code);
  fetchURL = fetchURL.toString();
  var newUrl = new URL(document.location.href);
  newUrl.searchParams.delete("code");
  newUrl.searchParams.delete("scope");
  newUrl.searchParams.delete("authuser");
  newUrl.searchParams.delete("hd");
  newUrl.searchParams.delete("prompt");
  history.replaceState(null, "", newUrl.toString());

  fetch(fetchURL, {
    headers: formHeaders,
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}

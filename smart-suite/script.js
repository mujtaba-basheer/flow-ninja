const knownFields = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.addEventListener("load", function () {
  var qs = window.location.search && window.location.search.substring(1);
  if (qs) {
    var search_params = new URLSearchParams(qs).entries();
    while (true) {
      var entry = search_params.next();
      if (entry.value) {
        var key = entry.value[0];
        var val = entry.value[1];
        document.cookie = key + "=" + encodeURIComponent(val);
      }

      if (entry.done) break;
    }
  }

  for (var i = 0; i < knownFields.length; i++) {
    var cname = knownFields[i];
    var cvalue = getCookie(cname);

    if (cvalue) {
      var divEl = document.querySelector("div.hs-" + cname);
      if (divEl) {
        var inputEl = divEl.querySelector("input");
        if (inputEl) {
          inputEl.value = cvalue;
        }
      }
    }
  }
});

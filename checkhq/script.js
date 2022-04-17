window.addEventListener("load", () => {
  const qs = window.location.search && window.location.search.substring(1);
  if (qs) {
    const search_params = new URLSearchParams(qs);
    for (const p of search_params) {
      const [key, val] = p;
      document.cookie = `${key}=${encodeURIComponent(val)}`;
      const divEl = document.querySelector(`div.hs-${key}`);
      if (divEl) {
        const inputEl = divEl.querySelector("input");
        if (inputEl) {
          inputEl.value = val;
        }
      }
    }
  }
});

// https://www.checkhq.com/contact?utm_campaign=xyz&utm_source=internet&utm_medium=slack&utm_content=empty&utm_term=first

const cookie = `_gcl_au=1.1.16140954.1648059740; __hssrc=1; _gcl_au=1.1.16140954.1648059740; __gtm_campaign_url=https%3A%2F%2Fwww.checkhq.com%2Fcontact%3Futm_campaign%3Dxyz%26utm_source%3Dinternet%26utm_medium%3Dslack%2520ds%26utm_content%3Dempty%26utm_term%3Dfirst; _ga=GA1.2.1092800903.1648059741; _gid=GA1.2.1275789529.1648059741; _gat_gtag_UA_143106845_1=1; __hstc=145161835.069ef2fdc423d2fe9ecab15131db5245.1648059743585.1648059743585.1648059743585.1; hubspotutk=069ef2fdc423d2fe9ecab15131db5245; __hssc=145161835.12.1648059743585; intercom-id-dgbqp5cn=f8529666-94af-42e5-81c0-c9aa7c280eb8; intercom-session-dgbqp5cn=`;
const cookies = cookie.split(";");
for (const part of cookies) {
  const [key, value] = part.split("=");
  console.log(`${key}: ${value}`);
}

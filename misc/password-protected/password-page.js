window.addEventListener("load", () => {
  const formEl = document.getElementById("email-form");
  if (formEl) {
    formEl.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      try {
        const inputEl = formEl.querySelector(`input#pass`);
        if (inputEl) {
          const password = inputEl.value;

          const body = JSON.stringify({
            path: window.location.pathname,
            password,
          });
          const req = await fetch(
            "https://ui4tjdk9fh.execute-api.us-east-1.amazonaws.com/prod/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length + "",
              },
              body,
              credentials: "include",
            }
          );
          const resp = await req.json();
          if (req.status === 200) {
            window.location.pathname = "/"; // path of page to direct to
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});

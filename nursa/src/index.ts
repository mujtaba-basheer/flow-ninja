type FormDataT = {
  "facility-name": string;
  email: string;
  facilities: string[];
};

window.addEventListener("load", () => {
  const formEl = document.querySelector<HTMLFormElement>(
    "form#notify-me-test-form"
  );
  if (formEl) {
    formEl.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      // console.log("submitted...");

      try {
        const formData: FormDataT = {
          "facility-name": "",
          email: "",
          facilities: [],
        };

        const nameEl = formEl.querySelector<HTMLInputElement>(
          "input#facility-name"
        );
        if (nameEl) formData["facility-name"] = nameEl.value;

        const emailEl = formEl.querySelector<HTMLInputElement>("input#email");
        if (emailEl) formData.email = emailEl.value;

        const facilities: string[] = [];
        const checkboxEls = formEl.querySelectorAll<HTMLInputElement>(
          `input[type="checkbox"]`
        );
        checkboxEls.forEach((checkboxEl) => {
          if (checkboxEl.checked) {
            const spanEl = checkboxEl.nextElementSibling;
            if (spanEl && spanEl.textContent) {
              facilities.push(spanEl.textContent?.trim());
            }
          }
        });
        formData.facilities = facilities;

        console.log(JSON.stringify(formData));

        const req = await fetch(
          "https://covzvcy1lb.execute-api.us-east-1.amazonaws.com/prod/multi-step-form",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resp = await req.json();
        console.log(`Response Received:`, resp);
      } catch (error) {
        console.error(error);
      }
    });
  }
});

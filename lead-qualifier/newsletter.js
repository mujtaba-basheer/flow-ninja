const newsLetterFormId = "wf-form-Newsletter-Form";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const addToNewsletter = async (emailValue) => {
  return new Promise((res, rej) => {
    const postData = JSON.stringify({
      userId: emailValue,
      userAttributes: {
        newsletter_signup: true,
        email: emailValue,
      },
    });

    fetch(
      "https://y9d7yiel60.execute-api.us-east-1.amazonaws.com/test/setUserAttributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Content-Length": postData.length,
        },
        body: postData,
      }
    )
      .then((resp) => {
        if (resp.status === 200) return resp.text();
        throw new Error(resp.statusText);
      })
      .then(() => res(null))
      .catch((error) => {
        console.log("error", error);
        rej(error);
      });
  });
};

window.addEventListener("load", () => {
  const formEl = document.getElementById(newsLetterFormId);
  const successEl = $(formEl).parent().find("div.success-message")[0];

  formEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    const emailVal = formEl.querySelector("input#Email").value;
    if (!validateEmail(emailVal)) {
      console.log("email invalid!");
      return;
    }

    try {
      await addToNewsletter(emailVal);
      formEl.style.display = "none";
      successEl.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  });
});

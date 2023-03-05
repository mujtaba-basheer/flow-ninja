window.addEventListener("load", async () => {
  try {
    // fetching img url form ls
    const img_url = localStorage.getItem("img_url");
    if (img_url) {
      const prefix =
        "https://webflow.com/api/sites/love-and-respect/formUploads/";
      $("#member-profile-image").attr("src", prefix + img_url);
      $(".member-image").attr("srcset", prefix + img_url);
      localStorage.removeItem("img_url");
    }

    // fetching member data
    const { data } = await window.$memberstackDom.getCurrentMember();
    if (data && data.metaData["Url Image"]) {
      $("#member-image").attr("src", data.metaData["Url Image"]);
      $(".member-image").attr("srcset", data.metaData["Url Image"]);
    }

    // adding submit listener
    const formEl = document.getElementById("wf-form-Profile-Settings");
    if (formEl) {
      formEl.addEventListener("submit", () => {
        const fileEl = document.getElementById("file-3");
        if (fileEl) {
          localStorage.setItem("img_url", fileEl.getAttribute("data-value"));
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
});

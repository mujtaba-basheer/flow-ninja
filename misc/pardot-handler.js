window.addEventListener("load", () => {
  const form = document.getElementById("wf-form-Lead-Gen-Form");
  form.setAttribute("target", "formFrame");
  form.setAttribute("onsubmit", "onSuccess()");

  const iFrame = document.createElement("iframe");
  iFrame.src = "#";
  iFrame.width = "1";
  iFrame.height = "1";
  iFrame.name = "formFrame";
  iFrame.style.opacity = "0";
  iFrame.setAttribute("method", "POST");

  document.body.prepend(iFrame);
});

function onSuccess() {
  setTimeout(() => {
    if (!(grecaptcha && grecaptcha.getResponse()))
      return alert("Please verify that you are not a robot!");

    const formParent = document.getElementById(
      "wf-form-Lead-Gen-Form"
    ).parentElement;

    formParent.querySelector("form").style.display = "none";
    formParent.querySelector("div#success-block").style.display = "block";

    const downloadBtn = document.getElementById("download-button");

    downloadBtn.setAttribute(
      "donwload",
      "HR-Herausforderungen im Finanzdienstleistungssektor erfolgreich meistern"
    );
    downloadBtn.click();
  }, 1500);
}

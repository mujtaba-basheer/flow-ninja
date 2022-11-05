let domainName = window.location.hostname;
let facebookShare = "https://www.facebook.com/sharer/sharer.php?u=";
let twitterShare = "https://twitter.com/share?url=";

const cmsItems = document.querySelectorAll(".cms-item");

cmsItems.forEach((item) => {
  const cmsSlug = item.querySelector(".cms-card");
  const faceBook = item.querySelector(".facebook");
  const twitter = item.querySelector(".twitter");
  const mail = item.querySelector(".email");

  try {
    const cardHeading = item.querySelector(".name-hidden").textContent.trim();

    const itemSlug = cmsSlug.pathname;
    let mailSubject = cmsSlug.pathname.split("/")[2];

    faceBook.setAttribute(
      "href",
      facebookShare + "https://" + domainName + itemSlug
    );
    twitter.setAttribute(
      "href",
      twitterShare +
        "https://" +
        domainName +
        itemSlug +
        "&text=" +
        cardHeading +
        "%20%7C%20" +
        domainName
    );
    mail.setAttribute(
      "href",
      "mailto:example@example.com?subject=" +
        cardHeading +
        "&body=" +
        "Visit our page on a link: " +
        "%0A" +
        "https://" +
        domainName +
        itemSlug
    );
  } catch (error) {}
});

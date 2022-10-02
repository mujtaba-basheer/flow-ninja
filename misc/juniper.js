// on page
window.addEventListener("load", () => {
  // selecting the link element that points to https://www.myjuniper.co.uk/product/orlistat-alli
  const navBtn = document.querySelector("a"); // edit this to make the selector more precise
  let href = navBtn.getAttribute("href");
  href =
    href.endsWith("?") || href.endsWith("/")
      ? href.substring(0, href.length - 1)
      : href;
  let newHref = href;
  if (href.includes("?"))
    newHref += `&referrer=${encodeURIComponent(
      "https://eucalyptus-vc.typeform.com/quiz-orlistat"
    )}`;
  else
    newHref += `?referrer=${encodeURIComponent(
      "https://eucalyptus-vc.typeform.com/quiz-orlistat"
    )}`;

  navBtn.setAttribute("href", newHref);
});

// on target page
window.addEventListener("load", () => {
  const referrer = document.referrer;
  if (
    !(
      referrer &&
      referrer.includes("https://eucalyptus-vc.typeform.com/quiz-orlistat")
    )
  )
    window.location.href = "page_link";
});

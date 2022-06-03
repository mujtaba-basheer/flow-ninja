$(document).ready(function () {
  var newParent = document.getElementById("new-banner-parent");
  var oldParent = document.getElementById("old-banner-parent");
  if (oldParent.childNodes.length > 0) {
    while (oldParent.childNodes.length > 0) {
      newParent.appendChild(oldParent.childNodes[0]);
    }
  }
  var newProductP = document.getElementById("new-product-parent");
  var oldProductP = document.getElementById("old-product-parent");
  if (oldParent.childNodes.length > 0) {
    while (oldProductP.childNodes.length > 0) {
      newProductP.appendChild(oldProductP.childNodes[0]);
    }
  }
  var newArticle = document.getElementById("new-article-parent");
  var oldArticle = document.getElementById("old-article-parent");
  console.log(oldParent.childNodes, oldArticle.childNodes);
  if (oldParent.childNodes.length > 0) {
    while (oldArticle.childNodes.length > 0) {
      newArticle.appendChild(oldArticle.childNodes[0]);
    }
  }
  var newBA = document.getElementById("new-ba-parent");
  var oldBA = document.getElementById("old-ba-parent");
  if (oldParent.childNodes.length > 0) {
    while (oldBA.childNodes.length > 0) {
      newBA.appendChild(oldBA.childNodes[0]);
    }
  }
  var newfaq = document.getElementById("new-faq-parent");
  var oldfaq = document.getElementById("old-faq-parent");
  if (oldParent.childNodes.length > 0) {
    while (oldfaq.childNodes.length > 0) {
      newfaq.appendChild(oldfaq.childNodes[0]);
    }
  }
});

window.addEventListener("load", () => {
  let stored_qs = localStorage.getItem("qs");
  const qs = window.location.search;

  if (qs) {
    if (qs !== stored_qs) {
      localStorage.setItem("qs", qs);
      stored_qs = qs;
    }
  }

  const loginBtn = document.getElementById("login-button");
  loginBtn.setAttribute("href", loginBtn.getAttribute("href") + qs);
});

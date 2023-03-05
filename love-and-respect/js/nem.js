const continueButtons = document.querySelectorAll(".checkout-button");
const editButtons = document.querySelectorAll(".edit-checkout-text");
const checkoutList = document.querySelectorAll(".checkout-dropdown-list");
const checkOutText = document.querySelectorAll(".checkout-text-only-wrap");
var n = 0;
var edit = 0;
var order = true;
var flag = true;
var clicked = 0;
continueButtons.forEach((continueButton) => {
  continueButton.addEventListener("click", function () {
    n = parseInt(continueButton.getAttribute("data-validator"));
    console.log(n);
    validFields();
  });
});
editButtons.forEach((editButton) => {
  editButton.addEventListener("click", function () {
    clicked = n;
    order = false;
    console.log(clicked);
    console.log("clicked");
    edit = parseInt(editButton.getAttribute("data-validator"));
    $(".checkout-text-only-wrap").removeClass("closed");
    $(".checkout-dropdown-list").addClass("closed");
    openSection(checkoutList[edit]);
  });
});
function validFields() {
  const contentBlocks = document.querySelectorAll(
    ".checkout-content-block:not(.checkout-content-block.review-and-purchase)"
  );
  const requiredFields = contentBlocks[n].querySelectorAll(
    "form:not(.w-condition-invisible) [required]"
  );
  if (checkIfValid(requiredFields) && order == true) {
    closeSection(checkoutList[n]);
    openSection(checkOutText[n]);
    n = n + 1;
    openSection(checkoutList[n]);
    closeSection(checkOutText[n]);
  } else if (order == false) {
    $(".checkout-text-only-wrap").removeClass("closed");
    $(".checkout-dropdown-list").addClass("closed");
    openSection(checkoutList[clicked]);
    closeSection(checkOutText[clicked]);
  }
  order = true;
}
function checkIfValid(elements) {
  const allInputs = elements;
  let isAllvaild = true;
  allInputs.forEach((element) => {
    if (!validateAll(element.value, element.type)) {
      isAllvaild = false;
      console.log(element);
      return;
    }
  });
  if (isAllvaild) {
    return true;
  }

  function validateAll(value, type, id) {
    if (type === "text") {
      if (value.length > 0) {
        isAllvaild = true;
      } else {
        isAllvaild = false;
      }
    } else if (id == "email") {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let ck = re.test(String(value).toLowerCase());
      if (ck) {
        // set errors here..
        isAllvaild = false;
      } else {
        // maybe remove errors if added previously..
        isAllvaild = true;
      }
      return ck;
    } else if (type === "phone") {
    } else if (type === "other") {
    }
    return isAllvaild;
  }
}
function openSection(elm) {
  $(elm).removeClass("closed");
}
function closeSection(elm1) {
  $(elm1).addClass("closed");
}

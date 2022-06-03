window.addEventListener("load", () => {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $("input[name=email]").keyup(function () {
    if (this.value == "") {
      $(".checkbox-field").css("max-height", "0px");
      $(".blog-post-submit-button").addClass("disabled-button");
    } else {
      $(".checkbox-field").css("max-height", "none");
      $(".blog-post-submit-button").removeClass("disabled-button");
    }
  });
  $('input[name="email"]').blur(function () {
    var email = $(this).val();
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      $("#email-error").css("display", "none");
    } else {
      $("#email-error").css("display", "block");
    }
  });
  var y = document.querySelector("#checkbox");
  y.addEventListener("change", function () {
    if ($("input#checkbox").is(":checked")) {
      $("#checkbox-error").css("display", "none");
    } else {
      $("#checkbox-error").css("display", "block");
    }
  });
  $("#btn-submit").on("click", function () {
    if ($("input#checkbox").is(":checked")) {
      $("#checkbox-error").css("display", "none");
    } else {
      $("#checkbox-error").css("display", "block");
    }
  });

  $("#test-btn").on("click", function () {
    let flag = true;
    if ($("input#checkbox").is(":checked")) {
      $("#checkbox-error").css("display", "none");
    } else {
      $("#checkbox-error").css("display", "block");
      flag = false;
    }

    var email = $('input[name="email"]').val();
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      $("#email-error").css("display", "none");
    } else {
      $("#email-error").css("display", "block");
      flag = false;
    }

    if (flag) {
      $("#btn-submit").trigger("click");
    }
  });
});

(function () {
  var ACCESS_KEY = "puppyAccidentGuideAccess";

  function hasFunction(name) {
    return typeof window[name] === "function";
  }

  function trackGa(eventName, params) {
    if (hasFunction("gtag")) {
      window.gtag("event", eventName, params || {});
    }
  }

  function trackMeta(eventName, params) {
    if (hasFunction("fbq")) {
      window.fbq("track", eventName, params || {});
    }
  }

  function allowDownloadAccess() {
    try {
      window.sessionStorage.setItem(ACCESS_KEY, "true");
    } catch (error) {
      return false;
    }

    return true;
  }

  function hasDownloadAccess() {
    try {
      return window.sessionStorage.getItem(ACCESS_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function initLandingPage() {
    var leadTargets = document.querySelectorAll("[data-lead-click], [data-lead-form-area]");

    leadTargets.forEach(function (target) {
      target.addEventListener("click", function () {
        trackGa("lead_form_click", {
          form_name: "Puppy Accident Solution Finder"
        });
      });
    });
  }

  function initThankYouPage() {
    allowDownloadAccess();
    trackGa("lead", {
      lead_magnet: "Puppy Accident Solution Finder"
    });
  }

  function initDownloadPage() {
    if (!hasDownloadAccess()) {
      window.location.replace("index.html");
      return;
    }

    var downloadButton = document.getElementById("downloadButton");

    if (downloadButton) {
      downloadButton.addEventListener("click", function () {
        trackGa("file_download", {
          file_name: "puppy-accident-solution-finder.pdf",
          link_url: downloadButton.getAttribute("href")
        });
        trackMeta("Lead", {
          content_name: "Puppy Accident Solution Finder"
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");

    initLandingPage();

    if (page === "thank-you") {
      initThankYouPage();
    }

    if (page === "download") {
      initDownloadPage();
    }
  });
}());

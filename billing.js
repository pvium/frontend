const PACKAGES_API_URL = "https://api.example.com/v1/billing/packages";

function showStatus(message, type) {
  $("#billingStatus")
    .removeClass("loading error empty success")
    .addClass(type || "success")
    .text(message);
}

function showLoadingState() {
  $("#packagesContainer").empty();
  showStatus("Loading packages...", "loading");
}

function showErrorState() {
  $("#packagesContainer").empty();
  showStatus("Unable to load billing packages. Please try again later.", "error");
}

function showEmptyState() {
  $("#packagesContainer").empty();
  showStatus("No subscription packages are available right now.", "empty");
}

function renderPackages(packages) {
  if (!Array.isArray(packages) || packages.length === 0) {
    showEmptyState();
    return;
  }

  const cards = packages.map((pkg) => {
    const features = Array.isArray(pkg.features) ? pkg.features : [];
    const featureItems = features.map((feature) => $("<li>").text(feature));

    return $("<article>", { class: "package-card" }).append(
      $("<h2>").text(pkg.name || "Unnamed package"),
      $("<p>", { class: "package-description" }).text(pkg.description || ""),
      $("<p>", { class: "package-price" }).append(
        `$${Number(pkg.priceMonthly || 0).toLocaleString()}`,
        $("<span>").text(" / month"),
      ),
      $("<ul>", { class: "features-list" }).append(featureItems),
      $("<button>", {
        class: "select-package",
        type: "button",
        text: "Select package",
        "data-package-id": pkg.id || "",
      }),
    );
  });

  $("#packagesContainer").empty().append(cards);
  showStatus(`Loaded ${packages.length} subscription package(s).`, "success");
}

function loadPackages() {
  showLoadingState();

  $.ajax({
    url: PACKAGES_API_URL,
    method: "GET",
    dataType: "json",
  })
    .done((packages) => {
      renderPackages(packages);
    })
    .fail(() => {
      showErrorState();
    });
}

$(function () {
  loadPackages();

  $("#packagesContainer").on("click", ".select-package", function () {
    const packageId = $(this).data("package-id");
    window.localStorage.setItem("selectedPackageId", packageId);
    console.log("Selected package:", packageId);
    showStatus(`Selected package: ${packageId}`, "success");
  });
});

const PACKAGE_API_URL = "https://api.example.com/v1/billing/packages";

const fallbackPackages = [
  {
    id: "starter",
    name: "Starter",
    description: "Core billing tools for a small team.",
    priceMonthly: 19,
    features: ["3 users", "Basic reports", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "More controls for teams with recurring billing needs.",
    priceMonthly: 49,
    features: ["10 users", "Advanced reports", "Priority support"],
  },
  {
    id: "scale",
    name: "Scale",
    description: "Expanded limits and support for larger billing operations.",
    priceMonthly: 99,
    features: ["Unlimited users", "Custom exports", "Dedicated support"],
  },
];

function setStatus(message) {
  $("#statusText").text(message);
}

function renderState(title, message, type) {
  $("#packageGrid").html(
    $("<article>", { class: `state-card ${type || ""}` }).append(
      $("<strong>").text(title),
      $("<p>").text(message),
    ),
  );
}

function renderPackages(packages) {
  if (!packages.length) {
    renderState("No packages found", "There are no billing packages available.");
    return;
  }

  const cards = packages.map((pkg) => {
    const features = (pkg.features || []).map((feature) =>
      $("<li>").text(feature),
    );

    return $("<article>", { class: "package-card" }).append(
      $("<h2>").text(pkg.name),
      $("<p>", { class: "package-description" }).text(pkg.description),
      $("<p>", { class: "package-price" }).append(
        `$${pkg.priceMonthly}`,
        $("<span>").text(" / month"),
      ),
      $("<ul>", { class: "feature-list" }).append(features),
      $("<button>", {
        type: "button",
        text: "Select package",
        "data-package-id": pkg.id,
      }),
    );
  });

  $("#packageGrid").empty().append(cards);
}

function loadPackages() {
  setStatus("Loading packages...");
  renderState("Loading", "Fetching billing packages from the API.");

  $.ajax({
    url: PACKAGE_API_URL,
    method: "GET",
    dataType: "json",
    timeout: 5000,
  })
    .done((packages) => {
      const normalized = Array.isArray(packages) ? packages : [];
      setStatus(`Loaded ${normalized.length} package(s).`);
      renderPackages(normalized);
    })
    .fail(() => {
      setStatus("API unavailable. Showing demo packages.");
      renderPackages(fallbackPackages);
    });
}

$(function () {
  loadPackages();

  $("#reloadPackages").on("click", loadPackages);

  $("#packageGrid").on("click", "button[data-package-id]", function () {
    const packageId = $(this).data("package-id");
    window.localStorage.setItem("selectedBillingPackage", packageId);
    setStatus(`Selected package: ${packageId}`);
  });
});

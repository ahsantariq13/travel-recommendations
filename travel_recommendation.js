$(document).ready(function () {
  $("#search-button").click(function () {
    var searchQuery = $("#search input").val();
    if (searchQuery === "") {
      return;
    }
    $.ajax({
      url: "travel_recommendation_api.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var results;
        if (searchQuery.toLowerCase() === "country") {
          results = data.countries.map((country) => country.cities).flat();
        } else if (searchQuery.toLowerCase() === "template") {
          results = data.temples;
        } else if (searchQuery.toLowerCase() === "beach") {
          results = data.beaches;
        } else {
          results = data.countries.map((country) => country.cities).flat();
          results = results.filter((result) =>
            result.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        $("#search-results").html("");
        results.forEach((result) => {
          $("#search-results").append(`
                    <div class="search-card">
                        <img src="${result.imageUrl}" alt="${result.name}">
                        <h2>${result.name}</h2>
                        <p>${result.description}</p>
                        <div> <button>Explore</button></div>
                    </div>
                `);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", error);
      },
    });
  });
  $("#clear-button").click(function () {
    $("#search input").val("");
    $("#search input").focus();
    $("#search-results").html("");
  });
});

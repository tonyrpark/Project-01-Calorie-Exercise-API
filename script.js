$("#find-food").on("click", function (event) {
  event.preventDefault();
  const cal = $("#food-input").val();
  const stuff = `${encodeURIComponent(cal)}`;
  const queryURL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cIdiRs2C1u9alyDf47ytXR0cxaz8E6K37jiI15Dc&query=${stuff}`;

  console.log(stuff);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.foods[0].foodNutrients[9].value);

    var calorieValue = $("<p>");

    // $("#food-view").text(
    // //       JSON.stringify(response.foods[0].foodNutrients[9].value)
    // );

    // calorieValue.text(response.foods[0].foodNutrients[9].value);
    console.log(calorieValue);
    $("#food-view").val(response.foods[0].foodNutrients[9].value);
  });
});

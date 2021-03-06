// FOOD API CODE
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
    for (let calories of response.foods[0].foodNutrients) {
      console.log("test");
      if (calories.nutrientId === 1008) {
        console.log("value");
        console.log(calories.value);
        $("#food-view").val(calories.value);
      }
    }
  });
});

//Motivational Quotes API
// const settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://bodybuilding-quotes.p.rapidapi.com/single-quote?id=1",
//   method: "GET",
//   headers: {
//     "x-api-key": "{{api-key}}",
//     "x-rapidapi-key": "980fbf3eb4msh7995ecf778f3f83p1f9cdejsn73478224c087",
//     "x-rapidapi-host": "bodybuilding-quotes.p.rapidapi.com",
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
//   console.log(response.quote);
//   var motoQuote = $(".motivationalArea")
//     .val(response.quote)
//     .text(
//       "Motivational Quote of the Day: " +
//         response.quote +
//         " -" +
//         response.author
//     );
// });

//test
const settings = {
  async: true,
  crossDomain: true,
  url:
    "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info",
  method: "GET",
  headers: {
    "x-rapidapi-key": "980fbf3eb4msh7995ecf778f3f83p1f9cdejsn73478224c087",
    "x-rapidapi-host":
      "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(response.quote);
  var motoQuote = $(".motivationalArea")
    .val(response.text)
    .text(
      "Motivational Quote of the Day: " + response.text + " -" + response.author
    );
});

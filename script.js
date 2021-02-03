// FOOD API CODE
$("#find-food").on("click", function(event) {

        
  event.preventDefault();
  const cal = $("#food-input").val();
  const stuff = (`${encodeURIComponent(cal)}`);
  const queryURL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cIdiRs2C1u9alyDf47ytXR0cxaz8E6K37jiI15Dc&query=${stuff}`;
  
  console.log(stuff)

  $.ajax({
url: queryURL,
method: "GET"})
.then(function(response) {
console.log(response)
//console.log(response.foods[0].foodNutrients[9].value)



for (let calories of response.foods[0].foodNutrients)
{
  console.log("test");
 
  if (calories.nutrientId === 1008){
    console.log("value");
    console.log(calories.value);
    $("#food-view").text(JSON.stringify(calories.value));
  }
}

}
 )});

// EXERCISE API CODE

// const settings = {
//   url: "https://trackapi.nutritionix.com/v2/natural/exercise",
//   method: "GET",
//   headers: {
//     "x-app-id": "16588fb4",
//     "x-app-key": "5f0cad786616a38357569762034fcf0d",
//     "x-remote-user-id": 0,
//     "Content-Type": "application/json",
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// $("#find-exercise").on("click", function (event) {
//   event.preventDefault();
//   const calEx = $("#food-input").val();
//   const stuff = `${encodeURIComponent(calEx)}`;
//   const queryURL = `https://trackapi.nutritionix.com/v2/natural/exercise`;

//   console.log(stuff);

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);

//     var calorieValue = $("<p>");

//     console.log(calorieValue);
//     $("#food-view").val(response.foods[0].foodNutrients[9].value);
//   });
// });

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
});

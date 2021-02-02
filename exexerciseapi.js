'use strict';

/* Clears results */

function clearResults() {
  $('.results-list').empty();
  $('.errorMessage').addClass('hidden');
}

/* Appends results to list from both POST requests */

function displayResults(finalData) {
  let totalCalories = 0;
  for (let i = 0; i < finalData.foodData.foods.length; i++) {
    let foodCalories = Math.round(finalData.foodData.foods[i].nf_calories);
    totalCalories = totalCalories + foodCalories;
    let yogaMinutes = Math.round((foodCalories / finalData.exerData[0].nf_calories))
    let walkingMinutes = Math.round((foodCalories / finalData.exerData[1].nf_calories));
    let bikingMinutes = Math.round((foodCalories / finalData.exerData[2].nf_calories));
    let runningMinutes = Math.round((foodCalories / finalData.exerData[3].nf_calories));
    let foodName = finalData.foodData.foods[i].food_name.charAt(0).toUpperCase() + finalData.foodData.foods[i].food_name.slice(1);

    $('.results-list').append(`
    <section class='foodEntry'>
    <section class='foodResults'>
      <div class='foodTitle'>
        (<span class='servingNum'>${finalData.foodData.foods[i].serving_qty}</span>) ${foodName}
      </div>
      <div class='foodCalorie'>
        <span class='calNum'>${foodCalories}</span> kcal
      </div>
    </section>
    <section class='exerEntry'>
      <img class='exerPic' src="https://i.imgur.com/EKlFbhO.png" alt="A person doing yoga">
      <p class='exerTitle'>Yoga</p><p><span class='exerMin'>${yogaMinutes}</span> min</p>
    </section>
    <section class='exerEntry'> 
      <img class='exerPic' src="https://i.imgur.com/1oV52Id.png" alt="A person walking">
      <p class='exerTitle'>Walk</p><p><span class='exerMin'>${walkingMinutes}</span> min</p>
    </section>
    <section class='exerEntry'>
      <img class='exerPic' src="https://i.imgur.com/5bEKQlU.png" alt="A person biking">
      <p class='exerTitle'>Bike</p><p><span class='exerMin'>${bikingMinutes}</span> min</p>
    </section>
    <section class='exerEntry'>
      <img class='exerPic' src="https://i.imgur.com/WtzLbvd.png" alt="A person running">
      <p class='exerTitle'>Run</p><p><span class='exerMin'>${runningMinutes}</span> min</p>
    </section>
    </section>`);
  } 
    let totalData = {

  };
  if (finalData.foodData.foods.length > 1) {
    displayTotalCalories({totalCalories:  `${totalCalories}`,
    yogaMinutes: `${finalData.exerData[0].nf_calories}`,
    walkingMinutes: `${finalData.exerData[1].nf_calories}`,
    bikingMinutes: `${finalData.exerData[2].nf_calories}`,
    runningMinutes: `${finalData.exerData[3].nf_calories}`});
  }
  $('.results-list').removeClass('hidden');
  $('.footer').removeClass('hidden');
}

/* Uses object totalData for total calories and exercise data */

function displayTotalCalories(totalData) {
  $('.results-list').append(`
  <section class='foodEntry'>
  <section class='foodResults'>
    <div class='foodTitle'>
      Total
    </div>
    <div class='foodCalorie'>
      <span class='calNum'>${totalData.totalCalories}</span> kcal
    </div>
  </section>
  <section class='exerEntry'>
    <img class='exerPic' src="https://i.imgur.com/EKlFbhO.png" alt="A person doing yoga">
    <p class='exerTitle'>Yoga</p><p><span class='exerMin'>${Math.round(totalData.totalCalories / totalData.yogaMinutes)}</span> min</p>
  </section>
  <section class='exerEntry'> 
    <img class='exerPic' src="https://i.imgur.com/1oV52Id.png" alt="A person walking">
    <p class='exerTitle'>Walk</p><p><span class='exerMin'>${Math.round(totalData.totalCalories / totalData.walkingMinutes)}</span> min</p>
  </section>
  <section class='exerEntry'>
    <img class='exerPic' src="https://i.imgur.com/5bEKQlU.png" alt="A person biking">
    <p class='exerTitle'>Bike</p><p><span class='exerMin'>${Math.round(totalData.totalCalories / totalData.bikingMinutes)}</span> min</p>
  </section>
  <section class='exerEntry'>
    <img class='exerPic' src="https://i.imgur.com/WtzLbvd.png" alt="A person running">
    <p class='exerTitle'>Run</p><p><span class='exerMin'>${Math.round(totalData.totalCalories / totalData.runningMinutes)}</span> min</p>
  </section>
  </section>`);
}

/* Sends user information to first POST request */

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    sendRequest(searchBar);
  });
}

$(function() {
  watchForm();
});

/* POST REQUEST */

function sendRequest(searchBar) {
  let finalInput = `{\n    \"query\": \"${searchBar.value}\"\n}`;
  clearResults();

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "x-app-id": "b55b7c9e",
      "x-app-key": "bb03ea62701acc02eb82854413de171d",
      "cache-control": "no-cache",
    },

    "processData": false,
    "data": "{}"
  }

  settings.data = finalInput;

  $.ajax(settings).done(function (response) {
    exerciseRequest(response);
  });

  $.ajax(settings).fail(function (err) {
    $('.results-list').empty();
    $('.errorMessage').replaceWith(`<p class='errorMessage'>${err.status} ${err.responseJSON.message}</p>`);
    $('.results-title').addClass('hidden');
    $('.results-list').removeClass('hidden');
  });
}

/* POST Request from weight, age, and gender for calorie burn rate */

function exerciseRequest(response) {
  let foodData = response;
  let userWeight = weightInput.value; 

  if (kgType.value == 'lbs') {
    userWeight = (userWeight / 2.205);
  };
  /* Query will slice second to last exercise from results, must double */
  let exerQuery = `{\n    \"query\": \"1 minute yoga, 1 minute walk, 1 minute bike, 1 minute bike, and 1 minute run.\",
    \"weight_kg\": \"${userWeight}\",
    \"age\": \"${ageInput.value}\",
    \"gender\": \"${genderInput.value}\"}`;

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://trackapi.nutritionix.com/v2/natural/exercise",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "x-app-id": "b55b7c9e",
      "x-app-key": "bb03ea62701acc02eb82854413de171d",
      "cache-control": "no-cache",
    },
    "processData": false,
    "data": "{}"
  }

  settings.data = exerQuery;
  let finalData = {};

  $.ajax(settings).done(function (exerResponse) {
    let exerData = exerResponse.exercises;
    finalData = {foodData, exerData};
    console.log(finalData);
    displayResults(finalData);
  });

  $.ajax(settings).fail(function (err) {
    $('.results-list').empty();
    $('.errorMessage').replaceWith(`<p class='errorMessage'>${err.status} ${err.responseJSON.message}</p>`);
    $('.results-title').addClass('hidden');
    $('.results-list').removeClass('hidden');
  });
}
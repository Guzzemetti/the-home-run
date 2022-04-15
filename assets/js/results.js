// function that takes the search result from the index page and moves it to the fetch function
function getIndexSearch() {
  var searchParams = document.location.search.trim();
  console.log(searchParams)
  var searchedText = searchParams.split('=').pop();
  console.log(searchedText)

  yelpFetchTest(searchedText);
}

// fetches data from yelp api for the searched term
// pushes data to a new variable to print desired data to the html results	
function yelpFetchTest(searchedText) {

  console.log(searchedText);

  fetch(`https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?description=food&location=${searchedText}&price=1&limit=5`, {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer GFh-TUiVvdi6RsShCJKhucGwyeTCt8LOC9Fw2O9CmZSziB3CeoLj5T87o6cbp5a1tyWNsltXGw9xDpMjrKzV3SM9SX5iSgDrsxUCX00B80lbUnLa1dSfUS9StKxVYnYx"
    }
  })
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      printYelpData(data);
    })
    .catch(err => {
      console.error(err);
    });
}

// finds aplicable data 
// for now, just console logged to show it is working
function printYelpData(data) {
  console.log(data);

  var yelpSearchList = data.businesses;
  for (let i = 0; i < yelpSearchList.length; i++) {


    var placeName = data.businesses[i].name;
    var placeAddress = data.businesses[i].location.display_address;
    var phoneNum = data.businesses[i].phone;
    var rating = data.businesses[i].rating;
    

    // console.log(placeName);
    // console.log(placeAddress);
    // console.log(phoneNum);
    // console.log(rating);
    // console.log(lat);
    // console.log(lon);

    // // create the append function
    // function appendSearch(placeName,placeAddress,phoneNum,rating) {
    var ul = document.getElementById('ule')
    var nameItem = document.createElement('li')
    nameItem.textContent = placeName
    var addressItem = document.createElement('li')
    addressItem.textContent = placeAddress
    var phoneItem = document.createElement('li')
    phoneItem.textContent = phoneNum
    var ratingItem = document.createElement('li')
    ratingItem.textContent = rating
    ul.appendChild(nameItem)
    ul.appendChild(addressItem)
    ul.appendChild(phoneItem)
    ul.appendChild(ratingItem)


    initMap(data)
  }
}

// runs this function first when page is loaded
getIndexSearch();

let map;
var apiKey = "AIzaSyDREEsPaYeOmMTfyuA6WAejEQQsWEeNWSU";
// var apiLink = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

console.log("connected");

// Appends Google Maps API script to the results.html
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
script.async = true;

document.body.appendChild(script);

// Initialize and add the map
function initMap(data) {

  // Centers the map to the region lon/lat for the first listed result
  var regionLat = parseFloat(data.region.center.latitude).toFixed(3);
  var regionLon = parseFloat(data.region.center.longitude).toFixed(3);
 
    const location = new google.maps.LatLng(regionLat, regionLon)
    // The map, centered the users lat/long based on their zip code
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: location,
    }
  );


  var businessLocations = data.businesses;
  for (let i = 0; i < businessLocations.length; i++) {
      
  var lat = (data.businesses[i].coordinates.latitude);
  var lon = (data.businesses[i].coordinates.longitude);
  const resultMark = {lat: lat, lng: lon};

  // The marker, positioned at the zip code entered
  const marker = new google.maps.Marker({
    position: resultMark,
    map: map,
  })
  }
}

//Global Variables
var googleApi;
var city;
var state;
var cityState;
var zip;
var map;
var searchedPlace;
var hikeApi = "200232469-8c224addc6df491926b59fdf73c26e1a";
var googleApi = "AIzaSyAGqySJr47rVKYnN2R2UvMM4YDKlRP691c";
var distance = 3;
var lat;
var lng;

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 5.8520, lng: -55.2038
//         },
//         zoom: 3
//     });
// };

//Click event listener for the button the index page
$("#search-info").on("click", function (event) {
    event.preventDefault();
    var city = $('#inputCity').val().trim();
    var state = $('#inputState').val().trim();

    //Query URL from the Google Maps API
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=+" + city + ",+" + state + "&key=" + googleApi;

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (coords) {
            console.log(coords.results[0].geometry.location);
            //Passing latitude and longitude to searchedPlace
            searchedPlace = (coords.results[0].geometry.location);
            console.log(searchedPlace);
            lat = searchedPlace.lat;
            lng = searchedPlace.lng;
            var queryHike = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + distance + "&key=" + hikeApi;
            return $.ajax({
                url: queryHike,
                method: "GET"
            }).then(function (hikeInfo) {

                console.log(queryHike);

                // Log the resulting object
                console.log(hikeInfo);


                // Log the data in the console as well
                // console.log(hikeInfo.trails[0].location);
                // console.log(hikeInfo.trails[0].type);
                // console.log(hikeInfo.trails[0].length);
                // console.log(hikeInfo.trails[0].ascent);
            });
        });
});

$(document).ready(function () {


    //Get elements
    const emailId = $("#email");
    const passwordId = $("#password");
    const signup = $("#signup");
    const login = $("#login");
    const logout = $("#logout");
    //Firebase Auth
    const config = {
        apiKey: "AIzaSyCy9eM2c0RKkQkB3TTINPHmIX9BajI_Gt8",
        authDomain: "hikingapp-eb47b.firebaseapp.com",
        databaseURL: "https://hikingapp-eb47b.firebaseio.com",
        projectId: "hikingapp-eb47b",
        storageBucket: "",
        messagingSenderId: "768321299488"
    };

    firebase.initializeApp(config);

    const auth = firebase.auth();

    auth.onAuthStateChanged(firebaseUser => { });

    // Add Login event

    $("#login").on('click', e => {
        e.preventDefault();
        //Get email and password
        const email = emailId.val().trim();
        const password = passwordId.val().trim();
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    $("#signup").on('click', e => {
        e.preventDefault();
        //Get email and password
        //TODO: check for real email
        const email = emailId.val().trim();
        const password = passwordId.val().trim();
        const auth = firebase.auth();
        console.log(email, password);

        //Create User
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            console.log(error);

        });
    });

    $("#logout").on('click', e => {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("not logged in");
        }
    });


});
// $("button").on("click", function () {






// var searchTerm = $("#").val().trim();
// queryURL += "&q=" + searchTerm;

// // if the user provides a startYear, include it in the queryURL
// var startYear = $("#start-year").val().trim();

// if (parseInt(startYear)) {
//     queryURL += "&begin_date=" + startYear + "0101";
// }

// // if the user provides an endYear, include it in the queryURL
// var endYear = $("#end-year").val().trim();

// if (parseInt(endYear)) {
//     queryURL += "&end_date=" + endYear + "0101";
// }


// });
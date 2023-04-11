var client_id = 'c0cb3e32a5f84f688b89b05ff48fd8f3';
var client_secret = '71019c8014f843f79bd4f7bea6167a05';

spotSearchButton = document.getElementById('spot-search-btn');

var authOptions = {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
};

fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            var token = data.access_token;

            var options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            };

            // Log the token response
            console.log('Access Token:', token);

            // Define the searchSongs() function in the global scope
            window.searchSongs = function () {
                // Get input value
                var query = document.getElementById('input-track').value;

                // Make API request with the access token
                fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Search Results:', data);
                        // Clear previous results
                        document.getElementById('input-track').innerHTML = '';

                        // Loop through search results and create list items

                    })

            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// add event listener to search button
spotSearchButton.addEventListener('click', function () {
    searchSongs();
});

























bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 4,
    pagination: false,
});

getYoutubeList([`Linkin Park`, `In the End`, `Folk`, `Cover`]);
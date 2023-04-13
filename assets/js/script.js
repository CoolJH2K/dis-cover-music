var client_id = 'c0cb3e32a5f84f688b89b05ff48fd8f3';
var client_secret = '71019c8014f843f79bd4f7bea6167a05';

spotSearchButton = document.getElementById('spot-search-btn');
albumArt = document.getElementById('album-cover');
trackDetails = document.getElementById('track-details');
var carouselContainer = document.querySelector('.carousel-container')


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
                        // display album cover
                        albumArt.src = data.tracks.items[0].album.images[1].url;
                        // display track details
                        trackDetails.innerHTML = `
          <h1 class="is-size-2 subtitle">Track Title: ${data.tracks.items[0].name}</h1>
          <h2 class="is-size-2 subtitle">Artist: ${data.tracks.items[0].artists[0].name}</h2>
          <h2 class="is-size-2 subtitle">Album Name: ${data.tracks.items[0].album.name}</h2>
        `;

                        // Update query title with track name
                        var queryTitle = document.getElementById('query-title');
                        queryTitle.textContent = `${data.tracks.items[0].name}`;

                        // Populate the dropdown menu with artists
                        var dropdownContent = document.querySelector('.dropdown-content.artist-list');
                        dropdownContent.innerHTML = ''; // Clear previous artists
                        data.tracks.items.forEach(function (track) {
                            track.artists.forEach(function (artist) {
                                var artistLink = document.createElement('a');
                                artistLink.href = '#!';
                                artistLink.className = 'dropdown-item artist';
                                artistLink.textContent = artist.name;
                                dropdownContent.appendChild(artistLink);

                                // Add event listener to artist link
                                artistLink.addEventListener('click', function () {
                                    // Update query title based on selected artist
                                    queryTitle.innerHTML = `${track.name} ${artist.name}`;
                                    setTimeout(updateCarousel,500);
                                    // Update album art and track details based on selected artist
                                    albumArt.src = track.album.images[1].url;
                                    trackDetails.innerHTML = `
                <h1 class="is-size-2 subtitle">Track Title: ${track.name}</h1>
                <h2 class="is-size-2 subtitle">Artist: ${artist.name}</h2>
                <h2 class="is-size-2 subtitle">Album Name: ${track.album.name}</h2>
              `;

                                });
                            });
                        });

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
    //Set Timeout to make sure query title is changed before we update carousel
    setTimeout(updateCarousel,500);
});


//Function that extracts search results 
async function extractYoutubeResults(queries) {
    // Return data from response
    var searchResults = await getYoutubeList(queries);
    console.log(searchResults);
    //Empties out carousel container
    carouselContainer.innerHTML = ``;
    var newCarousel = document.createElement(`div`);
    newCarousel.classList.add(`carousel`);
    carouselContainer.append(newCarousel);

    //For each video create a card with a thumbnail and title
    searchResults.items.forEach(item => {
        //Get data from the item returned before
        var videoTitle = item.snippet.title;
        var thumbnail = item.snippet.thumbnails.high.url;
        var videoId = item.id.videoId;

        //Create a div to contain the card
        var videoCard = document.createElement(`div`);
        videoCard.classList.add(`m-1`);
        //Create the card
        videoCard.innerHTML =
        `
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="${thumbnail}" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <!-- Add Youtube Data To Display here (?) -->
                <a href="https://www.youtube.com/watch?v=${videoId}"><p class="">${videoTitle}</p></a>
            </div>
        </div>
        `
        //Append to the carousel the card
        newCarousel.append(videoCard);
    });

    //After building all the card, initialize the carousel
    bulmaCarousel.attach('.carousel', {
        slidesToScroll: 4,
        slidesToShow: 4,
        infinite: true,
        pagination: false,
    });

}

// event listener for genre dropdown
var genreDropdown = document.querySelector('.genre');
genreDropdown.addEventListener('click', function (event) {
    // Get current query title
    var queryTitle = document.getElementById('query-title').textContent;
    // Get previously selected genre
    var previousGenre = document.querySelector('.genre .dropdown-item.selected');
    // If there is a previously selected genre, remove it from query title
    if (previousGenre) {
        var genreToRemove = previousGenre.textContent;
        queryTitle = queryTitle.replace(genreToRemove, '');
        previousGenre.classList.remove('selected');
    }
    // Append selected genre to query title
    queryTitle += ' ' + event.target.textContent;
    // Update query title with appended genre
    document.getElementById('query-title').textContent = queryTitle;
    // Add 'selected' class to newly selected genre
    event.target.classList.add('selected');
    // Update carousel with new query title
    updateCarousel();
});

//Function that gets query title and updates carousel with said value
function updateCarousel(){
    var queryArray = document.getElementById(`query-title`).textContent.split(` `);
    console.log(queryArray);
    extractYoutubeResults(queryArray);
}

const button = document.querySelector('.return-home');

button.addEventListener('click', function() {
  window.location.href = 'homepage.html';
});


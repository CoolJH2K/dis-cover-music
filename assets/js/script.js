var client_id = 'c0cb3e32a5f84f688b89b05ff48fd8f3';
var client_secret = '71019c8014f843f79bd4f7bea6167a05';

spotSearchButton = document.getElementById('spot-search-btn');
albumArt = document.getElementById('album-cover');
trackDetails = document.getElementById('track-details');
var carouselContainer = document.querySelector('.carousel-container')

//Adds bulma carousel properties to carousel in html 
bulmaCarousel.attach('.carousel', {
    slidesToScroll: 1,
    slidesToShow: 4,
    pagination: false,
});

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
          <h1>Track Title: ${data.tracks.items[0].name}</h1>
          <h2>Artist: ${data.tracks.items[0].artists[0].name}</h2>
          <h2>Album Name: ${data.tracks.items[0].album.name}</h2>
        `;

                        // Populate the dropdown menu with artists
                        var dropdownContent = document.querySelector('.dropdown-content.artist-list');
                        dropdownContent.innerHTML = ''; // Clear previous artists
                        data.tracks.items.forEach(function (track) {
                            track.artists.forEach(function (artist) {
                                var artistLink = document.createElement('a');
                                artistLink.href = '#';
                                artistLink.className = 'dropdown-item artist';
                                artistLink.textContent = artist.name;
                                dropdownContent.appendChild(artistLink);

                                // Add event listener to artist link
                                artistLink.addEventListener('click', function () {
                                    // Update album art and track details based on selected artist
                                    albumArt.src = track.album.images[1].url;
                                    trackDetails.innerHTML = `
                <h1>Track Title: ${track.name}</h1>
                <h2>Artist: ${artist.name}</h2>
                <h2>Album Name: ${track.album.name}</h2>
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
});


//Function that extracts search results 
async function extractYoutubeResults(queries){
    var searchResults = await getYoutubeList(queries);
    console.log(searchResults);
    carouselContainer.innerHTML = ``;
    var newCarousel = document.createElement(`div`);
    newCarousel.classList.add(`carousel`);
    carouselContainer.append(newCarousel);
    searchResults.items.forEach(item => {
        var videoTitle = item.snippet.title;
        var thumbnail = item.snippet.thumbnails.default.url;
        var videoId = item.id.videoId;
        
        var videoCard = document.createElement(`div`);
        videoCard.classList.add(`m-1`);
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
        newCarousel.append(videoCard);
    });

    bulmaCarousel.attach('.carousel', {
        slidesToScroll: 4,
        slidesToShow: 4,
        infinite: true,
        pagination: false,
    });
    
}

//Event listener for extracting the youtube result  
document.addEventListener('keypress', function(event){
    if(event.key === '='){
        extractYoutubeResults([`Linkin Park`, `In the End`, `Metal`, `Cover`]);
    }
})

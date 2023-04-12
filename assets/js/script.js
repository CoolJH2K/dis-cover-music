bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 4,
    pagination: false,
});


//Function that extracts search results 
async function extractYoutubeResults(){
    var searchResults = await getYoutubeList([`Linkin Park`, `In the End`, `Metal`, `Cover`]);
    var videos = searchResults.list;

    videos.forEach(video => {
        
    });
    // <div class="item-1 m-1">
    //     <!-- Slide Content -->
    //     <div class="card">
    //     <div class="card-image">
    //         <figure class="image is-4by3">
    //         <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    //         </figure>
    //     </div>
    //     <div class="card-content">
    //         <!-- Add Youtube Data To Display here (?) -->
    //         <p class="">Sample title</p>
    //     </div>
    //     </div>
    // </div>
    
}

extractYoutubeResults();



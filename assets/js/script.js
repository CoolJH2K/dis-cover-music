bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 4,
    pagination: false,
});


//Function that extracts search results 
async function extractYoutubeResults(){
    var searchResults = await getYoutubeList([`Linkin Park`, `In the End`, `Folk`, `Cover`]);
    console.log(searchResults);
}

extractYoutubeResults();



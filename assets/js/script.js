bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 4,
    pagination: false,
});

const searchResults =  getYoutubeList([`Linkin Park`, `In the End`, `Folk`, `Cover`]);
console.log(searchResults);
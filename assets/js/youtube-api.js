var apiKey = `AIzaSyDxtdMbk6LZWLUD55kDbiZK9yd5vcBCBJw`;
var maxResults = 20;
//Function that return data according to our query
async function getYoutubeList(searchQueries){
    //Format the qeuries in to a comma separated string 
    var formattedQueries = searchQueries.join(',');
    
    //Fetch from a dynamically generated string
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedQueries},cover&type=video&videoEmbeddable=true&order=relevance&maxResults=${maxResults}&safeSearch=strict&key=${apiKey}`)
    const results = await response.json();
    return results;
}
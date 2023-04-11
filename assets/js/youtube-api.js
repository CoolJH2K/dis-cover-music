var queries =  [`beethoven`, `metal`];
var apiKey = `AIzaSyCiqVdYUoHAulPgpR1T1ent_DTkeTlQ4aA`;



//Function that return data according to our query
function getYoutubeList(searchQueries){
    var formattedQueries = searchQueries.join(',');
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedQueries}&order=relevance&maxResults=25&safeSearch=strict&key=${apiKey}`).
    then(function(response){
        if(response.status === 200){
            return response.json();
        }
        else{
            console.log(`Error Code: ${response.status}`);
        }
    }).then(function(data){
        console.log(data);
    })
}


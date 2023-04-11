var queries =  [`beethoven`, `metal`];
var apiKey = `AIzaSyCiqVdYUoHAulPgpR1T1ent_DTkeTlQ4aA`;

function getData(searchQueries){
    var formattedQueries = searchQueries.join(',');
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedQueries}&order=relevance&maxResults=50&safeSearch=strict&key=${apiKey}`).
    then(function(response){
        if(response.status === 200){
            console.log("I'm ready");
            return response.json();
        }
        else{
            console.log(`Error Code: ${response.status}`);
        }
    }).then(function(data){
        console.log(data);
    })
}

getData(queries);
var apiKey = `AIzaSyCiqVdYUoHAulPgpR1T1ent_DTkeTlQ4aA`;

//Function that return data according to our query
function getYoutubeList(searchQueries){
    //Format the qeuries in to a comma separated string 
    var formattedQueries = searchQueries.join(',');
    
    //Fetch from a dynamically generated string
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


function getData(){
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=beethoven metal&order=relevance&safeSearch=strict&key=AIzaSyCiqVdYUoHAulPgpR1T1ent_DTkeTlQ4aA`).
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

getData();
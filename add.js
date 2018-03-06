// HTTP GET

let data; //JSON data

function getName() {
  return 'http://www.omdbapi.com/?apikey=8fd06dfe&t='+ document.getElementById("nimi").value +'';
}

function fetchRequest() {
    let url = getName();
    fetch(url)
      .then( (result) => {
        return result.json();
      })
      .then( (jsonresult) => {
        data = jsonresult; //store json to variable data
        //console.log('JSON result: '+JSON.stringify(jsonresult));
        var movie = document.getElementById('movie');
        movie.innerHTML = JSON.stringify(jsonresult);
        var poster = document.getElementById('poster');
        poster.innerHTML = "<img src="+ jsonresult.Poster +"></img>";
    });
}
elem = fetchRequest();

function addAction() {

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://leffakanta-da2e.restdb.io/rest/leffat",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5a9e49463f8df0b91f627ce5",
            "cache-control": "no-cache"
        },
        "process-data": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
    console.log(response)
    })
}

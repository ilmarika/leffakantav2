// HTTP GET

let data; //JSON data

//Setting up the omdb query
function getName() {
  return 'http://www.omdbapi.com/?apikey=8fd06dfe&t='+ document.getElementById("nimi").value +'';
}

//fetching the results from omdb
function fetchRequest() {
    let url = getName();
    fetch(url)
      .then( (result) => {
        return result.json();
      })
      .then( (jsonresult) => {
        data = jsonresult; //store json to variable data
        var movie = document.getElementById('movie');
        $("#movie").empty();    //empty the div 'movie' that the details are not displayed many times over.
        $('#confirm').empty();
        $('#poster').empty();

        // Create elements for the movie details to show in the webpage, add text to elements and append them to the main element.
        if(jsonresult.Title == undefined) {
            let notfound = document.createElement('div');
            notfound.setAttribute('class', 'alert alert-danger');
            notfound.innerHTML = 'Title not found!'
            movie.appendChild(notfound);
        } else {
            let title = document.createElement("div");
            let released = document.createElement("div");
            let country = document.createElement("div");
            let genre = document.createElement("div");
            title.setAttribute("id", 'Title');
            released.setAttribute("id", 'Released');
            country.setAttribute("id", 'Country');
            genre.setAttribute("id", 'Genre');
            title.innerHTML = 'Title: '+ jsonresult.Title;
            released.innerHTML = 'Release date: '+ jsonresult.Released;
            country.innerHTML = 'Country: '+ jsonresult.Country;
            genre.innerHTML = 'Genre: '+ jsonresult.Genre;
            var poster = document.getElementById('poster');
            poster.innerHTML = "<img src="+ jsonresult.Poster +"></img>";
            movie.appendChild(title);
            movie.appendChild(released);
            movie.appendChild(country);
            movie.appendChild(genre);
    
            showConfirm();

        }
    });
}

function showConfirm() {
    let confirm = document.getElementById('confirm');
    let text = document.createElement('div');
    text.innerHTML = 'Do you want to add the title to the collection?';
    let button = document.createElement('button');
    button.setAttribute('id', 'add');
    button.innerHTML = 'Add';
    confirm.appendChild(text);
    confirm.appendChild(button);
}

//Func to add the movie to db
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
        "data": JSON.stringify(data),
        //depending on if the ajax request is success or not, user sees different alert messages.
        'statusCode': {
            201: function() {
                let success = document.createElement('div');
                success.setAttribute('class', 'alert alert-success');
                success.innerHTML = '<strong>Success!</strong> Title added successfully.';
                document.getElementById('confirm').appendChild(success);
            }
        },
        'error': function() {
            let fail = document.createElement('div');
            fail.setAttribute('class', 'alert alert-danger');
            fail.innerHTML = '<strong>Fail!</strong> Adding the title failed.';
            document.getElementById('confirm').appendChild(fail);
        }
    }

    $.ajax(settings).done(function (response) {;
    })
}

document.getElementById("nimi").onsubmit = function(){
    fetchRequest();
};

$( '#submit' ).click(function() {
    fetchRequest();
})

$( '#confirm' ).on('click', '#add', function() {
    addAction();

})

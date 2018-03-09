let url = new URL($(location).attr('href'));
let id = url.searchParams.get('id');
console.log(id);

//Setting up the db connection
let settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://leffakanta-da2e.restdb.io/rest/leffat?q={"_id":'+ '"'+id+'"}',
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5a9e49463f8df0b91f627ce5",
      "cache-control": "no-cache"
    }
}
$.ajax(settings).done(function (response) {
  
  // Create elements for the movie details to show in the webpage, add text to elements and append them to the main element.
  if (Object.keys(response).length == 0 || response[0].Title == undefined) {
    let notfound = document.createElement('div');
    notfound.setAttribute('class', 'alert alert-danger');
    notfound.innerHTML = 'Title not found!'
    movie.appendChild(notfound);
  } else {
    let title = document.createElement("div");
    let released = document.createElement("div");
    let country = document.createElement("div");
    let genre = document.createElement("div");
    let synopsis = document.createElement('div');
    let del = document.getElementById('delete');
    let delButton = document.createElement('button');
    title.setAttribute("id", 'Title');
    released.setAttribute("id", 'Released');
    country.setAttribute("id", 'Country');
    genre.setAttribute("id", 'Genre');
    synopsis.setAttribute('id', 'Synopsis');
    delButton.type = 'button';
    delButton.className = 'btn btn-danger';
    delButton.innerText = 'Delete title';
    delButton.id = 'delButton';
    title.innerHTML = 'Title: ' + response[0].Title;
    released.innerHTML = 'Release date: ' + response[0].Released;
    country.innerHTML = 'Country: ' + response[0].Country;
    genre.innerHTML = 'Genre: ' + response[0].Genre;
    synopsis.innerHTML = 'Synopsis: ' + response[0].Plot;
    var poster = document.getElementById('poster');
    poster.innerHTML = "<img src=" + response[0].Poster + "></img>";
    movie.appendChild(title);
    movie.appendChild(released);
    movie.appendChild(country);
    movie.appendChild(genre);
    movie.appendChild(synopsis);
    del.appendChild(delButton);
    
  }

});

function deleteTitle(id) {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://leffakanta-da2e.restdb.io/rest/leffat/'+id,
    "method": "DELETE",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5a9e49463f8df0b91f627ce5",
      "cache-control": "no-cache"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
  })
}

$( '#delete' ).on('click', '#delButton', function() {
  console.log("mitä vittua?");
  deleteTitle(id);
})

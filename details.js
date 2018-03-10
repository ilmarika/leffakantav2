let url = new URL($(location).attr('href'));
let id = url.searchParams.get('id');
let q =url.searchParams.get('q');

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

  handleResponse(response);

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
    },
    //depending on if the ajax request is success or not, user sees different alert messages.
    'statusCode': {
      200: function() {
          let success = document.createElement('div');
          success.setAttribute('class', 'alert alert-success');
          success.innerHTML = 'Title deleted successfully.';
          document.getElementById('delete').appendChild(success);
      }
    },
    'error': function() {
      let fail = document.createElement('div');
      fail.setAttribute('class', 'alert alert-danger');
      fail.innerHTML = 'Deleting the title failed.';
      document.getElementById('delete').appendChild(fail);
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

function handleResponse(response) {
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
    let cast = document.createElement('div');
    let del = document.getElementById('delete');
    let delButton = document.createElement('button');
    title.setAttribute("id", 'Title');
    released.setAttribute("id", 'Released');
    country.setAttribute("id", 'Country');
    genre.setAttribute("id", 'Genre');
    synopsis.setAttribute('id', 'Synopsis');
    cast.setAttribute('id', 'Cast');
    delButton.type = 'button';
    delButton.className = 'btn btn-danger';
    delButton.innerText = 'Delete title';
    delButton.id = 'delButton';
    title.innerHTML = 'Title: ' + response[0].Title;
    released.innerHTML = 'Release date: ' + response[0].Released;
    country.innerHTML = 'Country: ' + response[0].Country;
    genre.innerHTML = 'Genre: ' + response[0].Genre;
    synopsis.innerHTML = 'Synopsis: ' + response[0].Plot;
    cast.innerHTML = 'Cast: '+response[0].Actors;
    var poster = document.getElementById('poster');
    poster.innerHTML = "<img src=" + response[0].Poster + "></img>";
    movie.appendChild(title);
    movie.appendChild(released);
    movie.appendChild(country);
    movie.appendChild(genre);
    movie.appendChild(synopsis);
    movie.appendChild(cast);
    del.appendChild(delButton);
    let search = document.createElement('li');
    let menu = document.createElement('li');
    let searchUrl = document.createElement('a');
    searchUrl.href = 'list.html?q='+q;
    searchUrl.innerHTML = 'Search';
    search.className = 'breadcrumb-item';
    menu.className = 'breadcrumb-item active';
    menu.setAttribute('aria-current', 'page');
    menu.innerHTML = response[0].Title;
    search.appendChild(searchUrl);
    document.getElementById('menu').appendChild(search);
    document.getElementById('menu').appendChild(menu);
    
  }
}

//get the search term from GET
let url = new URL($(location).attr('href'));
let param = url.searchParams.get('q');
console.log(param);

//Setting up the db connection
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://leffakanta-da2e.restdb.io/rest/leffat?q={}&filter="+param+'&sort=Title',
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5a9e49463f8df0b91f627ce5",
      "cache-control": "no-cache"
    }
}
                  
$.ajax(settings).done(function (response) {

    //iterate through the response array, and add divs with titles 
    for (let i = 0; i < Object.keys(response).length; i++) {
        let node = document.createElement("div");
        let link = document.createElement('a');
        link.setAttribute('href', 'details.html?id='+ response[i]._id+'&q='+param);
        link.innerHTML = response[i].Title;
        node.appendChild(link);
        document.getElementById("list").appendChild(node);
    }
});
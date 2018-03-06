var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://leffakanta-da2e.restdb.io/rest/leffat",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5a9e49463f8df0b91f627ce5",
      "cache-control": "no-cache"
    }
}
                  
$.ajax(settings).done(function (response) {
    console.log(response);
    console.log(JSON.stringify(response));
    for (let i = 0; i < response.lenght; i++) {
        document.getElementById("list").innerHTML = response[i].Title;
        console.log(response[i]);
        console.log("loop");
    }
});
//when user clicks the submit button -> redirected to search page.
$( '#submit' ).click(function() {
    window.location.assign('list.html?q='+document.getElementById("search").value)
})

$( '#all' ).click(function() {
    window.location.assign('list.html?q=')
})

$( '#add' ).click(function() {
    window.location.assign('add.html')
})
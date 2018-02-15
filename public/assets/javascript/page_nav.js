$(document).ready(function() {
    //The following functions are used for page navigation purposes

    $("#ADD").click(function() {
        window.location.href="/addcourse";
    });

    $("#SEARCH").click(function() {
        window.location.href="/searchcourse";
    });

    $("#BACK").click(function() {
        window.location.href='/';
    });
});
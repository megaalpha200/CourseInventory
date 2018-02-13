$(document).ready(function() {
    $("#ADD_FORM").submit(function() {
        var course_num = $("#COURSE_NUMBER").val();
        var course_title = $("#COURSE_TITLE").val();
        var credit_hrs = $("#CREDIT_HOURS").val();

        $.post('/addcourse', {
            COURSE_NUMBER: course_num,
            COURSE_TITLE: course_title,
            CREDIT_HOURS: credit_hrs
        },
        function(data, status) {
            window.alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
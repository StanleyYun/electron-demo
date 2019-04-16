// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require jquery-3.3.1.min
//= require_self

$(function(){
    $("#login").click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: 'book/login',
            type: 'POST',
            data: {username,
                    password
                }
        }).done(function(result){
            if(result.code=='200') {
                window.location.href="/"
            }
        }).fail(function(result) {
            if (result.status == 400) {
                alert (result.responseText)
            }
        })
    })

})

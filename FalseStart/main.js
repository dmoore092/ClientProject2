//http://www.ist.rit.edu/api/
$(document).ready(function(){
    
});

function getData(getPost, d, idForSpinner){
    return $.ajax({
        type: getPost,
        cache: false,
        async: true,
        dataType: 'json',
        data: d,
        url: 'proxy.php',
        beforeSend: function(){
            //create spinner IF there is a 3rd arg
            // $(idForSpinner).append('<img src="gears.gif" class="dontuse" /> ');
        }
    }).always(function(){
        //kill the spinner
        $(idForSpinner).find('.dontuse').fadeOut(1000, function(){
            //kill it
            $(this).remove();
        });
    }).fail(function(error){
        console.log(error)
    }); 
}
//welcome/about
getData('get', {path:'/about/'},'#welcome').done(function(json){
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    $('#welcome').append('<h2 style="color: #F76902; margin-bottom: 15px;">'+ json.title + '</h2>');
    if(!isMobile){
        $('#welcome').append('<h4>'+ json.description + '</h4>');
    }
    $('#welcome').append('<h4>'+ json.quote + '</h4>');
    $('#welcome').append('<h4 style="color: #F76902"> - '+ json.quoteAuthor + '</h4>');
});
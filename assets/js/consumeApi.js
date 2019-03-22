//http://www.ist.rit.edu/api/
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

$(document).ready(function(){
    
});

getData('get', {path:'/about/'},'#welcome-about').done(function(json){
    console.log(json.title);
    $('#welcome-about').append('<h2>'+ json.title + '</h2>');
    $('#welcome-about').append('<h4>'+ json.description + '</h4>');
    $('#welcome-about').append('<h4>'+ json.quote + '</h4>');
    $('#welcome-about').append('<h4>'+ json.quoteAuthor + '</h4>');
    // $.each(json, function(i, item){
    //         $('#welcome-about').append('<h2>'+ this.title + '</h2>');
    //         $('#welcome-about').append('<h4>'+ item.description + '</h4>');
    //         $('#welcome-about').append('<h4>'+ item.quote + '</h4>');
    //         $('#welcome-about').append('<h4>'+ item.quoteAuthor + '</h4>');
    //     });
    });

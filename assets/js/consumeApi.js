//http://www.ist.rit.edu/api/
$(document).ready(function(){
    //get the about data
    $.ajax({
        type: 'GET',
        url: 'proxy.php',
        data: {
            path: '/about/'
        },
        dataType: 'json'
    }).done(function(json){
        //alert(json.quoteAuthor);
    });
});
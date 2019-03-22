xhr('get', {path:'/degrees/undergraduate/'},'#content').done(function(json){
function xhr(getPost, d, idForSpinner){
    return $.ajax({
        type: getPost,
        cache: false,
        async: true,
        dataType: 'json',
        data: d,
        url: 'proxy.php',
        beforeSend: function(){
            //create spinner IF there is a 3rd arg
            $(idForSpinner).append('<img src="gears.gif" class="dontuse" /> ');
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
 
$.each(json.undergraduate, function(i, item){
        $('#content').append('<h2>'+ this.title + '</h2>');
        $('#content').append('<h4>'+ item.description + '</h4>');
    });
});

xhr('get', {path:'/people/'},'#people').done(function(json){
    var x = '';
    //put out all of the faculty
    $.each(json.faculty, function(json){
        x+='<div class="faculty" data-type="faculty" data-uname="'+this.username+'"><h5>'+this.name+'</h5><img style="max-width:150px;" src="'+this.imagePath+'"/></div>';
        x+='';
    });
    $('#people').append('<h1>'+ json.title + '</h1><h4>'+json.subTitle+'<h4>' + x);
});
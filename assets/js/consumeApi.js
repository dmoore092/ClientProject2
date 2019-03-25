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

//welcome/about
getData('get', {path:'/about/'},'#welcome-about').done(function(json){
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    $('#welcome-about').append('<h2 style="color: #F76902; margin-bottom: 15px;">'+ json.title + '</h2>');
    if(!isMobile){
        $('#welcome-about').append('<h4>'+ json.description + '</h4>');
    }
    $('#welcome-about').append('<h4>'+ json.quote + '</h4>');
    $('#welcome-about').append('<h4 style="color: #F76902"> - '+ json.quoteAuthor + '</h4>');
});

// /degrees/undergraduate/
getData('get', {path:'/degrees/undergraduate/'},'#ugrad-deg').done(function(deg){
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    var degimages = ["assets/images/icons/gear.png", "assets/images/icons/meeting-6.png", "assets/images/icons/hierarchy.png"];

    $.each(deg.undergraduate, function(i, item){
        $('#ugrad-deg').append('<div><a href="#ex1" rel="modal:open"><img src="'+degimages[i]+'" alt="icon" /></a></p>');
        $('#ugrad-deg').append('<h4>'+ this.title + '</h4>');
    if(!isMobile){
        $('#ugrad-deg').append('<p>'+ item.description + '</p>');
    }
    $('#ugrad-deg').append('</div>');
        $('#ugrad-deg').find('div').eq(i).on('click', function(){
                $('#ugrad-deg').append($('<div id="ex1" class="modal">\
                                            <h4>'+item.title+'</h4>\
                                            <p>'+item.concentrations+'</p>\
                                            <a href="#" rel="modal:close"></a>\
                                         </div>'));

        });
    });
});

//degrees/graduate
getData('get', {path:'/degrees/graduate/'},'#grad-deg').done(function(deg){
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    var degimages = ["assets/images/icons/presentation.png", "assets/images/icons/head.png", "assets/images/icons/setting.png"];

    $.each(deg.graduate, function(i, item){
        $('#grad-deg').append('<div><a href="#ex1" rel="modal:open"><img src="'+degimages[i]+'" alt="icon" /></a></p>');
        $('#grad-deg').append('<h4>'+ this.title + '</h4>');
        if(!isMobile){
            $('#grad-deg').append('<p>'+ item.description + '</p>');
        }
        $('#grad-deg').find('div').eq(i).on('click', function(){
                $('#grad-deg').append($('<div id="ex1" class="modal">\
                                            <h4>'+item.title+'</h4>\
                                            <p>'+item.concentrations+'</p>\
                                            <a href="#" rel="modal:close"></a>\
                                        </div>'));

        });
        if(i == 2){
        $('#grad-deg').append('<div><a href="#ex1" rel="modal:open">Click here to see our Graduate Advanced Certificates!</a></p>');
        $('#grad-deg').find('div').eq(3).on('click', function(){
            $('#grad-deg').append($('<div id="ex1" class="modal">\
                                        <h4>Our Graduate Advanced Certificates</h4>\
                                        <p>'+deg.graduate[3].availableCertificates[0]+'</p>\
                                        <p>'+deg.graduate[3].availableCertificates[1]+'</p>\
                                        <a href="#" rel="modal:close"></a>\
                                    </div>'));
        });
            return false;
        }
        $('#grad-deg').append('</div>');
    });
});

///minors/
getData('get', {path:'/minors/'},'#ugrad-minors').done(function(min){
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    var course = [];
    // var degimages = ["assets/images/icons/presentation.png", "assets/images/icons/head.png", "assets/images/icons/setting.png"];
    $.each(min.UgMinors, function(i, item){
        // $('#ugrad-minors').append('<div><a href="#ex1" rel="modal:open"><img src="'+degimages[i]+'" alt="icon" /></a></p>');
        $('#ugrad-minors').append('<div><a href="#ex1" rel="modal:open"><h4>'+ this.title + '</h4></a></div>');
        $('#ugrad-minors').find('div').eq(i).on('click', function(){
            $.each(item.courses, function(k, classes){
                course.push(classes);
            });
            $('#ugrad-minors').append($('<div id="ex1" class="modal minor-modal">\
                                        <h4>'+item.title+'</h4>\
                                        <p>'+item.description+'</p>\
                                        <p>Courses: '+course+'</p>\
                                        <a href="#" rel="modal:close"></a>\
                                        </div>'));
        });
    });
});
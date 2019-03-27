$(document).ready(function(){
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
                    $('.modal').html($('<h4>'+item.title+'</h4><p>'+item.concentrations+'</p>'));
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
                    $('.modal').html($('<h4>'+item.title+'</h4><p>'+item.concentrations+'</p>'));
            });
            if(i == 2){
            $('#grad-deg').append('<div><a href="#ex1" rel="modal:open">Click here to see our Graduate Advanced Certificates!</a></p>');
            $('#grad-deg').find('div').eq(3).on('click', function(){
                $('.modal').html($('<p>'+deg.graduate[3].availableCertificates[0]+'</p><p>'+deg.graduate[3].availableCertificates[1]+'</p>'));
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
                $('.modal').html($('<h4>'+item.title+'</h4><p>'+item.description+'</p><p>Courses: '+course+'</p>'));
            });
        });
    });

    ///employment/
    getData('get', {path:'/employment/'},'#employment').done(function(min){
        //console.log(min);
        var stuff = [];
        $.each(min, function(i, item){
            // console.log(item);
            $('#employment').append('<h4 class="emp-title">'+item.title+'</h4>');
            $.each(item, function(j, content){
                stuff.push(content) 
            });
        });
        $('.emp-title:first').after('<p>'+stuff[1][1].description+'</p>');
        $('.emp-title:nth-of-type(2)').after('<h5>'+stuff[3][0].value+'</h5><p>'+stuff[3][0].description+'</p>');``
        $('.emp-title:nth-of-type(2)').after('<h5>'+stuff[3][1].value+'</h5><p>'+stuff[3][1].description+'</p>');
        $('.emp-title:nth-of-type(2)').after('<h5>'+stuff[3][2].value+'</h5><p>'+stuff[3][2].description+'</p>');
        $('.emp-title:nth-of-type(2)').after('<h5>'+stuff[3][3].value+'</h5><p>'+stuff[3][3].description+'</p>');

        $.each(stuff[5], function(k, emps){
            $('.emp-title:nth-of-type(3)').after('<p>'+emps+'</p>');
        });
        
        $.each(stuff[7], function(l, careers){
            $('.emp-title:nth-of-type(4)').after('<p>'+careers+'</p>');
        });

        //coop table
        $('.emp-title:nth-of-type(5)').after('<a href="#ex1" rel="modal:open" id="coop">See Our Co-ops!</a>');
        $('#coop').on('click', function(){
            $('.modal').html($('<div>\
                                <table id="coop-table">\
                                    <thead>\
                                        <tr>\
                                            <th>Employer</th>\
                                            <th>Degree</th>\
                                            <th>City</th>\
                                            <th>Term</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>\
                                    </tbody>\
                                </table>\
                            </div>'));
            $.each(stuff[9], function(i, coops){
                $('table').append('<tr>\
                                    <td>'+coops.employer+'</td>\
                                    <td>'+coops.degree+'</td>\
                                    <td>'+coops.city+'</td>\
                                    <td>'+coops.term+'</td>\
                                    </tr>');
            });
            $('#coop-table').DataTable({
                responsive: true,
                scrollY: 400,
                scrollCollapse: true
            });

        });
        //prof table
        $('.emp-title:nth-of-type(6)').after('<a href="#ex1" rel="modal:open" id="prof">See Where our grads have gone to work!!</a>');
        $('#prof').on('click', function(){
            $('.modal').html($('<div>\
                                    <table id="prof-table">\
                                        <thead>\
                                            <tr>\
                                                <th>Employer</th>\
                                                <th>Degree</th>\
                                                <th>City</th>\
                                                <th>Start Date</th>\
                                                <th>Job Title</th>\
                                            </tr>\
                                        </thead>\
                                        <tbody>\
                                        </tbody>\
                                    </table>\
                                </div>'));
            $.each(stuff[11], function(i, jobs){
                $('table').append('<tr>\
                                    <td>'+jobs.employer+'</td>\
                                    <td>'+jobs.degree+'</td>\
                                    <td>'+jobs.city+'</td>\
                                    <td>'+jobs.startDate+'</td>\
                                    <td>'+jobs.title+'</td>\
                                    </tr>');
            });
            $('#prof-table').DataTable({
                responsive: true,
                scrollY: 400,
                scrollCollapse: true
            });
        });
        //end of /employment/
    });

    ///people/faculty/
    getData('get', {path:'/people/'},'#people').done(function(min){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        var course = [];
        $.each(min.faculty, function(i, item){
            // console.log(item);
            $('#people-faculty').append('<div data-uname='+this.username+'><a href="#ex1" rel="modal:open"><h4>'+ item.name + '</h4></a></div>');
            
            // // $('#ugrad-minors').append('<div><a href="#ex1" rel="modal:open"><img src="'+degimages[i]+'" alt="icon" /></a></p>');
 
        });
        $('#people-faculty div').on('click', function(){
            // $('.modal').html($('<div>'+item.username+'</div>'));
            var who = getAttributesByName(min.faculty, 'username', $(this).attr('data-uname'));
            // console.log(me);
            $('.modal').html($('<div><img src="'+who.imagePath+'" alt="faculty image"/>'));
            $.each(who, function(index, item){
                if(!item == null || !item == ' ' && index != 'imagePath'){
                    if(index == 'website'){
                        $('.modal').append('<p><span class="caps">'+index + '</span> <a href="' +item+'" target="_blank">'+item+'</a></p>');
                    }
                    else if(index == 'email'){
                        $('.modal').append('<p><span class="caps">'+index + '</span> <a href="mailto:'+item+'">'+item+'<a></p>');
                    }
                    else{
                        $('.modal').append('<p><span class="caps">'+index + '</span> ' +item+'</p>');
                    }
                    
                }
                // $('.modal').append('<h4>'+index +' '+ item+'</h4>');
                console.log(item);
            });
            $('.modal').append($('</div>'));

            // $('.modal').html($('<div>\
            //                         <img src="'+who.imagePath+'" alt="faculty image"/>\
            //                         <h4>'+who.name+'</h4>\
            //                         <h4>'+who.title+'</h4>\
            //                         <h4>\"'+who.tagline+'\"</h4>\
            //                         <h4>'+who.interestArea+'</h4>\
            //                         <h4>'+who.website+'</h4>\
            //                         <h4>'+who.office+'</h4>\
            //                         <h4>'+who.phone+'</h4>\
            //                         <h4>'+who.email+'</h4>\
            //                         <h4>'+who.twitter+'</h4>\
            //                         <h4>'+who.facebook+'</h4>\
            //                     </div>'));
        });
        // $('.modal').html($('test'));
        //end of people/faculty/
    });
    //end of $(document).ready();
});

//inside getData()
$('.faculty').on('click', function(){
    var me = getAttributesByName(json.faculty, 'username', $(this).attr('data-uname'));
    console.log(me);
});

//helper function for people
function getAttributesByName(arr, name, val){
    // console.log(arr);
    var result = null;
    $.each(arr, function(){
        if(this[name]===val){
            result = this;
        }
    });
    return result;
}

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

//inside getData()
$('.faculty').on('click', function(){
    var me = getAttributesByName(json.faculty, 'username', $(this).attr('data-uname'));
    console.log(me);
});

// //helper function
// function getAttributesByName(arr, name, val){
//     var result = null;
//     $.each(arr, function(){
//         if(this[name]===val){
//             result = this;
//         }
//     });
//     return result;
// }

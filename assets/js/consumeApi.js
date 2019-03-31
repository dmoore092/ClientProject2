// var facultyImages;
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

    //news/
    getData('get', {path:'/news/'},'#news').done(function(min){
        //var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        // console.log(min.older);
        $('#news').append('<h4><a href="#ex1" rel="modal:open">Check out the latest news!</a></h4>');
        $('#news').on('click', function(){
            $('.modal').html('<div class="turn-page" id="pager"></div>');
            $('.modal').append('<ul id="listShow">');
            
            $.each(min.older, function(i, items){
                // console.log(items);
                $('.modal ul').append('<li class="li-item hide"><p>'+items.title+'</p></li>');
                $('.modal ul').append('<li class="li-item hide"><p>'+items.date+'</p></li>');
                $('.modal ul').append('<li class="li-item hide"><p>'+items.description+'</p></li>');
            });
            $('.modal').append('</ul>');
            $("#listShow").cPager({
                pageSize: 3,
                pageid: "pager",
                itemClass: "li-item",
                pageIndex: 1
            });
            
        });
        // console.log(min);  
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
        var stuff = [];
        $.each(min, function(i, item){
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
        //TURN THIS ON AT THE END!!!!!!!!!!!!!!!!!!!
        // $('#map').html('<iframe src="http://ist.rit.edu/api/map.php" frameborder="0" width="100%" height="700px"></iframe>');
        //end of /employment/
    });

    ///people/faculty/
    getFacOrStaff('faculty', 'people-faculty');
    getFacOrStaff('staff', 'people-staff');
  
    ///research/
    getData('get', {path:'/research/'},'#research-interest').done(function(min){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        //by interestArea
        // var degimages = ["assets/images/icons/presentation.png", "assets/images/icons/head.png", "assets/images/icons/setting.png"];
        $.each(min.byInterestArea, function(i, item){
            $('#research-interest').append('<div><a href="#ex1" rel="modal:open"><h4>'+ this.areaName + '</h4></a></div>');
            $('#research-interest').find('div').eq(i).on('click', function(){
                $('.modal').html($('<ul>'));
                $.each(item.citations, function(k, stuff){
                    $('.modal').append($('<li>'+stuff+'</li>'));
                });
            });
            $('.modal').append($('</ul>'));
            //end of research by interest
        });
        //research by faculty
        $.each(min.byFaculty, function(i, items){
            // console.log(i, items);
            $('#research-faculty').append('<div data-uname="'+items.username+'"><a href="#ex1" rel="modal:open"><img src="https://ist.rit.edu/assets/img/people/'+items.username+'.jpg"/></a></div>');
            //https://ist.rit.edu/assets/img/people/ephics.jpg
            $('#research-faculty').find('div').eq(i).on('click', function(){
                $('.modal').html($('<div><h4>'+items.facultyName+'</h4><ul>'));
                $.each(items.citations, function(j, stuff){
                    console.log(stuff);
                    $('.modal').append('<li>'+stuff+'</li>');
                });
                $('.modal').append('</ul></div>');
            });
        });
    });

    //resources
    getData('get', {path:'/resources/'},'#resources').done(function(min){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        // console.log(min);
        $('#resources').append('<div id="coop-enrollment" style="z-index: 999;"><a href="#ex1" rel="modal:open">Coop Enrollment</a></div>');
        $('#resources').append('<div id="forms"><a href="#ex1" rel="modal:open">Forms</a></div>');
        $('#resources').append('<div id="student-ambassadors"><a href="#ex1" rel="modal:open">Student Ambassadors</a></div>');
        $('#resources').append('<div id="study-abroad"></div>');
        $('#resources').append('<div id="tutors-lab-info"><a href="#ex1" rel="modal:open">Tutors/Lab Information</a></div>');
        $('#resources').append('<div id="student-advising-services"><a href="#ex1" rel="modal:open">Student Advising Services</a></div></div>');
        
        $('#coop-enrollment').on('click', function(){
            $('.modal').html('<div><p>Please refer to our <a href="https://ist.rit.edu/assets/pdf/ISTCooperativeEmployment%20PolicyandProcedures.pdf" target=_blank>Coop Guide.</a></p></div>');
        });
        $('#forms').on('click', function(){
            $('.modal').html('<h4>Undergraduate Forms</h4>');
            $.each(min.forms.undergraduateForms, function(i, items){
                // console.log(items);
                $('.modal').append('<p><a href="https://ist.rit.edu/'+items.href+'" target=_blank>'+items.formName+'</a></p>');
            });
            $('.modal').append('<h4>Graduate Forms</h4>');
            $.each(min.forms.graduateForms, function(j, stuff){
                // console.log(stuff);
                $('.modal').append('<p><a href="https://ist.rit.edu/'+stuff.href+'" target=_blank>'+stuff.formName+'</a></p>');
            });
        });
        $('#student-ambassadors').on('click', function(){
            //console.log(min.studentAmbassadors)
            $('.modal').html('<div><h4>'+min.studentAmbassadors.title+'</h4>');
            $('.modal').append('<img src="'+min.studentAmbassadors.ambassadorsImageSource+'" alt="image"></div>');
            $.each(min.studentAmbassadors.subSectionContent, function(k, things){
                //console.log(things);
                $('.modal').append('<div><div><h4>'+things.title+'</h4></div>');
                $('.modal').append('<div><p>'+things.description+'</p></div></div>');
            });
            $('.modal').append('<a href="'+min.studentAmbassadors.applicationFormLink+'" target=_blank>Apply Here!</a>');
        });
        $('#tutors-lab-info').on('click', function(){
            $('.modal').html('<h4>'+min.tutorsAndLabInformation.title+'</h4>');
            $('.modal').append('<p>'+min.tutorsAndLabInformation.description+'</p>');
            $('.modal').append('<a href="'+min.tutorsAndLabInformation.tutoringHoursLabLink+'" target=_blank>Click Here for Tutoring Hours.</a>');
        });
        $('#student-advising-services').on('click', function(){
            // console.log(min.studentServices);
            $('.modal').html('<h4>'+min.studentServices.title+'</h4>');

            //Academic Advisors
            $('.modal').append('<h4>'+min.studentServices.academicAdvisors.title+'</h4>');
                $('.modal').append('<p>'+min.studentServices.academicAdvisors.description+'</p>');
                $('.modal').append('<p><a href="'+min.studentServices.academicAdvisors.faq.contentHref+'" target=_blank>'+min.studentServices.academicAdvisors.faq.title+'</a></p>');
            
            // Faculty Advisors
            $('.modal').append('<h4>'+min.studentServices.facultyAdvisors.title+'</h4>');
            $('.modal').append('<p>'+min.studentServices.facultyAdvisors.description+'</p>');
            
            //IST Minor Advising
            $('.modal').append('<h4>'+min.studentServices.istMinorAdvising.title+'</h4>');
                $.each(min.studentServices.istMinorAdvising.minorAdvisorInformation, function(l, goods){
                    // console.log(goods);
                    $('.modal').append('<p>'+goods.title+'</p>');
                    $('.modal').append('<p>'+goods.advisor+'</p>');
                    $('.modal').append('<p>'+goods.email+'</p>');
                });

            //Professional Advisors
            $('.modal').append('<h4>'+min.studentServices.professonalAdvisors.title+'</h4>');
                $.each(min.studentServices.professonalAdvisors.advisorInformation, function(m, effects){
                    // console.log(effects);
                    $('.modal').append('<p>'+effects.name+'</p>');
                    $('.modal').append('<p>'+effects.department+'</p>');
                    $('.modal').append('<p>'+effects.email+'</p>');
                });
        });
        //end of /resources/
    });

    ///footer/
    getData('get', {path:'/footer/'},'#footer').done(function(min){
        //var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        // var degimages = ["assets/images/icons/presentation.png", "assets/images/icons/head.png", "assets/images/icons/setting.png"];
        // console.log(min);
        $('#social').append('<div><h4>Facebook</h4><p>'+min.social.tweet+'</p>');
        $('#social').append('<h4>Facebook</h4><p>'+min.social.facebook+'</p>');
        $('#social').append('<h4>Twitter</h4><p>'+min.social.twitter+'</p></div>');

        $.each(min.quickLinks, function(i, items){
            $('#footer').append('<a href= "'+items.href+'" target=_blank>'+items.title+'</a>');
        });
        $('#footer').append('<p>'+min.copyright.title+'</p>'+min.copyright.html);
        
    });
    // <a onclick="$('[id-or-class-of-element]').animatescroll();">Go to Element</a>
    //end of $(document).ready();
});


//helper function for /people/
function getAttributesByName(arr, name, val){
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

// //inside getData()
// $('.faculty').on('click', function(){
//     var me = getAttributesByName(json.faculty, 'username', $(this).attr('data-uname'));
// });

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


//gets faculty or staff for the people section. 
function getFacOrStaff(which, where){
    getData('get', {path:'/people/' + which}, where).done(function(min){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        var course = [];
        $.each(min, function(i, item){
            $.each(item, function(k, stuff){
                $('#'+where).append('<div data-uname='+stuff.username+'><a href="#ex1" rel="modal:open"><h4>'+ stuff.name + '</h4></a></div>'); 
            });
        });
        $('#'+where+' div').on('click', function(){
            if(which === 'faculty'){
                whichFacOrStaff = min.faculty;
            }
            else{
                whichFacOrStaff = min.staff;
            }
            //global on purpose, used in faculty research
            var who = getAttributesByName(whichFacOrStaff, 'username', $(this).attr('data-uname'));
            $('.modal').html($('<div><img src="'+who.imagePath+'" alt="faculty/staff image"/>'));
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
            });
            $('.modal').append($('</div>'));
        });
        //end of people/faculty/
    });
}
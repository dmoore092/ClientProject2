
$(document).ready(function(){
    //welcome/about
    getData('get', {path:'/about/'},'#welcome-about','#welcome-about').done(function(json){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

        $('#welcome-about').append('<h2 style="color: #F76902; margin-bottom: 15px;">'+ json.title + '</h2>');
        if(!isMobile){
            $('#welcome-about').append('<p>'+ json.description + '</p>');
        }
        $('#welcome-about').append('<p style="margin-top: 15px;">'+ json.quote + '</p>');
        $('#welcome-about').append('<h4 style="color: #F76902"> - '+ json.quoteAuthor + '</h4>');
    });

    //news/
    getData('get', {path:'/news/'},'#news').done(function(min){
        //var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        $('#news').append('<h4><a href="#ex1" rel="modal:open">Check out the latest news!</a></h4>');
        $('#news').on('click', function(){
            $('.modal').html('<div class="turn-page" id="pager"></div>');
            $('.modal').append('<ul id="listShow">');
            
            $.each(min.older, function(i, items){
                $('.modal ul').append('<li class="li-item hide news-title"><p>'+items.title+'</p></li>');
                $('.modal ul').append('<li class="li-item hide news-date"><p>Published: '+items.date+'</p></li>');
                $('.modal ul').append('<li class="li-item hide news-desc"><p>'+items.description+'</p></li>');
            });
            $('.modal').append('</ul>');
            $("#listShow").cPager({
                pageSize: 3,
                pageid: "pager",
                itemClass: "li-item",
                pageIndex: 1
            });
            $('.modal').css({width:'90%'});
        });
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
                    $('.modal').html($('<h4>'+item.title+' Concentrations:</h4>'));
                    $('.modal').append($('<div id="modal-ug"></div>'));
                    $('#modal-ug').append($('<p>'+item.concentrations[0]+'</p>'));
                    $('#modal-ug').append($('<p>'+item.concentrations[1]+'</p>'));
                    $('#modal-ug').append($('<p>'+item.concentrations[2]+'</p>'));
                    $('#modal-ug').append($('<p>'+item.concentrations[3]+'</p>'));
                    if(typeof item.concentrations[4] != 'undefined'){
                        $('#modal-ug').append($('<p>'+item.concentrations[4]+'</p>'));
                    }
                    if(typeof item.concentrations[5] != 'undefined'){
                        $('#modal-ug').append($('<p>'+item.concentrations[5]+'</p>'));
                    }
                    if(isMobile){
                        $('.modal').css({width:'90%'});
                    }
                    else{
                        $('.modal').css({width:'40%'});
                    }
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
                    $('.modal').html($('<h4>'+item.title+'</h4>'));
                    $('.modal').append($('<div id="modal-grad"></div>'));
                    $('#modal-grad').html($('<p>'+item.concentrations[0]+'</p>'));
                    $('#modal-grad').append($('<p>'+item.concentrations[1]+'</p>'));
                    $('#modal-grad').append($('<p>'+item.concentrations[2]+'</p>'));
                    if(typeof item.concentrations[3] != 'undefined'){
                        $('#modal-grad').append($('<p>'+item.concentrations[3]+'</p>'));
                    }
                    if(typeof item.concentrations[4] != 'undefined'){
                        $('#modal-grad').append($('<p>'+item.concentrations[4]+'</p>'));
                    }
                    if(typeof item.concentrations[5] != 'undefined'){
                        $('#modal-grad').append($('<p>'+item.concentrations[5]+'</p>'));
                    }
            });
            if(i == 2){
            $('#grad-deg').append('<div><a href="#ex1" rel="modal:open">Click here to see our Graduate Advanced Certificates!</a></p>');
            $('#grad-deg').find('div').eq(3).on('click', function(){
                $('.modal').html($('<h4>'+deg.graduate[3].availableCertificates[0]+'</h4>'));
                $('.modal').append($('<div id="modal-cert"></div>'));
                $('#modal-cert').html($('<p>'+deg.graduate[3].availableCertificates[1]+'</p>'));
            });
                return false;
            }
            $('#grad-deg').append('</div>');
            if(isMobile){
                $('.modal').css({width:'90%'});
            }
            else{
                $('.modal').css({width:'40%'});
            }
        });
    });


    ///minors/
    getData('get', {path:'/minors/'},'#ugrad-minors').done(function(min){

        $('#ugrad-minors').html('<div id="minors-accordion"></div>');
        // console.log(courses);
        $.each(min.UgMinors, function(i, item){
            // console.log(i, item.courses[i]);

            $('#minors-accordion').append('<h3>'+ item.title + '</h3>');
            $('#minors-accordion').append('<div id="'+i+'"><p>'+ item.description + '</p></div>');
            $('#'+i).append('<ul></ul>');
            if(typeof item.courses[0] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class1">'+ item.courses[0] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[0]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class1"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class1').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[1] != 'undefined'){
                // console.log(item.courses[1]);
                $('#'+i+' > ul').append('<li><a href="#class2">'+ item.courses[1] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[1]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class2"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class2').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[2] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class3">'+ item.courses[2] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[2]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class3"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class3').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[3] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class4">'+ item.courses[3] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[3]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class4"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class4').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[4] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class5">'+ item.courses[4] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[4]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class5"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class5').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[5] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class6">'+ item.courses[5] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[5]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class6"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class6').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[6] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class7">'+ item.courses[6] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[6]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class7"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class7').append('<p>'+data.description+'</p>');
                });
            }
            if(typeof item.courses[7] != 'undefined'){
                $('#'+i+' > ul').append('<li><a href="#class8">'+ item.courses[7] + '</a></li>');
                getData('get', {path:'/course/courseID='+item.courses[7]},'#'+i).done(function(data){
                    $('#'+i).append('<div id="class8"><h3>'+data.title+'</h3></div>');
                    $('#'+ i+' #class8').append('<p>'+data.description+'</p>');
                });
            }

        });

        $( "#minors-accordion" ).accordion({collapsible: true});
        $( "#0" ).tabs();$( "#1" ).tabs();
        $( "#2" ).tabs();$( "#3" ).tabs();
        $( "#4" ).tabs();$( "#5" ).tabs();
        $( "#6" ).tabs();$( "#7" ).tabs();

    });

    ///employment/
    getData('get', {path:'/employment/'},'#employment').done(function(min){
        var stuff = [];

        $.each(min, function(i, item){
            // $('#employment').append('<h4 class="emp-title">'+item.title+'</h4>');
            $.each(item, function(j, content){
                stuff.push(content) 
            });
        });
        $('#employment').append('<div class="emp-emp-wrapper"></div>');
        $('.emp-emp-wrapper').append('<p class="emp-headers">'+stuff[1][0].title+'</p>');//Employment
        $('.emp-emp-wrapper').append('<p>'+stuff[1][0].description+'</p>');//IST grads are blah blah

        $('#employment').append('<div class="emp-coop-wrapper"></div>');
        $('.emp-coop-wrapper').append('<p class="emp-headers">'+stuff[1][1].title+'</p>');//Cooperative Education
        $('.emp-coop-wrapper').append('<p>'+stuff[1][1].description+'</p>');//Cooperative Ed blah blah

        $('#employment').append('<div class="emp-stats-wrapper"></div>');
        $('.emp-stats-wrapper').append('<p class="emp-headers">'+stuff[2]+'</p>');//Degree stats
        $('.emp-stats-wrapper').append('<div id="stats-wrapper"></div>');
        $('#stats-wrapper').append('<div class="stats-wrap-children"><div class="stats-num">'+stuff[3][0].value+'</div><div class="stats-description">'+stuff[3][0].description+'</div></div>');
        $('#stats-wrapper').append('<div class="stats-wrap-children"><div class="stats-num">'+stuff[3][1].value+'</div><div class="stats-description">'+stuff[3][1].description+'</div></div>');
        $('#stats-wrapper').append('<div class="stats-wrap-children"><div class="stats-num">'+stuff[3][2].value+'</div><div class="stats-description">'+stuff[3][2].description+'</div></div>');
        $('#stats-wrapper').append('<div class="stats-wrap-children"><div class="stats-num">'+stuff[3][3].value+'</div><div class="stats-description">'+stuff[3][3].description+'</div></div>');

        $('#employment').append('<div class="emp-emprs-wrapper"></div>');
        $('.emp-emprs-wrapper').append('<p class="emp-headers">'+stuff[4]+'</p>');//employers
        $('.emp-emprs-wrapper').append('<div id="employers-wrapper"><div>');
        $.each(stuff[5], function(k, emps){
            $('#employers-wrapper').append('<div class="employers">'+emps+'</div></div>');
        });
        
        $('#employment').append('<div class="emp-careers-wrapper"></div>');
        $('.emp-careers-wrapper').append('<p class="emp-headers">'+stuff[6]+'</p>'); //careers
        $('.emp-careers-wrapper').append('<div id="careers-wrapper"><div>');
        $.each(stuff[7], function(l, careers){
            $('#careers-wrapper').append('<div class="careers">'+careers+'</div>');
        });

        //coop table
        $('#employment').append('<div class="emp-tables-wrapper"></div>');
        $('.emp-tables-wrapper').append('<p class="emp-headers">Click below to see where our students get placed!</p>');
        $('.emp-tables-wrapper').append('<div id="table-wrapper"></div>');
        $('#table-wrapper').append('<a href="#ex1" rel="modal:open" id="coop">Co-ops</a>');
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
        $('#table-wrapper').append('<a href="#ex1" rel="modal:open" id="prof">Jobs</a>');
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
        $('#map').html('<iframe src="http://ist.rit.edu/api/map.php" frameborder="0" width="100%" height="400px"></iframe>');
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
        $('#research-interest').append('<div id="research-interest-wrapper"></div>');
        $.each(min.byInterestArea, function(i, item){
            $('#research-interest-wrapper').append('<span class="research-interest-child"><a href="#ex1" rel="modal:open">'+ this.areaName + '</a></span>');
            $('#research-interest-wrapper').find('span').eq(i).on('click', function(){
                $('.modal').html($('<div class="modal-research"></div>'));
                $('.modal-research').html($('<h4>'+item.areaName+'</h4>'));
                $('.modal-research').append($('<ul id="modal-research-ul"><ul>'));
                $.each(item.citations, function(k, citations){
                    $('.modal-research').append($('<li class="li">'+citations+'</li>'));
                });
            });
            $('.modal').append($('</ul>'));
            //end of research by interest
        });
        //research by faculty
        $.each(min.byFaculty, function(i, items){
            $('#research-faculty').append('<div data-uname="'+items.username+'"><a href="#ex1" rel="modal:open"><img src="https://ist.rit.edu/assets/img/people/'+items.username+'.jpg"/></a></div>');
            //https://ist.rit.edu/assets/img/people/ephics.jpg
            $('#research-faculty').find('div').eq(i).on('click', function(){
                $('.modal').html($('<div class="modal-research"></div>'));
                $('.modal-research').html($('<h4>'+items.facultyName+'</h4>'));
                $('.modal-research').append($('<ul id="modal-research-ul"></ul>'));
                $.each(items.citations, function(j, citations){
                    $('#modal-research-ul').append('<li class="li">'+citations+'</li>');
                });
                $('.modal').css({width:'90%'});
            });
        });
    });

    //resources
    getData('get', {path:'/resources/'},'#resources').done(function(min){        
        //coop enrollment
        $('#accordion').append('<h3 class="selector" id="coop-enrollment"><a href="">Coop Enrollment</a></h3>');
        $('#accordion').append('<div><p>Please refer to our <a href="https://ist.rit.edu/assets/pdf/ISTCooperativeEmployment%20PolicyandProcedures.pdf" target=_blank>Coop Guide.</a></p></div>');
        
        //forms
        $('#accordion').append('<h3 class="selector" id="forms"><a href="">Forms</a></h3>');
        $('#accordion').append('<div id="form-accordion"></div>');
            $('#form-accordion').append('<h4>Undergraduate Forms</h4>');
            $.each(min.forms.undergraduateForms, function(i, items){
                $('#form-accordion').append('<p><a href="https://ist.rit.edu/'+items.href+'" target=_blank>'+items.formName+'</a></p>');
            });
            $('#form-accordion').append('<h4>Graduate Forms</h4>');
            $.each(min.forms.graduateForms, function(j, stuff){
                $('#form-accordion').append('<p><a href="https://ist.rit.edu/'+stuff.href+'" target=_blank>'+stuff.formName+'</a></p>');
            });
        $('#accordion').append('<h3 class="selector" id="student-ambassadors"><a href="">Student Ambassadors</a></h3>');
        $('#accordion').append('<div id="ambo-accordion"></div>');
            $('#ambo-accordion').append('<h4>'+min.studentAmbassadors.title+'</h4>');
                $('#ambo-accordion').append('<img src="'+min.studentAmbassadors.ambassadorsImageSource+'" alt="image"/>');
                $.each(min.studentAmbassadors.subSectionContent, function(k, things){
                    $('#ambo-accordion').append('<div><div><h4>'+things.title+'</h4></div>');
                    $('#ambo-accordion').append('<div><p>'+things.description+'</p></div>');
                });
            $('#ambo-accordion').append('<a href="'+min.studentAmbassadors.applicationFormLink+'" target=_blank>Apply Here!</a>');
        
        //study abroad
        $('#accordion').append('<h3 class="selector" id="study-abroad"><a href="">Study Abroad</a></h3>');
        $('#accordion').append('<div id="study-abroad-accordion"></div>');
            $('#study-abroad-accordion').append('<h4>'+min.studyAbroad.title+'</h4>');
            $('#study-abroad-accordion').append('<div>'+min.studyAbroad.description+'</div>');
            $('#study-abroad-accordion').append('<h5>'+min.studyAbroad.places[0].nameOfPlace+'</h5>');
            $('#study-abroad-accordion').append('<div>'+min.studyAbroad.places[0].description+'</div>');
            $('#study-abroad-accordion').append('<h5>'+min.studyAbroad.places[1].nameOfPlace+'</h5>');
            $('#study-abroad-accordion').append('<div>'+min.studyAbroad.places[1].description+'</div>');

        //tutors/lab information
        $('#accordion').append('<h3 class="selector" id="tutors-lab-info"><a href="">Tutors/Lab Information</a></h3>');
        $('#accordion').append('<div id="tutors-accordion"></div>');
            $('#tutors-accordion').append('<h4>'+min.tutorsAndLabInformation.title+'</h4>');
            $('#tutors-accordion').append('<p>'+min.tutorsAndLabInformation.description+'</p>');
            $('#tutors-accordion').append('<a href="'+min.tutorsAndLabInformation.tutoringHoursLabLink+'" target=_blank>Click Here for Tutoring Hours.</a>');
        
        //student advising services
        $('#accordion').append('<h3 class="selector" id="student-advising-services"><a href="">Student Advising Services</a></h3>');
        $('#accordion').append('<div id="advise-accordion"></div>')
            $('#advise-accordion').append('<h4>'+min.studentServices.title+'</h4>');
            //Academic Advisors
            $('#advise-accordion').append('<h4>'+min.studentServices.academicAdvisors.title+'</h4>');
                $('#advise-accordion').append('<p>'+min.studentServices.academicAdvisors.description+'</p>');
                $('#advise-accordion').append('<p><a href="'+min.studentServices.academicAdvisors.faq.contentHref+'" target=_blank>'+min.studentServices.academicAdvisors.faq.title+'</a></p>');
            
            // Faculty Advisors
            $('#advise-accordion').append('<h4>'+min.studentServices.facultyAdvisors.title+'</h4>');
            $('#advise-accordion').append('<p>'+min.studentServices.facultyAdvisors.description+'</p>');
            
            //IST Minor Advising
            $('#advise-accordion').append('<h4>'+min.studentServices.istMinorAdvising.title+'</h4>');
                $.each(min.studentServices.istMinorAdvising.minorAdvisorInformation, function(l, goods){
                    $('#advise-accordion').append('<p>'+goods.title+'</p>');
                    $('#advise-accordion').append('<p>'+goods.advisor+'</p>');
                    $('#advise-accordion').append('<p>'+goods.email+'</p>');
                });

            //Professional Advisors
            $('#advise-accordion').append('<h4>'+min.studentServices.professonalAdvisors.title+'</h4>');
                $.each(min.studentServices.professonalAdvisors.advisorInformation, function(m, effects){
                    $('#advise-accordion').append('<p>'+effects.name+'</p>');
                    $('#advise-accordion').append('<p>'+effects.department+'</p>');
                    $('#advise-accordion').append('<p>'+effects.email+'</p>');
                });
        //end of /resources/
        $( "#accordion" ).accordion({
            active: 2,
            collapsible: true,
            heightStyle: "content"
        });
    });

    ///footer/
    getData('get', {path:'/footer/'},'#footer').done(function(min){
        $('#social').append('<div id="social-tabs"></div>');
        $('#social-tabs').append('<ul id="social-ul"></ul>');
        $('#social-ul').append('<li><a href="#tweet">Tweet</a></li>');
        $('#social-ul').append('<li><a href="#facebook">Facebook</a></li>');
        $('#social-ul').append('<li><a href="#twitter">Twitter</a></li>');
            
        $('#social-tabs').append('<div id="tweet"><p>'+min.social.tweet+'</p></div>');
        $('#social-tabs').append('<div id="facebook"><p>'+min.social.facebook+'</p></div>');
        $('#social-tabs').append('<div id="twitter"><p>'+min.social.twitter+'</p></div>');
        
        $('#social').append('<div id="footer"></div>');
        $('#footer').append('<div id="action"></div>');
        $.each(min.quickLinks, function(i, items){
            $('#action').append('<a href= "'+items.href+'" target=_blank>'+items.title+'</a>');
        });
        $('#footer').append(min.copyright.html);
        
        
        $( "#social-tabs" ).tabs();
    });
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
            $(idForSpinner).append('<img src="assets/preloaders/128x128/Preloader_2/Preloader_2.gif" class="dontuse" /> ');
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

//gets faculty or staff for the people section. 
function getFacOrStaff(which, where){
    getData('get', {path:'/people/' + which}, where).done(function(min){
        var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
        var course = [];
        $('#' + where).append('<div class="'+where+'-wrapper"></div>');
        $.each(min, function(i, item){
            var count = 1;
            $.each(item, function(k, stuff){
                $('.'+where+'-wrapper').append('<span class="fac-staff-children" data-uname='+stuff.username+'><a href="#ex1" rel="modal:open">'+ stuff.name + '</a></span>'); 
                count++;
            });
        });
        $('#'+where+' span').on('click', function(){
            if(which === 'faculty'){
                whichFacOrStaff = min.faculty;
            }
            else{
                whichFacOrStaff = min.staff;
            }
            var who = getAttributesByName(whichFacOrStaff, 'username', $(this).attr('data-uname'));
            $('.modal').html($('<div><img src="'+who.imagePath+'" alt="faculty/staff image"/>'));
            $.each(who, function(index, item){
                if(!item == null || !item == ' ' && index != 'imagePath'){
                    if(index == 'website'){
                        $('.modal').append('<p><span class="caps">'+index + ':</span> <a href="' +item+'" target="_blank">'+item+'</a></p>');
                    }
                    else if(index == 'email'){
                        $('.modal').append('<p><span class="caps">'+index + ':</span> <a href="mailto:'+item+'">'+item+'<a></p>');
                    }
                    else{
                        $('.modal').append('<p><span class="caps">'+index + ':</span> ' +item+'</p>');
                    }
                    
                }
            });
            $('.modal').append($('</div>'));
            if(isMobile){
                $('.modal').css({width:'90%'});
            }
            else{
                $('.modal').css({width:'30%'});
            }
        });
        //end of people/faculty/
    });
}

 // $('#ugrad-minors').find('div').eq(i).on('click', function(){
                
            //     $('.modal').html($('<h4>'+item.title+'</h4><p>'+item.description+'</p>')); 

            //     $('.modal').append('<div id="ug-minors-tabs"></div>');//main div
                
            //     $('#ug-minors-tabs').append('<div id="ug-minors-tabs"></div>'); //main div
                    
            //     $('#ug-minors-tabs').append('<ul id="ug-minors-ul"></ul>'); //tab div
            
            //     // $('#ug-minors-ul').append('<li><a href="#1">Tweet</a></li>');
            //     // $('#ug-minors-ul').append('<li><a href="#2">Facebook</a></li>');
            //     // $('#ug-minors-ul').append('<li><a href="#3">Twitter</a></li>');
        
            //     // $('#ug-minors-tabs').append('<div id="1"><p>1</p></div>'); //tab div
            //     // $('#ug-minors-tabs').append('<div id="2"><p>2</p></div>'); //tab div
            //     // $('#ug-minors-tabs').append('<div id="3"><p>3</p></div>'); //tab div

            //     $.each(item.courses, function(j, course){
            //         $('#ug-minors-ul').append('<li><a href="#1">Tweet</a></li>');
            //         // getData('get', {path:'/course/courseID='+course}, '#'+course).done(function(data){
            //         //     // $('#ug-minors-tabs-ul').append($('<li><a href="#'+data.courseID+'">'+data.courseID+'</a></li>'));
            //         //     // $('#ug-minors-tabs').append($('<div id="'+data.courseID+'"><p>'+data.title+'</p></div>'));
            //         //     // $('#'+data.courseID).append($('<p>'+data.description+'</p>'));
            //         // }); 
            //     }); 
            //     $('#ug-minors-tabs').append('<div id="1"><p>1</p></div>'); //tab div
            //     $('#ug-minors-tabs').append('<div id="2"><p>2</p></div>'); //tab div
            //     $('#ug-minors-tabs').append('<div id="3"><p>3</p></div>'); //tab div


                        // $( "#ug-minors-tabs" ).tabs({
            //     collapsible: true,
            //     heightStyle: "content",
            //     active: 0
            // });
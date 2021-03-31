$(document).ready(function() {

    /* ======= Scrollspy ======= */
   $('body').scrollspy({ target: '#page-nav-wrapper', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -60, 'axis':'y'});
		
	});
	
	/* ======= Fixed page nav when scrolled ======= */    
    $(window).on('scroll resize load', function() {
        
        $('#page-nav-wrapper').removeClass('fixed');
         
         var scrollTop = $(this).scrollTop();
         var topDistance = $('#page-nav-wrapper').offset().top;
         
         if ( (topDistance) > scrollTop ) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
         }
         else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
         }

    });
    
    /* ======= Chart ========= */
    
    $('.chart').easyPieChart({		
		barColor:'#00BCD4',//Pie chart colour
		trackColor: '#e8e8e8',
		scaleColor: false,
		lineWidth : 5,
		animate: 2000,
		onStep: function(from, to, percent) {
			$(this.el).find('span').text(Math.round(percent));
		}
	});  
	

    /* CUSTOM SCRIPT */

    var LANG = 'id';
    var date = new Date();
            
    var countYear = (start_from) =>
    {
        var year = date.getFullYear() - start_from;
        return year;
    }

    function getData(LANG = "id") {

        const workExperience = $("#work-timeline");
        const educationHistory = $("#education-history");
        const programmingSkills = $("#programming-skills");
        const otherSkills = $("#other-skills");
        const learnedSkills = $("#learned-skills");
        const portofolioItem = $("#portfolio-items");

        /*=========== TRANSALTE ==========*/

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            console.log(result);
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
        
                $(".actions > .hire-text").html(result.hire_me);
                $(".actions > .resume-text").html(result.download_resume);

                $(".intro > .container > .profile > p").html(result.about_content);

                $(".experiences-text").html(result.work_experience);
                $(".education-text").html(result.education);
                $(".skills-text").html(result.skills);
                $(".portfolio-text").html(result.portfolio);
                $(".contact-text").html(result.contact);

                $(".experiences-section > .section-title").html(result.work_experience);
                $(".education-section > .section-title").html(result.education);
                $(".skills-section > .section-title").html(result.skills);
                $(".skills-section > .top-skills > .subtitle").html(result.top_skills);
                $(".other-skills > .subtitle").html(result.other_skills);
                $(".other-skills > .also-learned").html(result.also_learned);

                $(".portfolio-section > .section-title").html(result.portfolio);

                $(".contact-section > .section-title").html(result.get_in_touch);

                $(".my-works-text").html(result.my_works_text);
                $(".call-me-contact-text").html(result.call_me_contact_text);
                $(".service-list").html(result.service_list);

            }
        };
        xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/lang.json?" + (new Date()).getTime(), true);
        xmlhttp.send(); 


        /* Experience */
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);

            workExperience.html(''); // Reset

            result.forEach(setData);
            
            function setData(value, index, array) {
                let experience = `<div class="item">
                    <div class="work-place">
                        <h3 class="place">`+value.place+`</h3>
                        <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>`+value.location+`</div>
                    </div>
                    <div class="job-meta">
                        <div class="title">`+value.job.title+`</div>
                        <div class="time">`+value.job.time+`</div>
                    </div><!--//job-meta-->
                    <div class="job-desc">
                        <p>`+value.job.desc+`</p> 
                    </div><!--//job-desc-->
                </div><!--//item-->`;
                workExperience.append(experience);
            }
        }
        };
        xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/experience.json?" + (new Date()).getTime(), true);
        xmlhttp.send(); 

        /* Education */
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
        
                educationHistory.html(''); // Reset
        
                result.forEach(setData);
                
                function setData(value, index, array) {
                    let education = `<div class="item col-12 col-md-4">
                        <div class="item-inner">
                            <h3 class="degree">`+value.degree+`</h3>
                            <div class="education-body">
                                `+value.education+`
                            </div><!--//education-body-->
                            <div class="time">`+value.time+`</div>
                            <div class="desc">
                                `+value.desc+`
                            </div>
                        </div><!--//item-inner-->
                    </div><!--//item-->`;
                    educationHistory.append(education);
                }
            }
            };
            xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/education.json?" + (new Date()).getTime(), true);
            xmlhttp.send(); 

            /* Programming Skills */
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
            
                    programmingSkills.html(''); // Reset
            
                    result.forEach(setData);
                    
                    function setData(value, index, array) {

                        let programming = `<div class="item col-12 col-md-4">
                            <div class="item-inner">
                                <div class="chart-easy-pie text-center">
                                    <div class="chart-theme-1 chart" data-percent="`+value.percent+`"><span>`+value.percent+`</span>%<canvas height="110" width="110"></canvas></div>
                                </div>
                                <h4 class="skill-name">`+value.name+`</h4>
                                <div class="level">`+value.level+`, `+ countYear(value.year) +` years</div>
                                <div class="desc">
                                    `+value.desc+`
                                </div>
                            </div><!--//item-inner-->
                        </div><!--//item-->`;
                        programmingSkills.append(programming);

                        $(".chart").easyPieChart({		
                            barColor:'#00BCD4',//Pie chart colour
                            trackColor: '#e8e8e8',
                            scaleColor: false,
                            lineWidth : 5,
                            animate: 2000,
                            onStep: function(from, to, percent) {
                                $(this.el).find('span').text(Math.round(percent));
                            }
                        });
                        
                    }

                
                }
                };
                xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/programming.json?" + (new Date()).getTime(), true);
                xmlhttp.send(); 

                /* Other Skills */
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText).skills;

                    otherSkills.html(''); // Reset

                    result.forEach(setData);
                    
                    function setData(value, index, array) {
                        let skills = `<span class="skill-tag">`+value+`</span>`;
                        otherSkills.append(skills);
                    }
                }
                };
                xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/skills.json?" + (new Date()).getTime(), true);
                xmlhttp.send(); 

                /* Learned */
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText).learned;

                    learnedSkills.html(''); // Reset

                    result.forEach(setData);
                    
                    function setData(value, index, array) {
                        let learned = `<span class="skill-tag">`+value+`</span>`;
                        learnedSkills.append(learned);
                    }
                }
                };
                xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/skills.json?" + (new Date()).getTime(), true);
                xmlhttp.send(); 


                /* Portofolio */

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var result = JSON.parse(this.responseText);
                
                        portofolioItem.html(''); // Reset

                        let portofolio = "";
                
                        result.forEach(setData);
                        
                        function setData(value, index, array) {

                            portofolio += `<div class="item `+value.type+` viewDetail col-lg-3 col-6" style="display:inline-block;left: 0px; top: 0px;" data-toggle="modal" data-id="`+value.id+`" data-target="#myModal">
                            <div class="item-inner">
                                    <figure class="figure">`;
                            
                            if(value.image != "-" && value.image != "")
                            {
                                portofolio += `<img class="img-fluid portofolio-thumbnail" src="portofolio/`+value.image+`/thumbnail.png" alt="">`;
                            } else {
                                portofolio += `<img class="img-fluid portofolio-thumbnail" src="assets/images/No-Image-Available.png" alt="">`;
                            }
                            
                            portofolio += `</figure>
                                    <div class="content text-left">
                                        <h3 class="sub-title"><a href="#">`+value.title+`</a></h3>
                                        <div class="meta">`+value.meta+`</div>
                                        <div class="url">`+value.url+`</div>
                                        `;
                            if(value.repo != "#" && value.repo != "")
                            {
                                portofolio += `<div class="action"><a href="`+value.repo+`" target="_blank">View on Github</a></div>`;
                            }  
                            portofolio += `
                            </div><a class="link-mask" href="#portofolio"></a>                
                                </div>
                            </div>`;

                            portofolioItem.html(portofolio);
                            
                        }

                    }
                    };
                    xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/portfolio.json?" + (new Date()).getTime(), true);
                    xmlhttp.send(); 


        
        /* ======= Isotope plugin ======= */
        /* Ref: http://isotope.metafizzy.co/ */
        // init Isotope    
        var $container = $('.isotope');
        
        $container.imagesLoaded(function () {
            $('.isotope').isotope({
                itemSelector: '.item'
            });
        });
        
        // filter items on click
        $('#filters').on( 'click', '.type', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
        
        var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
            
                    portofolioItem.html(''); // Reset
            
                    result.forEach(setData);
                    
                    function setData(value, index, array) {
                        if(filterValue == "*" || value.type == filterValue.replace(".","")) {
                            let portofolio = `<div id="viewDetail" class="item `+value.type+` col-lg-3 col-6"  style="display:inline-block;left: 0px; top: 0px;" data-toggle="modal" data-target="#myModal" data-id="`+value.id+`">
                            <div class="item-inner">
                                    <figure class="figure">`;
                            
                            if(value.image != "-" && value.image != "")
                            {
                                portofolio += `<img class="img-fluid portofolio-thumbnail" src="portofolio/`+value.image+`/thumbnail.png" alt="">`;
                            } else {
                                portofolio += `<img class="img-fluid portofolio-thumbnail" src="assets/images/No-Image-Available.png" alt="">`;
                            }
                            
                            portofolio += `</figure>
                                    <div class="content text-left">
                                        <h3 class="sub-title"><a href="#">`+value.title+`</a></h3>
                                        <div class="meta">`+value.meta+`</div>
                                        <div class="url">`+value.url+`</div>
                                        `;
                            if(value.repo != "#" && value.repo != "")
                            {
                                portofolio += `<div class="action"><a href="`+value.repo+`" target="_blank">View on Github</a></div>`;
                            }  
                            portofolio += `
                            </div><a class="link-mask" href="#portofolio"></a>            
                                </div>
                            </div>`;
                            portofolioItem.append(portofolio);
                        }
                    }
                }
                };
                xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/portfolio.json?" + (new Date()).getTime(), true);
                xmlhttp.send(); 

        });
        
        // change is-checked class on buttons
        $('.filters').each( function( i, typeGroup ) {
            var $typeGroup = $( typeGroup );
            $typeGroup.on( 'click', '.type', function() {
            $typeGroup.find('.active').removeClass('active');
            $( this ).addClass('active');
            });
        });


        $('#myModal').on('show.bs.modal', function(e) {
            var hashValue = location.hash.replace(/^#/, '');
            var id = hashValue.split("&")[1];
            id = e.relatedTarget.dataset['id']; /* ganti dengan yg dari event */
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    result.forEach(setData)
                    function setData(value, index, array) {
                        let content = `<p>`;
                        
                        if(value.image != "-" && value.image != "")
                        {
                            content += `<img class="img-fluid portofolio-thumbnail" src="portofolio/`+value.image+`/preview.png" alt="">`;
                        } else {
                            content += `<img class="img-fluid portofolio-thumbnail" src="assets/images/No-Image-Available.png" alt="">`;
                        }
                        if(value.url != "-" && value.url != "")
                            {
                            content += `  
                            <br>
                            URL: <a>`+value.url+`</a>                 
                            `;
                        }
                        content += `  
                        <br>
                        `+value.desc+`                 
                        `;
                        if(value.repo != "#" && value.repo != "")
                            {
                                content += `<br><div style="text-align:center"><a href="`+value.repo+`" target="_blank">View on Github</a></div>`;
                            }  

                        if(value.id == id) {
                        $(".modal-title").html(value.title);
                        $(".modal-body").html(content);
                        }
                    }
                }
                };
                xmlhttp.open("GET", "data/portfolio/json/"+LANG+"/portfolio.json?" + (new Date()).getTime(), true);
                xmlhttp.send(); 
        });

        $('#myModal').on('hidden.bs.modal', function () {
            $(".modal-title").html('');
            $(".modal-body").html('');
        })
    }

    function languageChange(){
        let text_lang;

        switch (LANG) {
            case 'id':
                text_lang = "Indonesian";
                LANG = 'en';
            break;

            default:
                text_lang = "English";
                LANG = 'id';
            break;
        }
        console.log("Change to "+text_lang);
        $("html").attr("lang", LANG);
        $("#switch-language > span").html(text_lang);
        getData(LANG);
    }

    $("#switch-language").click(function(){
        languageChange();
    });

    $("html").attr("lang", LANG);
    getData(LANG);

});
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
    });
    
    // change is-checked class on buttons
    $('.filters').each( function( i, typeGroup ) {
        var $typeGroup = $( typeGroup );
        $typeGroup.on( 'click', '.type', function() {
          $typeGroup.find('.active').removeClass('active');
          $( this ).addClass('active');
        });
    });

    /* CUSTOM SCRIPT */

    var LANG = 'id';
    var date = new Date();
            
    var countYear = (start_from) =>
    {
        var year = date.getFullYear() - start_from;
        return year;
    }

    const workExperience = $("#work-timeline");
    const educationHistory = $("#education-history");
    const programmingSkills = $("#programming-skills");
    const otherSkills = $("#other-skills");
    const learnedSkills = $("#learned-skills");
    

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
    xmlhttp.open("GET", "data/json/"+LANG+"/experience.json", true);
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
        xmlhttp.open("GET", "data/json/"+LANG+"/education.json", true);
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
            xmlhttp.open("GET", "data/json/"+LANG+"/programming.json", true);
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
            xmlhttp.open("GET", "data/json/"+LANG+"/skills.json", true);
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
            xmlhttp.open("GET", "data/json/"+LANG+"/skills.json", true);
            xmlhttp.send(); 


});
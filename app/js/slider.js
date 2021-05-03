//CSS Tricks - source: https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/

if (navigator.msMaxTouchPoints) {

  $('#slider').addClass('ms-touch');

  $('#slider').on('scroll', function() {
    $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
  });

} else {

  var slider = {

    el: {
      slider: $("#slider"),
      holder: $(".holder"),
      imgSlide: $(".slide-image"),
      sliderNav: $(".slider-nav"),
      allNavButtons: $(".slider-nav > a")
    },

    slideWidth: $('#slider').width(),
    touchstartx: undefined,
    touchmovex: undefined,
    movex: undefined,
    index: 0,
    longTouch: undefined,
    
    init: function() {
      this.bindUIEvents();
    },

    bindUIEvents: function() {

      this.el.holder.on("touchstart", function(event) {
        slider.start(event);
      });

      this.el.holder.on("touchmove", function(event) {
        slider.move(event);
      });

      this.el.holder.on("touchend", function(event) {
        slider.end(event);
      });

      // button nav click
      this.el.sliderNav.on("click", "a", function(event) {
        slider.handleNavClick(event, this);
    });
    
    },

    handleNavClick: function(event, el) {
      event.preventDefault();
      var position = $(el).attr("href").split("-").pop();
      
      this.el.slider.animate({
        scrollLeft: position * this.slideWidth
      }, this.timing);
      
      this.changeActiveNav(el);
    },

    changeActiveNav: function(el) {
      this.el.allNavButtons.removeClass("active");
      $(el).addClass("active");
    },

    start: function(event) {
      // Test for flick.
      this.longTouch = false;
      setTimeout(function() {
        window.slider.longTouch = true;
      }, 250);

      // Get the original touch position.
      this.touchstartx =  event.originalEvent.touches[0].pageX;

      // The movement gets all janky if there's a transition on the elements.
      $('.animate').removeClass('animate');
    },

    move: function(event) {
      // Continuously return touch position.
      this.touchmovex =  event.originalEvent.touches[0].pageX;
      // Calculate distance to translate holder.
      this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
      // Defines the speed the images should move at.
      var panx = 100-this.movex/6;
      if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
        this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
      }
      if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
        this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
      }
    },

    end: function(event) {
      // Calculate the distance swiped.
      var absMove = Math.abs(this.index*this.slideWidth - this.movex);
      // Calculate the index. All other calculations are based on the index.
      if (absMove > this.slideWidth/2 || this.longTouch === false) {
        if (this.movex > this.index*this.slideWidth && this.index < 3) {
          this.index++;
        } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
          this.index--;
        }
      }
      

      // Move and animate the elements.
      this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
      this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');

    }

  };


  slider.init();
}

/*
<div class="slider" id="slider">

        <div class="holder">

          <div id="slide-0" class="testimony__content slide-image">
            <img alt="asian woman avatar" src="/img/avatar-anisha.png"/>
            <div class="block">
              <h3>Anisha Li</h3>
              <p>“Manage has supercharged our team’s workflow. The ability to maintain 
                visibility on larger milestones at all times keeps everyone motivated.”</p>
            </div>
          </div>

          <div id="slide-1" class="testimony__content slide-image">
            <img alt="woman of color avatar" src="/img/avatar-ali.png"/>
            <div class="block">
              <h3>Ali Bravo</h3>
              <p>“We have been able to cancel so many other subscriptions since using 
                Manage. There is no more cross-channel confusion and everyone is much 
                more focused.”</p>
            </div>  
          </div>

          <div id="slide-2" class="testimony__content slide-image">
            <img alt="senior man avatar" src="/img/avatar-richard.png"/>
            <div class="block">
              <h3>Richard Watts</h3>
              <p>“Manage allows us to provide structure and process. It keeps us organized 
                and focused. I can’t stop recommending them to everyone I talk to!”</p>
            </div>  
          </div>

          <div id="slide-3" class="testimony__content slide-image">
            <img alt="woman of color avatar" src="/img/avatar-shanai.png"/>
            <div class="block">
              <h3>Shanai Gough</h3>
              <p>“Their software allows us to track, manage and collaborate on our projects 
                from anywhere. It keeps the whole team in-sync without being intrusive.”</p>
            </div>  
          </div>

          <!-- Next and previous buttons -->
        <a class="prev hide-for-mobile" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next hide-for-mobile" onclick="plusSlides(1)">&#10095;</a>
    
        </div> <!--Holder end-->

      </div><!--Slider end-->

      <div class="slider-nav hide-for-desktop">
        <a href="#slide-0" class="active">Slide 0</a> 
        <a href="#slide-1">Slide 1</a> 
        <a href="#slide-2">Slide 2</a>
        <a href="#slide-3">Slide 3</a> 
      </div>
*/
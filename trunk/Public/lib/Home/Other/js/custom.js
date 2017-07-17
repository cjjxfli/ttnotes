/*
  * @package Saifway
  * @subpackage Saifway HTML
  * 
  * Template Scripts
  * Created by Tripples
  
   1. Fixed header
   2. Main slideshow
   3. Owl Carousel
   4. Video popup
   5. Counter
   6. Contact map
   7. Back to top
  
*/


jQuery(function($) {
  "use strict";


   /* ----------------------------------------------------------- */
   /*  Fixed header
   /* ----------------------------------------------------------- */

   $(window).on('scroll', function(){
      if ( $(window).scrollTop() > 100 ) {
         $('.site-navigation, .header-white').addClass('navbar-fixed');
      } else {
         $('.site-navigation, .header-white').removeClass('navbar-fixed');
      }
   });


   /* ----------------------------------------------------------- */
   /*  Main slideshow
   /* ----------------------------------------------------------- */

      $('#main-slide').carousel({
         pause: true,
         interval: 100000,
      });



  /* ----------------------------------------------------------- */
  /*  Owl Carousel
  /* ----------------------------------------------------------- */

   //Page slide

      $(".box-slide").owlCarousel({

         loop:true,
         autoPlay:false,
         navigation:true,
         pagination:true,
         navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
         slideSpeed:800,
         items : 1,
         itemsDesktop : [1199,1],
         itemsDesktopSmall : [980,1],
         itemsTablet: [768,1],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });

      //Product slide

      $("#product-slide").owlCarousel({

         loop:true,
         margin:20,
         navigation:true,
         pagination:false,
         navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
         items : 3,
         itemsDesktop : [1199,3],
         itemsDesktopSmall : [980,3],
         itemsTablet: [768,2],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });


      //Testimonial slide

      $("#testimonial-slide").owlCarousel({

         loop:true,
         margin:20,
         navigation:false,
         pagination:true,
         items : 2,
         itemsDesktop : [1199,2],
         itemsDesktopSmall : [980,2],
         itemsTablet: [768,2],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });

      //Page slide

      $("#page-slide").owlCarousel({

         loop:true,
         autoPlay:true,
         navigation:true,
         pagination:true,
         navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
         slideSpeed:800,
         items : 1,
         itemsDesktop : [1199,1],
         itemsDesktopSmall : [980,1],
         itemsTablet: [768,1],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });


      //Partners slide

      $("#partners-carousel").owlCarousel({

         loop:true,
         margin:20,
         navigation:false,
         pagination:true,
         items : 5,
         itemsDesktop : [1199,3],
         itemsDesktopSmall : [980,2],
         itemsTablet: [768,2],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });

       //Team slide

      $("#team-slide").owlCarousel({

         loop:true,
         margin:20,
         navigation:true,
         pagination:false,
         navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
         items : 4,
         itemsDesktop : [1199,4],
         itemsDesktopSmall : [980,3],
         itemsTablet: [768,2],
         itemsTabletSmall: false,
         itemsMobile : [479,1]

      });


   /* ----------------------------------------------------------- */
   /*  Video popup
   /* ----------------------------------------------------------- */
     $(document).ready(function(){

         $(".popup").colorbox({iframe:true, innerWidth:650, innerHeight:409});

     });



   /* ----------------------------------------------------------- */
   /*  Counter
   /* ----------------------------------------------------------- */

      $('.counterUp').counterUp({
       delay: 10,
       time: 1000
      });



   /* ----------------------------------------------------------- */
   /*  Contact map
   /* ----------------------------------------------------------- */

//      $("#map").gmap3({
//        map:{
//            options:{
//               center:[-37.8152065,144.963937],
//               zoom: 14,
//               scrollwheel: false
//            }
//        },
//        marker:{
//          values:[
//            {address:"Corner Swanston St & Flinders St, Melbourne VIC 3000, Australia", data:" Welcome To Saifway ! ! ", 
//             options:{icon: "http://themewinter.com/html/marker.png"}}
//          ],
//          options:{
//            draggable: false
//          },
//          events:{
//            mouseover: function(marker, event, context){
//              var map = $(this).gmap3("get"),
//                infowindow = $(this).gmap3({get:{name:"infowindow"}});
//              if (infowindow){
//                infowindow.open(map, marker);
//                infowindow.setContent(context.data);
//              } else {
//                $(this).gmap3({
//                  infowindow:{
//                    anchor:marker, 
//                    options:{content: context.data}
//                  }
//                });
//              }
//            },
//            mouseout: function(){
//              var infowindow = $(this).gmap3({get:{name:"infowindow"}});
//              if (infowindow){
//                infowindow.close();
//              }
//            }
//          }
//        }
//      });


   /* ----------------------------------------------------------- */
   /*  Back to top
   /* ----------------------------------------------------------- */

       $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
      // scroll body to 0px on click
      $('#back-to-top').click(function () {
          $('#back-to-top').tooltip('hide');
          $('body,html').animate({
              scrollTop: 0
          }, 800);
          return false;
      });
      
      $('#back-to-top').tooltip('hide');

});
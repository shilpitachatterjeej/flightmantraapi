"use strict";
$(document).ready(function () {
  var $window = $(window);
  //add id to main menu for mobile menu start
  var getBody = $("body");
  var bodyClass = getBody[0].className;
  $(".main-menu").attr("id", bodyClass);
  //add id to main menu for mobile menu end

  // card js start
  $(".card-header-right .close-card").on("click", function () {
    var $this = $(this);
    $this.parents(".card").animate({
      opacity: "0",
      "-webkit-transform": "scale3d(.3, .3, .3)",
      transform: "scale3d(.3, .3, .3)",
    });

    setTimeout(function () {
      $this.parents(".card").remove();
    }, 800);
  });

  $(".card-header-right .minimize-card").on("click", function () {
    var $this = $(this);
    var port = $($this.parents(".card"));
    var card = $(port).children(".card-block").slideToggle();
    $(this).toggleClass("icon-minus").fadeIn("slow");
    $(this).toggleClass("icon-plus").fadeIn("slow");
  });
  $(".card-header-right .full-card").on("click", function () {
    var $this = $(this);
    var port = $($this.parents(".card"));
    port.toggleClass("full-card");
    $(this).toggleClass("icon-maximize");
    $(this).toggleClass("icon-minimize");
  });

  $("#more-details").on("click", function () {
    $(".more-details").slideToggle(500);
  });
  $(".mobile-options").on("click", function () {
    $(".navbar-container .nav-right").slideToggle("slow");
  });
  // card js end
  $.mCustomScrollbar.defaults.axis = "yx";
  $("#styleSelector .style-cont").slimScroll({
    setTop: "10px",
    height: "calc(100vh - 440px)",
  });
  $(".main-menu").mCustomScrollbar({
    setTop: "10px",
    setHeight: "calc(100% - 80px)",
  });
  $("#mobile-collapse i").addClass("icon-toggle-right");
  $("#mobile-collapse").on("click", function () {
    $("#mobile-collapse i").toggleClass("icon-toggle-right");
    $("#mobile-collapse i").toggleClass("icon-toggle-left");
  });
});
$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  loadSideNavBar();
  // handlemenutype('st5');
  $(".theme-loader").hide();
});

// toggle full screen
function toggleFullScreen() {
  var a = $(window).height() - 10;
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  $(".full-screen").toggleClass("icon-maximize");
  $(".full-screen").toggleClass("icon-minimize");
}

function loadSideNavBar() {
  // $.getScript("/static/adminty/assets/js/pcoded.min.js");
  $.getScript("/static/adminty/assets/js/vartical-layout.min.js");
  $.ajax({
    url: "/role-management/get-side-nav-item-by-employee",
    method: "POST",
    dataType: "json",
    data: {},
    async: true,
    success: function (response) {
      // console.log(response);
      const result = response.data;
      $("#sideNavBar").html("");

      const liveEmp = "/dashboard/live-employees";
      const meetingBooking = "/dashboard/meeting-bookings";
      const deskBooking = "/dashboard/desk-bookings";

      let liItem = ``;
      for (let x = 0; x < result.length; x++) {
        const E = result[x];

        if (
          E.url != liveEmp &&
          E.url != meetingBooking &&
          E.url != deskBooking
        ) {
          if (!E.childs.length && E.url) {
            liItem += `<li class=" ">
                                    <a href="${E.url}">
                                        <span class="pcoded-micon"><i
                                            class="${E.icon}"></i></span>
                                        <span class="pcoded-mtext">${E.module_name}</span>                                        
                                    </a>
                                </li>`;
          }
        }

        if (E.url == liveEmp) {
          liItem += `<li class=" ">
                                    <a href="${E.url}">
                                        <span class="pcoded-micon"><i
                                            class="${E.icon}"></i></span>
                                        <span class="pcoded-mtext">${E.module_name}</span>        
                                        <span class="pcoded-badge label label-success" id="live_checkin-count">0</span>                             
                                    </a>
                                </li>`;
        }

        if (E.url == meetingBooking) {
          liItem += `<li class=" ">
                                    <a href="${E.url}">
                                        <span class="pcoded-micon"><i
                                            class="${E.icon}"></i></span>
                                        <span class="pcoded-mtext">${E.module_name}</span>        
                                        <span class="pcoded-badge label label-danger" id="meeting_booking_count">0</span>                                
                                    </a>
                                </li>`;
        }

        if (E.url == deskBooking) {
          liItem += `<li class=" ">
                                    <a href="${E.url}">
                                        <span class="pcoded-micon"><i
                                            class="${E.icon}"></i></span>
                                        <span class="pcoded-mtext">${E.module_name}</span>        
                                        <span class="pcoded-badge label label-warning" id="desk_booking_count">0</span>                                
                                    </a>
                                </li>`;
        }

        if (E.childs.length) {
          liItem += `<li class="pcoded-hasmenu">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="${E.icon}"></i></span>
                                        <span class="pcoded-mtext">${E.module_name}</span>
                                    </a>
                                    <ul class="pcoded-submenu">`;

          for (let z = 0; z < E.childs.length; z++) {
            const V = E.childs[z];

            if (
              V.url == liveEmp ||
              V.url == meetingBooking ||
              V.url == deskBooking
            ) {
              liItem += `<li class=" ">
                                            <a href="${V.url}" >
                                                <span class="pcoded-mtext">${V.module_name}</span>`;

              if (V.url == liveEmp) {
                liItem += `<span class="pcoded-badge label label-success" id="live_checkin-count">0</span>`;
              } else if (V.url == meetingBooking) {
                liItem += `<span class="pcoded-badge label label-danger" id="meeting_booking_count">0</span>`;
              } else if (V.url == deskBooking) {
                liItem += `<span class="pcoded-badge label label-warning" id="desk_booking_count">0</span>`;
              }

              liItem += `</a></li>`;
              continue;
            }

            liItem += `<li class=" ">
                                            <a href="${V.url}" >
                                                <span class="pcoded-mtext">${V.module_name}</span>
                                            </a>
                                        </li>`;
          }

          liItem += `</ul></li>`;
        }
      }

      $("#sideNavBar").html(liItem);

      $(".main-menu ul li").each(function () {
        var $this = $(this).children("a");
        if ($this.attr("href") == location.pathname) {
          $this.addClass("active");
          $this.parents("li").addClass("active pcoded-trigger");
        }
      });

      setTimeout(() => {
        handlemenutype("st5");
      }, 1500);

      if (location.pathname != "/login") {
        // loadCount();
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function loadCount() {
  var cur_date = moment().format("YYYY-MM-DD");
  $.ajax({
    url: "/dashboard/get-booking-checkin",
    method: "POST",
    dataType: "json",
    async: true,
    data: {
      type: "meeting",
      workspace_id: "all",
      start_date: cur_date,
      end_date: cur_date,
    },
    success: function (response) {
      $("#meeting_booking_count").html(response.bookings.length);
    },
  });

  $.ajax({
    url: "/dashboard/get-booking-checkin",
    method: "POST",
    dataType: "json",
    async: true,
    data: {
      type: "desk",
      workspace_id: "all",
      start_date: cur_date,
      end_date: cur_date,
    },
    success: function (response) {
      $("#desk_booking_count").html(response.bookings.length);

      var bookings = [];
      var checkins = [];
      $.each(response.bookings, function (k, v) {
        if (v.is_checkedin == true || v.is_checkedin == "true") {
          checkins.push(v);
        } else {
          bookings.push(v);
        }
      });
      $("#live_checkin-count").html(checkins.length);
    },
  });
}

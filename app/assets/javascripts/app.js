$(document).ready(function() {

  // Load navBubbles
  var nav = new NavScroll().initialize()
  $('nav').on('scroll', function () { nav.resizeBubbles() })

  $(window).on('resize', function() {
    nav.recalibrateBubbles()
  })

  // Load Hidden Navbar
  $(document).on('click', '.fa-bars', function() {
    showMainMenu()
  });

  $(document).on('click', '#menu-overlay, .fa-times', function() {
    hideMainMenu()
  });

  // Login stuff
  $('#main-menu').on('click', '#login', function() {
    renderLoginForm()
  });

  $('#main-menu').on('click', '#logout', function() {
    userLogout()
  });

  $('main').on('submit', '.login-form', function(event) {
    event.preventDefault();
    sendLoginCredentials(this)
  });

  $('#main-menu').on('click', '#register', function(event) {
    userRegister()
  });

  $('main').on('submit', '#new_user', function(event) {
    event.preventDefault();
    submitRegistration(this)
  });



})

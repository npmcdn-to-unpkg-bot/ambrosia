function createExperience(form){
  formData = $(form).serialize();
  var request = $.ajax({
    method: 'post',
    url: '/experiences',
    data: formData
  })
  request.done(function(response){
    var experienceID = response
    clearMainFrame().done(function() {
      addImageToExperienceForm(experienceID)
    });
  })
  request.fail(function(response) {
    console.log('nope')
    var $error = $("<p>").text("Title Required")
    $("#create-experience-submit").prepend($error)
  })
}

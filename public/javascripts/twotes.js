// Scripts for all partials included in twotes.handlebars. Includes twote submission, twote deletion, username highlighting and 
// video switching on button press. 

//FORM
var $form = $("#twote-form");

//if form submit works
var onSuccessForm = function (data, status) {
  if (data) {
    $( "#twote-list" ).html(data);
    $form.submit(function(event) {
        event.preventDefault();

        //getting values of content from form data
        var twoteContentVidID = $("#twoteContentVidID").val()
        $form.each(function(){
              this.reset();
          });

     });
       $(".delete").unbind().on("click",function(e) {
        console.log(e);
        var ID = $(this).attr("id");
        $.post("/twotes/delete", {
          ID: ID
        })
        .done(onSuccessDelete)
        .error(onErrorDelete)
      });
  }
  else{
    alert("You're not logged in! Oh noes! No worries, I'll redirect you.")
    window.location.href='/login'
  }
};

//if form submit fails
var onErrorForm = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


//submitting the form
$form.submit(function(event) {
  event.preventDefault();

  //getting values of contentVidID from form data
  var twoteContentVidID = $("#twoteContentVidID").val()

  //sending post request
  $.post("twotes/add", {
    twoteContentVidID: twoteContentVidID
  })
    .done(onSuccessForm)
    .error(onErrorForm)
});


//X (DELETE) BUTTON

//if click is successful
var onSuccessDelete = function(data, status) {
   $( "#twote-list" ).html(data);
   $(".delete").unbind().on("click",function(e) {
    console.log(e);
    var ID = $(this).attr("id");
    $.post("/twotes/delete", {
      ID: ID
    })
    .done(onSuccessDelete)
    .error(onErrorDelete)
  });
};

//if click fails
var onErrorDelete = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$(".delete").on("click",function(e) {
  console.log(e);
  var ID = $(this).attr("id");

  $.post("/twotes/delete", {
    ID: ID
  })
  .done(onSuccessDelete)
  .error(onErrorDelete)
});

//LOGOUT BUTTON
var onSuccessLogout = function(data, status) {
   window.location.href='/'
};

//if click fails
var onErrorLogout = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$("#logout").on("click",function(e) {
  $.post("/logout")
  .done(onSuccessLogout)
  .error(onErrorLogout)
});


//USER BUTTON
$(".username-button").on("click",function(e) {
  console.log(e);
  var userID = $(this).attr("id");
  $("."+userID).toggleClass('highlight');
  $("#"+userID).toggleClass('highlight');
})


//VIDEO CHANGE BUTTON

$('body').on('click', '.video', function(ev) {
   //Get URL of twote and find the corresponding videoID
  var url = $(this).attr("value");
  console.log("Name: "+url);
  var indicatorString = "watch?v=";
  var indicatorStringIndex = url.indexOf(indicatorString);
  var vidIDstart = indicatorStringIndex + indicatorString.length;
  var content= url.substring(vidIDstart);

  vid_player.loadVideoById({videoId:content});
});

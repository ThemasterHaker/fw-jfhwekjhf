var fb = new Firebase("https://glowing-heat-9106.firebaseio.com/");
var messages = fb.child("messages");
var notifications = fb.child("notifications");
var users = fb.child("users");
var btn = $('button');
var wrap = $('.wrapper');
var user_list = $('.user_wrapper');
var notif_wrap = $('.notif_wrapper');
var mention_wrap = $('.mentions_wrapper');
var input = $('input.message');
var usernameInput = $('input.username');
var user = [];

$(document).ready(function() {
  
/*var $locationText2 = $('#setting_location'); 

// Check for geolocation browser support and execute success method
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, {timeout: 10000});
}
else {
  alert('your browser doesn\'t support geolocation');
}
function geoLocationSuccess(pos) {
  // get user lat,long
  var myLat = pos.coords.latitude,
      myLng = pos.coords.longitude,
      loadingTimeout;
   
  
  var loading = function() {
    $locationText2.val('fetching...');
  }
  
  loadingTimeout = setTimeout(loading, 600);
  
  var request = $.get( "http://nominatim.openstreetmap.org/reverse?format=json&lat="+myLat+"&lon=" + myLng)
      .done(function(data) {
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
					loadingTimeout = null;
          $locationText2.val(data.address.city + ', ' + data.address.state);
          
        }
      }) 
      .fail(function() {
        // handle error
      });
};

function geoLocationError(error){
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}*/
  
  $('#switch-1').click(function(){
    if (this.checked) {
        $('.away_label span').html('ON');
 
    } else{
      $('.away_label span').html('OFF');
 
    }
});

  var modal = $('.modal__contents');
  
$( "body" ).on( "click", '.user_name' , function(e) {
  var username = user.join();
  console.log(username);
  showUserProfile(username);
});

$( "body" ).on( "click", '.user_img' , function(e) {
  var username = e.target.getAttribute('alt');
  showUserProfile(username);
});

function showUserProfile(username) {
    console.log(username)
    fb.child('users').child(username).once('value', function(snap) {
        var user = snap.val();
        if(user) {
            console.log(user)
            if(user.firstname) {
                $('.modal_username .username_text').text(user.firstname + ' ' + user.lastname);    
            } else {
                $('.modal_username .username_text').text("Anonymous"); 
            }
            
            if(user.description) {
                $('.modal_username .modal_description').text(user.description);
            } else {
                $('.modal_username .modal_description').text("This user has not set a description just yet. Let them know!"); 
            }
            if(user.awaymessage) {
                $('#awaymessage').text(user.awaymessage);
            } else {
                $('#awaymessage').text('I am currently away.');
            }
            if(user.location) {
                $('.modal_username .location_text').text(user.location);
            } else {
                $('.modal_username .location_text').text("Jupiter, Outer Space"); 
            }
            if(user.status != 'Away') {
                $('.semicircle small').css('display', 'none')
            } else {
                $('.semicircle small').css('display', 'block')
            }
            
            $('.modal_username .details_username').text('@' + user.name);
            $('.modal_image .profile_image').attr('src', user.image);
            $('.modal__contents .user_status_modal span').text(user.status);
            $( modal ).toggleClass('visible');
        } else {
            console.log('user not found!!!');
        }
    })
}

$( ".modal__close" ).on( "click", function() {
  $( modal ).toggleClass('visible');
});
  
  var settings_modal = $('.settings__contents');
  
$( "body" ).on( "click", '#settings' , function() {
$( settings_modal ).toggleClass('visible');
});

$( ".settings__close" ).on( "click", function() {
  $( settings_modal ).toggleClass('visible');
});
  
  var away_modal = $('.away__contents');
  
$( "body" ).on( "click", '#away_message' , function() {
$( away_modal ).toggleClass('visible');
$("#away_message_input").focus();
$("#away_message_input").select();
});

$( ".away__close" ).on( "click", function() {
  $( away_modal ).toggleClass('visible');
});
  
  $( ".save_away" ).on( "click", function() {
  $( away_modal ).toggleClass('visible');
});
  
  $( ".save_away" ).on( "click", function() {
    var username = $('#setting_username').val();
    var away_message = $('#away_message_input').val();
    userObj = {
        awayauto: 'OFF',
        awaymessage: away_message,
        status: "Away"
    }
    
    $(".save_away").css('opacity', '0');
    $(".back").css('opacity', '1');
    fb.child('users').child(username).update(userObj, function(err){
        if (err) console.log(err);
    });
  });
  
   $( ".back" ).on( "click", function() {
    var username = $('#setting_username').val();
    userObj = {
        awayauto: 'ON',
        awaymessage: "I am away right now.",
        status: "Online"
    }
    
    $(".save_away").css('opacity', '1');
    $(".back").css('opacity', '0');
      $( away_modal ).toggleClass('visible');
    fb.child('users').child(username).update(userObj, function(err){
        if (err) console.log(err);
    });
  });
  
  $( "#settings_btn" ).on( "click", function() {
    var username = $('#setting_username').val();
    var firstname = $('#setting_firstname').val();
    var lastname = $('#setting_lastname').val();
    var location = $('#setting_location').val();
    var description = $('#setting_description').val();
    var awayauto = $('.away_label span').html()
    userObj = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        location: location,
        description: description,
        awayauto: awayauto
    }
    fb.child('users').child(username).update(userObj, function(err){
        if (err) console.log(err);
    })
    $( settings_modal ).toggleClass('visible');
  });

    // setInterval(function() {

        // setTimeout(function() {

            users.orderByChild("status").on("child_added", function(snapshot) {
                // console.log(snapshot.key() + " is " + snapshot.val().status);

                var data_name = snapshot.key();
                //input.val(name);
                var status_bubble = '<span class="status"></span>';
                // console.log($("#status" + snapshot.key()))
                if (snapshot.val().status == "Online") {
                    // $(".test").html(data_name + snapshot.val().status + status_bubble);
                    $("#statusList" + snapshot.key()).css("background", "lime");
                    $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Online)');
                    $("#statusMention" + snapshot.key()).css("background", "lime");
                    $("#nameMention" + snapshot.key()).text(snapshot.key());
                    $(".statusMsg" + snapshot.key()).css("background", "lime");
                    $(".nameMsg" + snapshot.key()).text(snapshot.key());
                } else if (snapshot.val().status == "Away") {
                    // $(".test").html(data_name + snapshot.val().status + status_bubble);
                    $("#statusList" + snapshot.key()).css("background", "yellow");
                    $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Away)');
                    $("#statusMention" + snapshot.key()).css("background", "yellow");
                    $("#nameMention" + snapshot.key()).text(snapshot.key());
                    $(".statusMsg" + snapshot.key()).css("background", "yellow");
                    $(".nameMsg" + snapshot.key()).text(snapshot.key());
                    
                } else if (snapshot.val().status == undefined) {
                    // $(".test").html(data_name + 'Offline' + status_bubble);
                    $("#statusList" + snapshot.key()).css("background", "red");
                    $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Offline)');
                    $("#statusMention" + snapshot.key()).css("background", "red");
                    $("#nameMention" + snapshot.key()).text(snapshot.key());
                    $(".statusMsg" + snapshot.key()).css("background", "red");
                    $(".nameMsg" + snapshot.key()).text(snapshot.key()); 
                }
                users.child(snapshot.key()).orderByChild("status").on("child_changed", function(changesnap) {
                    //console.log(changesnap.key(), changesnap.val());
    
                    if (changesnap.key() == 'status' && changesnap.val() == "Online") {
                        // $(".test").html(data_name + snapshot.val().status + status_bubble);
                        $("#statusList" + snapshot.key()).css("background", "lime");
                        $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Online)');
                        $("#statusMention" + snapshot.key()).css("background", "lime");
                        $("#nameMention" + snapshot.key()).text(snapshot.key());
                        $(".statusMsg" + snapshot.key()).css("background", "lime");
                        $(".nameMsg" + snapshot.key()).text(snapshot.key());
                    } else if (changesnap.key() == 'status' && changesnap.val() == "Away") {
                        // $(".test").html(data_name + snapshot.val().status + status_bubble);         
                        $("#statusList" + snapshot.key()).css("background", "yellow");
                        $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Away)');
                        $("#statusMention" + snapshot.key()).css("background", "yellow");
                        $("#nameMention" + snapshot.key()).text(snapshot.key());
                        $(".statusMsg" + snapshot.key()).css("background", "yellow");
                        $(".nameMsg" + snapshot.key()).text(snapshot.key());
                    } else if (changesnap.key() == 'status' && changesnap.val() == undefined) {
                        // $(".test").html(data_name + 'Offline' + status_bubble);
                        $("#statusList" + snapshot.key()).css("background", "red");
                        $("#nameList" + snapshot.key()).text(snapshot.key() + ' (Offline)');
                        $("#statusMention" + snapshot.key()).css("background", "red");
                        $("#nameMention" + snapshot.key()).text(snapshot.key());
                        $(".statusMsg" + snapshot.key()).css("background", "red");
                        $(".nameMsg" + snapshot.key()).text(snapshot.key());
                    }
                });
                users.child(snapshot.key()).orderByChild("status").on("child_removed", function(removesnap) {
                    //console.log(changesnap.key(), changesnap.val());
    
                        $("#statusList" + snapshot.key()).css("background", "red");
                        $("#nameList" + snapshot.key()).text(snapshot.key() + '(Offline)');
                        $("#statusMention" + snapshot.key()).css("background", "red");
                        $("#nameMention" + snapshot.key()).text(snapshot.key());
                        $(".statusMsg" + snapshot.key()).css("background", "red");
                        $(".nameMsg" + snapshot.key()).text(snapshot.key());
                });
            });
        // }, 30);

    // }, 5000);

});

$(document).on('click', '.copy_mention', function(e) {
  var mentioned = $(this).text();
  var input_content = $('input.message').val();
    //e.preventDefault(); //for <a>
    $('.message').val(input_content + mentioned + ': ');
    $('.message').focus();
    $(".mentions_wrapper").fadeOut();
    $('.modal__contents').toggleClass('visible');
    console.log(mentioned + ' was mentioned');
    fb.child('mentions').child(mentioned).set('You were mentioned in a chat');
});

users.once("value", function(snapshot1) {
    var a = snapshot1.numChildren();

    if (a <= 0) {
        messages.remove();
    }

});

users.on('value', function(snapshot) {
  
  
    var count = 0;
    snapshot.forEach(function() {
        count++;
    });
    $('.user_list_header span').html('(' + count + ')');
  
  if (count == 1) {
      $('.users_online span').html(count + ' user online');  
    } else {
      $('.users_online span').html(count + ' users online');
    }
  
    
});


(function($) {
    $.sanitize = function(input) {
        var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
        replace(/<[\/\!]*?[^<>]*?>/gi, '').
        replace(/<style[^>]*?>.*?<\/style>/gi, '').
        replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        return output;
    };
})(jQuery);

$(input).keydown(isTyping);
var to;
function isTyping() {
    if (to) {
        clearTimeout(to);
        to = null;
    }
	fb.child('typing_info').set(user.join() + ' is typing . . .');
    to = setTimeout(stoppedTyping, 500);
}

function stoppedTyping() {
    to = null;
    fb.child('typing_info').remove();
}

fb.child('typing_info').on('value', function(snap){
	console.log('snap', snap.val());
	$('#is_typing').html(snap.val());
});

usernameInput.on('keyup', function(e) {
    if (e.keyCode === 13 && usernameInput.val().length > 0) {
        $(".user_wrapper").animate({
            scrollTop: $(".user_wrapper")[0].scrollHeight
        }, 1000);
        var getTxt = usernameInput.val();
        user.push(getTxt);
         var location_value = $("#setting_location").val();
  var location = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + getTxt);
                                location.update({
                                    location: location_value

                                });
        var logged_in_img = '<img src="" class="logged_in_img">';
        $('.user #name').html('Chatting as ' + getTxt);
        $('#setting_username').val(getTxt);
        $('.user #image').append('<span class="status" id="status' + getTxt + '"></span><span>' + logged_in_img + '</span>');
        $('#hey_user').html('Hey ' + getTxt + ',' + ' ');

        var user_status = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + getTxt + '/status');


        user_status.on("value", function(snapshot) {
            var data = snapshot.val();

            $('#name').html(getTxt + ' ' + '(' + data + ')');
            var data2 = $('#name').html();
            if (data == null) {
                $('#name').html(getTxt + ' (Offline)');
                $('#status' + getTxt).css('background', 'red');
            }
            if (data == "Away") {
                $('#name').html(getTxt + ' (Away)');
                $('#status' + getTxt).css('background', 'yellow');
            }
            if (data == "Online") {
                $('#name').html(getTxt + ' (Online)');
                $('#status' + getTxt).css('background', 'lime');
            }
            //user.push(guest + ' ' + '(' + data + ')');
        });

        $(document).ready(function() {

            function go() {

                var userData = {
                    name: getTxt,
                    status: 'Offline'
                };

                tryCreateUser(getTxt, userData);
            }

            var USERS_LOCATION = 'https://glowing-heat-9106.firebaseio.com/users';

            function userCreated(getTxt, success) {
                if (!success) {
                    $('.error2').html("This username already exists!").fadeIn().fadeOut(3000);
                  setTimeout(function(){
                    usernameInput.val('');
                  },1000);
                } else {
                    $('.initModal').css('display', 'none');
                    $('.avatarModal').css('display', 'inline-block');
                    usernameInput.val('');

                }
            }

            // Tries to set /users/<userId> to the specified data, but only
            // if there's no data there already.
            function tryCreateUser(getTxt, userData) {
                var usersRef = new Firebase(USERS_LOCATION);
                usersRef.child(getTxt).transaction(function(currentUserData) {
                    if (currentUserData === null)
                        return userData;
                }, function(error, committed) {
                    console.log('committed', (error ? error : true))
                    userCreated(getTxt, (error ? error : true));
                });
            }
            go();

           

        });

    }
    if (e.keyCode === 13 && usernameInput.val().length < 1) {
        $('.error').html("You must enter a username!").fadeIn().fadeOut(3000);

    }

}); 

$(".avatar_submit").click(function() {
    $('.avatar_Modal').css('display', 'none');
    $('.wrapper').css('display', 'block');
    $('.user').fadeIn();
    $(".wrapper").animate({
        scrollTop: $(".wrapper")[0].scrollHeight
    }, 1000);
    var curUsername = user.join();
    $('.message').attr('placeholder', 'Hey ' + curUsername + '. . .');
   
}); 



function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$("#guest").click(function() {
    $(".user_wrapper").animate({
        scrollTop: $(".user_wrapper")[0].scrollHeight
    }, 1000);

    function randString(x) {
        var s = "";
        while (s.length < x && x > 0) {
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return s;
    }
    var curUsername = 'Guest-' + randString(5);
    var user_status = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername + '/status');

    var user_image = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername + '/image');

    var user_name = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername + '/name');

    user_status.on("value", function(snapshot) {
        var data = snapshot.val();

        $('#name').html(curUsername + ' ' + '(' + data + ')');
        var data2 = $('#name').html();
        if (data == null) {
            $('#name').html(curUsername + ' (Offline)');
            $('#status' + curUsername).css('background', 'red');
        }
        if (data == "Away") {
            $('#name').html(curUsername + ' (Away)');
            $('#status' + curUsername).css('background', 'yellow');
        }
        if (data == "Online") {
            $('#name').html(curUsername + ' (Online)');
            $('#status' + curUsername).css('background', 'lime');
        }
        //user.push(guest + ' ' + '(' + data + ')');
    });
  


    $(document).ready(function() {


        function go() {
          var userData = {
          name: curUsername,
          status: 'Offline'
};
            tryCreateUser(curUsername, userData);
        }

        var USERS_LOCATION = 'https://glowing-heat-9106.firebaseio.com/users';

        function userCreated(curUsername, success) {
            if (!success) {
                $('.error').html("This username already exists!").fadeIn().fadeOut(3000);
            } else {
                var guest = curUsername;
                user.push(guest);
                
                var location_value = $("#setting_location").val();
                var location = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);
                                location.update({
                                    location: location_value

                                });
              
                $('#setting_username').val(guest);
              
                usernameInput.val('');
                $('.initModal').css('display', 'none');
                $('.avatarModal').css('display', 'inline-block');
                var curUsername = user.join();
                var logged_in_img = '<img src="" class="logged_in_img">';
                //$('.user #name').html('Online');
                $('.user #image').append('<span class="status" id="status' + curUsername + '"></span><span>' + logged_in_img + '</span>');


                $('#hey_user').html('Hey ' + curUsername + ',' + ' ');

            }

        }

        // Tries to set /users/<userId> to the specified data, but only
        // if there's no data there already.
        function tryCreateUser(curUsername, userData) {
            var usersRef = new Firebase(USERS_LOCATION);
            usersRef.child(curUsername).transaction(function(currentUserData) {
                if (currentUserData === null)
                    return userData;
            }, function(error, committed) {
                userCreated(curUsername, committed);
            });
        }
        go();

        $(document).ready(function() {
          
          

            idleTimer = null;
            idleState = false;
            idleWait = 120000;

            (function($) {

                $(document).ready(function() {

                    $('*').bind('mousemove keydown scroll', function() {

                        clearTimeout(idleTimer);

                        if (idleState == true) {

                            // Reactivated event
                            //$('.status').css('background', 'lime');

                            var curUsername = user.join();

                            var online = 'Online';
                            var status = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);
                            status.update({
                                status: online

                            });

                        }

                        idleState = false;
                        
                        var awayauto = $('.away_label span').html()
                        
                        if (awayauto == 'ON') {

                            idleTimer = setTimeout(function() {
    
                                // Idle Event
                                //$('.status').css('background', 'yellow');
                                var curUsername = user.join();
                                var away = 'Away';
                                var status = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);
                                status.update({
                                    status: away
    
                                });
    
                                idleState = true;
                            }, idleWait);
                        }
                    });

                    $("body").trigger("mousemove");



                });
            })(jQuery)
            
            fb.child('mentions').child(curUsername).on('value', function(snap) {
                notify(snap.val(), '')
                fb.child('mentions').child(curUsername).remove();
            })

            var online_users = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);
            var mention_users = new Firebase('https://glowing-heat-9106.firebaseio.com/mentions/' + curUsername);
            online_users.onDisconnect().remove();
            mention_users.onDisconnect().remove();

        });

    });

});

function notify(text, image) {
    notif_wrap.append('<li class="animated bounceInRight"><b><img class="notif_img" src="' + (image ? $.sanitize(image) : '') + '"></b><span>' + $.sanitize(text) + '</span></li>');

    $(".notif_wrapper").fadeIn(1500);

    setTimeout(function() {
        $(".notif_wrapper").fadeOut(2000);
    }, 3000);
}

$("#nope").click(function() {
    var place_holder = 'http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg';

    var svg = 'https://dl.dropboxusercontent.com/s/bnjpyba893qh6kg/pattern.svg';
    $('html, body').css('background', 'linear-gradient(135deg, rgba(198,33,69,0.75) 0%,rgba(198,117,45,0.75) 100%), url(' + svg + ')' + ', url(' + place_holder + ') fixed');
    $('html, body').css('background-size', 'cover');
    $('.blah').attr('src', place_holder);
    $('.profile_image').attr('src', place_holder);
    $('.logged_in_img').attr('src', place_holder);
    $('.avatar_Modal').css('display', 'none');
    $('.wrapper').css('display', 'block');
    $('.user').fadeIn();
    $(".wrapper").scrollTop($(".wrapper")[0].scrollHeight);
    var curUsername = user.join();
    var status = 'Online';
    $('.message').attr('placeholder', 'Hey ' + curUsername + '. . .');

    setTimeout(function() {
        $(".avatar_submit").click();
        var getNotification = curUsername + ' has joined the room';
        var getImage = $('.logged_in_img').attr('src');
        notifications.push({
            notification: getNotification,
            image: getImage
        });

        var image_location = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);
      
      var location_value = $("#setting_location").val();

        image_location.set({
            image: getImage,
            name: curUsername,
            status: status,
            location: location_value
        });

    }, 3000);

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.blah').attr('src', e.target.result);
            $('.logged_in_img').attr('src', e.target.result);
          $('#settings_image').attr('src', e.target.result);
          $('.profile_image').attr('src', e.target.result);

        } 

        reader.readAsDataURL(input.files[0]);
    }
}

$("input.avatar_img").change(function() {
    readURL(this);
    setTimeout(function() {
        $(".avatar_submit").click();
        var curUsername = user.join();
        var status = 'Online';
        var getNotification = curUsername + ' has joined the room';
        var getImage = $('.logged_in_img').attr('src');
        notifications.push({
            notification: getNotification,
            image: getImage
        });

        var svg = 'https://dl.dropboxusercontent.com/s/bnjpyba893qh6kg/pattern.svg';
        $('html, body').css('background', 'linear-gradient(135deg, rgba(198,33,69,0.75) 0%,rgba(198,117,45,0.75) 100%), url(' + svg + ')' + ', url(' + getImage + ') fixed');
        $('html, body').css('background-size', 'cover');
        var location_value = $("#setting_location").val();
        var image_location = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername);

        image_location.update({
            name: curUsername,
            status: status,
            image: getImage,
            location: location_value
        });



    }, 3000);

});

input.on('keyup', function(e) {
    var curUsername = user.join();
    var user_name = new Firebase('https://glowing-heat-9106.firebaseio.com/users/');

    if (input.val().indexOf('@') >= 0) {
        $(".mentions_wrapper").show();
    } else {
        $(".mentions_wrapper").fadeOut();
    }

    if (e.keyCode === 13 && input.val().length > 0) {
        $(".wrapper").scrollTop($(".wrapper")[0].scrollHeight);
        $(".mentions_wrapper").hide();
        var getTxt = input.val();
        var d = new Date();
        var n = d.toISOString();
        //var n = d.toUTCString();
      
      
        var user_image = $('.logged_in_img').attr('src');

        var messages_location = new Firebase('https://glowing-heat-9106.firebaseio.com/users/' + curUsername + '/messages');
 

        messages_location.push({
            message: getTxt,
            time: n
        });

        messages.push({
            message: getTxt,
            time: n,
            user: curUsername,
            image: user_image
        });
        
        if (['\giphy'].some(function(v) {
            return getTxt.toLowerCase().indexOf(v) > 0;
          })) {
          var query = getTxt.replace('\\giphy ', '').split(' ').join('+');
          getGiphy(query);
        }
      
        input.val('');
        
        function getGiphy(q) {
            var url = 'http://api.giphy.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=' + q;
        
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
              var json = JSON.parse(xhr.response);
              var gif = json.data.images.fixed_height.url;
              console.log(gif);
              publishGif(gif);
            };
            xhr.onerror = function() {
              console.log(e);
            };
            xhr.send();
        }
        
        function publishGif(gif) {
           messages_location.push({
                gif: gif,
                time: n
            });
    
            messages.push({
                gif: gif,
                time: n,
                user: curUsername,
                image: user_image
            });
        }

    }
});

$(document).ready(function() {

    users.on("child_added", function(snap5) {

        user_list.append('<li class="new username animated bounceInRight">' + '<span class="status" id="statusList' + snap5.val().name + '"></span><img class="list_img" src=""><span class="hidden user_name" id="nameList' + snap5.val().name + '">' + (snap5.val().name ? $.sanitize(snap5.val().name) : '') + '</span></li>');

        mention_wrap.append('<li class="fadeInDown">' + '<span class="status" id="statusMention' + snap5.val().name + '"></span><img class="list_img" src=""><span class="user_name copy_mention" id="nameMention' + snap5.val().name + '">' + (snap5.val().name ? $.sanitize(snap5.val().name) : '') + '</span></li>');

    });





    users.on('child_removed', function(snap4) {
        var value = snap4.val().name ? $.sanitize(snap4.val().name) : '';

        setTimeout(function() {

            $('.user_wrapper').find('li:contains("' + value + '")').remove();

            $('.mentions_wrapper').find('li:contains("' + value + '")').remove();

        }, 2000);
        var user_image = snap4.val().image ? $.sanitize(snap4.val().image) : '';
        
        var off_notification = value + ' has left the room'
        notifications.push({
            notification: off_notification,
            image: user_image
        });

        fb.child('notifications').remove();
        notif_wrap.append('<li class="animated bounceInRight"><b><img class="notif_img" src="' + (snap4.val().image ? $.sanitize(snap4.val().image) : '') + '"></b><span>' + $.sanitize(snap4.val().notification) + '</span></li>');

        $(".notif_wrapper").fadeIn(1500);

        setTimeout(function() {
            $(".notif_wrapper").fadeOut(2000);
        }, 3000);

    });
  
  messages.on("child_removed", function(snap9) {
    var value = $.sanitize(snap9.val().user);
    $('.wrapper').find('li:contains("' + value + '")').remove();
  });

    messages.on("child_added", function(snap) {

        $('.message').attr('placeholder', 'Start Typing...');

        if(snap.val().message) {
            wrap.append('<li class="new animated bounceInLeft">' + '<span class="hidden user_name nameMsg' + snap.val().user + '">' + $.sanitize(snap.val().user) + '</span>' + '<div id="message_text" class="last_message_animation">' + $.sanitize(snap.val().message) + '<b class="like">0 Likes</b><span class="status statusMsg' + snap.val().user + '" style="background: red;"></span><img class="user_img" alt="' + snap.val().user + '" src="' + $.sanitize(snap.val().image) + '"></div>' + '<small><time class="timeago"></time></small>' + '</li>');
        } else {
            wrap.append('<li class="new animated bounceInLeft">' + '<span class="hidden user_name nameMsg' + snap.val().user + '">' + $.sanitize(snap.val().user) + '</span>' + '<div id="message_text" class="last_message_animation">' + '<img style="width:100%;border-radius:10px;" src="' + snap.val().gif + '">' + '<b class="like">0 Likes</b><span class="status statusMsg' + snap.val().user + '" style="background: red;"></span><img class="user_img" alt="' + snap.val().user + '" src="' + $.sanitize(snap.val().image) + '"></div>' + '<small><time class="timeago"></time></small>' + '</li>');
        }
        getUserStatus(snap.val().user);
      
      $("time.timeago").attr("datetime", snap.val().time);
      $("time.timeago").timeago();

        sendMessNotification = function() {
            var getTxt = $.sanitize(snap.val().message)
            var user_image = $.sanitize(snap.val().image);
            var user = $.sanitize(snap.val().user);
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'http://www.smokeiva.com/app/webroot/audio/Facebook Pop.mp3');
            audioElement.play();

            Notification.requestPermission(function(permission) {

                // Notification granted
                if (permission === 'granted') {
                    var options = {
                        body: getTxt,
                        icon: user_image,
                        // onclick : trigger something if user clicks on notification,
                        // onerror : If something goes wrong with the notification
                        // silent : Can silence browser-default notification noises like DING or BLOOP or BUZZ,
                        title: 'New Message'
                    }
                    var notification = new Notification(user, options);

                }
                setTimeout(function() {
                    notification.close();
                }, 8000);

            });

        }

        sendMessNotification();

        $(".wrapper").scrollTop($(".wrapper")[0].scrollHeight);

    });
});



notifications.on("child_added", function(snap2) {

    sendNotification = function() {

        var audioElement2 = document.createElement('audio');
        audioElement2.setAttribute('src', 'http://www.smokeiva.com/app/webroot/audio/Tweetdeck Ping.mp3');
        audioElement2.play();

        Notification.requestPermission(function(permission) {

            // Notification granted
            if (permission === 'granted') {
                var options3 = {
                    body: $.sanitize(snap2.val().notification),
                    icon: $.sanitize(snap2.val().image),
                    // onclick : trigger something if user clicks on notification,
                    // onerror : If something goes wrong with the notification
                    // silent : Can silence browser-default notification noises like DING or BLOOP or BUZZ,
                    title: 'New User'
                }
                var notification3 = new Notification('New User!', options3);

            }
            setTimeout(function() {
                notification3.close();
            }, 8000);

        });

    }

    sendNotification();
    fb.child('notifications').remove();
    notif_wrap.append('<li class="animated bounceInRight"><b><img class="notif_img" src="' + $.sanitize(snap2.val().image) + '"></b><span>' + $.sanitize(snap2.val().notification) + '</span></li>');

    $(".notif_wrapper").fadeIn(1500);

    setTimeout(function() {
        $(".notif_wrapper").fadeOut(2000);

        setTimeout(function() {
            $(".notif_wrapper").html('');

        }, 1000);

    }, 3000);

    $(".notif_wrapper").animate({
        scrollTop: $(document).height()
    }, 100);
});

function getUserStatus(username) {
    users.child(username).once("value", function(snap) {
        console.log(snap.key(), snap.val()); 

        if (snap.val() && snap.val().status == "Online") {
            $(".statusMsg" + snap.key()).css("background", "lime");
            $(".nameMsg" + snap.key()).text(snap.key());
        } else if (snap.val() && snap.val().status == "Away") {
            $(".statusMsg" + snap.key()).css("background", "yellow");
            $(".nameMsg" + snap.key()).text(snap.key());
        } else if (snap.val() && snap.val().status == undefined) {
            $(".statusMsg" + snap.key()).css("background", "red");
            $(".nameMsg" + snap.key()).text(snap.key());
        }
    });
}

$("#image, .close").click(function() {
    $(".user_wrapper").toggleClass("hidden", 500, "easeOutSine");
});
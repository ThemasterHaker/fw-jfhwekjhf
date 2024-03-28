const c = document.getElementById('c');
var chars;
var password;
var username;
var email = ["gmail.com", "outlook.com", "live.com", "mail.com"]
var w = ["cat", "fish", "dog", "horse", "pony", "dragon", "shooter", "legend", "epic", "sniper", "gaming", "tv", "cow", "random", "minecraft", "pro", "hacker", "amazing", "youtube"];
chars = " ! \" # $ % &amp; ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~";
chars = chars.split(/ +/);
chars.push(' ');

(function hack() {
	password = [];
  username = [];
	for (i = 0; i <= rand(1,2); i++) { 
    username.push(w[rand(0,w.length-1)])
 }
 username = username.join('');
	for (i = 0; i <= 15; i++) { 
    password.push(chars[rand(0,chars.length-1)])
 }
  log("<b>username:</b> " + username + "@" + email[rand(0,email.length-1)]);
 	log("<b>password:</b> " + password.join(''));
})();

var t = document.getElementById('t');
setInterval(function(){

  t.innerHTML = `<br /><b>C:\\Users\\admin > cd C:\\</br>`;

setTimeout(function() {
  t.innerHTML = `<br /><b>C:\\Users\\admin > cd C:\\_</br>`;
},1000)
                      },800)

function log(arg) {
	c.innerHTML += `<br /><b style="color: red;">SUCESSFUL > </b>${arg}`;
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
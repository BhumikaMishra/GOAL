 //TRANISITION INFO
 var counter=1;
 setInterval(function(){
     document.getElementById('radio' +counter).checked =true;
     counter++;
     if (counter>4){
         counter=1;
     }
 }, 5000);

 
 //LINK COLOR
 let link=document.querySelector(".link-color");
 link.onmouseover= () => {
     link.style.color="yellow";
 }
 link.onmouseout= () => {
     link.style.color="white";
 }

 //Reveal boxes on scroll
 window.addEventListener('scroll',reveal);

 function reveal(){
     var reveals =document.querySelectorAll('.reveal-box');

     for (var i=0; i<reveals.length;i++){
         var windowheight=window.innerHeight;
         var revealtop=reveals[i].getBoundingClientRect().top;
         var revealpoint=150;

         if(revealtop < windowheight - revealpoint){
             reveals[i].classList.add('active');
         }

         else{
             reveals[i].classList.remove('active');
         }
     }
 }

 //Login Sign Up
 window.addEventListener("load", function() {
 setTimeout(function() {
     document.querySelector(".popup").style.display = "block";
 }, 1000);
 });

 document.querySelector('#close').addEventListener('click',function(){
     document.querySelector(".popup").style.display="none";
 });





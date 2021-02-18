// Jquery library will not be included in Bootstrap 5
// $(document).ready(function(){
//     $('.header').height($(window).height());
// })
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

function toggleSidebar() {
  if (document.getElementById("mediaNavToggler").className == "fas fa-bars") {
    document.getElementById("mySidebar").style.width = "auto";
    var width = document.getElementById("mySidebar").offsetWidth;
    document.getElementById("navBar").style.marginLeft = width.toString()+"px";
    document.getElementById("mediaNavToggler").className = "fas fa-times";
  }
  else {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("navBar").style.marginLeft = "0";
    document.getElementById("mediaNavToggler").className = "fas fa-bars";
  }
}

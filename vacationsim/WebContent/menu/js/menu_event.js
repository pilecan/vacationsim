var angleStart = -360;
var isButton =false;
var isFirstTime = true;

function clickNewGallery() {
  document.body.style.backgroundColor = "#f3f3f3";
  document.body.style.backgroundImage = "url(./images/background.jpg)";

  document.body.style.transition = "all 3s";
  
  $("#button-sim").click();
  $("#button-sim").click();

  wait(100);

  $("#menu_items").hide();

 //document.getElementById('form-box').setAttribute("form-box", "galleries.html?gallery=" + element.title)
 
 //callGoogleMaps();
  
 document.getElementById("form-box").click();
}

/****************************************************************** */

function clickItemMenu(element) {
  console.log("values = " + element.id + " " + element.name);
  document.body.style.backgroundColor = "#f3f3f3";
  
 /* var image = element.title;
  image = image.toLowerCase().replace(" ","");
  console.log("values = " + element.id + " " + image);
*/
 
  var menuItem = element.title.replace(/ /g, '')
  
  selectBackground(menuItem);
  document.body.style.transition = "all 3s";
  
  $("#button-sim").click();
  $("#button-sim").click();

  wait(100);

  $("#menu_items").hide();
  $("#btn-prev").hide();
  $("#btn-next").hide();

newGalleries = lastGalleries != currentGalleries;
 

 // console.log("values = " + element.id + " " + image);

 document.getElementById("gallery_name").innerHTML=jsUcfirst(currentGalleries)+"-"+element.name;

 document.getElementById('manual-galleries').setAttribute("data-popup", "./galleries/gallery.html?gallery=" + element.title);
 document.getElementById("manual-galleries").click();
}
// jquery rotate animation
/****************************************************************** */
function rotate(li, d) {

  $({
    d: angleStart
  }).animate({
    d: d
  }, {
    step: function (now) {
      $(li)
        .css({
          transform: 'rotate(' + now + 'deg)'
        })
        .find('label')
        .css({
          transform: 'rotate(' + (-now) + 'deg)'
        });
    },
    duration: 0
  });
}

// show / hide the options
/****************************************************************** */
function toggleOptions(s) {

  $(s).toggleClass('open');
  var li = $(s).find('li');
  var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
  for (var i = 0; i < li.length; i++) {
    if (window.CP.shouldStopExecution(1)) {
      break;
    }
    var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
    $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
  }
  window.CP.exitedLoop(1);

}

$('.selector button').click(function (e) {
  toggleOptions($(this).parent());


  if (!isButton) {
  /*   if (!isFirstTime){
      toggleOptions($(this).parent());
    }
 */  

}
 // console.log("button")
  isButton =true;
  isFirstTime = false;

});

$('input:checkbox').click(function (e) {
  toggleOptions('.selector');
  //console.log("checkbox")
  isButton =false;
});
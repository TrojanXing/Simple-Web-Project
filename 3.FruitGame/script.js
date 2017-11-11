var playing = false;
var score = 0;
var lifeLeft = 3;
var action;
var img = ['f1', 'f2', 'f3', 'f4',
           'f5', 'f6', 'f7', 'f8'];
var height = $("#gamePanel").height();

$(function() {

  //  click start
  $("#start").click(function() {
    // if playing reload
    if(playing) {
      location.reload();
    } else {
      // if not playing

      //initialize game
      playing = true;
      score = 0;
      lifeLeft = 3;
      // change button to restart
      $("#gameover").hide();
      $("#start").text('Reset Game');
      // show life box
      $("#life")
        .show()
        .addHeart();

      //1 create random fruit
      $("#fruit")
        .show()
        .startAction()
        .mouseover(function() {
          score++;
          $("#scoreValue").text(score);
          clearInterval(action);
          $(this).startAction();
          $("fruit").hide('explode', 5000);
        });
    }
  });
    // slice fruit
      // increase score
      // explode fruit
});

$.fn.addHeart = function() {
  // console.log(this);
  for(var i = 0; i < lifeLeft; i++) {
    this.append('<img src="img/heart.png" class="heart">');
  }
};

$.fn.chooseFruit = function() {
  this.attr('src', 'img/' + img[Math.floor(Math.random() * 8)] + '.png');
  return this;
};

$.fn.startAction = function() {
  var elem = this;
  var step = Math.ceil(Math.random() * 4);
  elem
    .chooseFruit()
    .css({
      'left' : Math.floor(Math.random()*620),
      'top': -80
    });

  action = setInterval(function() {
    elem.css('top', elem.position().top + step);
    if(elem.position().top >= 400) {
      lifeLeft--;
      $("#life").children().last().remove();
      if(lifeLeft === 0) {
        gameover();
      } else {
        clearInterval(action);
        elem.startAction();
      }

    }
  }, 10);
  return elem;
};

function gameover() {
  playing = false;
  clearInterval(action)
  $("#start").text('Start game');
  $("#scoreVal").text(score);
  $("#gameover").show();
  $("#life").hide();
}
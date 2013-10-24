$(function() {
    "use strict";

    var selectors = {
        timeLine: $('.time_line'),
        play: $('#playIt'),
        pause: $('#pause')
    }

    var myPlayer = document.getElementById('video1'),


    var editor = new VideoEditor(myPlayer);

    selectors.play.bind("click", function() {
        myPlayer.play();
        myPlayer.currentTime = 15;
    });

    selectors.timeLine.bind("click", function(event) {
        var newMousePos = event.clientX,
            widthTimeLine = $(this).width();



        console.log(event.clientX, myPlayer.duration);

    });

    selectors.pause.bind("click", function() {
        myPlayer.pause();
    });

    myPlayer.addEventListener("durationchange", function(event) {

        console.log(this.currentTime);
    });

});

var VideoEditor = function(plaer) {
    var self = this;

    var myPlayer = plaer,
        _WIDTH = myPlayer.width,
        _HEIGHT = myPlayer.height;

    self.updateTimeLine = function() {

    };

}
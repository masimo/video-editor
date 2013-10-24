$(function() {
    "use strict";

    var selectors = {
        timeLine: $('.time_line'),
        play: $('#playIt'),
        pause: $('#pause'),
        nextClip: $('#nextClip'),
        progressBar: $('.progress_bar')
    }
    var resorces = {
        remote: 'http://stream.flowplayer.org/bauhaus/624x260.mp4',
        local: '../media/video/oceans-clip.mp4'
    }

    var myPlayer = document.getElementById('video1'),
        timeLine = null;

    myPlayer.volume = 0.1;


    var editor = new VideoEditor(myPlayer);

    selectors.play.bind("click", function() {

        myPlayer.play();

        timeLine = setInterval(function() {
            selectors.progressBar.html(Math.floor(myPlayer.currentTime));
        }, 100);

    });

    selectors.nextClip.bind('click', function() {

        console.log(myPlayer.currentTime);

        if (myPlayer.currentTime >= 5) {
            myPlayer.src = resorces.local;
            myPlayer.play();
            console.log(myPlayer.currentTime);

            timeLine = setInterval(function() {
                selectors.progressBar.html(parseInt(myPlayer.currentTime));
            }, 100);
        };
    });

    selectors.timeLine.bind("click", function(event) {
        var newMousePos = event.clientX,
            widthTimeLine = $(this).width();



        console.log(event.clientX, myPlayer.duration);

    });

    selectors.pause.bind("click", function() {
        myPlayer.pause();
        clearInterval(timeLine);
    });

    myPlayer.addEventListener("ratechange", function(event) {

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
    self.updateProgress = function() {
        
    };

}
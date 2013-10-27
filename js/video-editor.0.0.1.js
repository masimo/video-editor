$(function() {
    "use strict";

    //Selectors for interface
    var selectors = {
        timeLine: $('.time_line'),
        play: $('#playIt'),
        pause: $('#pause'),
        progressBar: $('.progress_bar'),
        fileUpload: $('.track_toollbar .file_upload')
    }

    var timeLineInterval = null;

    var playTime = {
        tracks: [],
        progress: 0,
        duration: 0
    }

    var TimeLine;

    selectors.play.bind("click", function() {

        var isPlaying = false;

        /*check all tracks
         * if they is should be playing right now and play
         */
        everyTrack.call(playTime.tracks, function(value) {

            if (value.defParams.isPlaying) {

                var src = value.player.src;

                value.player.src = src + '#t=' + '5,10';

                console.log(value.player.src);

                value.player.play();

                //set flag
                isPlaying = true;
            };
        });

        if (isPlaying) {
            timeLineInterval = setInterval(updateTimeLine, 100);
        };
    });

    //File upload
    selectors.fileUpload.bind('change', function(event) {

        //get file name from input[file]
        var fileName = $(this).val().split('/').pop().split('\\').pop();

        //create link to our local file and new id for video element
        var sorce = event.target.defaultValue + '' + fileName,
            _id = setNewId();

        console.time('load time ');

        /*Create new constructor with linked 
         * sorce file and oper properties add to it object with desired properties
         */

        var newPlayer = new VideoEditor({
            id: _id,
            src: sorce,
            width: 800,
            height: 450,
            volume: 0.2
        })

        //We need to know if this track can play
        newPlayer.player.addEventListener("canplay", function(event) {

            newPlayer.defParams.startPlaying = playTime.duration;

            playTime.duration += newPlayer.getDuration();

            newPlayer.defParams.stopPlaying = playTime.duration;

            playTime.tracks.push(newPlayer);


            console.timeEnd('load time ');
        });

    });


    selectors.timeLine.bind("click", function(event) {
        var newMousePos = event.clientX,
            widthTimeLine = $(this).width();

        var ratio = newMousePos * 100 / widthTimeLine;

        selectors.progressBar.css({
            left: ratio + '%'
        });

        ratio * playTime.duration / 100;
        console.log(event.clientX);

    });

    selectors.pause.bind("click", function() {

        everyTrack.call(playTime.tracks, function(value) {

            if (value.defParams.isPlaying) {

                value.player.pause();
            };
        });

        clearInterval(timeLineInterval);
    });

    //creates new unique id for video element

    function setNewId() {
        var _id = Math.random().toString(36).substring(2);

        //If id already exist then try another id
        if (document.getElementById(_id)) {
            arguments.callee();
        };

        return _id;
    }


    function updateTimeLine() {

        var progress = null;

        everyTrack.call(playTime.tracks, function(track) {

          /*  //check if this track have right time limits to play
            if (track.defParams.startPlaying <= playTime.progress &&
                track.defParams.stopPlaying >= playTime.progress) {

                if (progress === null) {
                    progress = track.player.currentTime;
                };

                //update flag, it should be play
                track.defParams.isPlaying = true;
            } else {

                //it should be stop
                stopPlaying(track);

            };*/
        });

        if (progress !== null) {
            //update current time of progress bar
            updateProgressBar(progress);
        };

    }

    function updateProgressBar(progress) {


        var ratio = progress * 100 / playTime.duration;

        console.log(progress, playTime.duration);

        selectors.progressBar.css({
            left: ratio + '%'
        });


        playTime.progress = progress;

        /*selectors.progressBar.html(parseInt(playTime.progress));*/

    }

    function stopPlaying(track) {
        track.player.pause();
        track.defParams.isPlaying = false;

        //Check if this is only one track in editor if true then stop playing
        if (playTime.tracks.length === 1) {
            clearInterval(timeLineInterval);
        };
    }

    function everyTrack(callback) {

        /*loop throung all elements and call back to caller
         * (this) is the parameter that we call
         */
        $(this).each(function() {
            callback(this);
        });
    }



    var PlayStopVideo = function(player, timeLeft) {
        
        var self = this;

        self.playVideo = function() {
            player.play();
            delete self.timeoutID;
        };
        self.setup = function() {

            self.timeoutID = window.setTimeout(function() {
                self.playVideo();
            }, 1000 * timeLeft);
        };
        self.stop = function() {
            if (typeof self.timeoutID === "number") {
                player.pause();
                window.clearTimeout(self.timeoutID);
                delete self.timeoutID;
            }
        };

    };
});
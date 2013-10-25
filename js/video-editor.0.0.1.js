$(function() {
    "use strict";

    //Selectors for interface
    var selectors = {
        timeLine: $('.time_line'),
        play: $('#playIt'),
        pause: $('#pause'),
        nextClip: $('#nextClip'),
        progressBar: $('.progress_bar'),
        fileUpload: $('#fileUpload')
    }
    var resorces = {
        remote: 'http://stream.flowplayer.org/bauhaus/624x260.mp4',
        local: './media/video/oceans-clip.mp4'
    }

    var timeLineInterval = null;

    var playTime = {
        tracks: [],
        progress: 0,
        duration: 0
    }


    selectors.play.bind("click", function() {

        var isPlaying = false;

        /*check all tracks
         * if they is should be playing right now and play
         */
        everyTrack.call(playTime.tracks, function(value) {

            if (value.defParams.isPlaying) {

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

        //create link to our local file
        var sorce = event.target.defaultValue + '' + fileName,
            _id = setId();

        console.time('load time ');

        /*Create new constructor with linked 
         * sorce file and oper properties add it object with desired properties
         */

        var newPlayer = new VideoEditor({
            id: _id,
            src: sorce,
            width: 800,
            height: 450,
            volume: 0
        })

        //We need to know if this track can play
        newPlayer.player.addEventListener("canplay", function(event) {

            newPlayer.defParams.startPlaying = playTime.duration;

            playTime.duration += newPlayer.getDuration();

            newPlayer.defParams.stopPlaying = playTime.duration;

            playTime.tracks.push(newPlayer);
            console.log(playTime.duration);

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

    function setId() {
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

            //check if this track have right time limits to play
            if (track.defParams.startPlaying <= playTime.progress &&
                track.defParams.stopPlaying >= playTime.progress) {

                if (progress === null) {
                    progress = track.player.currentTime;
                };

                //it should be play
                track.defParams.isPlaying = true;
            } else {

                //it should be stop
                stopPlaying(track);

            };
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
});
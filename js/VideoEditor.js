var VideoEditor = function(playerInstant) {
    'use strict';

    var self = this;

    //Default parameters
    this.defParams = {
        isPlaying: true,
        trackName: 'No name',
        effect: '',
        startPlaying: 0,
        stopPlaying: 0,
        opacity: 0
    };

    //create new video element

    this.player = document.createElement('Video');



    //we need to set properties for player
    $.extend(true, this.player, playerInstant);

    //insert new element in interface
    document.getElementById('videoWrap').appendChild(this.player);


}
VideoEditor.prototype.getDuration = function() {

    return this.player.duration;
}



var TimeLine = {
    Track: function(track) {

        var _tracks = [];
        var video = document.getElementById('video');

        video.src = track;

        this.tracks.push(video);

        Object.defineProperties(this, {
            "offset": {
                "get": function() {
                    return video.offset();
                },
                "set": function(val) {
                    video.offset = val;
                }
            },
            "duration": {
                "get": function() {
                    return video.duration();
                },
                "set": function(val) {
                    video.duration = val;
                }
            }
        });

    },

    set add(track) {
        this._tracks.push(track);
    },

    set remove(track) {
        var index = this.tracks.indexOf(track);
        this._tracks.splice(index, 1);
    },
    get tracks() {
        return this.Track._tracks;
    },

    get position() {
        return this._position;
    },
    set position(val) {
        this._position = val;
    },
    get volume() {
        return this._position;
    },
    set volume(val) {
        this._position = val;
    }
};

/*TimeLine { 
    Track(source : File) { 
        get offset() : Number, 
        set offset(timeInSeconds : Number), 
         
        get duration() : Number, 
        set duration(timeInSeconds : Number) 
    }, 
 
    get tracks() : Track[], 
    Track add(track : Track), 
    Track remove(track : Track), 
     
    get position() : Number, 
    set position(timeInSeconds : Number), 
     
    play(), 
    pause(), 
     
    get volume(), 
    set volume(level : Number 
)
}*/

function Field(val) {
    this.value = val;
}

Field.prototype = {

    get value() {
        return this._value;
    },
    set value(val) {
        this._value = val;
    }
};

var Field = new Field(12);



var o = {
    track: [{
        url: './media/oceans-clip1.mp4',
        offset: 5,
        duration: 5
    }, {
        url: './media/oceans-clip2.mp4',
        offset: 10,
        duration: 5
    }],

    playThis: function() {
        var self = this;
        player = document.getElementById('video');

        for (var i = self.track.length - 1; i >= 0; i--) {
            console.log(self.track[i].url + '#t=' + self.track[i].offset + ',' + (self.track[i].offset + self.track[i].duration));
   
            setTimeout(function(track) {
                player.src = track.url + '#t=' + track.offset + ',' + (track.offset + track.duration);
                player.play();
            }, 1000*self.track[i].offset, self.track[i])
        };

    },
};
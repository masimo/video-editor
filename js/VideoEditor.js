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
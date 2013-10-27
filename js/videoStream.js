window.MediaSource = window.MediaSource || window.WebKitMediaSource;

var ms = new MediaSource();

var video = document.querySelector('video');
video.src = window.URL.createObjectURL(ms);

/* forget the sourcebuffer variable, we'll just manipulate mediaSource */
mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');

/* it seems ok to set initial duration 0 */
var duration = 0;
var totalVideos = 2;

/* use this type of loop to ensure that that a single video
   is downloaded and appended before moving on to the next video,
   mediasource seems picky about these being in order */
var i = 0;
(function readChunk_(i) {

    /* the GET function already returns a Uint8Array.
       the demo you linked reads it in filereader in order to manipulate it;
       you just want to immediately append it */
    GET('../media/oceans-clip' + (i + 1) + '.mp4', function(uint8Array) {

        if (i == totalVideos) {
            mediaSource.endOfStream();
        } else {

            /* assuming your videos are put together correctly
               (i.e. duration is correct), set the timestamp offset
               to the length of the total video */
            mediaSource.sourceBuffers[0].timestampOffset = duration;

            mediaSource.sourceBuffers[0].append(uint8Array);

            /* set new total length */
            duration = mediaSource.duration;

            readChunk(++i);
        }
    });
})(i);
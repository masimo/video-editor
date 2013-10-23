$(function() {

	_V_("videoScreen").ready(function() {
		var myPlayer = this;
		// EXAMPLE: Start playing the video.


		myPlayer.src([{
			type: "video/mp4",
			src: "../media/video/oceans-clip.mp4"
		}]);



	});

	$('#fileUpload').bind('change', function() {
		console.log($(this).val());
		/*myPlayer.src([{
			type: "video/mp4",
			src: "../media/video/oceans-clip.mp4"
		}]);
		myPlayer.play();*/
	})

});
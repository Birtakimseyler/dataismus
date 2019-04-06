//Audio hover:
var hoverArea = document.getElementById('audioElement');
	var audio = document.getElementById('audioID');
	hoverArea.onmouseover= function(){
		audio.play();
	}
	hoverArea.onmouseout= function(){
		audio.pause();
  }   
  
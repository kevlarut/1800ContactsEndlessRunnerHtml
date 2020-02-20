var audioManager = new function() {
		
	var songs = [
		{ 'src': 'audio/song-main.mp3' },
		{ 'src': 'audio/song-alternate.mp3' }
	];

	var sounds = {
		'the-fall': { 'src': 'audio/awesome.mp3' },
		'hit': { 'src': 'audio/hit.wav' },
		'jump': { 'src': 'audio/jump.wav' },
		'my-brand': { 'src': 'audio/my-brand-short.mp3' },
		'powerup': { 'src': 'audio/powerup.wav' },
		'girl': { 'src': 'audio/thanks.mp3' },
		'date-night': { 'src': 'audio/woo-hoo.mp3' },
		'pirate': { 'src': 'audio/yarr.mp3' },
		'slide': { 'src': 'audio/oof.mp3' }
    };
       	
	this.preLoadAudio = function() {
		for (var key in songs) {		
			if (songs.hasOwnProperty(key)) {
				var audioAsset = songs[key];
				var element = document.createElement('audio');
				element.preload = 'auto';
				element.src = audioAsset.src;			
				songs[key].element = element;
			}			
		}
		for (var key in sounds) {		
			if (sounds.hasOwnProperty(key)) {
				var audioAsset = sounds[key];
				var element = document.createElement('audio');
				element.preload = 'auto';
				element.src = audioAsset.src;			
				sounds[key].element = element;
			}			
		}
    }
    
	this.playMusic = function() {
		for (var i = 0; i < songs.length; i++) {
			var song = songs[i];			
			if (typeof song.element != 'undefined' && song.element.currentTime != 0 && song.element.currentTime < song.element.duration) {
				return;
			}
		}
		
		playSong(); 
	}

	var playSong = function() {
		var randomIndex = Math.floor(Math.random() * songs.length)
	
		var song = songs[randomIndex];
		if (typeof song.element != 'undefined') {
			song.element.currentTime = 0;
			song.element.play();
		}
	}

	this.playSound = function(slug) {		
		var sound = sounds[slug];
		if (typeof sound.element != 'undefined') {
			sound.element.currentTime = 0;
			sound.element.play();
		}
	}
}
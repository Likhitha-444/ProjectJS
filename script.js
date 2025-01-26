//song list
let All_song = [
  {
    name: "Remo",
    path: "assests/Love Selfie.mp3",
    img: "assests/remo.jpg",  
    singer: "Magic Free Release"
  },
  {
    name: "RRR",
    path: "assests/Naatu Naatu.mp3",
    img: "assests/RRR.jpg",
    singer:"Magic Free Release"
  },
  {
    name: "Bommarillu",
    path: "assests/Apudo Epudo.mp3",
    img: "assests/bommarillu.jpg",
    singer: "Magic Free Release"
  },
  {
    name: "Sita Ramam",
    path: "assests/inthandham.mp3",
    img: "assests/Sita ramam.jpg",
    singer: "Magic Free Release"
  },
  {
    name: "RRR",
    path: "assests/Dosti.mp3",
    img: "assests/RRR.jpg",
    singer: "Magic Free Release"
  },
  {
   name: "Sita Ramam",
   path: "assests/SitaRama.mp3",
   img: "assests/Sita ramam.jpg",
   singer: "Magic Free Release"
  }
];
/*you can add more song & images from you computer*/


/*tracks*/
let tracks = document.querySelector('.tracks');

//creating a list or generating Html
for (let i = 0; i < All_song.length; i++) {

 let Html = ` <div class="song">
     <div class="img">
     <img src="${All_song[i].img}"/>
     </div>
     <div class="more">
     <audio src="${All_song[i].path}" id="music"></audio>
     <div class="song_info">
        <p id="title">${All_song[i].name}</p>
        <p>${All_song[i].singer}</p>
     </div>
     <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
     </div>
   </div>`;

 tracks.insertAdjacentHTML("beforeend", Html);
};


/*please follow all the rules so that you do not face any problem*/
let btn = document.querySelectorAll('.song #play_btn');
let song = document.querySelectorAll('#music');

/*popup music player part*/
let p_m_player = document.querySelector('.popup_music_player');
let down_player = document.querySelector('#down_player');
let current_track_name = document.querySelector('#current_track_name');
let current_singer_name = document.querySelector('#current_singer_name');
let song_img = document.querySelector('.song_img');

/*controlls part*/
let shuffle_btn = document.querySelector('#shuffle_btn');
let play_pause_btn = document.querySelector('#play_pause_btn');
let slider = document.querySelector('#slider');
let forward_btn = document.querySelector('#forward_btn');
let backward_btn = document.querySelector('#backward_btn');
let repeat_btn = document.querySelector('#repeat_btn');

/*songs duration*/
let current_duration = document.querySelector('.controlls .progress_part #current_duration');
let total_duration = document.querySelector('.controlls .progress_part #total_duration');

/*small music player part*/
let s_m_player = document.querySelector('.small_music_player');
let playing_img = document.querySelector('.playing_img');
let wave_animation = document.querySelector('.wave_animation');
let up_player = document.querySelector('#up_player');
let song_name = document.querySelector('#song_name');
let artist_name = document.querySelector('#artist_name');


/*default values*/
let is_song_played = false;
let song_status = false;
let index_no = 0;


btn.forEach((btn,index) => {
  btn.addEventListener('click', function(){

    s_m_player.style.transform = 'translateY(0px)';
    
    if (index != index_no) {
      song_status = false;
    }
    
    index_no = index;

    song[index].currentTime = 0;

  	if (song_status == false) {
      play_song();
  	}else{
      pause_song();	 
  	}

  });
});


/*pause song*/
function pause_song(){
  song[index_no].pause();
  song_status = false;
  clearInterval(update_second);
  wave_animation.style.opacity = '0';
  play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


/*This function will update every 1s*/
 function update_second(){

	  let position = 0;

    // update slider position
		if(!isNaN(song[index_no].duration)){
		   position = song[index_no].currentTime * (100 / song[index_no].duration);
		   slider.value =  position;
	      }

    let durationMinutes = Math.floor(song[index_no].duration / 60);
    let durationSeconds = Math.floor(song[index_no].duration - durationMinutes * 60);
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    // Calculate the time left and the total duration
    let curr_minutes = Math.floor(song[index_no].currentTime / 60);
    let curr_seconds = Math.floor(song[index_no].currentTime - curr_minutes * 60);
 
    // Add a zero to the single digit time values
    if (curr_seconds < 10) { curr_seconds = "0" + curr_seconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
 
    // Display the updated duration
    current_duration.textContent = curr_minutes + ":" + curr_seconds;

       
// function will run when the song is over
	if (song[index_no].ended) {
      clearInterval(update_second);
  	  wave_animation.style.opacity = '0';
      play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }
 }
 

/*show popup music player */
up_player.addEventListener('click', function(){
   p_m_player.style.transform = 'translateY(0%)';
});


/* Hide popup music player */
down_player.addEventListener('click', function(){
   p_m_player.style.transform = 'translateY(110%)';
});


/*play pause btn inside the popup Music player*/
play_pause_btn.addEventListener('click', function(){
    if (song_status == false) {
  		song[index_no].play();
      song_status = true;
      wave_animation.style.opacity = '1';
  		this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  	}else{
  		song[index_no].pause();
      song_status = false;
      wave_animation.style.opacity = '0';
      this.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  	}
});


// change slider position 
function change_duration(){
	slider_position = song[index_no].duration * (slider.value / 100);
	song[index_no].currentTime = slider_position;
}


/*forward btn (next)*/
forward_btn.addEventListener('click', function(){
   
   index_no = index_no + 1;
    if (index_no == All_song.length) {
      index_no = 0;
    }
  
    song[index_no].currentTime = 0;
      play_song();
});


/*backward btn (previous)*/
backward_btn.addEventListener('click', function(){
    
    if (index_no == 0) {
      index_no = All_song.length-1;
    }else{
      index_no = index_no -1;
    }

    song[index_no].currentTime = 0;

    play_song();
});
/*play function*/
function play_song(){
  song[index_no].play();
  
  if (is_song_played == true) {
      document.querySelector(".active_song").pause();
      document.querySelector(".active_song").classList.remove("active_song");
  }else{
        is_song_played = true;
    }
    
  song[index_no].classList.add("active_song");

  song_status = true;
  setInterval(update_second, 1000);
  wave_animation.style.opacity = '1';
  p_m_player.style.transform = 'translateY(0%)';

  song_img.innerHTML = `<img src="${All_song[index_no].img}" />`;
  playing_img.innerHTML = `<img src="${All_song[index_no].img}" />`;

  song_name.innerHTML = All_song[index_no].name;
  artist_name.innerHTML = All_song[index_no].singer;

  current_track_name.innerHTML = All_song[index_no].name;
  current_singer_name.innerHTML = All_song[index_no].singer;
  play_pause_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}
// Track states for Shuffle and Repeat
let isShuffle = false;
let isRepeat = false;

// Event listener for Shuffle button
shuffle_btn.addEventListener('click', () => {
    isShuffle = !isShuffle; // Toggle shuffle state
    shuffle_btn.classList.toggle('active', isShuffle); // Toggle active class for styling
    console.log('Shuffle:', isShuffle ? 'Enabled' : 'Disabled');

    // Logic for shuffle behavior can go here (e.g., reordering playlist)
    if (isShuffle) {
        // Shuffle the playlist (example)
        shufflePlaylist();
    } else {
        // Reset to normal order (example)
        resetPlaylistOrder();
    }
});

// Event listener for Repeat button
repeat_btn.addEventListener('click', () => {
    isRepeat = !isRepeat; // Toggle repeat state
    repeat_btn.classList.toggle('active', isRepeat); // Toggle active class for styling
    console.log('Repeat:', isRepeat ? 'Enabled' : 'Disabled');

    // Logic for repeat behavior can go here (e.g., looping the current song)
    if (isRepeat) {
        // Enable repeat (loop current song)
        enableRepeat();
    } else {
        // Disable repeat
        disableRepeat();
    }
});

// Function to shuffle the playlist
function shufflePlaylist() {
    // Example: Randomize the song order
    console.log('Shuffling playlist...');
    // Add your shuffle logic here (e.g., randomize playlist order)
}

// Function to reset playlist order to original
function resetPlaylistOrder() {
    console.log('Resetting playlist order...');
    // Add your reset logic here (e.g., return to original order)
}

// Function to enable repeat
function enableRepeat() {
    console.log('Repeat enabled: Song will loop');
    // Add repeat logic here (e.g., loop current song)
}

// Function to disable repeat
function disableRepeat() {
    console.log('Repeat disabled');
    // Add logic to stop repeat (e.g., stop looping song)
}
// Volume control elements
let volumeSlider = document.getElementById('volume_slider');
let volumePercentage = document.getElementById('volume_percentage');

// Set the initial volume (100%)
let currentVolume = 1;  // Full volume (1 is 100%)
song[index_no].volume = currentVolume;

// Event listener to change the volume when the slider is adjusted
volumeSlider.addEventListener('input', function() {
    currentVolume = volumeSlider.value / 100;  // Convert the slider value to a range from 0 to 1
    song[index_no].volume = currentVolume;  // Set the volume of the current song
    volumePercentage.textContent = `${volumeSlider.value}%`;  // Display the current volume as percentage
});

// Optionally, you can add a mute button to mute/unmute the sound
let muteBtn = document.getElementById('mute_btn');
muteBtn.addEventListener('click', function() {
    if (song[index_no].volume > 0) {
        song[index_no].volume = 0;
        volumeSlider.value = 0;  // Update the slider
        volumePercentage.textContent = '0%';  // Update the percentage
    } else {
        song[index_no].volume = 1;  // Reset to full volume
        volumeSlider.value = 100;  // Reset the slider to 100%
        volumePercentage.textContent = '100%';  // Update the percentage
    }
});

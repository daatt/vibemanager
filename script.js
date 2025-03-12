document.addEventListener('DOMContentLoaded', () => {
    // Get all sound buttons
    const soundButtons = document.querySelectorAll('.sound-button');
    
    // Create an audio object to handle playing sounds
    const audio = new Audio();
    
    // Keep track of the currently playing button
    let currentlyPlayingButton = null;
    
    // Add click event listeners to all buttons
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const soundPath = button.getAttribute('data-sound');
            
            // If we're clicking the same button that's currently playing
            if (currentlyPlayingButton === button && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                button.classList.remove('playing');
                currentlyPlayingButton = null;
                return;
            }
            
            // If another sound is playing, stop it and reset its button
            if (currentlyPlayingButton) {
                currentlyPlayingButton.classList.remove('playing');
            }
            
            // Play the new sound
            audio.src = soundPath;
            audio.play()
                .catch(error => {
                    console.error('Error playing audio:', error);
                    alert('Error playing the sound. Please try again.');
                });
            
            // Update the currently playing button
            button.classList.add('playing');
            currentlyPlayingButton = button;
        });
    });
    
    // When audio ends, reset the button state
    audio.addEventListener('ended', () => {
        if (currentlyPlayingButton) {
            currentlyPlayingButton.classList.remove('playing');
            currentlyPlayingButton = null;
        }
    });
}); 
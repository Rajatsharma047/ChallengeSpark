/**
 * MicroSpark App - JavaScript functionality
 */

// Initialize time slider on home screen
function initializeTimeSlider() {
    const slider = document.getElementById('time-slider');
    const display = document.getElementById('time-display');
    
    if (slider && display) {
        // Update the display when slider is moved
        slider.addEventListener('input', function() {
            display.textContent = `${this.value} min`;
        });
        
        // Set initial display
        display.textContent = `${slider.value} min`;
    }
}

// Timer functionality for active challenge
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a timer element in the current page
    const timerElement = document.querySelector('.timer');
    if (timerElement) {
        // Set up the countdown timer
        const totalSeconds = parseInt(timerElement.dataset.timer) || 300; // Default to 5 min (300 seconds)
        let remainingSeconds = totalSeconds;
        
        // Start the timer
        const intervalId = setInterval(function() {
            remainingSeconds--;
            
            if (remainingSeconds <= 0) {
                clearInterval(intervalId);
                
                // Check if we're in the active challenge screen and should transition
                const activeScreen = document.querySelector('.active-challenge-screen');
                const completeScreen = document.querySelector('.challenge-complete-screen');
                
                if (activeScreen && completeScreen) {
                    activeScreen.classList.add('hidden');
                    completeScreen.classList.remove('hidden');
                }
            }
            
            // Update the timer display
            updateTimerDisplay(timerElement, remainingSeconds);
            
            // Update the progress ring if it exists
            updateProgressRing(totalSeconds, remainingSeconds);
            
        }, 1000);
        
        // Initial display
        updateTimerDisplay(timerElement, remainingSeconds);
    }
});

// Update the timer display with formatted minutes and seconds
function updateTimerDisplay(element, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    
    // Format as MM:SS
    element.textContent = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
}

// Update the progress ring to show remaining time
function updateProgressRing(total, remaining) {
    const progressCircle = document.querySelector('.progress-ring-circle:nth-child(2)');
    
    if (progressCircle) {
        const radius = progressCircle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        
        const progress = remaining / total;
        const dashoffset = circumference * (1 - progress);
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = dashoffset;
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real app, this would navigate to the respective screen
            // Here we just update the active state for demonstration
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add click event listeners to buttons that would navigate between screens
    const actionButtons = document.querySelectorAll('button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, these would trigger navigation or actions
            // For the prototype, we'll just add a visual feedback
            button.style.opacity = '0.8';
            setTimeout(() => {
                button.style.opacity = '1';
            }, 150);
        });
    });
    
    // Make toggle buttons interactive
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Make challenge cards interactive
    const challengeCards = document.querySelectorAll('.challenge-card, .suggestion-card');
    
    challengeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a slight scale effect when clicked
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Make preference chips interactive
    const preferenceChips = document.querySelectorAll('.preference-chip');
    
    preferenceChips.forEach(chip => {
        chip.addEventListener('click', function() {
            chip.classList.toggle('active');
        });
    });
    
    // Make toggle switches interactive
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
        });
    });
});

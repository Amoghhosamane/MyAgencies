document.addEventListener('DOMContentLoaded', function () {
    // --- Cached DOM Elements ---
    const body = document.body;
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const progressBar = document.querySelector('.progress-bar');
    const heroContent = document.querySelector('.hero-content');
    const sectionTitles = document.querySelectorAll('.section-title');
    const aboutSection = document.querySelector('.about');
    const aboutText = document.querySelector('.about-text');
    const aboutH2 = document.querySelector('.about-text h2'); // Note: This variable is declared but not used in the provided snippet.
    const aboutImage = document.querySelector('.about-image');
    const stats = document.querySelectorAll('.stat');
    const footerSections = document.querySelectorAll('.footer-section');
    const footerBottom = document.querySelector('.footer-bottom');

    // New: Get the quote form and message element
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');

    // Store elements to be revealed in a mutable array, filtered as they are revealed
    let scrollRevealElements = Array.from(document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'));

    // --- Theme Toggle Functionality ---
    function applyTheme(isLightMode) {
        if (isLightMode) {
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        applyTheme(!body.classList.contains('light-mode'));
    });

    // Apply saved theme or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // --- Progress Bar (Scroll Indicator) ---
    function updateProgressBar() {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call to set progress bar position

    // --- Hero Parallax Effect (Removed mousemove, simplified to CSS animation) ---
    // The parallax effect for hero content is now handled by CSS animations
    // and the `will-change` property on `.hero-content` for performance hints.

    // --- Scroll Reveal Animations ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ADDED: Apply staggered delay for service cards
                if (entry.target.classList.contains('service-card')) {
                    // Get all service cards to determine the current card's index
                    const serviceCards = document.querySelectorAll('.service-card');
                    const index = Array.from(serviceCards).indexOf(entry.target);
                    if (index !== -1) {
                        // Apply a transition delay (e.g., 150ms per card)
                        entry.target.style.transitionDelay = `${index * 0.15}s`;
                    }
                }

                entry.target.classList.add('revealed');

                // Specific animation triggers (if not already handled by general 'revealed')
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('revealed');
                }
                if (entry.target === aboutSection) {
                    // Assuming 'about-text h2 span' and 'about-text p' are also scroll-reveal elements
                    // If not, they might need individual observation or a parent observer.
                    // For now, these lines will add 'revealed' if they are also selected by .scroll-reveal
                    // or if their parent 'aboutSection' is revealed.
                    // If these elements are meant to animate on their own, they should have '.scroll-reveal' etc.
                    aboutText.querySelectorAll('h2 span').forEach(span => span.classList.add('revealed'));
                    aboutText.querySelectorAll('p').forEach(p => p.classList.add('revealed'));
                    stats.forEach(stat => stat.classList.add('revealed')); // Assuming .stat is also a scroll-reveal element
                    aboutImage.classList.add('revealed');
                }
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });

        // If all elements are revealed, disconnect the observer
        if (scrollRevealElements.length === 0) {
            observer.disconnect();
        }
    }, observerOptions);


    // Observe all initially hidden elements
    scrollRevealElements.forEach(el => {
        observer.observe(el);
    });

    // Special handling for about section text/image reveals
    observer.observe(aboutSection);

    // Observe footer sections and bottom
    footerSections.forEach(section => observer.observe(section));
    observer.observe(footerBottom);

    // Initial check for elements already in view on load
    scrollRevealElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            // ADDED: Apply staggered delay for service cards already in view on load
            if (element.classList.contains('service-card')) {
                const serviceCards = document.querySelectorAll('.service-card');
                const index = Array.from(serviceCards).indexOf(element);
                if (index !== -1) {
                    element.style.transitionDelay = `${index * 0.15}s`;
                }
            }
            element.classList.add('revealed');
            observer.unobserve(element); // Stop observing if already revealed
        }
    });


    // --- Form Submission Handling ---
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server
            // using fetch() or XMLHttpRequest.
            // For demonstration, we'll just simulate a successful submission.

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value; // Assuming 'service' is a select/input

            // Basic validation
            if (!name || !email) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.opacity = 1;
                return;
            }

            // Simulate API call
            formMessage.textContent = 'Sending your request...';
            formMessage.classList.remove('success', 'error');
            formMessage.style.opacity = 1;

            setTimeout(() => {
                // Simulate success
                formMessage.textContent = 'Thank you for your request! We will get back to you soon.';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                quoteForm.reset(); // Clear the form

                // Hide message after a few seconds
                setTimeout(() => {
                    formMessage.style.opacity = 0;
                }, 5000);

            }, 2000); // Simulate network delay
        });
    }


    // --- Custom Cursor Animation ---
    const customCursor = document.querySelector('.custom-cursor');

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mousedown', () => {
            customCursor.classList.add('clicked');
        });

        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('clicked');
        });

        // Add hover effect for interactive elements
        // Using a single delegated event listener for 'mouseover' and 'mouseout'
        // for performance, especially if there are many interactive elements.
        const interactiveElementsSelector = 'a, button, .service-card, .theme-toggle, input, textarea, [role="button"], [tabindex="0"], .dropbtn'; // Added .dropbtn here

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveElementsSelector) || e.target.closest(interactiveElementsSelector)) {
                customCursor.style.width = '40px';
                customCursor.style.height = '40px';
                customCursor.style.borderColor = 'transparent';
                customCursor.style.backgroundColor = 'rgba(0, 255, 65, 0.2)'; // Green glow
                if (body.classList.contains('light-mode')) {
                    customCursor.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Dark glow
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            // Check if the element the mouse left is an interactive element,
            // AND if the element the mouse entered is NOT an interactive element (or null)
            if ((e.target.matches(interactiveElementsSelector) || e.target.closest(interactiveElementsSelector)) &&
                (!e.relatedTarget || !(e.relatedTarget.matches(interactiveElementsSelector) || e.relatedTarget.closest(interactiveElementsSelector)))) {
                customCursor.style.width = '20px';
                customCursor.style.height = '20px';
                customCursor.style.borderColor = 'var(--dark-green)';
                customCursor.style.backgroundColor = 'transparent';
                if (body.classList.contains('light-mode')) {
                    customCursor.style.borderColor = 'var(--primary-black)';
                }
            }
        });
    } else {
        console.warn('Custom cursor element not found.');
    }


    // --- Background Music Control ---
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle');

    if (backgroundMusic && musicToggleButton) {
        // Initialize state based on HTML 'muted' attribute
        let isPlaying = !backgroundMusic.muted && !backgroundMusic.paused;

        // Function to update button icon
        const updateMusicIcon = () => {
            if (isPlaying) {
                musicToggleButton.querySelector('i').className = 'fas fa-volume-up';
            } else {
                musicToggleButton.querySelector('i').className = 'fas fa-volume-mute';
            }
        };

        // Set initial icon immediately
        updateMusicIcon();

        // Handle explicit click on the music toggle button
        musicToggleButton.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                backgroundMusic.muted = true; // Ensure muted when paused
            } else {
                // If currently paused, unmute and try to play
                backgroundMusic.muted = false;
                backgroundMusic.play().then(() => {
                    // Successfully played
                }).catch(error => {
                    // Playback failed (e.g., still blocked by browser, or no user gesture)
                    console.warn('Background music playback blocked on toggle click:', error);
                    backgroundMusic.muted = true; // Re-mute if failed
                    backgroundMusic.pause(); // Ensure paused
                    isPlaying = false; // Stay in paused state
                });
            }
            isPlaying = !isPlaying; // Toggle state
            updateMusicIcon(); // Update icon
        });

        // Optional: Attempt to play music on *any* user interaction on the page
        // This is a common workaround for browsers that block initial autoplay.
        // It will only try to play once.
        let hasInteracted = false;
        document.addEventListener('click', (e) => {
            // Only attempt if music is not already playing and we haven't tried this before
            if (!isPlaying && backgroundMusic.paused && !hasInteracted) {
                // Check if the click target is NOT the music toggle itself
                // This prevents double-handling if the first click is on the toggle
                if (e.target !== musicToggleButton && !musicToggleButton.contains(e.target)) {
                    backgroundMusic.muted = false; // Attempt to unmute
                    backgroundMusic.play().then(() => {
                        isPlaying = true;
                        updateMusicIcon();
                        console.log('Background music started on first general user interaction.');
                    }).catch(error => {
                        console.warn('Background music autoplay blocked on general interaction:', error);
                        backgroundMusic.muted = true; // Re-mute if failed
                        backgroundMusic.pause(); // Ensure paused
                        isPlaying = false; // Stay in paused state
                        updateMusicIcon();
                    });
                    hasInteracted = true; // Mark that we've tried playing once
                }
            }
        }, { once: true }); // The 'once: true' option makes this event listener automatically remove itself after being invoked once.

        // Listener for when music actually pauses (e.g., user switches tabs or manually pauses via browser controls)
        backgroundMusic.addEventListener('pause', () => {
            if (isPlaying) { // Only change state if it was considered playing by our script
                isPlaying = false;
                updateMusicIcon();
            }
        });

        // Listener for when music actually plays
        backgroundMusic.addEventListener('play', () => {
            if (!isPlaying) { // Only change state if it was considered paused by our script
                isPlaying = true;
                updateMusicIcon();
            }
        });

    } else {
        console.warn('Background music audio element or toggle button not found.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
                if (element.classList.contains('section-title')) {
                    element.classList.add('revealed');
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load
});

// Your existing JavaScript code that follows your CSS file, e.g.:
// const themeToggle = document.getElementById('theme-toggle');
// if (themeToggle) {
//     themeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('dark-theme');
//     });
// }
// ... more of your existing code

// Ensure the DOM is fully loaded before trying to access new elements (like the form)
document.addEventListener('DOMContentLoaded', () => {
    // --- Your NEW Form Submission Code goes here ---
    const quoteForm = document.getElementById('quoteForm');
    const responseMessage = document.getElementById('responseMessage');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;

            // --- Client-side validation ---
            if (!name || !email || !service) {
                responseMessage.style.color = 'red';
                responseMessage.textContent = 'Please fill in all fields.';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                responseMessage.style.color = 'red';
                responseMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            responseMessage.textContent = 'Sending your request...';
            responseMessage.style.color = 'orange';

            try {
                const backendUrl = 'http://localhost:3000/api/submit-quote';

                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, service })
                });

                const data = await response.json();

                if (response.ok) {
                    responseMessage.style.color = 'green';
                    responseMessage.textContent = data.message;
                    quoteForm.reset();
                } else {
                    responseMessage.style.color = 'red';
                    responseMessage.textContent = data.message || 'Failed to send request.';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                responseMessage.style.color = 'red';
                responseMessage.textContent = 'Network error: Could not connect to the server. Please ensure the backend is running.';
            }
        });
    } else {
        console.error('Error: The form with ID "quoteForm" was not found in the HTML.');
    }
    // --- End of NEW Form Submission Code ---
});

// More of your existing JavaScript code if it was outside DOMContentLoaded
// For example, if you have functions defined here:
// function someOtherFunction() { ... }
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6

})

function downloadServiceCatalog() {
    // The path to your PDF file
    const pdfPath = 'assets/AILiance_Agencies_Service_Catalog.pdf';
    
    // The filename for the user to download
    const filename = 'AILiance_Agencies_Service_Catalog.pdf';

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = filename;

    // Append the link to the body, trigger the click, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Attach the function to a button click event
document.querySelector('.download-button').addEventListener('click', downloadServiceCatalog);

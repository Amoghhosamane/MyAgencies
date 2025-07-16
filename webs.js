 document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.querySelector('.theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;

            // Load saved theme from localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light-mode') {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }

            themeToggleBtn.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                if (body.classList.contains('light-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'light-mode');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'dark-mode');
                }
            });
        });

        // Add any other scripts you have (e.g., for navbar animation on scroll)
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) { // Adjust scroll threshold as needed
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Ensure dropdowns work if not handled by a separate script
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent document click from closing immediately
                this.querySelector('.dropdown-content').classList.toggle('show');
            });
        });

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
                const dropdowns = document.querySelectorAll('.dropdown-content');
                dropdowns.forEach(openDropdown => {
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light-mode');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});

// Navbar animation on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Ensure navbar exists before trying to add/remove classes
    if (navbar) {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Dropdown functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent document click from closing immediately
        this.querySelector('.dropdown-content').classList.toggle('show');
    });
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(openDropdown => {
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        });
    }
}



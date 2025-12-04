document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LOADER (1.5s Smooth Transition)
    const loader = document.getElementById('loader');
    
    // Initial lock
    document.body.style.overflow = 'hidden';

    if(loader) {
        setTimeout(() => {
            // Fade out
            loader.classList.add('fade-out');
            
            // Unlock scroll after fade
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto'; 
            }, 500);
            
        }, 1500); // 1.5 Seconds Total
    } else {
        document.body.style.overflow = 'auto';
    }

    // 2. MOBILE MENU TOGGLE
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        document.querySelectorAll('.nav-link, .btn-nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // 3. SCROLL REVEAL OBSERVER
    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));


    // 4. GOOGLE SHEETS FORM CONNECTION
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxmXRIyVZ98OSFHYVbqKcNlkWlz3npJvwGcuCibWQzOezYX_6mE22u6hShJZzyugdDV/exec';
    
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('form-message');
    const btn = document.getElementById('submitBtn');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Loading State
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.7';
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    msg.innerHTML = "Namaste! Message Received. We'll contact you soon.";
                    msg.style.color = "#4ade80"; // Light Green
                    btn.innerHTML = "Message Sent";
                    btn.style.background = "#4ade80";
                    form.reset();
                    
                    setTimeout(() => { 
                        msg.innerHTML = ""; 
                        btn.innerHTML = "Send Message";
                        btn.style.background = "var(--accent)";
                        btn.style.opacity = '1';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    msg.innerHTML = "Error sending message. Please try again.";
                    msg.style.color = "#f87171"; // Red
                    btn.innerHTML = "Send Message";
                    btn.style.opacity = '1';
                });
        });
    }
});
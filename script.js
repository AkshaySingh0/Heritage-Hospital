const apiUrl = 'http://localhost:3000';

// Function to fetch patients from the API
async function getPatients() {
  try {
    const response = await fetch(`${apiUrl}/patients`);
    const patients = await response.json();
    displayPatients(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
}

// Function to display patients in the UI
function displayPatients(patients) {
  const patientsList = document.getElementById('patients-list');
  patientsList.innerHTML = ''; // Clear existing list

  patients.forEach(patient => {
    const listItem = document.createElement('li');
    listItem.textContent = `${patient.name} (Age: ${patient.age}, Medical History: ${patient.medicalHistory})`;
    patientsList.appendChild(listItem);
  });
}

// Call getPatients when the page loads
window.onload = function() {
    getPatients();

    document.addEventListener('DOMContentLoaded', function() {
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        console.log('menuToggle', menuToggle);
        console.log('nav', nav);
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                console.log('menuToggle clicked');
                nav.classList.toggle('active');
                
                // Toggle menu icon
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
                nav.classList.remove('active');
                
                // Reset menu icon
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Testimonial Slider
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelector('.dot');
        
        if (testimonialSlider && testimonialCards.length > 0 && dots.length > 0) {
            let currentSlide = 0;
            
            // Function to update slider position
            function updateSlider() {
                testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update active dot
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Set up dot click events
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentSlide = index;
                    updateSlider();
                });
            });
            
            // Auto slide every 5 seconds
            setInterval(function() {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                updateSlider();
            }, 5000);
        }
        
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only process links that point to an ID on the page
                if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        if (nav.classList.contains('active')) {
                            nav.classList.remove('active');
                            const icon = menuToggle.querySelector('i');
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                        
                        // Scroll to the element
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Offset for fixed header
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
        
        // Scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.style.position = 'fixed';
        scrollTopBtn.style.bottom = '20px';
        scrollTopBtn.style.right = '20px';
        scrollTopBtn.style.width = '50px';
        scrollTopBtn.style.height = '50px';
        scrollTopBtn.style.borderRadius = '50%';
        scrollTopBtn.style.backgroundColor = '#3498db';
        scrollTopBtn.style.color = 'white';
        scrollTopBtn.style.border = 'none';
        scrollTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        scrollTopBtn.style.cursor = 'pointer';
        scrollTopBtn.style.display = 'none';
        scrollTopBtn.style.zIndex = '999';
        scrollTopBtn.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        scrollTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effect to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.feature-icon i');
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.feature-icon i');
                icon.style.transform = 'scale(1)';
            });
        });
        
        // Add animation to stats when they come into view
        const statItems = document.querySelectorAll('.stat-item h2');
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate counting up
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                let value = Math.floor(progress * (end - start) + start);
                
                // Add + sign for values that had it
                if (obj.innerText.includes('+')) {
                    obj.innerText = value + '+';
                } else {
                    obj.innerText = value;
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        // Check stats on scroll
        let animated = false;
        window.addEventListener('scroll', function() {
            if (!animated && statItems.length > 0 && isInViewport(statItems[0])) {
                animated = true;
                
                statItems.forEach(item => {
                    const finalValue = parseInt(item.innerText.replace(/[^0-9]/g, ''));
                    animateValue(item, 0, finalValue, 2000);
                });
            }
        });
    });
};

// Handle user registration form submission
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const contactNumberInput = document.getElementById('contactNumber');
        const contactNumber = contactNumberInput.value;

        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contactNumber: contactNumber })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Success message
            } else {
                alert(data.message); // Error message
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred during registration');
        }
    });
}

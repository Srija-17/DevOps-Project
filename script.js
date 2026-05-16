document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Keep it scrolled for better visibility over bg
            if(window.scrollY < 10) navbar.classList.remove('scrolled')
        }
    });

    // Initial check
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Active link switching based on scroll position
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for the fixed navbar
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links (fallback for browsers that don't support scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic UI feedback for the demo
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing Payment...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Booking Confirmed!';
                btn.style.backgroundColor = '#2ecc71';
                btn.style.borderColor = '#2ecc71';
                btn.style.opacity = '1';
                
                setTimeout(() => {
                    alert('Thank you for booking with Lumina Hotel! Your reservation is confirmed.');
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    bookingForm.reset();
                }, 1000);
            }, 2000);
        });
    }
});
function checkRoomAvailability(roomType) {
    const availableRooms = {
        standard: 5,
        deluxe: 3,
        suite: 2
    };

    if (availableRooms[roomType] > 0) {
        alert(`${roomType} rooms are available.`);
    } else {
        alert(`${roomType} rooms are not available.`);
    }
}

function calculateBill(days, roomPrice) {
    const total = days * roomPrice;
    return total;
}

function customerCheckIn(customerName) {
    console.log(`${customerName} checked in successfully.`);
}

function customerCheckOut(customerName) {
    console.log(`${customerName} checked out successfully.`);
}

function cancelReservation(bookingId) {
    console.log(`Reservation with Booking ID ${bookingId} cancelled.`);
}
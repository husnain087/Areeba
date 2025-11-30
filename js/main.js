// Main JavaScript File

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Set active nav link
function setActiveNav(clickedLink) {
  // Remove active class from all nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Add active class to clicked link
  clickedLink.classList.add('active');
  
  // Close mobile menu if open
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse.classList.contains('show')) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
  }
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class when scrolling
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
  
  lastScroll = currentScroll;
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  const scrollPosition = window.pageYOffset + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Get form values
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Here you would typically send the data to a server
  // For now, we'll just show an alert
  alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`);
  
  // Reset form
  form.reset();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio website loaded');
  
  // Set initial active nav link
  updateActiveNavLink();
  
  // Handle nav link clicks
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
      setActiveNav(this);
    });
  });
});


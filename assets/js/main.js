/**
* Template Name: Gp - Futuristic Enhanced
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scroll Animation Observer for Futuristic Effects
   */
  const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe elements with scroll animation classes
    const scrollElements = select('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale', true)
    if (scrollElements) {
      scrollElements.forEach(el => observer.observe(el))
    }
  }

  /**
   * Navbar links active state on scroll with futuristic effects
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Modern Back to top button
   */
  let modernBacktotop = select('.back-to-top-modern')
  if (modernBacktotop) {
    const progressCircle = select('.progress-ring-circle')
    const circumference = 2 * Math.PI * 27 // 27 is the radius
    
    if (progressCircle) {
      progressCircle.style.strokeDasharray = circumference
      progressCircle.style.strokeDashoffset = circumference
    }
    
    const toggleModernBacktotop = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrolled / maxHeight
      
      if (scrolled > 300) {
        modernBacktotop.classList.add('show')
        
        // Update progress circle
        if (progressCircle) {
          const offset = circumference - (scrollProgress * circumference)
          progressCircle.style.strokeDashoffset = offset
        }
      } else {
        modernBacktotop.classList.remove('show')
      }
    }
    
    // Smooth scroll to top functionality
    modernBacktotop.addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
    
    window.addEventListener('load', toggleModernBacktotop)
    onscroll(document, toggleModernBacktotop)
  }

  // Hide old back-to-top if it exists
  let backtotop = select('.back-to-top')
  if (backtotop) {
    backtotop.style.display = 'none'
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Portfolio isotope and filter with enhanced effects
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.6s'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      // Enhanced filter functionality
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        
        // Add loading effect
        this.style.transform = 'translateY(0) scale(0.98)';
        
        setTimeout(() => {
          // Remove active class from all filters
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          
          // Add active class to clicked filter
          this.classList.add('filter-active');

          // Apply filter with smooth animation
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          
          // Refresh AOS animations after filtering
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh();
          });
          
          // Reset transform
          this.style.transform = '';
        }, 100);
      }, true);

      // Add hover sound effect (visual feedback)
      portfolioFilters.forEach(filter => {
        filter.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        filter.addEventListener('mouseleave', function() {
          if (!this.classList.contains('filter-active')) {
            this.style.transform = '';
          }
        });
      });
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Update footer year automatically
   */
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  /**
   * Apple-style Footer Mobile Navigation
   */
  /**
   * Enhanced Particle System for Hero Section
   */
  const createParticles = () => {
    const heroSection = select('#hero')
    if (!heroSection) return

    const particleContainer = document.createElement('div')
    particleContainer.className = 'hero-particles'
    heroSection.appendChild(particleContainer)

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 20 + 's'
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
      particleContainer.appendChild(particle)
    }
  }

  /**
   * Smooth scroll with easing for navigation links
   */
  const smoothScrollTo = (target, duration = 1000) => {
    const targetElement = select(target)
    if (!targetElement) return

    const targetPosition = targetElement.offsetTop - 100
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t + 2) + b
    }

    requestAnimationFrame(animation)
  }

  /**
   * Dynamic Header Effects
   */
  const headerEffects = () => {
    const header = select('#header')
    if (!header) return

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      if (scrollTop > 100) {
        header.classList.add('header-scrolled')
      } else {
        header.classList.remove('header-scrolled')
      }

      // Keep header always visible
      header.style.transform = 'translateY(0)'
    })
  }

  /**
   * Initialize all futuristic effects
   */
  const initFuturisticEffects = () => {
    animateOnScroll()
    createParticles()
    headerEffects()

    // Enhanced navigation clicks
    navbarlinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = link.getAttribute('href')
        smoothScrollTo(target)
        
        // Close mobile menu if open
        const navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          select('.mobile-nav-toggle').classList.toggle('bi-list')
          select('.mobile-nav-toggle').classList.toggle('bi-x')
        }
      })
    })

    // Add scroll animation classes to elements
    const sectionsToAnimate = [
      '.about .content',
      '.services .icon-box',
      '.portfolio .portfolio-item',
      '.contact .contact-form'
    ]

    sectionsToAnimate.forEach(selector => {
      const elements = select(selector, true)
      if (elements) {
        elements.forEach((el, index) => {
          el.classList.add('scroll-animate')
          el.style.animationDelay = (index * 0.1) + 's'
        })
      }
    })
  }

  // Apple Footer Mobile Accordion Functionality
  const footerButtons = document.querySelectorAll('#ac-globalfooter .ac-gf-directory-column-section-title-button');
  
  footerButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.closest('.ac-gf-directory-column-section');
      const isExpanded = section.classList.contains('ac-gf-directory-column-expanded');
      
      // Close all other sections
      footerButtons.forEach(otherButton => {
        const otherSection = otherButton.closest('.ac-gf-directory-column-section');
        if (otherSection !== section) {
          otherSection.classList.remove('ac-gf-directory-column-expanded');
          otherButton.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current section
      if (isExpanded) {
        section.classList.remove('ac-gf-directory-column-expanded');
        this.setAttribute('aria-expanded', 'false');
      } else {
        section.classList.add('ac-gf-directory-column-expanded');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /**
   * Single Image Carousel Auto-play
   */
  const initSingleImageCarousel = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return;

    // Function to show specific slide
    const showSlide = (index) => {
      // Remove active class from all slides and pause videos
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
          if (i !== index) {
            video.pause();
          }
        }
      });
      
      // Add active class to current slide and play video if it has one
      slides[index].classList.add('active');
      const activeVideo = slides[index].querySelector('video');
      if (activeVideo) {
        activeVideo.currentTime = 0; // Restart video from beginning
        activeVideo.play();
      }
    };

    // Auto-advance slides every 3 seconds
    const autoAdvance = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Set up auto-advance timer
    let intervalId = setInterval(autoAdvance, 3000);

    // Pause auto-advance on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
      });
      
      carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(autoAdvance, 3000);
      });
    }
  };

  /**
   * Single Video Carousel Auto-play
   */
  const initSingleVideoCarousel = () => {
    const videoSlides = document.querySelectorAll('.video-carousel-slide');
    let currentVideoSlide = 0;
    
    if (videoSlides.length === 0) return;

    // Function to show specific video slide
    const showVideoSlide = (index) => {
      // Remove active class from all video slides and pause videos
      videoSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
          if (i !== index) {
            video.pause();
          }
        }
      });
      
      // Add active class to current video slide and play video
      videoSlides[index].classList.add('active');
      const activeVideo = videoSlides[index].querySelector('video');
      if (activeVideo) {
        activeVideo.currentTime = 0; // Restart video from beginning
        activeVideo.play();
      }
    };

    // Auto-advance video slides every 4 seconds
    const autoAdvanceVideo = () => {
      currentVideoSlide = (currentVideoSlide + 1) % videoSlides.length;
      showVideoSlide(currentVideoSlide);
    };

    // Set up auto-advance timer for videos
    let videoIntervalId = setInterval(autoAdvanceVideo, 4000);

    // Pause auto-advance on hover for video carousel
    const videoCarousel = document.querySelector('.video-carousel-container');
    if (videoCarousel) {
      videoCarousel.addEventListener('mouseenter', () => {
        clearInterval(videoIntervalId);
      });
      
      videoCarousel.addEventListener('mouseleave', () => {
        videoIntervalId = setInterval(autoAdvanceVideo, 4000);
      });
    }
  };

  // Initialize futuristic effects when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initFuturisticEffects();
    initSingleImageCarousel();
    initSingleVideoCarousel();
  });

})() 
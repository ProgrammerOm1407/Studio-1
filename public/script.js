// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const contactForm = document.getElementById("contactForm")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightbox-image")
const lightboxTitle = document.getElementById("lightbox-title")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxClose = document.querySelector(".lightbox-close")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

// Current slide index
let currentSlide = 0
let currentLightboxIndex = 0
let lightboxImages = []

// Navigation functionality
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Update active link
    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")
  })
})

// Hero slider functionality
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index)
  })

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

// Slider controls
nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Auto-play slider
setInterval(nextSlide, 6000)

// Portfolio filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter")

    // Update active filter button
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter portfolio items with animation
    portfolioItems.forEach((item, index) => {
      const categories = item.getAttribute("data-category")

      if (filter === "all" || categories.includes(filter)) {
        setTimeout(() => {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 50)
        }, index * 100)
      } else {
        item.style.opacity = "0"
        item.style.transform = "translateY(20px)"
        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      }
    })
  })
})

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".submit-btn")
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you soon.")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Special handling for service cards
      if (entry.target.classList.contains("service-card")) {
        const cards = document.querySelectorAll(".service-card")
        const index = Array.from(cards).indexOf(entry.target)
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 200)
      }

      // Special handling for partner cards
      if (entry.target.classList.contains("partner-card")) {
        const cards = document.querySelectorAll(".partner-card")
        const index = Array.from(cards).indexOf(entry.target)
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 150)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".fade-in, .service-card, .portfolio-item, .partner-card, .benefit-item, .contact-item, .contact-form, .section-title, .section-subtitle",
  )
  .forEach((el) => {
    observer.observe(el)
  })

// Scroll-based navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Newsletter form
const newsletterForm = document.querySelector(".newsletter-form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = newsletterForm.querySelector('input[type="email"]').value

    if (email) {
      alert("Thank you for subscribing to our newsletter!")
      newsletterForm.reset()
    }
  })
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Enhanced parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImages = document.querySelectorAll(".hero-image")

  heroImages.forEach((img) => {
    const speed = 0.3
    img.style.transform = `translateY(${scrolled * speed}px) scale(1.05)`
  })
})

// Service cards enhanced hover effect
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)"
    card.style.transition = "all 0.4s ease"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Portfolio item click handling
portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h3").textContent
    const category = item.querySelector("p").textContent
    const imgSrc = item.querySelector("img").src

    openLightbox(imgSrc, title, category)
  })
})

// Add smooth reveal animation for stats
const stats = document.querySelectorAll(".stat h4")
const animateStats = () => {
  stats.forEach((stat, index) => {
    const finalValue = Number.parseInt(stat.textContent)
    let currentValue = 0
    const increment = finalValue / 60
    const duration = 2000

    setTimeout(() => {
      const timer = setInterval(() => {
        currentValue += increment
        if (currentValue >= finalValue) {
          stat.textContent = finalValue + (stat.textContent.includes("+") ? "+" : "")
          clearInterval(timer)
        } else {
          stat.textContent = Math.floor(currentValue) + (stat.textContent.includes("+") ? "+" : "")
        }
      }, duration / 60)
    }, index * 200)
  })
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector(".about")
if (aboutSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(aboutSection)
}

// Gallery filtering functionality
const galleryCategories = document.querySelectorAll(".category-btn")
const galleryItems = document.querySelectorAll(".gallery-item")

galleryCategories.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category")

    // Update active category button
    galleryCategories.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter gallery items with staggered animation
    galleryItems.forEach((item, index) => {
      const itemCategory = item.getAttribute("data-category")

      if (category === "all" || itemCategory === category) {
        setTimeout(() => {
          item.classList.remove("hidden")
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 50)
        }, index * 100)
      } else {
        item.style.opacity = "0"
        item.style.transform = "translateY(30px)"
        setTimeout(() => {
          item.classList.add("hidden")
        }, 300)
      }
    })
  })
})

// Gallery view button functionality with lightbox
const galleryViewBtns = document.querySelectorAll(".gallery-view-btn")
galleryViewBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    const galleryItem = btn.closest(".gallery-item")
    const img = galleryItem.querySelector("img")
    const title = galleryItem.querySelector("h3").textContent
    const description = galleryItem.querySelector("p").textContent

    openLightbox(img.src, title, description)
  })
})

// Lightbox functionality
function openLightbox(imageSrc, title, description) {
  lightboxImage.src = imageSrc
  lightboxTitle.textContent = title
  lightboxDescription.textContent = description
  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"

  // Build lightbox images array for navigation
  lightboxImages = Array.from(document.querySelectorAll(".gallery-item img, .portfolio-item img")).map((img) => ({
    src: img.src,
    title: img.closest(".gallery-item, .portfolio-item").querySelector("h3").textContent,
    description: img.closest(".gallery-item, .portfolio-item").querySelector("p").textContent,
  }))

  currentLightboxIndex = lightboxImages.findIndex((img) => img.src === imageSrc)
}

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length
  const currentImage = lightboxImages[currentLightboxIndex]
  lightboxImage.src = currentImage.src
  lightboxTitle.textContent = currentImage.title
  lightboxDescription.textContent = currentImage.description
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length
  const currentImage = lightboxImages[currentLightboxIndex]
  lightboxImage.src = currentImage.src
  lightboxTitle.textContent = currentImage.title
  lightboxDescription.textContent = currentImage.description
}

// Lightbox event listeners
lightboxClose.addEventListener("click", closeLightbox)
lightboxNext.addEventListener("click", nextLightboxImage)
lightboxPrev.addEventListener("click", prevLightboxImage)

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    switch (e.key) {
      case "Escape":
        closeLightbox()
        break
      case "ArrowRight":
        nextLightboxImage()
        break
      case "ArrowLeft":
        prevLightboxImage()
        break
    }
  }
})

// Load more functionality
const loadMoreBtn = document.querySelector(".load-more-btn")
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    // Simulate loading more gallery items
    loadMoreBtn.textContent = "Loading..."
    loadMoreBtn.disabled = true

    setTimeout(() => {
      // Add animation effect
      loadMoreBtn.style.transform = "scale(0.95)"
      setTimeout(() => {
        loadMoreBtn.style.transform = "scale(1)"
        alert("More projects loaded! (This would load additional gallery items)")
        loadMoreBtn.textContent = "Load More Projects"
        loadMoreBtn.disabled = false
      }, 150)
    }, 1500)
  })
}

// Partner card enhanced hover effects
const partnerCards = document.querySelectorAll(".partner-card")
partnerCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Image lazy loading with fade-in effect
const images = document.querySelectorAll("img[loading='lazy']")
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.addEventListener("load", () => {
        img.classList.add("loaded")
      })
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// Enhanced scroll animations with stagger effect
const staggerElements = document.querySelectorAll(".gallery-item, .service-card, .partner-card")
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elements = Array.from(entry.target.parentElement.children)
        const index = elements.indexOf(entry.target)

        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 100)

        staggerObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

staggerElements.forEach((el) => {
  staggerObserver.observe(el)
})

// Smooth page transitions
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.3s ease"
})

// Performance optimization: Throttle scroll events
let ticking = false
function updateOnScroll() {
  // Parallax and other scroll-based animations
  const scrolled = window.pageYOffset

  // Update navbar
  if (scrolled > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll)
    ticking = true
  }
})

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animation classes
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible")
      }, index * 100)
    })
  }, 500)
})

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

// Current slide index
let currentSlide = 0

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
setInterval(nextSlide, 5000)

// Portfolio filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter")

    // Update active filter button
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      const categories = item.getAttribute("data-category")

      if (filter === "all" || categories.includes(filter)) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, 100)
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

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".fade-in, .service-card, .portfolio-item").forEach((el) => {
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

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImages = document.querySelectorAll(".hero-image")

  heroImages.forEach((img) => {
    const speed = 0.5
    img.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Service cards hover effect
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
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

    // This would typically open a modal or navigate to a detail page
    console.log(`Clicked on: ${title} - ${category}`)
    alert(`Opening details for: ${title}`)
  })
})

// Add smooth reveal animation for stats
const stats = document.querySelectorAll(".stat h4")
const animateStats = () => {
  stats.forEach((stat) => {
    const finalValue = Number.parseInt(stat.textContent)
    let currentValue = 0
    const increment = finalValue / 50

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= finalValue) {
        stat.textContent = finalValue + (stat.textContent.includes("+") ? "+" : "")
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(currentValue) + (stat.textContent.includes("+") ? "+" : "")
      }
    }, 30)
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

    // Filter gallery items
    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category")

      if (category === "all" || itemCategory === category) {
        item.classList.remove("hidden")
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, 100)
      } else {
        item.style.opacity = "0"
        item.style.transform = "translateY(20px)"
        setTimeout(() => {
          item.classList.add("hidden")
        }, 300)
      }
    })
  })
})

// Gallery view button functionality
const galleryViewBtns = document.querySelectorAll(".gallery-view-btn")
galleryViewBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    const galleryItem = btn.closest(".gallery-item")
    const title = galleryItem.querySelector("h3").textContent

    // This would typically open a lightbox or modal
    console.log(`Opening gallery view for: ${title}`)
    alert(`Opening detailed view for: ${title}`)
  })
})

// Load more functionality
const loadMoreBtn = document.querySelector(".load-more-btn")
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    // Simulate loading more gallery items
    loadMoreBtn.textContent = "Loading..."
    loadMoreBtn.disabled = true

    setTimeout(() => {
      alert("More projects loaded! (This would load additional gallery items)")
      loadMoreBtn.textContent = "Load More Projects"
      loadMoreBtn.disabled = false
    }, 1500)
  })
}

// Partner card hover effects
const partnerCards = document.querySelectorAll(".partner-card")
partnerCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Update navigation highlighting to include gallery
const sections = document.querySelectorAll("section[id]")
const navLinksUpdated = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinksUpdated.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Animate gallery items on scroll
const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe gallery items and partner cards for animation
document.querySelectorAll(".gallery-item, .partner-card, .benefit-item").forEach((el) => {
  galleryObserver.observe(el)
})

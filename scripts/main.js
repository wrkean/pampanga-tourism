const destinationsData = [
  {
    id: "san-fernando",
    name: "San Fernando Heritage District",
    municipality: "City of San Fernando",
    category: "Historical Site",
    image: "images/destinations-card-1.jpeg",
    shortDescription: "Provincial capital known for heritage landmarks and lantern-making tradition.",
    fullDescription:
      "San Fernando blends colonial-era architecture, local museums, and active cultural streets where visitors can experience Pampanga's identity.",
    entranceFee: "Free walking areas; some museums may charge PHP 50-100",
    openingHours: "Most sites: 8:00 AM - 5:00 PM",
    activities: "Heritage walk, museum visits, food crawl, lantern workshop",
    bestTimeToVisit: "December for lantern season; early mornings year-round",
    travelTips: "Wear light clothing and visit on weekdays to avoid traffic."
  },
  {
    id: "mount-arayat",
    name: "Mount Arayat National Park",
    municipality: "Arayat, Pampanga",
    category: "Mountain",
    image: "images/destinations-card-2.jpg",
    shortDescription: "Dormant volcano destination with forest trails and panoramic views.",
    fullDescription:
      "Mount Arayat offers beginner-to-intermediate trekking routes and forested picnic areas with sweeping views of Central Luzon.",
    entranceFee: "PHP 30-100 depending on jump-off point",
    openingHours: "5:00 AM - 4:00 PM",
    activities: "Trekking, nature photography, picnics, birdwatching",
    bestTimeToVisit: "November to February",
    travelTips: "Start hikes before 7:00 AM and hire a local guide for summit routes."
  },
  {
    id: "candaba",
    name: "Candaba Wetlands",
    municipality: "Candaba, Pampanga",
    category: "Adventure",
    image: "images/destinations-card-5.webp",
    shortDescription: "Seasonal wetland sanctuary famous for migratory birds and scenic views.",
    fullDescription:
      "Candaba Wetlands is a top eco-tourism destination where visitors can observe migratory species and experience rural nature landscapes.",
    entranceFee: "Usually free; guided tours may cost PHP 150-300",
    openingHours: "6:00 AM - 5:00 PM",
    activities: "Birdwatching, cycling, sunrise photography",
    bestTimeToVisit: "October to February",
    travelTips: "Bring binoculars and coordinate with local guides for birding hotspots."
  },
  {
    id: "holy-rosary",
    name: "Holy Rosary Parish Church",
    municipality: "Angeles City",
    category: "Historical Site",
    image: "images/churches-card-1.jpg",
    shortDescription: "Historic church known for elegant architecture and religious heritage.",
    fullDescription:
      "Built during the Spanish period, Holy Rosary Parish is one of Angeles City's key heritage churches and a central point for cultural tours.",
    entranceFee: "Free",
    openingHours: "5:00 AM - 7:00 PM",
    activities: "Church visit, heritage photography, quiet reflection",
    bestTimeToVisit: "Early morning or late afternoon",
    travelTips: "Dress respectfully and avoid peak worship hours for quiet touring."
  },
  {
    id: "aqua-planet",
    name: "Aqua Planet",
    municipality: "Clark Freeport, Mabalacat",
    category: "Adventure",
    image: "images/clark-card-1.jpg",
    shortDescription: "Large waterpark destination with slides, pools, and family attractions.",
    fullDescription:
      "Aqua Planet in Clark is one of the Philippines' biggest waterparks, ideal for family and group trips with all-day activity zones.",
    entranceFee: "Starts around PHP 1,000 (seasonal rates apply)",
    openingHours: "10:00 AM - 5:00 PM (check seasonal schedules)",
    activities: "Water slides, wave pool, family rides",
    bestTimeToVisit: "Dry season months",
    travelTips: "Book tickets online and arrive before opening to avoid queues."
  },
  {
    id: "puning-falls",
    name: "Puning Hot Spring and Falls",
    municipality: "Porac, Pampanga",
    category: "Waterfall",
    image: "images/adventure-card-3.jpeg",
    shortDescription: "Off-road canyon route leading to springs, spa, and natural falls areas.",
    fullDescription:
      "This adventure combines 4x4 rides, lahar landscapes, and relaxing hot spring pools, making it a unique eco-wellness destination.",
    entranceFee: "Tour packages usually start around PHP 2,000",
    openingHours: "By booking schedule",
    activities: "4x4 ride, canyon exploration, hot spring relaxation",
    bestTimeToVisit: "November to May",
    travelTips: "Reserve in advance and wear sandals suitable for wet terrain."
  },
  {
    id: "nepomall-food",
    name: "Nepo Center Food Crawl",
    municipality: "Angeles City",
    category: "Food Destination",
    image: "images/cuisine-card-1.webp",
    shortDescription: "Classic food district where visitors can try iconic Kapampangan dishes.",
    fullDescription:
      "Nepo Center and nearby food streets are ideal for tasting authentic sisig, local barbecue, and other Kapampangan favorites.",
    entranceFee: "Free entry; pay per order",
    openingHours: "11:00 AM - 10:00 PM",
    activities: "Food tasting, local dining, night food walk",
    bestTimeToVisit: "Late afternoon to evening",
    travelTips: "Try shared platters if visiting in groups to sample more dishes."
  }
];

function toggleNav() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("open");
}

function initDestinationsPage() {
  const grid = document.getElementById("destinationGrid");
  if (!grid) return;

  const searchInput = document.getElementById("destinationSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const modalElement = document.getElementById("destinationModal");
  const modal = modalElement ? new bootstrap.Modal(modalElement) : null;

  const renderCards = (items) => {
    grid.innerHTML = "";

    if (items.length === 0) {
      grid.innerHTML = '<p class="text-muted">No destinations match your current search/filter.</p>';
      return;
    }

    for (const item of items) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-img">
          <img src="${item.image}" alt="${item.name}" class="ratio-16-9" />
          <span class="card-badge">${item.category}</span>
        </div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="meta-line"><strong>Location:</strong> ${item.municipality}</p>
          <p>${item.shortDescription}</p>
          <p class="meta-line"><strong>Entrance Fee:</strong> ${item.entranceFee}</p>
          <p class="meta-line"><strong>Opening Hours:</strong> ${item.openingHours}</p>
          <button class="btn btn-red btn-sm mt-2" data-id="${item.id}">View Details</button>
        </div>
      `;
      grid.appendChild(card);
    }

    grid.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", () => showDetails(button.dataset.id));
    });
  };

  const showDetails = (id) => {
    const item = destinationsData.find((destination) => destination.id === id);
    if (!item || !modalElement || !modal) return;

    document.getElementById("modalTitle").textContent = item.name;
    document.getElementById("modalImage").src = item.image;
    document.getElementById("modalImage").alt = item.name;
    document.getElementById("modalDescription").textContent = item.fullDescription;
    document.getElementById("modalLocation").textContent = item.municipality;
    document.getElementById("modalCategory").textContent = item.category;
    document.getElementById("modalActivities").textContent = item.activities;
    document.getElementById("modalBestTime").textContent = item.bestTimeToVisit;
    document.getElementById("modalFee").textContent = item.entranceFee;
    document.getElementById("modalHours").textContent = item.openingHours;
    document.getElementById("modalTips").textContent = item.travelTips;

    modal.show();
  };

  const applyFilters = () => {
    const term = (searchInput?.value || "").toLowerCase().trim();
    const category = categoryFilter?.value || "All";

    const filtered = destinationsData.filter((item) => {
      const matchesTerm =
        item.name.toLowerCase().includes(term) ||
        item.municipality.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      const matchesCategory = category === "All" || item.category === category;
      return matchesTerm && matchesCategory;
    });

    renderCards(filtered);
  };

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);

  renderCards(destinationsData);
}

function initInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const destinationSelect = document.getElementById("selectedDestination");
  if (destinationSelect) {
    for (const item of destinationsData) {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = `${item.name} (${item.municipality})`;
      destinationSelect.appendChild(option);
    }
  }

  const setError = (input, message) => {
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    input.classList.add("is-invalid");
    if (feedback) feedback.textContent = message;
  };

  const clearError = (input) => {
    input.classList.remove("is-invalid");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const contactNumber = document.getElementById("contactNumber");
    const travelDate = document.getElementById("travelDate");
    const visitors = document.getElementById("visitors");
    const message = document.getElementById("message");

    const inputs = [fullName, email, contactNumber, destinationSelect, travelDate, visitors, message];
    inputs.forEach(clearError);

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const digitsRegex = /^\d+$/;

    if (!fullName.value.trim()) {
      setError(fullName, "Full name is required.");
      isValid = false;
    }
    if (!emailRegex.test(email.value.trim())) {
      setError(email, "Enter a valid email address.");
      isValid = false;
    }
    if (!digitsRegex.test(contactNumber.value.trim())) {
      setError(contactNumber, "Contact number must contain numbers only.");
      isValid = false;
    }
    if (!destinationSelect.value) {
      setError(destinationSelect, "Please select a destination.");
      isValid = false;
    }
    if (!travelDate.value) {
      setError(travelDate, "Travel date is required.");
      isValid = false;
    }
    if (Number(visitors.value) < 1 || !visitors.value) {
      setError(visitors, "Number of visitors must be at least 1.");
      isValid = false;
    }
    if (!message.value.trim()) {
      setError(message, "Message is required.");
      isValid = false;
    }

    if (isValid) {
      const success = document.getElementById("formSuccess");
      if (success) success.classList.remove("d-none");
      form.reset();
    }
  });
}

function initGalleryLightbox() {
  const gallery = document.getElementById("provinceGallery");
  if (!gallery) return;

  const modalEl = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryModalImage");
  const modalCaption = document.getElementById("galleryCaption");
  const nextBtn = document.getElementById("galleryNext");
  const prevBtn = document.getElementById("galleryPrev");
  if (!modalEl || !modalImg || !modalCaption || !nextBtn || !prevBtn) return;

  const modal = new bootstrap.Modal(modalEl);
  const images = Array.from(gallery.querySelectorAll("img"));
  let current = 0;

  const showImage = (index) => {
    current = (index + images.length) % images.length;
    const img = images[current];
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaption.textContent = img.dataset.caption || img.alt;
  };

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index);
      modal.show();
    });
  });

  nextBtn.addEventListener("click", () => showImage(current + 1));
  prevBtn.addEventListener("click", () => showImage(current - 1));
}

document.addEventListener("DOMContentLoaded", () => {
  initDestinationsPage();
  initInquiryForm();
  initGalleryLightbox();
});

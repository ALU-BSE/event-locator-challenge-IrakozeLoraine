const events = [
    {
        "id": 1,
        "title": "Summer Music Festival",
        "date": "2023-08-15",
        "time": "14:00 - 22:00",
        "location": "Central Park, New York",
        "category": "music",
        "description": "Annual summer music festival featuring top artists from around the world.",
        "about": "Join us for a day filled with amazing music, food, and fun activities. This year's lineup includes international stars and local talents across multiple stages.",
        "price": "$45 - $120",
        "organizer": "Music Events Inc.",
        "image": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
    },
    {
        "id": 2,
        "title": "Tech Conference 2023",
        "date": "2023-09-10",
        "time": "09:00 - 18:00",
        "location": "Convention Center, San Francisco",
        "category": "business",
        "description": "The biggest tech conference of the year with industry leaders and innovators.",
        "about": "This conference brings together the brightest minds in technology to discuss the latest trends, innovations, and future directions. Includes keynote speeches, workshops, and networking opportunities.",
        "price": "$299",
        "organizer": "Tech Global",
        "image": "https://images.unsplash.com/photo-1431540015161-0bf868a2d407"
    },
    {
        "id": 3,
        "title": "Food & Wine Expo",
        "date": "2023-08-25",
        "time": "11:00 - 20:00",
        "location": "Exhibition Hall, Chicago",
        "category": "food",
        "description": "Experience the finest culinary delights and wines from around the world.",
        "about": "A gastronomic journey featuring top chefs, winemakers, and food producers. Includes cooking demonstrations, tastings, and opportunities to purchase specialty items.",
        "price": "$35 - $75",
        "organizer": "Gourmet Events",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
    },
    {
        "id": 4,
        "title": "Marathon City Run",
        "date": "2023-10-08",
        "time": "07:00 - 12:00",
        "location": "Downtown, Boston",
        "category": "sports",
        "description": "Annual city marathon with routes through historic neighborhoods.",
        "about": "Join thousands of runners in this annual tradition that supports local charities. Choose from full marathon, half marathon, or 5K options. All skill levels welcome!",
        "price": "$50 - $100",
        "organizer": "City Sports Foundation",
        "image": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
    },
    {
        "id": 5,
        "title": "Art Gallery Opening",
        "date": "2023-08-30",
        "time": "18:00 - 21:00",
        "location": "Modern Art Museum, Seattle",
        "category": "arts",
        "description": "Exclusive preview of the new contemporary art exhibition.",
        "about": "Be among the first to experience this groundbreaking exhibition featuring works from emerging and established artists. Includes live music and refreshments.",
        "price": "Free",
        "organizer": "Seattle Arts Council",
        "image": "https://images.unsplash.com/photo-1536922246289-88c42f957773"
    },
    {
        "id": 6,
        "title": "Jazz Night Under the Stars",
        "date": "2023-09-15",
        "time": "19:00 - 23:00",
        "location": "Riverside Amphitheater, Austin",
        "category": "music",
        "description": "An evening of smooth jazz with internationally renowned artists.",
        "about": "Relax under the stars while enjoying performances from some of the best jazz musicians in the world. Food and drinks available for purchase.",
        "price": "$25 - $60",
        "organizer": "Austin Music Society",
        "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Check the current page
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        initHomePage();
    } else if (path === 'events.html') {
        initEventsPage();
    } else if (path === 'event-details.html') {
        initEventDetailsPage();
    }
});

// Home Page Functions
function initHomePage() {
    // Display featured events (first 3 events)
    const featuredEventsContainer = document.getElementById('featuredEvents');
    const featuredEvents = events.slice(0, 3);
    console.log('Featured Events:', featuredEvents);
    
    featuredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        featuredEventsContainer.appendChild(eventCard);
    });
    
    // Handle search form submission
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('searchInput').value;
            const dateFilter = document.getElementById('dateFilter').value;
            const categoryFilter = document.getElementById('categoryFilter').value;
            
            // Store filters in localStorage to use on events page
            localStorage.setItem('searchFilters', JSON.stringify({
                searchTerm,
                dateFilter,
                categoryFilter
            }));
            
            // Navigate to events page
            window.location.href = 'events.html';
        });
    }
}

// Events Page Functions
function initEventsPage() {
    // Get filters from localStorage
    const filters = JSON.parse(localStorage.getItem('searchFilters')) || {};
    const searchTerm = filters.searchTerm || '';
    const dateFilter = filters.dateFilter || 'all';
    const categoryFilter = filters.categoryFilter || 'all';
    
    // Filter events based on criteria
    let filteredEvents = [...events];
    
    // Apply search term filter
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Apply date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            
            switch(dateFilter) {
                case 'today':
                    return eventDate.toDateString() === today.toDateString();
                case 'week':
                    const nextWeek = new Date(today);
                    nextWeek.setDate(today.getDate() + 7);
                    return eventDate >= today && eventDate <= nextWeek;
                case 'month':
                    const nextMonth = new Date(today);
                    nextMonth.setMonth(today.getMonth() + 1);
                    return eventDate >= today && eventDate <= nextMonth;
                default:
                    return true;
            }
        });
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === categoryFilter);
    }
    
    // Display filtered events
    displayEvents(filteredEvents);
    
    // Set up event listeners
    document.getElementById('backToSearch').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    document.getElementById('sortEvents').addEventListener('change', function() {
        const sortValue = this.value;
        sortAndDisplayEvents(filteredEvents, sortValue);
    });
    
    document.getElementById('eventSearch').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const sortedEvents = [...filteredEvents].filter(event => 
            event.title.toLowerCase().includes(searchValue) ||
            event.description.toLowerCase().includes(searchValue)
        );
        displayEvents(sortedEvents);
    });
}

function sortAndDisplayEvents(eventsToSort, sortValue) {
    let sortedEvents = [...eventsToSort];
    
    switch(sortValue) {
        case 'date-asc':
            sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'name-asc':
            sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
    
    displayEvents(sortedEvents);
}

function displayEvents(eventsToDisplay) {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';
    
    if (eventsToDisplay.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-muted">No events found</h3>
                <p>Try adjusting your search criteria</p>
                <button class="btn btn-primary" onclick="window.location.href='index.html'">Back to Search</button>
            </div>
        `;
        return;
    }
    
    eventsToDisplay.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-5 col-lg-4 col-xl-3';
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card event-card h-100';
    
    // Format date
    const eventDate = new Date(event.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = eventDate.toLocaleDateString('en-US', options);
    
    cardDiv.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="${event.title}">
        <div class="card-body">
            <span class="badge bg-primary mb-2">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${formattedDate}</small>
                <a href="event-details.html?id=${event.id}" class="btn btn-sm btn-outline-primary">Details</a>
            </div>
        </div>
    `;
    
    colDiv.appendChild(cardDiv);
    return colDiv;
}

// Event Details Page Functions
function initEventDetailsPage() {
    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    // Find the event
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        // Event not found, redirect to events page
        window.location.href = 'events.html';
        return;
    }
    
    // Populate event details
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventImage').src = event.image;
    document.getElementById('eventImage').alt = event.title;
    document.getElementById('eventCategory').textContent = event.category.charAt(0).toUpperCase() + event.category.slice(1);
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventAbout').textContent = event.about;
    
    // Format date for display
    const eventDate = new Date(event.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = eventDate.toLocaleDateString('en-US', options);
    
    document.getElementById('eventDate').textContent = formattedDate;
    document.getElementById('eventDetailDate').textContent = formattedDate;
    document.getElementById('eventTime').textContent = event.time;
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventPrice').textContent = event.price;
    document.getElementById('eventOrganizer').textContent = event.organizer;
    
    // Set up event listeners
    document.getElementById('backToEvents').addEventListener('click', function() {
        window.location.href = 'events.html';
    });
    
    document.getElementById('bookTicket').addEventListener('click', function() {
        alert(`Booking ticket for ${event.title}`);
    });
}

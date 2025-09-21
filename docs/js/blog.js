// ============================================
// Blog Page JavaScript
// ============================================

// Blog configuration
const POSTS_PER_PAGE = 6;
let currentPage = 1;
let filteredPosts = [];
let currentFilter = {
    search: '',
    category: '',
    sort: 'newest'
};

// Wait for DOM and main.js to load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for main.js to load
    setTimeout(() => {
        if (window.blogData) {
            initBlogPage();
        }
    }, 100);
});

// ============================================
// Initialize Blog Page
// ============================================
function initBlogPage() {
    const postsGrid = document.getElementById('blog-posts-grid');
    
    if (postsGrid) {
        // Initialize with all posts
        filteredPosts = [...window.blogData.posts];
        
        // Initialize controls
        initSearchBar();
        initFilters();
        
        // Display initial posts
        displayPosts();
    }
}

// ============================================
// Initialize Search Bar
// ============================================
function initSearchBar() {
    const searchInput = document.getElementById('blog-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            currentFilter.search = e.target.value.toLowerCase();
            filterAndDisplayPosts();
        }, 300));
    }
}

// ============================================
// Initialize Filters
// ============================================
function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            currentFilter.category = e.target.value;
            filterAndDisplayPosts();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function(e) {
            currentFilter.sort = e.target.value;
            filterAndDisplayPosts();
        });
    }
}

// ============================================
// Filter and Display Posts
// ============================================
function filterAndDisplayPosts() {
    // Start with all posts
    filteredPosts = [...window.blogData.posts];
    
    // Apply search filter
    if (currentFilter.search) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(currentFilter.search) ||
            post.excerpt.toLowerCase().includes(currentFilter.search) ||
            post.category.toLowerCase().includes(currentFilter.search)
        );
    }
    
    // Apply category filter
    if (currentFilter.category) {
        filteredPosts = filteredPosts.filter(post => 
            post.category === currentFilter.category
        );
    }
    
    // Apply sorting
    switch (currentFilter.sort) {
        case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            // For demo, we'll sort by reading time (in real app, this would be view count)
            filteredPosts.sort((a, b) => b.readingTime - a.readingTime);
            break;
        case 'newest':
        default:
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    // Reset to first page when filters change
    currentPage = 1;
    
    // Display filtered posts
    displayPosts();
}

// ============================================
// Display Posts with Pagination
// ============================================
function displayPosts() {
    const postsGrid = document.getElementById('blog-posts-grid');
    const noResults = document.getElementById('no-results');
    
    if (!postsGrid) return;
    
    // Clear current posts
    postsGrid.innerHTML = '';
    
    // Check if there are any posts
    if (filteredPosts.length === 0) {
        postsGrid.style.display = 'none';
        if (noResults) {
            noResults.style.display = 'block';
        }
        hidePagination();
        return;
    } else {
        postsGrid.style.display = 'grid';
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToDisplay = filteredPosts.slice(startIndex, endIndex);
    
    // Display posts
    postsToDisplay.forEach((post, index) => {
        const postCard = window.blogData.createPostCard(post);
        
        // Add animation delay
        postCard.style.opacity = '0';
        postCard.style.transform = 'translateY(20px)';
        postCard.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        
        postsGrid.appendChild(postCard);
    });
    
    // Update pagination
    updatePagination();
}

// ============================================
// Update Pagination
// ============================================
function updatePagination() {
    const pagination = document.getElementById('pagination');
    
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    // Hide pagination if only one page
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
            scrollToTop();
        }
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page and dots
    if (startPage > 1) {
        const firstPageBtn = createPageButton(1);
        pagination.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'pagination-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        pagination.appendChild(pageBtn);
    }
    
    // Last page and dots
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'pagination-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
        
        const lastPageBtn = createPageButton(totalPages);
        pagination.appendChild(lastPageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPosts();
            scrollToTop();
        }
    });
    pagination.appendChild(nextBtn);
}

// ============================================
// Create Page Button
// ============================================
function createPageButton(pageNumber) {
    const button = document.createElement('button');
    button.className = 'pagination-btn';
    if (pageNumber === currentPage) {
        button.classList.add('active');
    }
    button.textContent = pageNumber;
    button.addEventListener('click', () => {
        currentPage = pageNumber;
        displayPosts();
        scrollToTop();
    });
    return button;
}

// ============================================
// Hide Pagination
// ============================================
function hidePagination() {
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.style.display = 'none';
    }
}

// ============================================
// Scroll to Top
// ============================================
function scrollToTop() {
    const blogSection = document.querySelector('.blog-posts');
    if (blogSection) {
        const offsetTop = blogSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============================================
// Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Add CSS for pagination dots
// ============================================
const style = document.createElement('style');
style.textContent = `
    .pagination-dots {
        padding: 0 8px;
        color: var(--text-secondary);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Simple page view counter using localStorage
document.addEventListener('DOMContentLoaded', function() {
    const pageUrl = window.location.pathname;
    const storageKey = 'pageViews_' + btoa(pageUrl).replace(/[^a-zA-Z0-9]/g, '');
    
    // Get current view count
    let viewCount = parseInt(localStorage.getItem(storageKey) || '0');
    
    // Increment view count (only once per session per page)
    const sessionKey = 'session_' + storageKey;
    if (!sessionStorage.getItem(sessionKey)) {
        viewCount++;
        localStorage.setItem(storageKey, viewCount.toString());
        sessionStorage.setItem(sessionKey, 'viewed');
    }
    
    // Display view count in multiple possible locations
    const selectors = ['#page-views', '.leancloud_visitors', '.post-meta-views'];
    
    selectors.forEach(selector => {
        const viewsElement = document.querySelector(selector);
        if (viewsElement) {
            viewsElement.innerHTML = `<i class="far fa-eye fa-fw" aria-hidden="true"></i>&nbsp;${viewCount}&nbsp;görüntülenme`;
        }
    });
    
    // Also try to find and update existing view counters
    const existingCounters = document.querySelectorAll('.leancloud-visitors-count');
    existingCounters.forEach(counter => {
        counter.textContent = viewCount;
    });
});
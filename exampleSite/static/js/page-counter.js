// Simple page view counter using localStorage
(function() {
    const pageUrl = window.location.pathname;
    const storageKey = 'pageViews_' + btoa(pageUrl).replace(/[^a-zA-Z0-9]/g, '');
    
    // Get current view count
    let viewCount = parseInt(localStorage.getItem(storageKey) || '0');
    
    // Increment view count
    viewCount++;
    localStorage.setItem(storageKey, viewCount.toString());
    
    // Display view count
    const viewsElement = document.getElementById('page-views');
    if (viewsElement) {
        viewsElement.innerHTML = `<i class="far fa-eye fa-fw"></i> ${viewCount} görüntülenme`;
    }
})();
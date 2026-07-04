// Theme management (Dark Mode / Light Mode)
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check saved theme or preference
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = 'light';
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (userPrefersDark) {
        currentTheme = 'dark';
    }
    
    // Set theme on HTML element
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
});

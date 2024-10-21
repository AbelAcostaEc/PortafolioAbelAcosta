document.addEventListener("DOMContentLoaded", function () {
    try {
        const darkModeToggle = new DarkModeToggle(".dark-mode-button");
    } catch (error) {
        console.error("Error initializing DarkModeToggle:", error);
    }

    try {
        const myTypeWriter = new TypeWriter(["Programador", "Desarrollador Web"], "#typewriter", 200);
    } catch (error) {
        console.error("Error initializing TypeWriter:", error);
    }

    try {
        const mySectionChanger = new SectionChanger(".about-tabs", ".about-sections");
    } catch (error) {
        console.error("Error initializing SectionChanger:", error);
    }

    try {
        const myPortfolioFetcher = new PortfolioFetcher("container-jobs");
        myPortfolioFetcher.fetchPortfolio("build/assets/portfolio.json");
    } catch (error) {
        console.error("Error initializing PortfolioFetcher:", error);
    }

    try {
        const myMobileMenu = new MobileMenu("btn-mobile-menu", "i", ".menu");
    } catch (error) {
        console.error("Error initializing MobileMenu:", error);
    }

    try {
        const markdownViewer = new MarkdownViewer();
    } catch (error) {
        console.error("Error initializing MarkdownViewer:", error);
    }
});

window.addEventListener("load", () => {
    try {
        preloader(".container-loader");
    } catch (error) {
        console.error("Error in preloader:", error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
	// Inicializar DarkModeToggle
	const darkModeToggle = new DarkModeToggle(".dark-mode-button");

	// Crear una instancia de la clase TypeWriter
	const myTypeWriter = new TypeWriter(
		["Programador", "Desarrollador Web"],
		"#typewriter",
		200
	);

	// Crear una instancia de la clase SectionChanger
	const mySectionChanger = new SectionChanger(".about-tabs", ".about-sections");

	// Crear una instancia de la clase PortfolioFetcher con el ID del contenedor
	const myPortfolioFetcher = new PortfolioFetcher("container-jobs");

	// Llamar al método fetchPortfolio con la ruta al archivo JSON de trabajos
	myPortfolioFetcher.fetchPortfolio("build/assets/portfolio.json");

	// Crear una instancia de la clase MobileMenu con los selectores y ID correspondientes
	const myMobileMenu = new MobileMenu("btn-mobile-menu", "i", ".menu");
});

window.addEventListener("load", () => {
	preloader(".container-loader");
});

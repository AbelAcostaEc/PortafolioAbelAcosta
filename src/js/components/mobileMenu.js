/**
 * Clase MobileMenu: Gestiona la funcionalidad del menú móvil.
 */
class MobileMenu {
	/**
	 * Constructor de la clase.
	 * @param {string} buttonId - ID del botón del menú móvil.
	 * @param {string} iconSelector - Selector del ícono en el botón del menú móvil.
	 * @param {string} menuSelector - Selector del menú móvil.
	 */
	constructor(buttonId, iconSelector, menuSelector) {
		// Elementos del DOM relacionados con el menú móvil
		this.button = document.querySelector(`#${buttonId}`);
		this.icon = this.button.querySelector(iconSelector);
		this.menu = document.querySelector(menuSelector);

		// Estado del menú móvil
		this.active = false;

		// Enlazar el método toggleMenu al contexto actual de la instancia
		this.toggleMenu = this.toggleMenu.bind(this);

		// Agregar el evento click al botón del menú móvil
		this.button.addEventListener("click", this.toggleMenu);
	}

	/**
	 * Método toggleMenu: Alterna la visibilidad del menú móvil y actualiza la apariencia.
	 */
	toggleMenu() {
		// Cambiar el estado del menú móvil
		this.active = !this.active;

		// Actualizar la apariencia del menú móvil según el estado
		if (this.active) {
			this.menu.style.opacity = "1";
			this.menu.classList.add("active");
			this.icon.classList.remove("fa-bars");
			this.icon.classList.add("fa-close");
		} else {
			this.menu.style.opacity = "0";
			this.menu.classList.remove("active");
			this.icon.classList.remove("fa-close");
			this.icon.classList.add("fa-bars");
		}
	}
}

// Crear una instancia de la clase MobileMenu con los selectores y ID correspondientes
/* try {
	const myMobileMenu = new MobileMenu("btn-mobile-menu", "i", ".menu");
} catch (error) {
	console.error("Error initializing MobileMenu:", error);
} */

/**
 * Clase DarkModeToggle: Administra el modo oscuro en la página web.
 */
class DarkModeToggle {
	/**
	 * Constructor de la clase.
	 * @param {string} buttonSelector - Selector del botón que activa/desactiva el modo oscuro.
	 */
	constructor(buttonSelector) {
		// Seleccionar el botón mediante el selector proporcionado.
		this.darkModeButton = document.querySelector(buttonSelector);

		// Verifica si existe el botón.
		if (!this.darkModeButton) {
			console.warn(
				`El selector '${buttonSelector}' no coincide con ninguño de los botones de la página.`
			);
			return;
		}

		// Verificar si el sistema prefiere el modo oscuro.
		this.prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

		// Inicializar el modo oscuro según la preferencia del usuario.
		this.toggleDarkMode();

		// Agregar un listener para cambios en la preferencia de color del sistema.
		this.prefersDarkMode.addEventListener(
			"change",
			this.toggleDarkMode.bind(this)
		);

		// Agregar un listener al botón para alternar manualmente el modo oscuro.
		this.darkModeButton.addEventListener("click", this.toggleDarkMode.bind(this));
	}

	/**
	 * Método para alternar el modo oscuro en el cuerpo de la página.
	 */
	toggleDarkMode() {
		// Alternar la clase "dark-mode" en el cuerpo de la página según la preferencia del usuario.
		document.body.classList.toggle("dark-mode", this.prefersDarkMode.matches);
	}
}

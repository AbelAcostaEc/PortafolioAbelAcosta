/**
 * Clase SectionChanger: Administra el cambio de secciones al hacer clic en enlaces de pestañas.
 */
class SectionChanger {
	/**
	 * Constructor de la clase.
	 * @param {string} tabSelector - Selector de las pestañas de navegación.
	 * @param {string} sectionSelector - Selector de las secciones correspondientes.
	 */
	constructor(tabSelector, sectionSelector) {
		// Obtener todos los enlaces dentro de las pestañas de navegación
		this.links = document.querySelectorAll(`${tabSelector} a`);
		// Selector para las secciones correspondientes
		this.sectionSelector = sectionSelector;
		// Enlazar el método changeSection al contexto actual de la instancia
		this.changeSection = this.changeSection.bind(this);

		// Agregar el evento click a cada enlace para manejar el cambio de sección
		this.links.forEach((link) => {
			link.addEventListener("click", this.changeSection);
		});
	}

	/**
	 * Método setActiveSection: Cambia la clase activa entre secciones.
	 * @param {string} sectionId - ID de la sección a activar.
	 */
	setActiveSection(sectionId) {
		// Obtener la sección correspondiente y la sección activa actual
		const section = document.getElementById(sectionId);
		const activeSection = document.querySelector(".active-section");

		// Verificar si la sección correspondiente no es la sección activa actual
		if (section && section !== activeSection) {
			// Desactivar la sección actual y activar la nueva sección
			activeSection.classList.remove("active-section");
			section.classList.add("active-section");
		}
	}

	/**
	 * Método setActiveLink: Cambia la clase activa entre enlaces.
	 * @param {HTMLElement} selectedLink - Enlace seleccionado que se activará.
	 */
	setActiveLink(selectedLink) {
		// Obtener el enlace activo actual dentro del selector de secciones
		const activeLink = document.querySelector(`${this.sectionSelector} a.active`);

		// Verificar si el enlace seleccionado no es el enlace activo actual
		if (selectedLink && selectedLink !== activeLink) {
			// Desactivar el enlace actual y activar el nuevo enlace
			activeLink.classList.remove("active");
			selectedLink.classList.add("active");
		}
	}

	/**
	 * Método changeSection: Maneja el evento de clic en un enlace y cambia la sección activa.
	 * @param {Event} event - Evento de clic.
	 */
	changeSection(event) {
		// Prevenir el comportamiento predeterminado del enlace
		event.preventDefault();

		// Obtener el ID de la sección correspondiente al enlace clicado
		const sectionId = event.currentTarget.getAttribute("href").substring(1);

		// Llamar a los métodos para cambiar la sección activa y la clase activa del enlace
		this.setActiveSection(sectionId);
		this.setActiveLink(event.currentTarget);
	}
}

// Crear una instancia de la clase SectionChanger con los selectores de pestañas y secciones
// const mySectionChanger = new SectionChanger(".about-tabs", ".about-sections");

/* try {
	const mySectionChanger = new SectionChanger(".about-tabs", ".about-sections");
} catch (error) {
	console.error("Error initializing SectionChanger:", error);
} */
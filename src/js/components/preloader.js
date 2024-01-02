// Función para ocultar el preloader
const preloader = (containerSelector) => {
	// Seleccionar el contenedor del preloader utilizando el selector proporcionado
	const containerLoader = document.querySelector(containerSelector);

	if (containerLoader) {
		// Establecer la opacidad a 0 para hacerlo invisible
		containerLoader.style.opacity = 0;

		// Establecer la visibilidad a "hidden" para ocultarlo
		containerLoader.style.visibility = "hidden";

		// Puedes agregar un mensaje de consola si es necesario
		// console.log("Preloader finalizado");
	} else {
		console.error(
			"Error: No se encontró el contenedor con el selector proporcionado."
		);
	}
};

// Llamar a la función para ocultar el preloader con un selector específico
// preloader("#preload");

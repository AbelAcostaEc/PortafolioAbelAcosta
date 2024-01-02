/**
 * Clase PortfolioFetcher: Obtiene y muestra trabajos desde un archivo JSON.
 */
class PortfolioFetcher {
	/**
	 * Constructor de la clase.
	 * @param {string} containerId - ID del elemento contenedor donde se mostrarán las cards.
	 */
	constructor(containerId) {
		// Obtener el elemento contenedor donde se mostrarán las cards
		this.container = document.getElementById(containerId);
	}

	/**
	 * Método fetchPortfolio: Obtiene trabajos desde un archivo JSON y los muestra.
	 * @param {string} jsonPath - Ruta al archivo JSON que contiene la información de los trabajos.
	 */
	fetchPortfolio(jsonPath) {
		// Hacer una solicitud para obtener el archivo JSON
		fetch(jsonPath)
			.then((response) => response.json())
			.then((data) => {
				// Recorrer el arreglo de trabajos en el archivo JSON
				data.trabajos.forEach((trabajo) => {
					// Crear los elementos HTML para cada trabajo
					const card = document.createElement("div");
					card.classList.add("card");

					const imageContainer = document.createElement("div");
					const image = document.createElement("img");
					image.src = trabajo.imagen;
					image.alt = trabajo.titulo;
					imageContainer.classList.add("img-card");
					imageContainer.appendChild(image);

					card.addEventListener("click", () => {
						const myModal = new CustomModal(".modal", ".close-btn");
						myModal.showModal(trabajo);
					});

					const title = document.createElement("h2");
					title.textContent = trabajo.titulo;

					const description = document.createElement("p");
					description.textContent = trabajo.descripcion;

					// Añadir los elementos HTML creados al contenedor de cards
					card.appendChild(imageContainer);
					card.appendChild(title);
					card.appendChild(description);
					this.container.appendChild(card);
				});
			})
			.catch((error) => console.error(error));
	}
}
// Crear una instancia de la clase PortfolioFetcher con el ID del contenedor
// const myPortfolioFetcher = new PortfolioFetcher("container-jobs");

// Llamar al método fetchPortfolio con la ruta al archivo JSON de trabajos
// myPortfolioFetcher.fetchPortfolio("build/assets/portfolio.json");

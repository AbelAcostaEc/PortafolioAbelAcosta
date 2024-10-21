class MarkdownViewer {
    constructor() {
        // Seleccionar todos los elementos que tienen el atributo data-as-markdown
        this.markdowns = document.querySelectorAll("[data-as-markdown]");
        // Inicializar el visor de Markdown
        this.init();
    }

    init() {
        console.log("MarkdownViewer initialized");
        
        // Iterar sobre cada elemento markdown encontrado
        this.markdowns.forEach((markdown) => {
            // Añadir un evento click para cada elemento
            markdown.addEventListener("click", () => {
                this.getElementData(markdown);
            });

            // Si el elemento tiene el atributo data-as-active, simular un clic
            if (markdown.dataset.asActive) {
                markdown.dispatchEvent(new Event("click"));
            }
        });
    }

    async getElementData(element) {
        // Obtener la URL del elemento desde el atributo data-as-url
        const url = element.dataset.asUrl;
        // Verificar si la URL está definida
        if (!url) {
            console.warn(`El elemento ${element} no tiene data-as-url`);
            return; // Salir si no hay URL
        }

        // Obtener el elemento donde se va a desplegar el contenido Markdown
        const target = document.querySelector(element.dataset.asTarget);

        // Validar si el elemento objetivo existe
        if (!target) {
            console.warn(`No se encontró el elemento con el selector ${element.dataset.asTarget}`);
            return; // Salir si no se encuentra el objetivo
        }

        // Actualizar el estado de los elementos
        this.updateActiveState(element);

        // Cargar el contenido Markdown desde la URL
        const html = await this.loadMarkdownContent(url);
        
        // Si se ha cargado contenido, insertarlo en el elemento objetivo
        if (html) {
            const markdownViewerResult = this.getHtmlContent(html);
            // insertar el div en el elemento objetivo
            target.innerHTML = "";
            target.appendChild(markdownViewerResult);
        } else {
            const markdownViewerResult = this.getHtmlContent("<p>No se pudo cargar el contenido de Markdown desde " + url + "</p>");
            // insertar el div en el elemento objetivo
            target.innerHTML = "";
            target.appendChild(markdownViewerResult);
            // Si no se ha podido cargar el contenido, mostrar un mensaje de error
            console.error(`No se pudo cargar el contenido de Markdown desde ${url}`);
        }
    }

    getHtmlContent(html) {
        // crear un div con clase markdownViewerResult
            const markdownViewerResult = document.createElement("div");
            markdownViewerResult.classList.add("markdownViewerResult");
            // insertar el contenido HTML en el div
            markdownViewerResult.innerHTML = html;

            return markdownViewerResult;
    }

    updateActiveState(activeElement) {
        // Iterar sobre todos los elementos markdown
        this.markdowns.forEach((markdown) => {
            // Si es el elemento activo, agregar data-as-active
            if (markdown === activeElement) {
                markdown.dataset.asActive = true;
            } else {
                // Eliminar data-as-active de los demás elementos
                delete markdown.dataset.asActive;
            }
        });
    }


    async loadMarkdownContent(url) {
        try {
            // Hacer una solicitud fetch a la URL proporcionada
            const response = await fetch(url);

            // Verificar si la respuesta fue exitosa (código de estado 200)
            if (!response.ok) {
                console.warn(`Error al cargar el Markdown: ${response.status} ${response.statusText}`);
                return false; // Retornar false si hay un error en la respuesta
            }

            // Leer el contenido de la respuesta como texto
            const markdown = await response.text();
            // Convertir el contenido Markdown a HTML usando la biblioteca 'marked'
            const html = marked.parse(markdown);
            
            return html; // Retornar el contenido HTML generado
        } catch (error) {
            // Manejar cualquier error que ocurra durante la solicitud
            console.error(`Error en la carga del Markdown: ${error}`);
            return false; // Retornar false en caso de error
        }
    }
}

/* try {
    const markdownViewer = new MarkdownViewer();
} catch (error) {
    console.error("Error initializing MarkdownViewer:", error);
} */
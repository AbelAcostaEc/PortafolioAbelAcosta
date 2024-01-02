/**
 * Clase CustomModal: Administra la visualización de un modal con información dinámica.
 */
class CustomModal {
    /**
     * Constructor de la clase.
     * @param {string} modalSelector - Selector del modal.
     * @param {string} closeButtonSelector - Selector del botón de cierre del modal.
     */
    constructor(modalSelector, closeButtonSelector) {
      // Elementos del DOM relacionados con el modal
      this.modal = document.querySelector(modalSelector);
      this.closeModalButton = document.querySelector(closeButtonSelector);
  
      // Elementos específicos dentro del modal
      this.modalTitle = this.modal.querySelector(".modal-title");
      this.modalImage = this.modal.querySelector(".modal-image");
      this.modalDescription = this.modal.querySelector(".description p");
      this.modalTechnologies = this.modal.querySelector(".technologies ul");
      this.btnProject = this.modal.querySelector(".btn-project");
  
      // Enlazar el método closeModal al contexto actual de la instancia
      this.closeModal = this.closeModal.bind(this);
  
      // Agregar el evento click al botón de cierre
      this.closeModalButton.addEventListener("click", this.closeModal);
    }
  
    /**
     * Método showModal: Muestra el modal con la información proporcionada.
     * @param {object} data - Datos a mostrar en el modal (title, image, description, technologies, url).
     */
    showModal(data) {
      // Actualizar el contenido del modal con los datos proporcionados
      this.modalTitle.textContent = data.titulo;
      this.modalImage.src = data.imagen;
      this.modalImage.alt = data.titulo;
      this.modalDescription.textContent = data.descripcion;
      this.modalTechnologies.innerHTML = data.tecnologias
        .map((tech) => `<li>${tech}</li>`)
        .join("");
  
      this.btnProject.href = data.url;
      this.btnProject.textContent = "Ver Proyecto";
  
      // Mostrar el modal con una animación de fade
      this.modal.style.opacity = 0;
      this.modal.style.display = "block";
  
      // Utilizar requestAnimationFrame para iniciar la animación
      requestAnimationFrame(() => {
        this.modal.style.opacity = 1;
      });
    }
  
    /**
     * Método closeModal: Cierra el modal con una animación de fade.
     */
    closeModal() {
      // Ocultar el modal con una animación de fade
      this.modal.style.opacity = 0;
  
      // Utilizar eventos de transición para cambiar la visibilidad después de la animación
      this.modal.addEventListener("transitionend", () => {
        this.modal.style.display = "none";
      }, { once: true });
    }
  }

  
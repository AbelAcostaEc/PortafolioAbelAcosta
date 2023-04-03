window.addEventListener("load", () => {
  preloader();
  mobileMenu();
  typeWritter();
  changeSection();
  getPortfolio();
});

function preloader() {
  //Preloader
  const containerLoader = document.querySelector(".container-loader");
  containerLoader.style.opacity = 0;
  containerLoader.style.visibility = "hidden";
  // console.log("preloader finalizado");
}

function mobileMenu() {
  const btnMenu = document.querySelector("#btn-mobile-menu"),
    btnIcon = btnMenu.querySelector("i"),
    menu = document.querySelector(".menu");

  let active = false;

  btnMenu.addEventListener("click", () => {
    active = !active;
    if (active) {
      menu.style.opacity = "1";
      menu.classList.add("active");
      btnIcon.classList.remove("fa-bars");
      btnIcon.classList.add("fa-close");
    } else {
      menu.style.opacity = "0";
      menu.classList.remove("active");
      btnIcon.classList.remove("fa-close");
      btnIcon.classList.add("fa-bars");
    }
  });
}

function typeWritter() {
  var palabras = ["Programador", "Desarrollador Web"];
  var indice = 0;
  var letra = 0;
  var temporizador = setInterval(function () {
    var texto = palabras[indice].substring(0, letra);
    document.getElementById("typewriter").innerHTML = texto;
    letra++;
    if (letra > palabras[indice].length) {
      indice++;
      letra = 0;
    }
    if (indice == palabras.length) {
      indice = 0;
    }
  }, 200);
}

function changeSection() {
  // Obtener los enlaces de navegación
  var links = document.querySelectorAll(".about-tabs a");

  // Recorrer los enlaces y agregar el evento click a cada uno
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();

      // Obtener el ID de la sección correspondiente
      var sectionId = this.getAttribute("href").substring(1);

      // Obtener la sección correspondiente y la sección activa actual
      var section = document.getElementById(sectionId);
      var activeSection = document.querySelector(".active-section");

      // Si la sección correspondiente no es la sección activa actual, cambiar entre ellas
      if (section !== activeSection) {
        activeSection.classList.remove("active-section");
        section.classList.add("active-section");
      }

      // Cambiar la clase "active" en el enlace correspondiente
      document.querySelector(".about-tabs a.active").classList.remove("active");
      this.classList.add("active");
    });
  }
}

function modalPortfolio(proyecto) {
  var modal = document.querySelector(".modal");
  var modalTitle = modal.querySelector(".modal-title");
  var modalImage = modal.querySelector(".modal-image");
  var modalDescription = modal.querySelector(".description p");
  var modalTechnologies = modal.querySelector(".technologies p");
  var btnProject = modal.querySelector(".btn-project");
  var closeModalButton = document.querySelector(".close-btn");
  console.log(proyecto);
  // Mostrar la información del proyecto en la modal
  modalTitle.textContent = proyecto.titulo;
  modalImage.src = proyecto.imagen;
  modalDescription.textContent = proyecto.descripcion;
  modalTechnologies.innerHTML = proyecto.tecnologias
    .map((tec) => `<li>${tec}</li>`)
    .join("");

  btnProject.href = proyecto.url;
  btnProject.textContent = "Ver Proyecto";
  // Abrir la modal
  modal.style.display = "block";

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

function getPortfolio() {
  // Obtener el elemento contenedor donde se mostrarán las cards
  const contenedor = document.getElementById("container-jobs");

  // Hacer una solicitud para obtener el archivo JSON
  fetch("build/assets/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      // Recorrer el arreglo de trabajos en el archivo JSON
      data.trabajos.forEach((trabajo) => {
        // Crear los elementos HTML para cada trabajo
        const card = document.createElement("div");
        card.classList.add("card");
        const imageContainer = document.createElement("div");
        const imagen = document.createElement("img");
        imagen.src = trabajo.imagen;
        imageContainer.classList.add("img-card");
        imageContainer.appendChild(imagen);
        card.addEventListener("click", () => {
          modalPortfolio(trabajo);
        });
        const titulo = document.createElement("h2");
        titulo.textContent = trabajo.titulo;
        const descripcion = document.createElement("p");
        descripcion.textContent = trabajo.descripcion;

        // Añadir los elementos HTML creados al contenedor de cards
        card.appendChild(imageContainer);
        card.appendChild(titulo);
        card.appendChild(descripcion);
        contenedor.appendChild(card);
      });
    })
    .catch((error) => console.error(error));
}

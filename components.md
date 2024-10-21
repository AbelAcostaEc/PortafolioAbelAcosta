# Guía de Usuario para Componentes JavaScript

## 1. DarkModeToggle

### Descripción

Administra el modo oscuro en la página web.

### Uso

```javascript
const darkModeToggle = new DarkModeToggle(".dark-mode-button");
```

### HTML

Asegúrate de tener un botón para activar/desactivar el modo oscuro.

```html
<button class="dark-mode-button">Toggle Dark Mode</button>
```

### Métodos

-   `toggleDarkMode()`: Alterna el modo oscuro en el cuerpo de la página.

### CSS

Define estilos para la clase `.dark-mode`.

```css
.dark-mode {
    background-color: #333;
    color: #fff;
}
```

---

## 2. MobileMenu

### Descripción

Gestiona la funcionalidad del menú móvil.

### Uso

```javascript
const myMobileMenu = new MobileMenu("btn-mobile-menu", "i", ".menu");
```

### HTML

Asegúrate de tener un botón y un menú configurados correctamente.

```html
<button id="btn-mobile-menu">
    <i class="fa fa-bars"></i>
</button>
<nav class="menu" style="opacity: 0;">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#portfolio">Portfolio</a>
</nav>
```

### Métodos

-   `toggleMenu()`: Alterna la visibilidad del menú móvil y actualiza la apariencia del ícono.

---

## 3. PortfolioFetcher

### Descripción

Obtiene y muestra trabajos desde un archivo JSON.

### Uso

```javascript
const myPortfolioFetcher = new PortfolioFetcher("container-jobs");
myPortfolioFetcher.fetchPortfolio("build/assets/portfolio.json");
```

### HTML

Asegúrate de tener un contenedor donde se mostrarán las "cards".

```html
<div id="container-jobs"></div>
```

### JSON

Asegúrate de que el archivo JSON tenga la estructura adecuada.

```json
{
    "trabajos": [
        {
            "titulo": "Proyecto 1",
            "descripcion": "Descripción del Proyecto 1.",
            "imagen": "ruta/a/imagen1.jpg"
        },
        {
            "titulo": "Proyecto 2",
            "descripcion": "Descripción del Proyecto 2.",
            "imagen": "ruta/a/imagen2.jpg"
        }
    ]
}
```

---

## 4. Preloader

### Descripción

Oculta un elemento de preloading en la página.

### Uso

```javascript
preloader(".container-loader");
```

### HTML

Asegúrate de tener un contenedor para el preloader.

```html
<div class="container-loader">
    <div class="loader"></div>
</div>
```

### CSS

Define estilos para el contenedor del preloader.

```css
#preload {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.5s ease;
}
```

---

## 5. SectionChanger

### Descripción

Administra el cambio de secciones al hacer clic en enlaces de pestañas.

### Uso

```javascript
const mySectionChanger = new SectionChanger(".about-tabs", ".about-sections");
```

### HTML

Asegúrate de que las pestañas y secciones estén configuradas correctamente.

```html
<div class="about-tabs">
    <a href="#section1">Sección 1</a>
    <a href="#section2">Sección 2</a>
</div>
<div class="about-sections">
    <div id="section1" class="active-section">Contenido de Sección 1</div>
    <div id="section2">Contenido de Sección 2</div>
</div>
```

### CSS

Define estilos para `.active-section` y los enlaces activos.

```css
.active-section {
    display: block;
}
.about-sections div {
    display: none;
}
.about-sections .active-section {
    display: block;
}
```

---

## 6. TypeWriter

### Descripción

Representa una máquina de escribir que muestra palabras una por una.

### Uso

```javascript
const myTypeWriter = new TypeWriter(
    ["Programador", "Desarrollador Web"],
    "#typewriter",
    200
);
```

### HTML

Asegúrate de tener un elemento donde se mostrará el texto.

```html
<div id="typewriter"></div>
```

### CSS

Aplica estilos al elemento para que se vea más atractivo.

```css
#typewriter {
    font-family: monospace;
    font-size: 24px;
    white-space: nowrap;
}
```

# Guía de Usuario: MarkdownViewer

## Descripción

El `MarkdownViewer` es un componente que permite cargar y mostrar contenido en formato Markdown dentro de elementos HTML. Este componente facilita la interacción al permitir que los usuarios hagan clic en diferentes elementos para visualizar diferentes archivos Markdown.

## Requisitos Previos

Asegúrate de tener lo siguiente en tu proyecto:

-   La biblioteca `marked` para convertir Markdown a HTML.
-   Estructura HTML adecuada para el uso del componente.

## Estructura HTML

Para utilizar el `MarkdownViewer`, tu HTML debe incluir elementos con atributos específicos. Aquí hay un ejemplo de cómo debe estar estructurado:

```html
<div
    data-as-markdown
    data-as-url="path/to/your-file.md"
    data-as-target="#markdown-container"
>
    Ver Documento 1
</div>
<div
    data-as-markdown
    data-as-url="path/to/another-file.md"
    data-as-target="#markdown-container"
>
    Ver Documento 2
</div>

<!-- Contenedor donde se mostrará el contenido Markdown -->
<div id="markdown-container"></div>
```

### Atributos:

-   `data-as-markdown`: Indica que el elemento es clicable y debe cargar un archivo Markdown.
-   `data-as-url`: La URL del archivo Markdown que se va a cargar.
-   `data-as-target`: El selector del elemento donde se desplegará el contenido Markdown.

## Uso

1. **Inicializar el Componente**: Asegúrate de que el script de `MarkdownViewer` esté incluido en tu archivo JavaScript y de que el documento esté completamente cargado antes de instanciarlo.

    ```javascript
    const markdownViewer = new MarkdownViewer();
    ```

2. **Hacer Clic en un Elemento**: Cuando un usuario hace clic en uno de los elementos que tienen el atributo `data-as-markdown`, el componente:

    - Carga el contenido Markdown desde la URL especificada en `data-as-url`.
    - Convierte el contenido Markdown a HTML.
    - Inserta el HTML resultante en el elemento indicado por `data-as-target`.

3. **Clic Simulado**: Si un elemento tiene el atributo `data-as-active`, se simulará un clic en ese elemento al cargar el componente, mostrando automáticamente el contenido asociado.

## Manejo de Errores

-   Si un elemento no tiene un atributo `data-as-url`, se mostrará una advertencia en la consola.
-   Si no se encuentra el elemento objetivo definido en `data-as-target`, también se mostrará una advertencia.
-   En caso de errores al cargar el contenido Markdown, se mostrarán mensajes de error en la consola.

## Ejemplo Completo

Aquí hay un ejemplo completo que incluye el HTML y la inicialización del `MarkdownViewer`:

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Markdown Viewer Example</title>
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="path/to/markdownViewer.js"></script>
    </head>
    <body>
        <div
            data-as-markdown
            data-as-url="docs/introduction.md"
            data-as-target="#markdown-container"
            data-as-active="true"
        >
            Introducción
        </div>
        <div
            data-as-markdown
            data-as-url="docs/usage.md"
            data-as-target="#markdown-container"
        >
            Uso
        </div>

        <div id="markdown-container"></div>

        <script>
            const markdownViewer = new MarkdownViewer();
        </script>
    </body>
</html>
```

## Conclusión

El `MarkdownViewer` proporciona una manera fácil y efectiva de visualizar contenido Markdown en aplicaciones web. Asegúrate de seguir la estructura HTML adecuada y de manejar cualquier error que pueda surgir durante la carga de archivos.

```

```

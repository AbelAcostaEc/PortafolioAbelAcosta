// Importar los módulos de Gulp y sus plugins
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const cache = require("gulp-cache");
const webp = require("gulp-webp");

// Definir rutas de los archivos
const paths = {
	scss: "src/scss/**/*.scss", // Ruta de los archivos Sass
	css: "src/css/**/*.css", // Ruta de los archivos CSS
	js: "src/js/**/*.js", // Ruta de los archivos JavaScript
	imagenes: "src/img/**/*", // Ruta de los archivos de imágenes
};

// Tarea para compilar y minificar estilos CSS
function css() {
	return src([paths.css, paths.scss]) // Usar un array para incluir ambas rutas
		.pipe(sourcemaps.init()) // Iniciar generación de sourcemaps
		.pipe(sass()) // Compilar Sass a CSS
		.pipe(postcss([autoprefixer(), cssnano()])) // Aplicar autoprefijos y minificar CSS
		.pipe(concat('app.css')) // Concatenar los archivos en uno solo
		.pipe(sourcemaps.write(".")) // Escribir sourcemaps en el mismo directorio
		.pipe(dest("build/css")); // Guardar archivos resultantes en 'build/css'
}

// Tarea para concatenar, minificar y generar sourcemaps de archivos JavaScript
function javascript() {
	return src(paths.js) // Tomar archivos JavaScript
		.pipe(sourcemaps.init()) // Iniciar generación de sourcemaps
		.pipe(concat("bundle.js")) // Concatenar todos los archivos en uno (bundle.js)
		.pipe(terser()) // Minificar el JavaScript
		.pipe(sourcemaps.write(".")) // Escribir sourcemaps en el mismo directorio
		.pipe(rename({ suffix: ".min" })) // Renombrar el archivo minificado
		.pipe(dest("./build/js")); // Guardar archivos resultantes en 'build/js'
}

// Tarea para minificar imágenes
function imagenes() {
	return src(paths.imagenes) // Tomar archivos de imágenes
		.pipe(cache(imagemin({ optimizationLevel: 3 }))) // Minificar las imágenes
		.pipe(dest("build/img")) // Guardar imágenes minificadas en 'build/img'
		.pipe(notify({ message: "Imagen Completada" })); // Notificar que la tarea de imágenes ha terminado
}

// Tarea para generar versiones WebP de imágenes
function versionWebp() {
	return src(paths.imagenes) // Tomar archivos de imágenes
		.pipe(webp()) // Generar versiones WebP de las imágenes
		.pipe(dest("build/img")) // Guardar versiones WebP en 'build/img'
		.pipe(notify({ message: "Versión WebP Completada" })); // Notificar que la tarea de WebP ha terminado
}

// Tarea para observar cambios en archivos y ejecutar tareas relacionadas
function watchArchivos() {
	watch([paths.scss, paths.css], css); // Observar cambios en archivos Sass y ejecutar la tarea 'css'
	watch(paths.js, javascript); // Observar cambios en archivos JavaScript y ejecutar la tarea 'javascript'
	watch(paths.imagenes, imagenes); // Observar cambios en archivos de imágenes y ejecutar la tarea 'imagenes'
	watch(paths.imagenes, versionWebp); // Observar cambios en archivos de imágenes y ejecutar la tarea 'versionWebp'
}

// Definir tarea por defecto que ejecuta todas las tareas en paralelo
exports.default = parallel(
	css,
	javascript,
	imagenes,
	versionWebp,
	watchArchivos
);

// Exportar tareas individuales para su ejecución por separado si es necesario
exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

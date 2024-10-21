import path from "path";
import fs from "fs";
import { glob } from "glob";
import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from "gulp-terser";
import concat from "gulp-concat";
import sharp from "sharp";
import jsonfile from "jsonfile";

// Leer la configuración desde el archivo config.json
let config;
const defaultConfig = {
    useBootstrap: false,
    useModernizr: false,
    sourceDir: "src",
    buildDir: "public/build",
};

try {
    config = jsonfile.readFileSync("./config.json");
} catch (err) {
    console.error("Error reading config.json:", err);
    config = {};
}

// Combina config con defaultConfig, usando defaultConfig como fallback
config = { ...defaultConfig, ...config };

// Inicializa Gulp con Dart Sass
const sass = gulpSass(dartSass);

// Define las rutas de las carpetas
const srcDir = config.sourceDir; // Carpeta de entrada
const buildDir = config.buildDir; // Carpeta de salida

// Define las rutas para los archivos SCSS y JS
const paths = {
    scss: `${srcDir}/scss/**/*.scss`,
    css: `${srcDir}/css/**/*.css`,
    js: `${srcDir}/js/**/*.js`,
    img: `${srcDir}/img/**/*.{png,jpg,jpeg,svg}`,
};

// Opciones de imagen
const imageOptions = { quality: 80 };

// Tarea para compilar SCSS a CSS
export function css(done) {
    // Inicializar la lista de estilos
    let styles = [];

    // Agregar archivos CSS y SCSS
    styles.push(...glob.sync(paths.css)); // Agregar archivos CSS desde src/css
    styles.push(...glob.sync(paths.scss)); // Agregar archivos SCSS desde src/scss

    // Si Bootstrap está deshabilitado, lo removemos
    if (!config.useBootstrap) {
        // Filtrar el array para eliminar bootstrap.min.css si está presente
        styles = styles.filter((style) => !style.includes("bootstrap.min.css"));
    }

    src(styles, { sourcemaps: true }) // Incluye tanto SCSS como CSS
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("app.min.css")) // Combina todos los CSS en app.min.css
        .pipe(dest(`${buildDir}/css`, { sourcemaps: "." })); // Salida del CSS
    done();
}

// Tarea para minificar archivos JavaScript
export function js(done) {
    let scripts = [];
    // Agregar archivos
    scripts.push(...glob.sync(paths.js));
    // Si Modernizr está deshabilitado, lo removemos
    if (!config.useModernizr) {
        // Filtrar el array para eliminar modernizr.js si está presente
        scripts = scripts.filter((script) => !script.includes("modernizr.js"));
    }
    // Si Bootstrap está deshabilitado, lo removemos
    if (!config.useBootstrap) {
        // Filtrar el array para eliminar bootstrap.bundle.min.js si está presente
        scripts = scripts.filter(
            (script) => !script.includes("bootstrap.bundle.min.js")
        );
    }

    src(scripts) // Escanea todos los archivos .js en todas las subcarpetas
        .pipe(concat("app.min.js")) // Combina todos los archivos en app.min.js
        .pipe(terser().on("error", (err) => console.error(err))) // Minifica el JavaScript
        .pipe(dest(`${buildDir}/js`)); // Salida del JS
    done();
}

// Tarea para procesar imágenes
export async function images(done) {
    const imageFiles = await glob(paths.img); // Obtiene todas las imágenes
    await Promise.all(imageFiles.map((file) => processImage(file))); // Procesa imágenes en paralelo
    done();
}

// Función para procesar cada imagen individualmente
async function processImage(file) {
    const relativePath = path.relative(srcDir + "/img", path.dirname(file));
    const outputSubDir = path.join(buildDir, "img", relativePath);

    // Crea el directorio de salida si no existe
    fs.mkdirSync(outputSubDir, { recursive: true });

    const baseName = path.basename(file, path.extname(file));
    const extName = path.extname(file).toLowerCase();

    if (extName === ".svg") {
        const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
        fs.copyFileSync(file, outputFile);
    } else {
        const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
        const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
        const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

        // Procesa la imagen a diferentes formatos
        await sharp(file).jpeg(imageOptions).toFile(outputFile);
        await sharp(file).webp(imageOptions).toFile(outputFileWebp);
        await sharp(file).avif({ quality: 80 }).toFile(outputFileAvif);
    }
}

// Tarea de desarrollo que observa cambios en los archivos
export function dev() {
    watch(paths.scss, css);
    watch(paths.css, css);
    watch(paths.js, js);
    watch(paths.img, images);
}

// Exporta la tarea por defecto que ejecuta todas las tareas
export default series(js, css, images, dev);

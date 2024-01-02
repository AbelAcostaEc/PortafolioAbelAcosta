/**
 * Clase TypeWriter: Representa una máquina de escribir que muestra palabras una por una.
 */
class TypeWriter {
	/**
	 * Constructor de la clase.
	 * @param {Array} words - Array de palabras que se mostrarán.
	 * @param {string} elementSelector - Selector del elemento HTML donde se mostrará el texto.
	 * @param {number} speed - Velocidad de la animación en milisegundos (opcional, predeterminado: 200).
	 */
	constructor(words, elementSelector, speed) {
		// Inicializar propiedades de la clase con los parámetros proporcionados
		this.words = words;
		this.element = document.querySelector(elementSelector);
		this.speed = speed || 200; // Velocidad predeterminada: 200 milisegundos
		this.currentIndex = 0;
		this.currentLetterIndex = 0;
		this.timer = null;

		// Iniciar la animación de la máquina de escribir al crear una instancia de la clase
		this.startTyping();
	}

	/**
	 * Método startTyping: Inicia la animación de la máquina de escribir.
	 */
	startTyping() {
		// Configurar un temporizador que se ejecutará cada 'speed' milisegundos
		this.timer = setInterval(() => {
			// Obtener la palabra actual y el texto actual basado en el índice de letras actual
			const currentWord = this.words[this.currentIndex];
			const currentText = currentWord.substring(0, this.currentLetterIndex);

			// Actualizar el contenido del elemento HTML con el texto actual
			this.element.innerHTML = currentText;

			// Incrementar el índice de letras
			this.currentLetterIndex++;

			// Verificar si se ha escrito la palabra completa
			if (this.currentLetterIndex > currentWord.length) {
				// Pasar a la siguiente palabra y reiniciar el índice de letras
				this.currentIndex++;
				this.currentLetterIndex = 0;
			}

			// Verificar si se ha llegado al final de la lista de palabras
			if (this.currentIndex === this.words.length) {
				// Volver al inicio de la lista
				this.currentIndex = 0;
			}
		}, this.speed);
	}

	/**
	 * Método stopTyping: Detiene la animación de la máquina de escribir.
	 */
	stopTyping() {
		// Limpiar el temporizador para detener la animación
		clearInterval(this.timer);
	}
}

// Crear una instancia de la clase TypeWriter con un array de palabras, el ID del elemento y la velocidad
//   const myTypeWriter = new TypeWriter(["Programador", "Desarrollador Web"], "typewriter", 200);

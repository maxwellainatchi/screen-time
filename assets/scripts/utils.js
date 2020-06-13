export class ValidationError extends Error {
    constructor(message, element) {
        super(message);
        this.element = element
    }

    alert() {
        alert(`Error: ${this.message}`);
    }
}
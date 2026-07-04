// Typing animation script
class TypingEffect {
    constructor(element, words, waitTime = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.waitTime = parseInt(waitTime, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="typing-text">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize on page load if element exists
document.addEventListener('DOMContentLoaded', () => {
    const textEl = document.querySelector('.typewrite');
    if (textEl) {
        const words = JSON.parse(textEl.getAttribute('data-type'));
        const wait = textEl.getAttribute('data-period');
        new TypingEffect(textEl, words, wait);
    }
});

// import all modules here
import {Book, User} from './models';
import {LibraryService} from './services';
import {Validation} from './validation';

// etc.

class App {
    private service: LibraryService;

    constructor() {
        this.service = new LibraryService();
        this.initForm();
        this.initUserForm();
    }

    private initForm(): void {
        const form = document.getElementById('addBookForm') as HTMLFormElement | null;
        if (!form) return;

        const titleInput = document.getElementById('title') as HTMLInputElement;
        const authorInput = document.getElementById('author') as HTMLInputElement;
        const yearInput = document.getElementById('year') as HTMLInputElement;
        const yearFeedback = document.getElementById('yearFeedback') as HTMLElement | null;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Bootstrap style validation toggles
            if (!Validation.required(titleInput.value)) {
                titleInput.classList.add('is-invalid');
            } else {
                titleInput.classList.remove('is-invalid');
            }

            const yearRes = Validation.year(yearInput.value);
            if (!yearRes.valid) {
                yearInput.classList.add('is-invalid');
                if (yearFeedback && yearRes.message) yearFeedback.textContent = yearRes.message;
            } else {
                yearInput.classList.remove('is-invalid');
                if (yearFeedback) yearFeedback.textContent = '';
            }
            
            if (!Validation.required(authorInput.value)) { 
                authorInput.classList.add('is-invalid');
            } else {
                authorInput.classList.remove('is-invalid');
                
            }
            const isValid = Validation.required(titleInput.value) && yearRes.valid && Validation.required(authorInput.value);
            if (!isValid) return;

            const book = new Book({
                title: titleInput.value.trim(),
                author: authorInput.value.trim() || undefined,
                year: yearInput.value.trim() ? Number(yearInput.value.trim()) : undefined,
            });

            this.service.add(book);
            form.reset();
            titleInput.classList.remove('is-invalid');
            yearInput.classList.remove('is-invalid');
        });
    }

    private initUserForm(): void {
        const form = document.getElementById('addUserForm') as HTMLFormElement | null;
        if (!form) return;

        const nameInput = document.getElementById('userName') as HTMLInputElement;
        const emailInput = document.getElementById('userEmail') as HTMLInputElement;
        const emailFeedback = document.getElementById('emailFeedback') as HTMLElement | null;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!Validation.required(nameInput.value)) {
                nameInput.classList.add('is-invalid');
            } else {
                nameInput.classList.remove('is-invalid');
            }

            const emailValid = Validation.email(emailInput.value);
            if (!emailValid) {
                emailInput.classList.add('is-invalid');
                if (emailFeedback) emailFeedback.textContent = 'Некоректний email';
            } else {
                emailInput.classList.remove('is-invalid');
                if (emailFeedback) emailFeedback.textContent = '';
            }

            if (!(Validation.required(nameInput.value) && emailValid)) return;

            const user = new User({ name: nameInput.value.trim(), email: emailInput.value.trim() });
            this.service.addUser(user);
            form.reset();
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// import all modules here
import {Book, User, IBook, IUser} from './models';
import {LibraryService} from './services';
import {Validation} from './validation';
import {Modal} from './modal';

// etc.

class App {
    private service: LibraryService;
    private modal?: Modal;

    constructor() {
        this.service = new LibraryService();
        this.service.seedIfEmpty();
        this.initForm();
        this.initUserForm();
        this.initModal();
        this.render();
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
            this.renderUsers();
        });
    }

    private initModal(): void {
        try {
            this.modal = new Modal('#infoModal');
            const closeBtn = document.getElementById('modalClose');
            const okBtn = document.getElementById('modalOk');
            const hide = () => this.modal?.hide();
            closeBtn?.addEventListener('click', hide);
            okBtn?.addEventListener('click', hide);
        } catch {}
    }

    private render(): void {
        this.renderBooks();
        this.renderUsers();
    }

    private renderBooks(): void {
        const list = document.getElementById('booksList');
        if (!list) return;
        list.innerHTML = '';
        const books = this.service.getAll();
        const users = this.service.getAllUsers();
        books.forEach((b) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            const meta = document.createElement('div');
            const author = b.author ? ` by ${b.author}` : '';
            const year = b.year ? ` (${b.year})` : '';
            const status = b.borrowedByUserId
                ? ` — Позичено: ${users.find(u => u.id === b.borrowedByUserId)?.name ?? 'невідомо'}`
                : '';
            meta.textContent = `${b.title}${author}${year}${status}`;

            const actions = document.createElement('div');
            const borrowBtn = document.createElement('button');
            borrowBtn.className = 'btn btn-sm btn-primary me-2';
            borrowBtn.textContent = b.borrowedByUserId ? 'Повернути' : 'Позичити';
            borrowBtn.addEventListener('click', () => this.onBorrowReturn(b));

            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-outline-danger';
            removeBtn.textContent = 'Видалити';
            removeBtn.addEventListener('click', () => {
                this.service.remove(b.id.toString());
                this.renderBooks();
            });

            actions.appendChild(borrowBtn);
            actions.appendChild(removeBtn);

            li.appendChild(meta);
            li.appendChild(actions);
            list.appendChild(li);
        });
    }

    private renderUsers(): void {
        const list = document.getElementById('usersList');
        if (!list) return;
        list.innerHTML = '';
        this.service.getAllUsers().forEach((u) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${u.name} (${u.email})`;
            list.appendChild(li);
        });
    }

    private onBorrowReturn(book: IBook): void {
        if (book.borrowedByUserId) {
            this.service.returnBook(book.id.toString());
            this.renderBooks();
            this.showInfo(`Книгу «${book.title}» повернено.`);
            return;
        }
        // позичити — вибрати першого користувача (демо). У реальній реалізації — випадаючий список/модальне вікно
        const users = this.service.getAllUsers();
        if (users.length === 0) {
            this.showInfo('Немає користувачів для позичення. Додайте користувача.');
            return;
        }
        const user = users[0];
        const res = this.service.borrowBook(book.id.toString(), user.id);
        if (res) {
            this.renderBooks();
            this.showInfo(`Книгу «${book.title}» позичено користувачу ${user.name}.`);
        }
    }

    private showInfo(message: string): void {
        const el = document.getElementById('modalMessage');
        if (el) el.textContent = message;
        this.modal?.show();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

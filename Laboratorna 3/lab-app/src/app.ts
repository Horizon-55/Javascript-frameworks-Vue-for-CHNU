// import all modules here
import {Book, User, IBook, IUser} from './models';
import './styles.css';
import {LibraryService} from './services';
import {Validation} from './validation';
import {Modal} from './modal';

// etc.

class App {
    private service: LibraryService;
    private modal?: Modal;
    private borrowModal?: Modal;
    private pendingBorrowBookId?: number;
    private booksSearchQuery: string = '';
    private booksPage: number = 1;
    private booksPageSize: number = 5;
    private authorsPage: number = 1;
    private authorsPageSize: number = 5;

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

            // borrow modal
            this.borrowModal = new Modal('#borrowModal');
            const borrowClose = document.getElementById('borrowClose');
            const borrowCancel = document.getElementById('borrowCancel');
            const borrowSave = document.getElementById('borrowSave');
            const borrowUserIdInput = document.getElementById('borrowUserId') as HTMLInputElement | null;
            const borrowFeedback = document.getElementById('borrowFeedback') as HTMLElement | null;
            const closeBorrow = () => {
                if (borrowUserIdInput) borrowUserIdInput.value = '';
                if (borrowFeedback) borrowFeedback.style.display = 'none';
                this.pendingBorrowBookId = undefined;
                this.borrowModal?.hide();
            };
            borrowClose?.addEventListener('click', closeBorrow);
            borrowCancel?.addEventListener('click', closeBorrow);
            borrowSave?.addEventListener('click', () => {
                if (!borrowUserIdInput) return;
                const userId = borrowUserIdInput.value.trim();
                if (!userId) {
                    if (borrowFeedback) {
                        borrowFeedback.textContent = 'Вкажіть ID користувача';
                        borrowFeedback.style.display = '';
                    }
                    return;
                }
                if (!this.pendingBorrowBookId && this.pendingBorrowBookId !== 0) return;
                const result = this.service.borrowBook(this.pendingBorrowBookId, userId);
                if (!result.ok) {
                    if (borrowFeedback) {
                        borrowFeedback.textContent = result.error;
                        borrowFeedback.style.display = '';
                    }
                    return;
                }
                closeBorrow();
                this.renderBooks();
                this.showInfo(`Книгу «${result.book.title}» позичено користувачу з ID ${userId}.`);
            });
        } catch {}
    }

    private render(): void {
        this.renderBooks();
        this.renderUsers();
        this.renderAuthors();
    }

    private renderBooks(): void {
        const list = document.getElementById('booksList');
        if (!list) return;
        list.innerHTML = '';
        const searchInput = document.getElementById('booksSearch') as HTMLInputElement | null;
        if (searchInput && searchInput.oninput === null) {
            searchInput.addEventListener('input', () => {
                this.booksSearchQuery = searchInput.value.trim();
                this.booksPage = 1;
                this.renderBooks();
                this.renderAuthors();
            });
        }

        const allBooks = this.service.getAll();
        const q = this.booksSearchQuery.toLowerCase();
        const filtered = q
            ? allBooks.filter((b) =>
                b.title.toLowerCase().includes(q) || (b.author ?? '').toLowerCase().includes(q)
              )
            : allBooks;

        const start = (this.booksPage - 1) * this.booksPageSize;
        const pageItems = filtered.slice(start, start + this.booksPageSize);
        const users = this.service.getAllUsers();
        pageItems.forEach((b) => {
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
                this.service.remove(b.id);
                this.renderBooks();
            });

            actions.appendChild(borrowBtn);
            actions.appendChild(removeBtn);

            li.appendChild(meta);
            li.appendChild(actions);
            list.appendChild(li);
        });

        const pag = document.getElementById('booksPagination');
        if (pag) this.renderPagination(pag, filtered.length, this.booksPage, this.booksPageSize, (p) => {
            this.booksPage = p; this.renderBooks();
        });
    }

    private renderAuthors(): void {
        const list = document.getElementById('authorsList');
        if (!list) return;
        list.innerHTML = '';
        const books = this.service.getAll();
        const q = this.booksSearchQuery.toLowerCase();
        const authors = Array.from(new Set(books.map(b => (b.author ?? '').trim()).filter(Boolean)));
        const filtered = q ? authors.filter(a => a.toLowerCase().includes(q)) : authors;
        const start = (this.authorsPage - 1) * this.authorsPageSize;
        const pageItems = filtered.slice(start, start + this.authorsPageSize);
        pageItems.forEach((a) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = a;
            list.appendChild(li);
        });

        const pag = document.getElementById('authorsPagination');
        if (pag) this.renderPagination(pag, filtered.length, this.authorsPage, this.authorsPageSize, (p) => {
            this.authorsPage = p; this.renderAuthors();
        });
    }

    private renderUsers(): void {
        const list = document.getElementById('usersList');
        if (!list) return;
        list.innerHTML = '';
        this.service.getAllUsers().forEach((u) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            const text = document.createElement('div');
            text.textContent = `${u.id} ${u.name} (${u.email})`;
            const del = document.createElement('button');
            del.className = 'btn btn-sm btn-outline-danger';
            del.textContent = 'Видалити';
            del.addEventListener('click', () => {
                const res = this.service.removeUser(u.id);
                if (!res.ok) {
                    this.showInfo(res.error);
                    return;
                }
                this.renderUsers();
            });
            li.appendChild(text);
            li.appendChild(del);
            list.appendChild(li);
        });
    }

    private renderPagination(container: Element, total: number, page: number, size: number, onChange: (p: number) => void): void {
        const totalPages = Math.max(1, Math.ceil(total / size));
        container.innerHTML = '';
        const makeLi = (label: string, target: number, disabled = false, active = false) => {
            const li = document.createElement('li');
            li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = label;
            a.addEventListener('click', (e) => { e.preventDefault(); if (!disabled) onChange(target); });
            li.appendChild(a);
            return li;
        };
        container.appendChild(makeLi('«', Math.max(1, page - 1), page === 1));
        for (let p = 1; p <= totalPages; p++) {
            container.appendChild(makeLi(String(p), p, false, p === page));
        }
        container.appendChild(makeLi('»', Math.min(totalPages, page + 1), page === totalPages));
    }

    private onBorrowReturn(book: IBook): void {
        if (book.borrowedByUserId) {
            this.service.returnBook(book.id);
            this.renderBooks();
            this.showInfo(`Книгу «${book.title}» повернено.`);
            return;
        }
        // позичити — через модалку з введенням ID
        const users = this.service.getAllUsers();
        if (users.length === 0) {
            this.showInfo('Немає користувачів для позичення. Додайте користувача.');
            return;
        }
        this.pendingBorrowBookId = book.id;
        this.borrowModal?.show();
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

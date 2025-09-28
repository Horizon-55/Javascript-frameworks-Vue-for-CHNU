import { Book, User, IBook, IUser } from './models';
import { Library } from './library';
import { Storage } from './storage';

export class LibraryService {
    private storageKey = 'lab-app-books';
    private usersKey = 'lab-app-users';
    private loansKey = 'lab-app-loans';
    private userSeqKey = 'lab-app-users-seq';

    seedIfEmpty(): void {
        if (this.getAll().length === 0) {
            const demo: IBook[] = [
                new Book({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 }),
                new Book({ title: 'Clean Code', author: 'Роберт Мартін', year: 2008 }),
                new Book({
                    title: 'The Pragmatic Programmer',
                    author: 'Ендрю Генсон, Девід Томас',
                    year: 1999,
                }),
            ];
            Storage.setItem(this.storageKey, demo);
        }
        if (this.getAllUsers().length === 0) {
            const demoUsers: IUser[] = [
                new User({ name: 'Артем', email: 'artemkarachevtsev@gmail.com' }),
                new User({ name: 'Мартін', email: 'softwar@gmail.com' }),
            ];
            demoUsers.forEach((u) => this.addUser(u));
        }
    }

    getAll(): IBook[] {
        return Storage.getItem<IBook[]>(this.storageKey, []);
    }

    add(book: IBook): void {
        const all = this.getAll();
        all.push(book);
        Storage.setItem(this.storageKey, all);
    }

    update(book: IBook): void {
        const all = this.getAll();
        const idx = all.findIndex((b) => b.id === book.id);
        if (idx !== -1) {
            all[idx] = book;
            Storage.setItem(this.storageKey, all);
        }
    }

    remove(bookId: number): void {
        const all = this.getAll().filter((b) => b.id !== bookId);
        Storage.setItem(this.storageKey, all);
    }

    getAllUsers(): IUser[] {
        return Storage.getItem<IUser[]>(this.usersKey, []);
    }

    addUser(user: IUser): void {
        const all = this.getAllUsers();
        // призначаємо короткий числовий ID
        if (!user.id || typeof user.id !== 'string' || user.id.length > 6) {
            user.id = this.getNextUserId();
        }
        all.push(user);
        Storage.setItem(this.usersKey, all);
    }

    removeUser(userId: string): { ok: true } | { ok: false; error: string } {
        const users = this.getAllUsers();
        const exists = users.some((u) => u.id === userId);
        if (!exists) return { ok: false, error: 'Користувача не знайдено' };
        // заборонити видалення, якщо є позичені книги користувача
        const userBooksCount = this.getAll().filter((b) => b.borrowedByUserId === userId).length;
        if (userBooksCount > 0) return { ok: false, error: 'Користувач має позичені книги' };
        const updated = users.filter((u) => u.id !== userId);
        Storage.setItem(this.usersKey, updated);
        return { ok: true };
    }

    private getNextUserId(): string {
        const current = Storage.getItem<number>(this.userSeqKey, 1);
        const next = current + 1;
        Storage.setItem(this.userSeqKey, next);
        return String(current);
    }

    borrowBook(
        bookId: number,
        userId: string,
    ): { ok: true; book: IBook } | { ok: false; error: string } {
        const all = this.getAll();
        const book = all.find((b) => b.id === bookId);
        if (!book) return { ok: false, error: 'Книга не знайдена' };
        if (book.borrowedByUserId) return { ok: false, error: 'Книгу вже позичено' };

        const userBooksCount = all.filter((b) => b.borrowedByUserId === userId).length;
        if (userBooksCount >= 3) return { ok: false, error: 'Користувач вже має 3 позичені книги' };

        book.borrowedByUserId = userId;
        book.borrowedAt = new Date().toISOString();
        Storage.setItem(this.storageKey, all);
        return { ok: true, book };
    }

    returnBook(bookId: number): IBook | null {
        const all = this.getAll();
        const book = all.find((b) => b.id === bookId);
        if (!book) return null;
        book.borrowedByUserId = null;
        book.borrowedAt = null;
        Storage.setItem(this.storageKey, all);
        return book;
    }
}

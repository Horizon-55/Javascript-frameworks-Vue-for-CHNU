import {Book, User, IBook, IUser} from './models';
import {Library} from './library';
import {Storage} from './storage';

export class LibraryService {
    private storageKey = 'lab-app-books';
    private usersKey = 'lab-app-users';
    private loansKey = 'lab-app-loans';

    seedIfEmpty(): void {
        if (this.getAll().length === 0) {
            const demo: IBook[] = [
                new Book({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 }),
                new Book({ title: 'Clean Code', author: 'Роберт Мартін', year: 2008 }),
                new Book({ title: 'The Pragmatic Programmer', author: 'Ендрю Генсон, Девід Томас', year: 1999 }),
            ];
            Storage.setItem(this.storageKey, demo);
        }
        if (this.getAllUsers().length === 0) {
            const demoUsers: IUser[] = [
                new User({ name: 'Артем', email: 'artemkarachevtsev@gmail.com' }),
                new User({ name: 'Мартін', email: 'softwar@gmail.com' }),
            ];
            Storage.setItem(this.usersKey, demoUsers);
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

    remove(bookId: string): void {
        const all = this.getAll().filter((b) => b.id !== bookId);
        Storage.setItem(this.storageKey, all);
    }

    getAllUsers(): IUser[] {
        return Storage.getItem<IUser[]>(this.usersKey, []);
    }

    addUser(user: IUser): void {
        const all = this.getAllUsers();
        all.push(user);
        Storage.setItem(this.usersKey, all);
    }

    borrowBook(bookId: string, userId: string): IBook | null {
        const all = this.getAll();
        const book = all.find((b) => b.id === bookId);
        if (!book) return null;
        if (book.borrowedByUserId) return null; // already taken
        book.borrowedByUserId = userId;
        book.borrowedAt = new Date().toISOString();
        Storage.setItem(this.storageKey, all);
        return book;
    }

    returnBook(bookId: string): IBook | null {
        const all = this.getAll();
        const book = all.find((b) => b.id === bookId);
        if (!book) return null;
        book.borrowedByUserId = null;
        book.borrowedAt = null;
        Storage.setItem(this.storageKey, all);
        return book;
    }
}

import {Book, User, IBook, IUser} from './models';
import {Library} from './library';

export class LibraryService {
    private storageKey = 'lab-app-books';
    private usersKey = 'lab-app-users';

    getAll(): IBook[] {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw) as IBook[];
            return parsed;
        } catch {
            return [];
        }
    }

    add(book: IBook): void {
        const all = this.getAll();
        all.push(book);
        localStorage.setItem(this.storageKey, JSON.stringify(all));
    }

    getAllUsers(): IUser[] {
        const raw = localStorage.getItem(this.usersKey);
        if (!raw) return [];
        try {
            return JSON.parse(raw) as IUser[];
        } catch {
            return [];
        }
    }

    addUser(user: IUser): void {
        const all = this.getAllUsers();
        all.push(user);
        localStorage.setItem(this.usersKey, JSON.stringify(all));
    }
}

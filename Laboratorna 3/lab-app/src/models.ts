export interface IBook {
    id: number;
    title: string;
    author?: string;
    year?: number;
    borrowedByUserId?: string | null;
    borrowedAt?: string | null; // ISO string
}

export class Book implements IBook {
    id: number;
    title: string;
    author?: string | undefined;
    year?: number | undefined;
    borrowedByUserId?: string | null | undefined;
    borrowedAt?: string | null | undefined;

    constructor(params: {
        id?: number;
        title: string;
        author?: string;
        year?: number;
        borrowedByUserId?: string | null;
        borrowedAt?: string | null;
    }) {
        this.id = params.id ?? Date.now() + Math.floor(Math.random() * 1000);
        this.title = params.title;
        this.author = params.author;
        this.year = params.year;
        this.borrowedByUserId = params.borrowedByUserId ?? null;
        this.borrowedAt = params.borrowedAt ?? null;
    }
}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export class User implements IUser {
    id: string;
    name: string;
    email: string;
    constructor(params: { id?: string; name: string; email: string }) {
        this.id = params.id ?? crypto.randomUUID?.() ?? String(Date.now());
        this.name = params.name;
        this.email = params.email;
    }
}

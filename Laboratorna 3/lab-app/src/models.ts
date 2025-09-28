export interface IBook {
    id: string;
    title: string;
    author?: string;
    year?: number;
}

export class Book implements IBook {
    id: string;
    title: string;
    author?: string | undefined;
    year?: number | undefined;

    constructor(params: { id?: string; title: string; author?: string; year?: number }) {
        this.id = params.id ?? crypto.randomUUID?.() ?? String(Date.now());
        this.title = params.title;
        this.author = params.author;
        this.year = params.year;
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

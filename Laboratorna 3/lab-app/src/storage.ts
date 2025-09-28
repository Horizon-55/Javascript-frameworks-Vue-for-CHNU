export class Storage {
    static getItem<T>(key: string, fallback: T): T {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw) as T;
        } catch {
            return fallback;
        }
    }

    static setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(prefix?: string): void {
        if (!prefix) {
            localStorage.clear();
            return;
        }
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
    }
}

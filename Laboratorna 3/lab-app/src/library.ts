export class Library<T extends { id: string }> {
    private items: Map<string, T> = new Map();

    constructor(initialItems: T[] = []) {
        initialItems.forEach((it) => this.items.set(it.id, it));
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    getById(id: string): T | undefined {
        return this.items.get(id);
    }

    add(item: T): void {
        this.items.set(item.id, item);
    }

    update(id: string, updater: (current: T) => T): T | undefined {
        const current = this.items.get(id);
        if (!current) return undefined;
        const updated = updater(current);
        this.items.set(id, updated);
        return updated;
    }

    remove(id: string): boolean {
        return this.items.delete(id);
    }

    find(predicate: (item: T) => boolean): T[] {
        return this.getAll().filter(predicate);
    }
}

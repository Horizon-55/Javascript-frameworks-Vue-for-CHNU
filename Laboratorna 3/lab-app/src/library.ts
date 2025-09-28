export class Library<T extends { id: number }> {
    private items: Map<number, T> = new Map();

    constructor(initialItems: T[] = []) {
        initialItems.forEach((it) => this.items.set(it.id, it));
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    getById(id: number): T | undefined {
        return this.items.get(id);
    }

    add(item: T): void {
        this.items.set(item.id, item);
    }

    update(id: number, updater: (current: T) => T): T | undefined {
        const current = this.items.get(id);
        if (!current) return undefined;
        const updated = updater(current);
        this.items.set(id, updated);
        return updated;
    }

    remove(id: number): boolean {
        return this.items.delete(id);
    }

    find(predicate: (item: T) => boolean): T[] {
        return this.getAll().filter(predicate);
    }
}

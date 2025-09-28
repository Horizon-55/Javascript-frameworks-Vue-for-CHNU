export class Validation {
    static required(value: string): boolean {
        return value.trim().length > 0;
    }

    static year(value: string): { valid: boolean; message?: string } {
        if (value.trim() === '') return { valid: true };
        const year = Number(value);
        const current = new Date().getFullYear();
        if (!Number.isInteger(year)) return { valid: false, message: 'Рік має бути цілим числом' };
        if (year < 1400 || year > current) return { valid: false, message: `Рік має бути в межах 1400–${current}` };
        return { valid: true };
    }

    static email(value: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return re.test(value.trim());
    }
}
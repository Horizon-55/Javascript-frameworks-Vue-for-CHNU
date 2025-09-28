export class Modal {
    private element: HTMLElement;
    private onShowCallbacks: Array<() => void> = [];
    private onHideCallbacks: Array<() => void> = [];

    constructor(selector: string) {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (!el) throw new Error(`Modal element not found: ${selector}`);
        this.element = el;
    }

    show(): void {
        this.element.classList.add('show');
        this.element.style.display = 'block';
        document.body.classList.add('modal-open');
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.setAttribute('data-backdrop', 'true');
        document.body.appendChild(backdrop);
        this.onShowCallbacks.forEach((cb) => cb());
    }

    hide(): void {
        this.element.classList.remove('show');
        this.element.style.display = 'none';
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop && backdrop.parentElement) backdrop.parentElement.removeChild(backdrop);
        this.onHideCallbacks.forEach((cb) => cb());
    }

    onShow(cb: () => void): void {
        this.onShowCallbacks.push(cb);
    }
    onHide(cb: () => void): void {
        this.onHideCallbacks.push(cb);
    }
}

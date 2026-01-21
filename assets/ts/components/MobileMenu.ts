export class MobileMenu {
    private menuButton: HTMLElement | null;
    private menu: HTMLElement | null;

    constructor() {
        this.menuButton = document.getElementById('mobile-menu-button');
        this.menu = document.getElementById('mobile-menu');
        this.init();
    }

    private init(): void {
        if (!this.menuButton || !this.menu) return;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.menuButton?.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        this.menu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    private toggleMenu(): void {
        this.menu?.classList.toggle('hidden');
        this.updateAriaExpanded();
    }

    private closeMenu(): void {
        this.menu?.classList.add('hidden');
        this.updateAriaExpanded();
    }

    private updateAriaExpanded(): void {
        if (!this.menuButton || !this.menu) return;

        const isExpanded = !this.menu.classList.contains('hidden');
        this.menuButton.setAttribute('aria-expanded', isExpanded.toString());
    }
}

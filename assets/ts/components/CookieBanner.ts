export class CookieBanner {
    private readonly STORAGE_KEY = 'cookie-consent';
    private banner: HTMLElement | null;
    private acceptButton: HTMLElement | null;

    constructor() {
        this.banner = document.getElementById('cookie-banner');
        this.acceptButton = document.getElementById('accept-cookies');
        this.init();
    }

    private init(): void {
        if (!this.banner) return;

        this.checkConsent();
        this.setupEventListeners();
    }

    private checkConsent(): void {
        const hasConsent = localStorage.getItem(this.STORAGE_KEY);

        if (!hasConsent) {
            this.showBanner();
        }
    }

    private setupEventListeners(): void {
        this.acceptButton?.addEventListener('click', () => {
            this.acceptCookies();
        });
    }

    private acceptCookies(): void {
        localStorage.setItem(this.STORAGE_KEY, 'accepted');
        this.hideBanner();
    }

    private showBanner(): void {
        this.banner?.classList.remove('hidden');
    }

    private hideBanner(): void {
        this.banner?.classList.add('hidden');
    }
}

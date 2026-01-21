type Theme = 'light' | 'dark' | 'system';

export class ThemeManager {
    private readonly STORAGE_KEY = 'theme-preference';
    private currentTheme: Theme = 'system';
    private mediaQuery: MediaQueryList;

    constructor() {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    private init(): void {
        this.loadThemePreference();
        this.applyTheme();
        this.setupMediaQueryListener();
        this.setupThemeToggle();
    }

    private loadThemePreference(): void {
        const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
        this.currentTheme = stored || 'system';
    }

    private applyTheme(): void {
        const effectiveTheme = this.getEffectiveTheme();

        if (effectiveTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        this.updateThemeButtons();
    }

    private getEffectiveTheme(): 'light' | 'dark' {
        if (this.currentTheme === 'system') {
            return this.mediaQuery.matches ? 'dark' : 'light';
        }
        return this.currentTheme;
    }

    private setupMediaQueryListener(): void {
        this.mediaQuery.addEventListener('change', () => {
            if (this.currentTheme === 'system') {
                this.applyTheme();
            }
        });
    }

    private setupThemeToggle(): void {
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme-toggle') as Theme;
                this.setTheme(theme);
            });
        });
    }

    public setTheme(theme: Theme): void {
        this.currentTheme = theme;
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.applyTheme();
    }

    private updateThemeButtons(): void {
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            const theme = button.getAttribute('data-theme-toggle');
            if (theme === this.currentTheme) {
                button.classList.add('bg-gray-200', 'dark:bg-gray-700');
            } else {
                button.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            }
        });
    }
}

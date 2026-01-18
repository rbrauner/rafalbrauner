export class ContactFormHandler {
    private form: HTMLFormElement | null;
    private submitButton: HTMLButtonElement | null;
    private successMessage: HTMLElement | null;
    private errorMessage: HTMLElement | null;

    constructor() {
        this.form = document.getElementById("contact-form") as HTMLFormElement;
        this.submitButton = this.form?.querySelector(
            'button[type="submit"]',
        ) as HTMLButtonElement;
        this.successMessage = document.getElementById("form-success");
        this.errorMessage = document.getElementById("form-error");

        this.init();
    }

    private init(): void {
        if (!this.form) return;

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.form) return;

        this.hideMessages();
        this.setLoading(true);

        const formData = new FormData(this.form);

        try {
            await this.submit(formData);

            this.showSuccess();
            this.form.reset();
        } catch (error) {
            if (error instanceof Error) {
                this.showError(error);
            }
        } finally {
            this.setLoading(false);
        }
    }

    private async submit(formData: FormData): Promise<void> {
        const response = await fetch(this.form!.action, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to submit form");
        }

        return data;
    }

    private setLoading(isLoading: boolean): void {
        if (!this.submitButton) return;

        this.submitButton.disabled = isLoading;

        if (isLoading) {
            this.submitButton.classList.add("opacity-50", "cursor-not-allowed");
        } else {
            this.submitButton.classList.remove(
                "opacity-50",
                "cursor-not-allowed",
            );
        }
    }

    private showSuccess(): void {
        this.successMessage?.classList.remove("hidden");
        setTimeout(() => {
            this.successMessage?.classList.add("hidden");
        }, 5000);
    }

    private showError(error?: Error): void {
        this.errorMessage?.classList.remove("hidden");

        // Optionally display the error message
        if (error && this.errorMessage) {
            const messageSpan = this.errorMessage.querySelector("span");
            if (messageSpan) {
                // Keep the translation key if no specific error
                console.error("Form submission error:", error);
            }
        }

        setTimeout(() => {
            this.errorMessage?.classList.add("hidden");
        }, 5000);
    }

    private hideMessages(): void {
        this.successMessage?.classList.add("hidden");
        this.errorMessage?.classList.add("hidden");
    }
}

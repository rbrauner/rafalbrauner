// Import all images from the img folder to make them available
import.meta.glob(["../img/**"]);

import "@/css/app.css";
import VueLoader from "@/ts/Utils/VueLoader";
import { ThemeManager } from "@/ts/theme/ThemeManager";
import { ContactFormHandler } from "@/ts/forms/ContactFormHandler";
import { CookieBanner } from "@/ts/components/CookieBanner";
import { MobileMenu } from "@/ts/components/MobileMenu";

document.addEventListener("DOMContentLoaded", () => {
    const vueLoader = new VueLoader();
    vueLoader.load();

    new ThemeManager();
    new ContactFormHandler();
    new CookieBanner();
    new MobileMenu();
});

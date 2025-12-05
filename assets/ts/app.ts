// Import all images from the img folder to make them available
import.meta.glob(["../img/**"]);

import "@/css/app.css";
import VueLoader from "@/ts/Utils/VueLoader";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Happy coding !!");

    const vueLoader = new VueLoader();
    vueLoader.load();
});

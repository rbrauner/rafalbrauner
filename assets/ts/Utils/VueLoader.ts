import { createApp } from "vue";
import VueComponentFinder from "@/ts/Utils/VueComponentFinder";

export default class VueLoader {
    load = async () => {
        document.querySelectorAll("vue-component").forEach(async (el) => {
            const name = el.getAttribute("name");
            const rawProps = el.getAttribute("props");
            const props = rawProps ? JSON.parse(rawProps) : {};

            const vueComponentFinder = new VueComponentFinder();
            const component = await vueComponentFinder.find(name);

            if (!component) {
                console.error(`Component ${name} not found.`);
                return;
            }

            createApp(component, props).mount(el);
        });
    };
}

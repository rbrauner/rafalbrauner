export default class VueComponentFinder {
    find = async (name: string) => {
        try {
            const components = await import.meta.glob("../../vue/**/*.vue");
            const componentKey = Object.keys(components).find((key: string) => {
                const componentName = key
                    .replace(/\.vue$/, "")
                    .replace(/^\.\.\/\.\.\/vue\//, "");
                return componentName === name;
            });
            const component =
                componentKey !== undefined
                    ? (await components[componentKey]()).default
                    : null;

            return component;
        } catch (err) {
            console.error(`Nie znaleziono komponentu ${name}.vue`, err);
        }
    };
}

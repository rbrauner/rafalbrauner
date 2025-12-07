import express from "express";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import VueComponentFinder from "@/ts/Utils/VueComponentFinder";

const ssr = express();

ssr.get("/", async (req, res) => {
    let data = req.query.data || {};
    data = typeof data === "string" ? JSON.parse(data) : data;
    const name = data.name || "";
    const props = data.props || {};

    const vueComponentFinder = new VueComponentFinder();
    const component = await vueComponentFinder.find(name);

    const app = createSSRApp({
        render: () => h(component, props),
    });

    const html = await renderToString(app);
    res.send(html);
});

ssr.listen(3000, () => {
    console.log("ready");
});

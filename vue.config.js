module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
        },
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "./src/assets/scss/setting.scss";`
            }
        }
    }
};
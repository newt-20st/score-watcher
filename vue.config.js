module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "scoreboard",
                appId: "app.web.newt-house",
                win: {
                    target: [
                        {
                            target: 'portable', // 'zip', 'nsis', 'portable'
                            arch: ['x64'] // 'x64', 'ia32'
                        }
                    ]
                }
            }
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
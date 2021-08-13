module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "publish": {
                    "provider": "github",
                    "owner": "newt-20st",
                    "repo": "scoreboard",
                    "releaseType": "release"
                },
                productName: "my-application",
                appId: "com.sample.myapplication",
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
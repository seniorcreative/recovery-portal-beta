//vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "WorkSafe Recovery Centre";
                args[0].matomoSiteId = process.env.VUE_MATOMO_SITE_ID;
                return args;
            })
        config.optimization.minimize(false)
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hotOnly: false,
    }
}
// vue.config.js
module.exports = {
    pages: {
        index: 'src/renderer/main',
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        work: 'src/work/main'
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    perMachine: true
                }
            }
        }
    },
}
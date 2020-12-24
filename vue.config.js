// vue.config.js
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    pages: {
        rencherer: 'src/renderer/main',
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
    chainWebpack: config => {
        // config.resolve.alias
        //     .set('@', path.join(__dirname, 'src/renderer'))
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/renderer/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    configureWebpack:{
        externals: {
            sequelize: "require('sequelize')",
            sqlite3: "require('sqlite3')",
            tedious: "require('tedious')"
        }
    }
}
const { getCreateConfig } = require('./config/config.file');
const fileName = require('./config/fileName')[process.env.selfDirName];
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function getPages() {
    let obj = {};

    let { html: { filename: template }, js: { filename: entry } } = getCreateConfig(process.env.selfDirName)

    console.log(template, entry)
    Object.entries(fileName).forEach(([k, v]) => {
        obj[k] = {
            entry: entry.replace(/\${filename}/g, k),
            template: template.replace(/\${filename}/g, k),
            filename: isProd ? `${k}.html` : `${process.env.selfDirName}/${k}.html`,// process.env.NODE_ENV === 'production' ?`${v}.html`:`${process.env.selfDirName}/${v}.html`,
            title: '',
            favicon: path.join(__dirname, './public/favicon.ico'),
            chunks: ['chunk-vendors', 'chunk-common', `${k}`]
        }
    })
    return obj
}
let pages = getPages();


const proxyTar = {
    target: 'http://localhost:8080',
    // pathRewrite: { '^/user' : '' },
    changeOrigin: true,
    // secure: false, // 接受 运行在 https 上的服务
}

module.exports = {
    lintOnSave: false,
    publicPath: isProd ? '' : '/',   //process.env.NODE_ENV === 'production' ? '':'/', //'/'+process.env.selfDirName+'/'
    outputDir: 'dist/' + process.env.selfDirName,
    assetsDir: 'static',//放置生成的静态资源（js,css,img,fonts）的（想对于outputDir）的目录
    pages,
    devServer: {
        index: 'login.html',
        // contentBase: path.join(__dirname, process.env.selfDirName),
        port: process.env.port,
        proxy: {
            '/user': proxyTar,
            '/sys': proxyTar,
            '/gov': proxyTar,
            '/api': proxyTar,
            '/register': proxyTar,
            '/ent': proxyTar,
            '/problem': proxyTar,
            '/appgov': proxyTar,
            '/appent': proxyTar,
        }

    },
    css: {
        sourceMap: !isProd,
        loaderOptions: process.env.selfAdaption ? {
            postcss: {
                plugins: [
                    // px转rem
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        unitPrecision: 5,
                        propList: ['*', '!font-size', '!border'],
                        replace: isProd ? true : false,
                        selectorBlackList: [],
                        minPixelValue: 12
                    })
                ]
            }
        } : {}
    },

    configureWebpack: config => {
        let staticPath = '';
        if (isProd) {
            config.devtool = 'eval-source-map';
            staticPath = path.resolve(__dirname, `./dist/static`);
            // config.plugins = [...config.plugins,new BundleAnalyzerPlugin()]
        } else {
            staticPath = 'static'

        }
        config.plugins = [...config.plugins, new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: staticPath,
                // toType: 'dir',
                // ignore: ['.*']
            }
        ])]
        config.externals = {
            'jquery': 'window.jQuery',
            'echarts': 'window.echarts',
            // 'BMap':'window.BMap'
        },
            Object.assign(config, { // 开发生产共同配置
                resolve: {
                    extensions: ['.js', '.vue', '.json'],
                    alias: {
                        '@': path.resolve(__dirname, './src'),
                        '@api': path.resolve(__dirname, './src/common/interface/api'),
                        '@c': path.resolve(__dirname, './src/components'),

                        // 配置到最底层的目录，方便以后迁移
                        '@utils': path.resolve(__dirname, './src/common/utils'),
                        '@less': path.resolve(__dirname, './src/common/less'),
                        '@constant': path.resolve(__dirname, './src/common/constant'),
                        '@mixins': path.resolve(__dirname, './src/common/mixins'),
                        '@helpers': path.resolve(__dirname, './src/common/helpers'),

                        'vue$': 'vue/dist/vue.esm.js',
                    },
                },
            })
    },
    // chainWebpack:config =>{

    //   config
    //   .end()
    // }
}

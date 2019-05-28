
const colors = require('colors');
const fs = require("fs");
const path = require('path');


function createHTML(name, fileConfig) {
    console.log(`-----start create ${name}.html`.blue);
    let file = fileConfig.output.html + '/' + name + '.html';
    if (fs.existsSync(file)) {
        console.log(`--------${name}.html has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.html).toString())
        }).then(res => {
            fs.writeFile(file, res, () => {
                console.log(`------create ${name}.html success-------`.green)
            })
        })
    }
}
function createJS(name, fileConfig) {
    console.log(`-----start create ${name}.js`.blue);
    let file = fileConfig.output.js + '/' + name + '.js';
    if (fs.existsSync(file)) {
        console.log(`--------${name}.js has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.js).toString().replace(/\${NAME}/g, name))
        }).then(res => {
            fs.writeFile(file, res, () => {
                console.log(`------create ${name}.js success-------`.green)
            })
        })
    }
}
function createVUE(name, fileConfig) {
    console.log(`-----start create ${name}.vue`.blue);
    let file = fileConfig.output.vue + '/' + name + '.vue';
    if (fs.existsSync(file)) {
        console.log(`--------${name}.vue has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.vue).toString().replace(/\${NAME}/g, name))
        }).then(res => {
            fs.writeFile(file, res, () => {
                console.log(`------create ${name}.vue success-------`.green)
            })
        })
    }
}
function createRouter(name, fileConfig) {
    console.log(`-----start create ${name} router.js`.blue);
    let file = fileConfig.output.js + 'router.js';
    console.log(file)
    if (fs.existsSync(file)) {
        console.log(`--------${name}.router.js has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.router).toString())
        }).then(res => {
            fs.writeFile(file, res, () => {
                console.log(`------create ${name}.router.js success-------`.green)
            })
        })
    }
}

function createCSS(name, fileConfig) {
    console.log(`-----start create ${name}.less`.blue);
    let file = fileConfig.output.less + '/' + name + '.less';
    if (fs.existsSync(file)) {
        console.log(`--------${name}.less has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.less).toString())
        }).then(res => {
            fs.writeFile(file, res, () => {
                console.log(`------create ${name}.less success-------`.green)
            })
        })
    }

}

function createAxiosFile(name,file,fileConfig){
    if (fs.existsSync(file)) {
        console.log(`--------${name}.axios.js has excited ----------`.yellow);
    } else {
        new Promise((resolve) => {
            resolve(fs.readFileSync(fileConfig.template.axios).toString())
        }).then(res => {
            console.log(res);
            fs.writeFile(file, res, (err) => {
                if(err){
                    console.log(`------create ${name}.axios.js failed-------`.red);
                    return;
                }
                console.log(`------create ${name}.axios.js success-------`.green)
            })
        })
    }
}

function createAxios(name, fileConfig) {
    console.log(`-----start create ${name} axios.js`.blue);
    let file = fileConfig.output.axios + name + '.js';
    console.log(file);
    if(fs.existsSync(fileConfig.output.axios)){
        createAxiosFile(name,file,fileConfig);
    }else{
        fs.mkdir(fileConfig.output.axios,()=>{
            createAxiosFile(name,file,fileConfig);
        })
    }

}

function createPage(name, fileConfig) {

    // less统一不要额外文件
    // let lessDir = fileConfig.output.less;
    // if (fs.existsSync(lessDir)) {
    //     console.log(`---------- current file path " ${name}" is exists-------------`.yellow);
    //     createCSS(name, fileConfig);
    // } else {
    //     fs.mkdir(lessDir, () => {
    //         createCSS(name, fileConfig);
    //     });
    // }

    createJS(name, fileConfig);
    createVUE(name, fileConfig);
    createHTML(name, fileConfig);
    createRouter(name, fileConfig);
    createAxios(name, fileConfig);
}
function getPath() {
    return
}
module.exports = createPage


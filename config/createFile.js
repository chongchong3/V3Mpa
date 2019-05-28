

const createPage = require('./createTempAction');
const getPathMapList = require('./fileMap');
const fs = require('fs');
const path = require('path');
const createProj = function(dir){

  let pathDir = path.join(__dirname,'../src/'+dir);

  if(!fs.existsSync(pathDir)){
    fs.mkdir(pathDir,function(){
      createFun(dir)
    })
  }else{
    createFun(dir);
  }

  function createFun(dir){
    const fileName = require('./fileName')[dir];

    // console.log(fileConfig.output.html);

    fileName.forEach(v=>{
      let  fileConfig = getPathMapList(dir,v);
    //   console.log(fileConfig);
      let p = fileConfig.output.html;
      let fileDir = fs.existsSync(p);
      if(!fileDir){
        fs.mkdir(p,function(){
            console.log(`-------start create ${v} page-----------`);
            createPage(v,fileConfig);
        });
      }else{
        console.log(`-------start create ${v} page-----------`);
        createPage(v,fileConfig);
      }
    })
  }

  // let p = fileConfig.output.html;
  // // console.log(p);
  // let fileDir = fs.existsSync(p);
  // // console.log(fileDir)
  // if(!fileDir){
  //   fs.mkdir(p,function(){
  //     fileName.forEach((v)=>{
  //       console.log(`-------start create ${v} page-----------`);
  //       createPage(v,fileConfig);
  //     })
  //   });
  // }else{
  //   fileName.forEach((v)=>{
  //     console.log(`-------start create ${v} page-----------`);
  //     createPage(v,fileConfig);
  //   })
  // }



}
module.exports  = createProj

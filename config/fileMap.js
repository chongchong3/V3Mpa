const path  = require('path');
function getPath(dir,name){
  name =dir + '/'+ name+'/';
  return {
    template:{
      html:path.join(__dirname,`./template/${dir}/html.template`),
      js:path.join(__dirname,`./template/${dir}/js.template`),
      vue:path.join(__dirname,`./template/${dir}/vue.template`),
      router:path.join(__dirname,`./template/${dir}/router.template`),
      axios:path.join(__dirname,`./template/${dir}/axios.template`)
    },
    output:{
      html:path.join(__dirname,'../src/'+name),
      js:path.join(__dirname,'../src/'+name),
      router:path.join(__dirname,'../src/'+name),
      vue:path.join(__dirname,'../src/'+name),
      axios:path.join(__dirname,`../src/common/interface/api/` + dir + '/')
    }
  }
}
const getPathMapList = function(dir,name){
  return getPath(dir,name)
}
module.exports = getPathMapList;

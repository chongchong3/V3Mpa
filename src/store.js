import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        permission: [],
        routePath: [],
        isEntFile:false,//是否有档案权限
        isAdmin:1,//是否为管理员
        creditCode:'',
        curModAuthority:[],
        totalWater:0,//总用水
        sendListTotal:[], //自核列表
        sendList1:{},
        sendList2:{},
        sendList3:{},
        sendList4:{},
        sendList5:{},
        sendList6:{},
        apealButs:{
            taxInfo:true,
            pollution:true,
            totalInfo:true,
            landInfo:true
        }, //自核弹框提示
        paperParam:{
            action : '',
            creditCode:'',
            dataType:'',
            entName:'',
            dataYear:'',
            townStatus:'',
            status:'',
        },
        saveData:{
            taxList:{},
            operateList:{},
            landList:{},
            waterList:{},
            electricList:{}
        }
        
    },
    getters: {
        getRoutes: state => state.permission,
        getRoutePath: state => state.routePath,
        getSaveData: state => state.saveData
    },
    mutations: {
        setPaperParam (state,payload){
            state.paperParam = payload.params
        },
        setsendList(state,v){
        },
        setApealButs(state,v){
            state.apealButs= {...state.apealButs, [v.type]: v.value}
        },
        setList1(state,v){
            console.log(v,'st')
            // let obj={},mergeArray=[],list={}
            //  v.field.map((v,i)=>{
            //   let name=v.id
            //    if(!obj[name]){
            //     obj[name] = [];
            //    }
            //    obj[name].push(v.key)
            //    return obj
            // })
            // for(let i in obj){
            //         let o = {};
            //         o[i] = obj[i].join(',');
            //         mergeArray.push(o)
            // }
            let list={
                field: JSON.stringify(v.field),
                type: v.type,
                content: v.content
            }
             state.sendList1=list
        },
        setList2(state,v){
            state.sendList2=v
        },
        setList3(state,v){
            state.sendList3=v
        },
        setList4(state,v){
            state.sendList4=v
        },
        setList5(state,v){
            state.sendList5=v
        },
        setList6(state,v){
            state.sendList6=v
        },
        setTotalWater(state,v){
            state.totalWater = v
        },
        setSaveData (state,v){
            let oldVal = state.saveData;
            state.saveData = {...state.saveData, [v.params.type]: v.params.value}
        },
        setCurModAuthority(state,payload){
            let permission = JSON.parse(localStorage.getItem("curl")) ||[];
            function analysisNav(children){
                return children?children.map(v=>{
                    return {
                        type: v.type,
                        name: v.name,
                        active: v.cUrls,
                        seq: v.seq,
                        children: analysisNav(v.child)
                    }
                }) : ``;
            }
            let navs = permission ? analysisNav(permission) : [];
            let np = payload.np;
            let currNav = navs.filter((v, i) => {
                return v.active && v.active.indexOf(payload.np) > -1;

            })
            state.curModAuthority = currNav[0];
        },
        setPermissionFromStorage(state) {
            let permission = [];
            try {
                permission = JSON.parse(localStorage.getItem("curl"));
            } catch (error) {
                throw new Error('JSON转换错误')
            }

            state.permission = permission;
            state.isEntFile = permission.filter((v) => {
                return v.id == 1
            }).length > 0 ? true : false;
        },

        setAdmin(state) {
            let isAdmin=0
            try {
               isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            } catch (error) {
                throw new Error('JSON转换错误')
            }
            state.isAdmin = isAdmin;
        },
        setRoutePath(state, path) {
            if (!Array.isArray(path)) throw new Error('routerPath is a Array');
            state.routePath = path;
        },

        GET_CREDIT_CODE(state, creditCode) {
            state.creditCode = creditCode;
            // console.log(creditCode,'kk')
        }


    },
    actions: {
        // TODO
        // 远程拉取权限
        setPermissionAsync({ commit }) {
            // request
            commit('setPermission', permission)
            return permission;
        },
        //entDatail获取creditCode
        getCreditCode({ commit }, creditCode) {
            commit('GET_CREDIT_CODE', creditCode);
        }


    },
    modules: {}
})

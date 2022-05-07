

//随机生成词条
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
//随机生成装备品质（0.1-1.0）
var fomatFloat = function(value, n) {
    var f = Math.round(value*Math.pow(10,n))/Math.pow(10,n);
    var s = f.toString();
    var rs = s.indexOf('.');   
    if (rs < 0) {     
        s += '.';   
    } 
    for(var i = s.length - s.indexOf('.'); i <= n; i++){
      s += "0";
    }
    return s;
    }

function randomquality() {
        let quality = Math.random()
        let final =fomatFloat(quality,1)
        if(final==0.0){
            final+=0.1
        }
        return  final;
    }
//随机词条


var extra=[
    '暴击','攻击','暴击伤害'
]
//DPS = dmg/quality
var weaponlist = [
    {
        name:"新手剑",
        type:'',
        intro:"新手村赛利亚打造，5G一件，质量堪忧",
        dmg:random(1,3),
        quality:randomquality(),
        extraNum:random(1,5),
        imgurl:"S_Sword01",
        extraList:[],
        dmglist:[],
        DPS:'',
        qualityname:"",
        color:'',
        fontcolor:'',
        lv:random(1,15)

    },
]

for (let i=0;i<weaponlist.length;i++){
    for(let j=0;j<weaponlist[i].extraNum;j++){
        let code = extra[random(0,extra.length-1)]
        let obj = {}
        obj[code]="+"+random(2,10)
        weaponlist[i].extraList.push(obj)
    }
    for(let j=0;j<weaponlist[i].dmg;j++){
        let code = extra[random(0,extra.length-1)]
        let obj = {}
        obj[code]="+"+random(2,10)
        weaponlist[i].dmglist.push(obj)
    }
    weaponlist[i].type='武器'
    if(weaponlist[i].quality<=0.2){
        weaponlist[i].qualityname='SP'
        weaponlist[i].color='rgb(255 0 0) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(255 0 0)'
    }
    else if(weaponlist[i].quality<=0.4){
        weaponlist[i].qualityname='SSR'
        weaponlist[i].color='rgb(247 137 24) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(247 137 24)'
    }
    else if(weaponlist[i].quality<=0.6){
        weaponlist[i].qualityname='SR'
        weaponlist[i].color='rgb(255 0 255) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(255 0 255)'
    }
    else if(weaponlist[i].quality<=0.8){
        weaponlist[i].qualityname='R'
        weaponlist[i].color='rgb(16, 158, 240) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(16, 158, 240)'
    }else{
        weaponlist[i].qualityname='N'
        weaponlist[i].color='rgb(161 161 161) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(161 161 161)'
    }
}
console.log(weaponlist[0].extraList[0])
// if(weaponlist[0].extraList[0])
//计算DPS
// for(let i=0;i<weaponlist.length;i++){
//     let atk = weaponlist[i].dmg.slice(1)
//     let bj =0
//     let bjsh=0
//     // let dps = dmg/weaponlist[i].quality
//     for(let j=0;j<weaponlist[i].extraList.length;j++){
//         if(weaponlist[i].extraList[j]=='攻击'){
//             atk+=weaponlist[i].extraList[j].攻击
//         }else if(weaponlist[i].extraList[j])
//     }
//     weaponlist[i].DPS = dps.toFixed(0)
// }




export default weaponlist
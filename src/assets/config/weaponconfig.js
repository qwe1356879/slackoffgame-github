

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
    '暴击率','攻击','暴击伤害','生命','护甲','每秒恢复HP'
]
var basicextra=[
    '暴击率','攻击','暴击伤害'
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
        DPS:0,
        qualityname:"",
        color:'',
        fontcolor:'',
        lv:random(1,60)

    },
]

for (let i=0;i<weaponlist.length;i++){
    

    weaponlist[i].type='武器'
   let x = {
    "攻击":"+"+random(weaponlist[0].lv*0.7,weaponlist[0].lv*0.8).toFixed(0)
   }
   weaponlist[i].dmglist.push(x)
    if(weaponlist[i].quality<=0.2){
        weaponlist[i].qualityname='SP'
        weaponlist[i].color='rgb(255 0 0) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(255 0 0)'
        
        for(let j=0;j<weaponlist[i].dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.8,weaponlist[0].lv*0.9).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*1.1,weaponlist[0].lv*1.2).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*1.6,weaponlist[0].lv*1.8).toFixed(0)
                weaponlist[i].dmglist.push(obj)
            }
        }
        for(let j=0;j<weaponlist[i].extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.6,weaponlist[0].lv*0.7).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.8,weaponlist[0].lv*0.9).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*1.3,weaponlist[0].lv*1.5).toFixed(0)
                weaponlist[i].extraList.push(obj)
            }
        }
    }
    else if(weaponlist[i].quality<=0.3){
        weaponlist[i].qualityname='SSR'
        weaponlist[i].color='rgb(247 137 24) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(247 137 24)'
        for(let j=0;j<weaponlist[i].dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.7,weaponlist[0].lv*0.8).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.8,weaponlist[0].lv*0.9).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*1.1,weaponlist[0].lv*1.2).toFixed(0)
                weaponlist[i].dmglist.push(obj)
            }
        }

        for(let j=0;j<weaponlist[i].extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.7,weaponlist[0].lv*0.8).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*1.1,weaponlist[0].lv*1.2).toFixed(0)
                weaponlist[i].extraList.push(obj)
            }
        }
    }
    else if(weaponlist[i].quality<=0.7){
        weaponlist[i].qualityname='SR'
        weaponlist[i].color='rgb(255 0 255) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(255 0 255)'
        for(let j=0;j<weaponlist[i].dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.6,weaponlist[0].lv*0.7).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*1.1,weaponlist[0].lv*1.2).toFixed(0)
                weaponlist[i].dmglist.push(obj)
            }
        }

        for(let j=0;j<weaponlist[i].extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.4,weaponlist[0].lv*0.5).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.6,weaponlist[0].lv*0.7).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*0.9,weaponlist[0].lv*1).toFixed(0)
                weaponlist[i].extraList.push(obj)
            }
           
        }
    }
    else if(weaponlist[i].quality<=0.8){
        weaponlist[i].qualityname='R'
        weaponlist[i].color='rgb(16, 158, 240) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(16, 158, 240)'
        for(let j=0;j<weaponlist[i].dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.6,weaponlist[0].lv*0.7).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*0.7,weaponlist[0].lv*0.8).toFixed(0)
                weaponlist[i].dmglist.push(obj)
            }
         
        }

        for(let j=0;j<weaponlist[i].extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.4,weaponlist[0].lv*0.5).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*0.7,weaponlist[0].lv*0.8).toFixed(0)
                weaponlist[i].extraList.push(obj)
            }
        }
    }else{
        weaponlist[i].qualityname='N'
        weaponlist[i].color='rgb(161 161 161) 0px 0px 7px 2px inset'
        weaponlist[i].fontcolor='rgb(161 161 161)'
        for(let j=0;j<weaponlist[i].dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.4,weaponlist[0].lv*0.5).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)+"%"
                weaponlist[i].dmglist.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)
                weaponlist[i].dmglist.push(obj)
            }
         
        }

        for(let j=0;j<weaponlist[i].extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(weaponlist[0].lv*0.3,weaponlist[0].lv*0.4).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weaponlist[0].lv*0.4,weaponlist[0].lv*0.5).toFixed(0)+"%"
                weaponlist[i].extraList.push(obj)
            }else{
                obj[code]="+"+random(weaponlist[0].lv*0.5,weaponlist[0].lv*0.6).toFixed(0)
                weaponlist[i].extraList.push(obj)
            }
          
          
        }
    }
}




export default weaponlist
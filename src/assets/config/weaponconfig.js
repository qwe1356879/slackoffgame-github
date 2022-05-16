

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
        // let quality = 
        let final =fomatFloat(Math.random(),1)
        if(final==0.0){
            final+=0.1
        }
        return  final;
    }

    
//随机词条
var extra=[
    '暴击率','攻击','暴击伤害','生命','防御力','每秒恢复HP'
]
var basicextra=[
    '暴击率','攻击','暴击伤害'
]

var crateWeapon= function(level){
    let weapon =  {
        name:"新手剑",
        type:'武器',
        intro:"新手村赛利亚打造，5G一件，质量堪忧",
        dmg:random(1,3),
        quality:randomquality(),
        extraNum:0,
        imgurl:"S_Sword01",
        extraList:[],
        dmglist:[],
        DPS:0,
        qualityname:"",
        color:'',
        fontcolor:'',
        lv:level
    }

        let x = {
        "攻击":"+"+random(weapon.lv*0.7,weapon.lv*0.8).toFixed(0)
       }
       weapon.dmglist.push(x)
       if(weapon.quality<=0.1){
        weapon.qualityname='SP'
        weapon.color='rgb(255 0 0) 0px 0px 7px 2px inset'
        weapon.fontcolor='rgb(255 0 0)'
        weapon.extraNum = random(4,5)
        for(let j=0;j<weapon.dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*1.1,weapon.lv*1.2).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*2.2,weapon.lv*2.5).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }
        for(let j=0;j<weapon.extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.8,weapon.lv*0.9).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*2.2,weapon.lv*2.5).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    }
    else if(weapon.quality<=0.3){
        weapon.qualityname='SSR'
        weapon.color='rgb(247 137 24) 0px 0px 7px 2px inset'
        weapon.fontcolor='rgb(247 137 24)'
        weapon.extraNum = random(3,4)
        for(let j=0;j<weapon.dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.8,weapon.lv*0.9).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.9,weapon.lv*2.1).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for(let j=0;j<weapon.extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.7,weapon.lv*0.8).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.9,weapon.lv*2.1).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    }
    else if(weapon.quality<=0.7){
        weapon.qualityname='SR'
        weapon.color='rgb(255 0 255) 0px 0px 7px 2px inset'
        weapon.fontcolor='rgb(255 0 255)'
        weapon.extraNum = random(2,3)
        for(let j=0;j<weapon.dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.5,weapon.lv*0.6).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.7,weapon.lv*1.8).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for(let j=0;j<weapon.extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.6,weapon.lv*0.7).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.7,weapon.lv*1.8).toFixed(0)
                weapon.extraList.push(obj)
            }
           
        }
    }
    else if(weapon.quality<=0.8){
        weapon.qualityname='R'
        weapon.color='rgb(16, 158, 240) 0px 0px 7px 2px inset'
        weapon.fontcolor='rgb(16, 158, 240)'
        weapon.extraNum = random(1,2)
        for(let j=0;j<weapon.dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.6,weapon.lv*0.7).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.4,weapon.lv*1.5).toFixed(0)
                weapon.dmglist.push(obj)
            }
         
        }

        for(let j=0;j<weapon.extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.5,weapon.lv*0.6).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.4,weapon.lv*1.5).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    }else{
        weapon.qualityname='N'
        weapon.color='rgb(161 161 161) 0px 0px 7px 2px inset'
        weapon.fontcolor='rgb(161 161 161)'
        weapon.extraNum = random(1,2)
        for(let j=0;j<weapon.dmg;j++){
            let code = basicextra[random(0,basicextra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.5,weapon.lv*0.6).toFixed(0)+"%"
                weapon.dmglist.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.3,weapon.lv*1.4).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for(let j=0;j<weapon.extraNum;j++){
            let code = extra[random(0,extra.length-1)]
            let obj = {}
            if(code=='暴击率'){
                obj[code]="+"+random(4,10).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else if(code=='暴击伤害'){
                obj[code]="+"+random(weapon.lv*0.4,weapon.lv*0.5).toFixed(0)+"%"
                weapon.extraList.push(obj)
            }else{
                obj[code]="+"+random(weapon.lv*1.3,weapon.lv*1.4).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    }
    return weapon
}

// let test = crateWeapon(60)
// console.log('test',test)
//DPS = dmg/quality
export default crateWeapon
export {random,randomquality,fomatFloat}
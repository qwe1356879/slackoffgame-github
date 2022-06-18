import {
    weaponintro
} from './intro'
import {
    weaponNameList
} from './equipmentname';
import {
    leftimglist
} from './equipmentimg';
//随机词条
var extra = [
    '生命值', '每秒恢复HP', '暴击', '暴击伤害'
]
var basicextra = [
    '防御力', '攻击'
]

//随机生成词条
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
//随机生成装备品质（0.1-1.0）
var fomatFloat = function (value, n) {
    var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        s += '.';
    }
    for (var i = s.length - s.indexOf('.'); i <= n; i++) {
        s += "0";
    }
    return s;
}

function randomquality() {
    // let quality = 
    let final = fomatFloat(Math.random(), 1)
    if (final == 0.0) {
        final += 0.1
    }
    return final;
}
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
/*
N 10-100       0<=N<40        
R 20-100       40<=R<55
SR 30-100      55<=SR<75
SSR 40-100     75<=SSR<90
SP  50-100     90<=SP<=100
*/
//level:number= 人物等级
//jobtype:string=任务难度
//which:number = 第几个怪物(难度越高,挑战越后面,范围越小也就是概率越大)
//+1 +2 +3 +4 +5
var crateLeft = function (level, jobtype, which) {
    var lower = 0
    let upper=level*30
    if(jobtype=='N'){
        lower = 1
    }else if(jobtype=='R'){
        lower = 2
    }else if(jobtype=='SR'){
        lower = 3
    }else if(jobtype=='SSR'){
        lower = 4
    }else{
        lower = 5
    }
    let weapon = {
        name: weaponNameList[random(0, weaponNameList.length - 1)],
        type: '首饰',
        intro: weaponintro[random(0, weaponintro.length - 1)],
        dmg: random(1, 3),
        quality: random(which,upper),
        extraNum: 0,
        imgurl: leftimglist[random(0, leftimglist.length - 1)],
        extraList: [],
        dmglist: [],
        DPS: 0,
        qualityname: "",
        color: '',
        fontcolor: '',
        lv: level,
        price:0,
        id: randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    }

    //     let x = {
    //     "防御力":"+"+random(weapon.lv*0.7,weapon.lv*0.8).toFixed(0)
    //    }
    //    weapon.dmglist.push(x)

    if (upper-Math.round(upper*0.05)<=weapon.quality&&weapon.quality <=upper) {
        weapon.qualityname = 'SP'
        weapon.color = 'rgb(255 0 0) 0px 0px 7px 2px inset'
        weapon.fontcolor = 'rgb(255 0 0)'
        weapon.extraNum = random(4, 5)
        weapon.price=Math.round(weapon.quality*1.2)
        for (let j = 0; j < weapon.dmg; j++) {
            let code = basicextra[random(0, basicextra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.dmglist.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 1.1, weapon.lv * 1.2).toFixed(0) 
                weapon.dmglist.push(obj)
            }
        }
        for (let j = 0; j < weapon.extraNum; j++) {
            let code = extra[random(0, extra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.extraList.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.8, weapon.lv * 0.9).toFixed(0) 
                weapon.extraList.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 2.2, weapon.lv * 2.5).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    } else if (upper-Math.round(upper*0.2)<=weapon.quality) {
        weapon.qualityname = 'SSR'
        weapon.color = 'rgb(247 137 24) 0px 0px 7px 2px inset'
        weapon.fontcolor = 'rgb(247 137 24)'
        weapon.extraNum = random(3, 4)
        weapon.price=Math.round(weapon.quality*0.6)
        for (let j = 0; j < weapon.dmg; j++) {
            let code = basicextra[random(0, basicextra.length - 1)]
            let obj = {}

            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.dmglist.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.8, weapon.lv * 0.9).toFixed(0) 
                weapon.dmglist.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.9, weapon.lv * 2.1).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for (let j = 0; j < weapon.extraNum; j++) {
            let code = extra[random(0, extra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.extraList.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.7, weapon.lv * 0.8).toFixed(0) 
                weapon.extraList.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.9, weapon.lv * 2.1).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    } else if (upper-Math.round(upper*0.4)<=weapon.quality) {
        weapon.qualityname = 'SR'
        weapon.color = 'rgb(255 0 255) 0px 0px 7px 2px inset'
        weapon.fontcolor = 'rgb(255 0 255)'
        weapon.extraNum = random(2, 3)
        weapon.price=Math.round(weapon.quality*0.5)
        for (let j = 0; j < weapon.dmg; j++) {
            let code = basicextra[random(0, basicextra.length - 1)]
            let obj = {}

            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.dmglist.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.5, weapon.lv * 0.6).toFixed(0) 
                weapon.dmglist.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.7, weapon.lv * 1.8).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for (let j = 0; j < weapon.extraNum; j++) {
            let code = extra[random(0, extra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.extraList.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.6, weapon.lv * 0.7).toFixed(0) 
                weapon.extraList.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.7, weapon.lv * 1.8).toFixed(0)
                weapon.extraList.push(obj)
            }

        }
    } else if (upper-Math.round(upper*0.6)<=weapon.quality) {
        weapon.qualityname = 'R'
        weapon.color = 'rgb(16, 158, 240) 0px 0px 7px 2px inset'
        weapon.fontcolor = 'rgb(16, 158, 240)'
        weapon.extraNum = random(1, 2)
        weapon.price=Math.round(weapon.quality*0.4)
        for (let j = 0; j < weapon.dmg; j++) {
            let code = basicextra[random(0, basicextra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.dmglist.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.6, weapon.lv * 0.7).toFixed(0) 
                weapon.dmglist.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.4, weapon.lv * 1.5).toFixed(0)
                weapon.dmglist.push(obj)
            }

        }

        for (let j = 0; j < weapon.extraNum; j++) {
            let code = extra[random(0, extra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.extraList.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.5, weapon.lv * 0.6).toFixed(0) 
                weapon.extraList.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.4, weapon.lv * 1.5).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    } else {
        weapon.qualityname = 'N'
        weapon.color = 'rgb(161 161 161) 0px 0px 7px 2px inset'
        weapon.fontcolor = 'rgb(161 161 161)'
        weapon.extraNum = random(1, 2)
        weapon.price=Math.round(weapon.quality*0.3)
        for (let j = 0; j < weapon.dmg; j++) {
            let code = basicextra[random(0, basicextra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.dmglist.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.5, weapon.lv * 0.6).toFixed(0) 
                weapon.dmglist.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.3, weapon.lv * 1.4).toFixed(0)
                weapon.dmglist.push(obj)
            }
        }

        for (let j = 0; j < weapon.extraNum; j++) {
            let code = extra[random(0, extra.length - 1)]
            let obj = {}
            if (code == '攻击') {
                obj[code] = "+" + random(4, 10).toFixed(0) 
                weapon.extraList.push(obj)
            } else if (code == '生命') {
                obj[code] = "+" + random(weapon.lv * 0.4, weapon.lv * 0.5).toFixed(0) 
                weapon.extraList.push(obj)
            } else {
                obj[code] = "+" + random(weapon.lv * 1.3, weapon.lv * 1.4).toFixed(0)
                weapon.extraList.push(obj)
            }
        }
    }
    return weapon
}
export default crateLeft
export {
    random,
    randomquality,
    fomatFloat
}
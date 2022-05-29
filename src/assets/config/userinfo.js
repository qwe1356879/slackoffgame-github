import Base64 from '../tool/fakebase64'
import crateWeapon from './weaponconfig'
console.log('weapon',); 
let userinfo={
    Lv:1,
    NextLife:0,
    Armo:1,
    Gold:0,
    Atk:2,
    NowHp:120,
    MaxHp:120,
    DPS:1,
    Cridt:20,
    CridtDmg:20,
    equipments:[
        crateWeapon(1)
    ]
}

var base = new Base64();  
var userjmdata = base.encode(JSON.stringify(userinfo))

// console.log('jm',jm)

// var jm2 = base.decode(jm)
// console.log('jm2',JSON.parse(jm2))
export {userjmdata}
export default userinfo


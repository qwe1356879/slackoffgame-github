import Base64 from '../tool/fakebase64'
import crateWeapon from './weaponconfig'
import crateArmo from './armoconifg';
import crateLeft from './leftconfig';
import crateRight from './rightconfig';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let userinfo = {
    Lv: 1,
    NextLife: 0,
    Armo: 1,
    Gold: 0,
    Atk: 2,
    NowHp: 120,
    MaxHp: 120,
    DPS: 1,
    Cridt: 20,
    CridtDmg: 20,
    equipments: [{
            weapon: crateWeapon(1, 1, 1)
        },
        {
            armo: crateArmo(1, 1, 1)
        },
        {
            left: crateLeft(1, 1, 1)
        },
        {
            right: crateRight(1, 1, 1)
        }
    ],
    key: randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
}

export default userinfo
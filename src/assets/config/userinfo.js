
import { generateRandomString } from "tool-assistant";
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
    DPS: 0,
    Cridt: 20,
    CridtDmg: 20,
    SecondHp:Math.round(100*0.04),
    // SecondHp:100,
    equipments: [
        {
            weapon:{
                name: '新手剑',
                type: '武器',
                intro: '这是一把新手武器，好像有点用，拿着吧!',
                dmg: 1,//基础词条个数
                quality: 1,
                extraNum: 1,
                imgurl: '1_(1)',
                extraList: [
                    {
                        "暴击率": "+" + 1
                    }
                ],//额外词条list
                dmglist: [
                    {
                        "攻击": "+" + 1
                    }
                ],//基础词条list
                DPS: 0,
                id: randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                qualityname: "N",
                color: 'rgb(161 161 161) 0px 0px 7px 2px inset',
                fontcolor: 'rgb(161 161 161)',
                lv: 1,
                price:1
            }
        },
        {
            armo: {
                name: '新手护甲',
                type: '护甲',
                intro: '传说穿着它就能抵御怪物袭击',
                dmg: 1,//基础词条个数
                quality: 1,
                extraNum: 1,
                imgurl: '1_(2)',
                extraList: [
                    {
                        "防御力": "+" + 1
                    }
                ],//额外词条list
                dmglist: [
                    {
                        "生命值": "+" + 5
                    }
                ],//基础词条list
                DPS: 0,
                id: randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                qualityname: "N",
                color: 'rgb(161 161 161) 0px 0px 7px 2px inset',
                fontcolor: 'rgb(161 161 161)',
                lv: 1,
                price:1
            }
        },
        {
            left:{
                name: '新手首饰',
                type: '首饰',
                intro: '新手套装之一',
                dmg: 1,//基础词条个数
                quality: 1,
                extraNum: 1,
                imgurl: '1_(1)',
                extraList: [
                    {
                        "生命值": "+" + 1
                    }
                ],//额外词条list
                dmglist: [
                    {
                        "攻击力": "+" + 1
                    }
                ],//基础词条list
                DPS: 0,
                id: randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                qualityname: "N",
                color: 'rgb(161 161 161) 0px 0px 7px 2px inset',
                fontcolor: 'rgb(161 161 161)',
                lv: 1,
                price:1
            }
        },
        {
            right: {
                name: '新手耳环',
                type: '耳环',
                intro: '新手套装之一',
                dmg: 1,//基础词条个数
                quality: 1,
                extraNum: 1,
                imgurl: '1_(2)',
                extraList: [
                    {
                        "生命值": "+" + 1
                    }
                ],//额外词条list
                dmglist: [
                    {
                        "攻击力": "+" + 1
                    }
                ],//基础词条list
                DPS: 0,
                id: randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                qualityname: "N",
                color: 'rgb(161 161 161) 0px 0px 7px 2px inset',
                fontcolor: 'rgb(161 161 161)',
                lv: 1,
                price:1
            }
        }
    ],
    bag:[],
    baglength:20,
    // key: randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    key:generateRandomString(8),
    exp:0,
    needexp:100,
}

export default userinfo
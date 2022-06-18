import {
    random,
    randomquality,
    fomatFloat
} from './weaponconfig'
//  极难 boxshadow 0 0 4px 4px rgb(245 54 54 / 50%);
// 普通 boxshadow:'0 0 4px 4px rgb(100 255 36 / 50%)',
// 困难 boxshadow：0 0 4px 4px rgb(245 241 0 / 50%)
export function add() {
    var args = arguments, //获取所有的参数
        lens = args.length, //获取参数的长度
        d = 0, //定义小数位的初始长度，默认为整数，即小数位为0
        sum = 0 //定义sum来接收所有数据的和
    //循环所有的参数
    for (var key in args) { //遍历所有的参数
        //把数字转为字符串
        var str = "" + args[key];
        if (str.indexOf(".") != -1) { //判断数字是否为小数
            //获取小数位的长度
            var temp = str.split(".")[1].length;
            //比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
            d = d < temp ? temp : d;
        }
    }
    //计算需要乘的数值
    var m = Math.pow(10, d);
    //遍历所有参数并相加
    for (var key in args) {
        sum += args[key] * m;
    }
    //返回结果
    return sum / m;

}
export function getDIVsize(itemid) {
    var o = document.getElementById(itemid);
  
    var w = o.clientWidth || o.offsetWidth;
   
    return w;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var joblist = []
//jobtypelist[random(0,jobtypelist.length-1)]
export function createJob(number, lv, width, height) {
    joblist = []
    let upper=lv*20
    let level = lv
    if (level - 6 <= 0) {
        level = 1
    } 
    for (let i = 0; i < number; i++) {
        let jobobj = {
            type: '',
            lv: random(level, level + 6),
            dpsneed: 0,
            jobid: randomString(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            jobquality: random(0,upper),
            imgurl: '',
            style: {
                'color': '#111',
                'width': '51px',
                'height': '70px',
                'box-shadow': '',
                'border': '1px solid #111',
                'position': 'relative',
                'top': random(10,35) + '%',
                'left': random(10,90) + '%',
                'border-radius': '4px',
                'background-color': 'rgba(0,0,0,.5)'
            },
            imagestyle: {
                'background-color': '',
                'background-repeat': 'no-repeat',
                'border-radius': '50%',
            }
        }

        if ( upper-upper*0.05<=jobobj.jobquality&&jobobj.jobquality <=upper ) {
            jobobj.type = 'SP'
            jobobj.style['box-shadow'] = 'rgb(255 0 0) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(255 0 0) 0px 0px 7px 2px inset'
            jobobj.imgurl = 'sp'
            jobobj.dpsneed = Math.round(jobobj.jobquality/0.1)+jobobj.lv

        } else if (upper-upper*0.05-upper*0.15<=jobobj.jobquality&&jobobj.jobquality < upper-upper*0.05) {
            jobobj.type = 'SSR'
            jobobj.style['box-shadow'] = 'rgb(247 137 24) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(247 137 24) 0px 0px 7px 2px inset'
            jobobj.imgurl = 'ssr'
            jobobj.dpsneed =  Math.round(jobobj.jobquality/0.2)+jobobj.lv
        } else if (upper-upper*0.2-upper*0.2<=jobobj.jobquality&&jobobj.jobquality < upper-upper*0.05-upper*0.15) {
            jobobj.type = 'SR'
            jobobj.style['box-shadow'] = 'rgb(255 0 255) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(255 0 255) 0px 0px 7px 2px inset'
            jobobj.imgurl = 'sr'

            jobobj.dpsneed =  Math.round(jobobj.jobquality/0.3)+jobobj.lv

        } else if (upper-upper*0.4-upper*0.2<=jobobj.jobquality&&jobobj.jobquality < upper-upper*0.4) {
            jobobj.type = 'R'
            jobobj.style['box-shadow'] = 'rgb(16, 158, 240) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(16, 158, 240) 0px 0px 7px 2px inset)'
            jobobj.imgurl = 'r'

            jobobj.dpsneed =  Math.round(jobobj.jobquality/0.4)+Math.round(jobobj.lv*1.8)

        } else {
            jobobj.type = 'N'
            jobobj.style['box-shadow'] = 'rgb(161 161 161) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(161 161 161) 0px 0px 7px 2px inset'
            jobobj.imgurl = 'n'
            jobobj.dpsneed =  Math.round(jobobj.jobquality/0.5)+Math.round(jobobj.lv*1.6)
        }
        joblist.push(jobobj)
    }
    return joblist
}

// export default createJob
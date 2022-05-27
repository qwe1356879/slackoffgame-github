import {random,randomquality,fomatFloat} from './weaponconfig'
//  极难 boxshadow 0 0 4px 4px rgb(245 54 54 / 50%);
// 普通 boxshadow:'0 0 4px 4px rgb(100 255 36 / 50%)',
// 困难 boxshadow：0 0 4px 4px rgb(245 241 0 / 50%)
export function getDIVsize(itemid){
    var o = document.getElementById(itemid);
    console.log('o',o)
    var w = o.clientWidth||o.offsetWidth;
    console.log('width',w)
    return w;
}
var joblist=[
]
//jobtypelist[random(0,jobtypelist.length-1)]
export function createJob(number,lv,width,height){
    joblist=[]
    let level = lv
    if(level-5<=0){
        level=1
    }else if(level+6>60){
        level=54
    }
    for(let i=0;i<number;i++){
        let jobobj={
            type:'',
            lv:random(level,level+6),
            dpsneed:0,
            jobquality:random(0,100),
            imgurl:'',
            style:{
                'color':'#111',
                'width':'51px',
                'height':'70px',
                'box-shadow':'',
                'border': '1px solid #111',
                'position': 'absolute',
                'top':random(80,width-250)+'px',
                'left':random(150,height-200)+'px',
                'border-radius': '4px',
                'background-color':'rgba(0,0,0,.5)'
            },
            imagestyle:{
                'background-color': '',
                'background-repeat':'no-repeat',
                'border-radius':'50%',
            }
        }
     
        if(jobobj.jobquality>=95){
            jobobj.type='SP'
            jobobj.style['box-shadow'] = 'rgb(255 0 0) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(255 0 0) 0px 0px 7px 2px inset'
            jobobj.imgurl='d3'
        }
        else if(jobobj.jobquality>=85){
            jobobj.type='SSR'
            jobobj.style['box-shadow']='rgb(247 137 24) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(247 137 24) 0px 0px 7px 2px inset'
            jobobj.imgurl='d3'
        }
        else if(jobobj.jobquality>=70){
            jobobj.type='SR'
            jobobj.style['box-shadow']='rgb(255 0 255) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(255 0 255) 0px 0px 7px 2px inset'
            jobobj.imgurl='d2'
        }else if(jobobj.jobquality>=50){
            jobobj.type='R'
            jobobj.style['box-shadow']='rgb(16, 158, 240) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(16, 158, 240) 0px 0px 7px 2px inset)'
            jobobj.imgurl='d2'
        }else{
            jobobj.type='N'
            jobobj.style['box-shadow']='rgb(161 161 161) 0px 0px 7px 2px inset'
            jobobj.imagestyle['background-color'] = 'rgb(161 161 161) 0px 0px 7px 2px inset'
            jobobj.imgurl='d1'
        }
        joblist.push(jobobj)
    }
    return joblist
}

// export default createJob
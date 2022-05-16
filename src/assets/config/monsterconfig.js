import {random,randomquality,fomatFloat} from './weaponconfig'
//  极难 boxshadow 0 0 4px 4px rgb(245 54 54 / 50%);
// 普通 boxshadow:'0 0 4px 4px rgb(100 255 36 / 50%)',
// 困难 boxshadow：0 0 4px 4px rgb(245 241 0 / 50%)
let jobtypelist =['普通','困难','极难']
var joblist=[
]
//jobtypelist[random(0,jobtypelist.length-1)]
function createJob(number,lv){
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
            jobquality:randomquality(),
            imgurl:'',
            style:{
                'color':'#111',
                'width':'51px',
                'height':'70px',
                'box-shadow':'',
                'border': '1px solid #111',
                'position': 'absolute',
                'top':random(80,400)+'px',
                'left':random(100,890)+'px',
                'border-radius': '4px',
                'background-color':'rgba(0,0,0,.5)'
            },
            imagestyle:{
                'background-color': '',
                'background-repeat':'no-repeat',
                'border-radius':'50%',
            }
        }
            
    
        if(jobobj.jobquality<=0.2){
            jobobj.type='极难'
            jobobj.style['box-shadow'] = '0 0 4px 4px rgb(245 54 54 / 50%)'
            jobobj.imagestyle['background-color'] = 'rgba(245,54,54,.6)'
            jobobj.imgurl='d3'
        }else if(jobobj.jobquality<=0.5){
            jobobj.type='困难'
            jobobj.style['box-shadow']='0 0 4px 4px rgb(245 241 0 / 50%)'
            jobobj.imagestyle['background-color'] = 'rgba(245,241,0,.6)'
            jobobj.imgurl='d2'
        }else{
            jobobj.type='普通'
            jobobj.style['box-shadow']='0 0 4px 4px rgb(100 255 36 / 50%)'
            jobobj.imagestyle['background-color'] = 'rgba(100,255,36,.6)'
            jobobj.imgurl='d1'
        }
        joblist.push(jobobj)
    }
    return joblist
}

export default createJob
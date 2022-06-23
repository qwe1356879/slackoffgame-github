function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export var successList=[
    {
        lv:1,
        lower:95,
    },
    {
        lv:2,
        lower:90
    },
    {
        lv:3,
        lower:80
    },
    {
        lv:4,
        lower:72
    },
    {
        lv:5,
        lower:63
    },
    {
        lv:6,
        lower:52
    },
    {
        lv:7,
        lower:41
    },
    {
        lv:8,
        lower:30
    },
    {
        lv:9,
        lower:22
    },
    {
        lv:10,
        lower:13
    },
    {
        lv:11,
        lower:10
    },
    {
        lv:12,
        lower:7
    },
    {
        lv:13,
        lower:5
    },
    {
        lv:14,
        lower:3
    },
    {
        lv:15,
        lower:1
    },
    {
        lv:16,
        lower:0
    },
]

export function justIsSuccess(lv){
    let obj = {}
    for(let i=0;i<successList.length;i++){
        if(successList[i].lv==(lv+1)){
            obj = successList[i]
        }
    }

    let x= random(100-obj.lower,100);
    if(x<obj.lower){
        return {
            result:true,
            obj:obj
        }
    }else{
       return {
        result:false,
        obj:obj
       }
    }
}

//功能：匀速运动
//参数：
//运动的元素（dom对象）：
//起点
//终点
//方向：direction：（1，-1）
//步长
//时间间隔
//样式属性名:attr

//返回值：定时器
function move1908(domObj,attr,start,end,direction,step,timeSpace){
    let value = start;//起点
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、改变数据
        value = value+direction*step;//步长
        //2、边界处理
        if(direction==1?value>=end:value<=end){//终点
            value = end;
            window.clearInterval(myTimer);
        }

        //二、改变外观
        if(attr=="opacity"){
            domObj.style[attr] = value;
        }else{
            domObj.style[attr] = value+"px";
        }
    },timeSpace);
    return myTimer;
}


//功能：匀速运动
//参数：
//运动的元素（dom对象）：
//样式属性名:attr
//终点
//时长
// move190802($("#box"),"left",500,2000);
function move190802(domObj,attr,end,timeLong){
    // domObj,start,end,direction,step,timeSpace,attr
    let start = parseFloat(getStyle(domObj,attr));
    let direction = start>end?-1:1;
    // 路程/时长 = 速度（）
    let timeSpace = 16; //最小频率
    let step = Math.abs(end-start)/(timeLong/timeSpace); // 总路程/(总次数，走多少下)
    move1908(domObj,attr,start,end,direction,step,timeSpace);
}

//功能：让两张图片淡入淡出
//参数：
//淡入的图片
//淡出的图片
//时长
//返回值：定时器

function fadeInOut(inImg,outImg,timeLong){

    let timeSpace = 16;
    let step = 1/(timeLong/timeSpace); 
    let opacity = 0;

    let myTimer = setInterval(()=>{
        //一、处理数据
        opacity+=step;
        if(opacity>=1){
            opacity = 1;
            window.clearInterval(myTimer);
        }

        //二、改变外观
        inImg.style.opacity = opacity;
        outImg.style.opacity = 1-opacity;
        
    },timeSpace);
}

//功能：多属性运动
//参数：
//domObj对象
//多个属性名和终点值所组成的json对象
//时长
//返回值：定时器
//调用示例
// animate(
//     $("#box"),
//     {
//         "left":400,
//         "top":500,
//         "width":1000
//     },
//     2000
// );

function animate(domObj,endObj,timeLong){
    //  let start = parseFloat(getStyle(domObj,attr));
    // let startObj = {
    //     "left":20,
    //     "top":100
    // };
    let  startObj={};
    //循环endObj对象
    for(let key in endObj){//循环json对象的，每循环一次，得到当前的键
        startObj[key] = parseFloat(getStyle(domObj,key));//key=left
    }
    
    // let direction = start>end?-1:1;
    let directionObj = {};
    for(let key in endObj){//key = "left" "top"
        directionObj[key] = startObj[key]>endObj[key]?-1:1;
    }

     // 路程/时长 = 速度（）
    let timeSpace = 16; //最小频率
    //let step = Math.abs(end-start)/(timeLong/timeSpace); // 总路程/(总次数，走多少下)
    let stepObj = {};
    for(let key in endObj){//key = "left" "top"
        stepObj[key] = Math.abs(endObj[key]-startObj[key])/(timeLong/timeSpace);
    }
    //-------move1908------//
    // let value = start;//起点
    let valueObj ={};
    for(let key in endObj){
        valueObj[key] = startObj[key];
    }
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、改变数据
        // value = value+direction*step;//步长
        for(let key in endObj){
            valueObj[key] = valueObj[key]+directionObj[key]*stepObj[key];
        }
        //2、边界处理
        /*
        if(direction==1?value>=end:value<=end){//终点
            value = end;
            window.clearInterval(myTimer);
        }
        */
       for(let key in endObj){
            if(directionObj[key]==1?valueObj[key]>=endObj[key]:valueObj[key]<=endObj[key]){//终点
                valueObj[key] = endObj[key];
                if(myTimer!=null){
                    window.clearInterval(myTimer);
                    myTimer = null;
                }
            }
       }
       
        //二、改变外观
        for(let key in endObj){
            if(key=="opacity"){
                domObj.style[key] = valueObj[key];
            }else{
                domObj.style[key] = valueObj[key]+"px";
            }
        }
    },timeSpace);
    return myTimer;
}

//获取样式的兼容性写法

function getStyle(domObj,attr){
    if(domObj.currentStyle){
        return domObj.currentStyle[attr];
    }else{
        return window.getComputedStyle(domObj)[attr];
    }
}

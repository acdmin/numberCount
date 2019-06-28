## 功能说明

    一个数字累计动画的小插件，实现类似在线人数或购买数据统计实时变动的动画效果

## 调用方式

    const numberCount = new NumberCount({
        element: element, //挂载的dom对象
        to: 100, //初始值
        onRenderStart(){}, //动画前执行
        onRenderEnd(){ //动画后执行
            setTimeout(() => {
                counterArr[i].rise(Math.floor(Math.random()*50-25)) //增加的数 参数为增加的幅度 正负均可
            }, 3000);
        }
    })

    #手动调用更新
    numberCount.rise(100)
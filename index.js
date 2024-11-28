// 初始化秒数显示
let second=``;
for(let i=0;i<60;i++){
    // 创建并添加秒数div元素
    let div=`<div id="second${i+1}" style="font-size:20px;width:100%;text-align:right;position:absolute;display:inline-block;transform:rotate(${(i-1)*-6}deg);">${i+1} 秒</div>`;
    second=second+div;
}
document.querySelector('.second-box').innerHTML=second;

// 初始化分钟显示
let minute=``;
for(let i=0;i<60;i++){
    // 创建并添加分钟div元素
    let div=`<div id="minute${i+1}" style="font-size:20px;width:100%;text-align:right;position:absolute;display:inline-block;transform:rotate(${i*-6}deg);">${i+1} 分</div>`;
    minute=minute+div;
}
document.querySelector('.minute-box').innerHTML=minute;

// 初始化小时显示
let hour=``;
for(let i=0;i<24;i++){
    // 创建并添加小时div元素
    let div=`<div id="hour${i+1}" style="font-size:20px;width:100%;text-align:right;position:absolute;display:inline-block;transform:rotate(${i*-15}deg);">${i+1} 时</div>`;
    hour=hour+div;
}
document.querySelector('.hour-box').innerHTML=hour;

// 初始化日期显示
let day=``;
// 每个月的天数
let _days=[31,28,31,30,31,30,31,31,30,31,30,31];
let _now=new Date();
let _year=_now.getFullYear();
let _month=_now.getMonth();
// 判断闰年的天数 二月为29天
if(_year%4===0 && (_year%100!==0 || _year%400===0)){
    _days[1]=29;
}
// 计算平均角度
let _deg=360/_days[_month];
for(let i=0;i<_days[_month];i++){
    // 创建并添加日期div元素
    let div=`<div id="day${i+1}" style="font-size:20px;width:100%;text-align:right;position:absolute;display:inline-block;transform:rotate(${i*-1*_deg}deg);">${i+1} 日</div>`;
    day=day+div;
}
document.querySelector('.day-box').innerHTML=day;

// 初始化月份显示
let month=``;
for(let i=0;i<12;i++){
    // 创建并添加月份div元素
    let div=`<div id="month${i+1}" style="font-size:20px;width:100%;text-align:right;position:absolute;display:inline-block;transform:rotate(${i*-30}deg);">${i+1} 月</div>`;
    month=month+div;
}
document.querySelector('.month-box').innerHTML=month;

// 初始化年份显示
let second360=0;
let minute360=0;
let hour360=0;
let day360=0;
let month360=0;

let oldsecond=0;
let oldminute=0;
let oldhour=0;
let oldday=0;
let oldmonth=0;

/**
 * 更新时间显示和旋转位置
 */
function transformBox(){
    let nowDate=new Date();
    let second=nowDate.getSeconds();
    let minute=nowDate.getMinutes();
    let hour=nowDate.getHours();
    let day=nowDate.getDate();
    let month=nowDate.getMonth();
    let year=nowDate.getFullYear();
    // 更新秒数旋转圈数
    if(second===0 && oldsecond!==second){
        second360=second360+1;
    }
    // 更新分钟旋转圈数
    if(minute===0 && oldminute!==minute){
        minute360=minute360+1;
    }
    // 更新小时旋转圈数
    if(hour===0 && oldhour!==hour){
        hour360=hour360+1;
    }
    // 更新日期旋转圈数
    if(day===0 && oldday!==day){
        day360=day360+1;
    }
    // 更新月份旋转圈数
    if(month===0 && oldmonth!==month){
        month360=month360+1;
    }
    // 更新秒数盒子旋转位置
    document.querySelector('.second-box').style.transform=`rotate(${second360*360+(second-1)*6}deg)`;
    // 更新分钟盒子旋转位置
    document.querySelector('.minute-box').style.transform=`rotate(${minute360*360+(minute-1)*6}deg)`;
    // 更新小时盒子旋转位置
    document.querySelector('.hour-box').style.transform=`rotate(${hour360*360+(hour-1)*15}deg)`;
    // 更新日期盒子旋转位置
    document.querySelector('.day-box').style.transform=`rotate(${day360*360+(day-1)*_deg}deg)`;
    // 更新月份盒子旋转位置
    document.querySelector('.month-box').style.transform=`rotate(${month360*360+month*30}deg)`;
    // 更新年份显示
    document.querySelector('.year-box').innerHTML=year+' 年';
    // 清除当前时间标记
    let nowDates=document.querySelectorAll('.now-date');
    nowDates.forEach((ele)=>{
        ele.classList='';
    });
    // 标记当前秒数
    document.querySelector(`#second${second+1}`).classList='now-date';
    // 标记当前分钟
    document.querySelector(`#minute${minute===0?'60':minute}`).classList='now-date';
    // 标记当前小时
    document.querySelector(`#hour${hour===0?'24':hour}`).classList='now-date';
    // 标记当前日期
    document.querySelector(`#day${day}`).classList='now-date';
    // 标记当前月份
    document.querySelector(`#month${month+1}`).classList='now-date';

    oldsecond=second;
    oldminute=minute;
    oldhour=hour;
    oldday=day;
    oldmonth=month;
}
// 初始调用更新时间显示
transformBox();
// 每秒更新一次时间显示
setInterval(()=>{
    transformBox();
},1000);

// 获取一言的函数
function fetchHitokoto() {
    const url = 'https://v1.hitokoto.cn?c=a';  // 请求动漫类的句子，您可以更改 c 参数来选择其他类型
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 显示获取到的句子
            document.getElementById('hitokoto').textContent = data.hitokoto;
         })
        .catch(error => {
             // 错误处理
             console.error('Error fetching data:', error);
            document.getElementById('hitokoto').textContent = '获取失败，请稍后再试。';
        });
}

// 每隔60秒刷新一次一言
setInterval(fetchHitokoto, 60000);

// 页面加载时自动调用一次以显示初始句子
fetchHitokoto();
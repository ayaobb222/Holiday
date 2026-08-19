/* =====================================================
   摸鱼 / 节日倒计时
===================================================== */


/* =====================================================
   默认设置
===================================================== */

const DEFAULT_START_TIME = "09:00";

const DEFAULT_END_TIME = "17:00";

const DEFAULT_QUOTE_INTERVAL = 30;


/* =====================================================
   默认节日
   date 使用 MM-DD
===================================================== */

const DEFAULT_HOLIDAYS = [

    {
        id: "newyear",
        name: "元旦",
        icon: "🎆",
        date: "01-01",
        description: "新年的第一天"
    },

    {
        id: "spring",
        name: "春节",
        icon: "🧧",
        date: "02-17",
        description: "春节日期每年不同，可自行修改"
    },

    {
        id: "qingming",
        name: "清明节",
        icon: "🌿",
        date: "04-05",
        description: "清明节"
    },

    {
        id: "labor",
        name: "劳动节",
        icon: "🌸",
        date: "05-01",
        description: "国际劳动节"
    },

    {
        id: "dragonboat",
        name: "端午节",
        icon: "🥮",
        date: "06-19",
        description: "端午节日期每年不同，可自行修改"
    },

    {
        id: "midautumn",
        name: "中秋节",
        icon: "🥮",
        date: "09-25",
        description: "中秋节日期每年不同，可自行修改"
    },

    {
        id: "national",
        name: "国庆节",
        icon: "🇨🇳",
        date: "10-01",
        description: "中华人民共和国国庆节"
    }

];


/* =====================================================
   默认语录
===================================================== */

const DEFAULT_QUOTES = {

    normal: [

        "☕ 工资不一定涨，但下班一定要准时",

        "🐟 摸鱼不是偷懒，是合理安排精力",

        "⌨️ 今天的努力，是为了准时关闭电脑",

        "🚀 目标只有一个：活着到下班",

        "😎 工作可以慢慢做，下班不能迟到",

        "🍵 适当摸鱼，有益身心健康",

        "💻 电脑可以加班，人不能一直加班",

        "🌈 距离自由又近了一步",

        "🔥 坚持住，胜利就在下班时间",

        "🏃 下班不是结束，是人生重新开始",

        "🎯 今日KPI：安全抵达下班时间",

        "🐠 摸鱼也是一种时间管理艺术",

        "🕔 时间不会辜负努力摸鱼的人",

        "🌙 早点回家，比什么都重要",

        "💪 再坚持一下，胜利就在眼前",

        "🧘 今天的工作原则：能明天做就别今天做",

        "📱 工作是老板的，时间是自己的",

        "☕ 咖啡续命，倒计时续魂",

        "🐟 今天也是一条快乐的咸鱼",

        "💼 上班只是生活的一部分，下班才是生活"

    ],

    warning: [

        "🚨 最后10分钟！不要接受任何新需求！",

        "🔥 最后冲刺！保护好你的下班时间！",

        "⚠️ 警告：距离自由只剩十分钟！",

        "🐟 摸鱼进入最终阶段，请保持冷静",

        "🏃 收拾一下心情，马上就自由了",

        "🕔 任何事情都可以明天再说",

        "🚨 当前状态：拒绝新增工作",

        "😎 再坚持一下，马上就可以关电脑了"

    ],

    danger: [

        "🚨🚨 最后5分钟！谁都别想阻止我下班！",

        "🔥 进入最终倒计时！",

        "🏃 灵魂已经站起来了！",

        "⚠️ 请勿安排新任务！",

        "🐟 咸鱼即将结束营业",

        "💻 鼠标已经准备离开工位",

        "🎯 最终目标：准时消失",

        "🚀 自由就在眼前！"

    ],

    offWork: [

        "🎉 下班啦！今天辛苦了！",

        "🏃 快跑！老板还没反应过来！",

        "🚗 收拾东西，准备撤退！",

        "🍻 今天的工作到此为止！",

        "😎 恭喜你成功活过今天！",

        "🌙 下班时间属于真正的自己",

        "🎉 恭喜完成今日摸鱼任务！",

        "🐟 咸鱼今日营业结束，明天继续",

        "💻 关闭电脑，开启生活",

        "🏠 回家！这才是今天真正的开始"

    ],

    weekend: [

        "🍻 周末禁止加班！",

        "😎 今天的KPI：开心",

        "🛌 周末就应该好好休息",

        "🎮 今天不工作，只生活",

        "🍜 周末时间请勿用于工作",

        "🌈 工作日结束，人生开始",

        "🐟 周末是咸鱼的黄金时间",

        "☀️ 今天没有老板，只有自由"

    ]

};


/* =====================================================
   全局状态
===================================================== */

let currentMode =
    localStorage.getItem(
        "countdownMode"
    ) || "work";


let currentCategory =
    "normal";


let currentQuote = "";

let quoteTimer = null;


/* =====================================================
   工具
===================================================== */

function clone(data) {

    return JSON.parse(
        JSON.stringify(data)
    );

}


/* =====================================================
   获取节日
===================================================== */

function getHolidays() {

    const saved =
        localStorage.getItem(
            "customHolidays"
        );


    if (!saved) {

        return clone(
            DEFAULT_HOLIDAYS
        );

    }


    try {

        return JSON.parse(
            saved
        );

    }
    catch {

        return clone(
            DEFAULT_HOLIDAYS
        );

    }

}


/* =====================================================
   保存节日
===================================================== */

function saveHolidays(
    holidays
) {

    localStorage.setItem(
        "customHolidays",
        JSON.stringify(
            holidays
        )
    );

}


/* =====================================================
   获取语录
===================================================== */

function getQuotes() {

    const saved =
        localStorage.getItem(
            "moyuQuotes"
        );


    if (!saved) {

        return clone(
            DEFAULT_QUOTES
        );

    }


    try {

        const data =
            JSON.parse(
                saved
            );


        Object.keys(
            DEFAULT_QUOTES
        ).forEach(
            category => {

                if (
                    !Array.isArray(
                        data[category]
                    )
                ) {

                    data[category] =
                        clone(
                            DEFAULT_QUOTES[
                                category
                            ]
                        );

                }

            }
        );


        return data;

    }
    catch {

        return clone(
            DEFAULT_QUOTES
        );

    }

}


/* =====================================================
   获取设置
===================================================== */

function getSettings() {

    const start =
        localStorage.getItem(
            "workStartTime"
        )
        ||
        DEFAULT_START_TIME;


    const end =
        localStorage.getItem(
            "workEndTime"
        )
        ||
        DEFAULT_END_TIME;


    const interval =
        Number(
            localStorage.getItem(
                "quoteInterval"
            )
        );


    return {

        start,

        end,

        quoteInterval:
            [10,30,60,300]
                .includes(
                    interval
                )
                ?
                interval
                :
                DEFAULT_QUOTE_INTERVAL

    };

}


/* =====================================================
   创建今天时间
===================================================== */

function createTimeToday(
    time
) {

    const [
        hour,
        minute
    ] =
        time
            .split(":")
            .map(Number);


    const date =
        new Date();


    date.setHours(
        hour,
        minute,
        0,
        0
    );


    return date;

}


/* =====================================================
   格式化时间
===================================================== */

function formatTime(
    ms
) {

    const total =
        Math.max(
            0,
            Math.floor(
                ms / 1000
            )
        );


    const hours =
        Math.floor(
            total / 3600
        );


    const minutes =
        Math.floor(
            (
                total % 3600
            ) / 60
        );


    const seconds =
        total % 60;


    return [

        String(hours)
            .padStart(2,"0"),

        String(minutes)
            .padStart(2,"0"),

        String(seconds)
            .padStart(2,"0")

    ].join(":");

}


/* =====================================================
   获取节日下一次日期
===================================================== */

function getNextHoliday(
    holiday
) {

    const now =
        new Date();


    const [
        month,
        day
    ] =
        holiday.date
            .split("-")
            .map(Number);


    let year =
        now.getFullYear();


    let target =
        new Date(
            year,
            month - 1,
            day,
            0,
            0,
            0,
            0
        );


    /*
       如果今年已经过了
       就计算明年
    */

    if (
        target <= now
    ) {

        year += 1;


        target =
            new Date(
                year,
                month - 1,
                day,
                0,
                0,
                0,
                0
            );

    }


    return target;

}


/* =====================================================
   格式化日期
===================================================== */

function formatDate(
    date
) {

    return date.toLocaleDateString(
        "zh-CN",
        {

            year: "numeric",

            month: "long",

            day: "numeric",

            weekday: "long"

        }
    );

}


/* =====================================================
   获取当前节日
===================================================== */

function getSelectedHoliday() {

    const holidays =
        getHolidays();


    return holidays.find(
        holiday =>
            holiday.id ===
            currentMode
    );

}


/* =====================================================
   随机语录
===================================================== */

function randomQuote(
    list
) {

    if (
        !list ||
        list.length === 0
    ) {

        return "🐟 今天没有语录";

    }


    if (
        list.length === 1
    ) {

        currentQuote =
            list[0];

        return list[0];

    }


    let quote;


    do {

        quote =
            list[
                Math.floor(
                    Math.random()
                    *
                    list.length
                )
            ];

    }
    while (
        quote ===
        currentQuote
    );


    currentQuote =
        quote;


    return quote;

}


/* =====================================================
   获取当前语录分类
===================================================== */

function getQuoteCategory() {

    if (
        currentMode !==
        "work"
    ) {

        return "normal";

    }


    const now =
        new Date();


    const settings =
        getSettings();


    const start =
        createTimeToday(
            settings.start
        );


    const end =
        createTimeToday(
            settings.end
        );


    const day =
        now.getDay();


    if (
        day === 0 ||
        day === 6
    ) {

        return "weekend";

    }


    if (
        now >= end
    ) {

        return "offWork";

    }


    if (
        now < start
    ) {

        return "normal";

    }


    const remaining =
        end - now;


    if (
        remaining <=
        5 * 60 * 1000
    ) {

        return "danger";

    }


    if (
        remaining <=
        10 * 60 * 1000
    ) {

        return "warning";

    }


    return "normal";

}


/* =====================================================
   更换语录
===================================================== */

function changeQuote() {

    const footer =
        document.getElementById(
            "footer"
        );


    const quotes =
        getQuotes();


    const category =
        getQuoteCategory();


    let list =
        quotes[
            category
        ];


    if (
        !list ||
        list.length === 0
    ) {

        list =
            quotes.normal;

    }


    footer.classList.remove(
        "quote-change"
    );


    void footer.offsetWidth;


    footer.textContent =
        randomQuote(
            list
        );


    footer.classList.add(
        "quote-change"
    );

}


/* =====================================================
   语录定时器
===================================================== */

function startQuoteTimer() {

    if (quoteTimer) {

        clearInterval(
            quoteTimer
        );

    }


    const settings =
        getSettings();


    quoteTimer =
        setInterval(

            changeQuote,

            settings.quoteInterval
            * 1000

        );

}


/* =====================================================
   更新当前时间
===================================================== */

function updateClock() {

    const now =
        new Date();


    document.getElementById(
        "clock"
    ).textContent =

        now.toLocaleTimeString(
            "zh-CN",
            {

                hour12: false,

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit"

            }
        );


    document.getElementById(
        "date"
    ).textContent =

        formatDate(
            now
        );

}


/* =====================================================
   更新摸鱼模式
===================================================== */

function updateWorkMode() {

    const now =
        new Date();


    const settings =
        getSettings();


    const start =
        createTimeToday(
            settings.start
        );


    const end =
        createTimeToday(
            settings.end
        );


    const workMode =
        document.getElementById(
            "workMode"
        );


    const holidayMode =
        document.getElementById(
            "holidayMode"
        );


    workMode.style.display =
        "block";


    holidayMode.style.display =
        "none";


    document.getElementById(
        "endTimeDisplay"
    ).textContent =
        settings.end;


    /*
       周末
    */

    const day =
        now.getDay();


    if (
        day === 0 ||
        day === 6
    ) {

        workMode.innerHTML = `

            <div class="weekend">
                🍻 周末快乐！
            </div>

            <div style="
                margin-top:20px;
                font-size:20px;
                opacity:.7;
            ">
                今天不用倒计时，好好休息 😎
            </div>

        `;


        return;

    }


    /*
       下班
    */

    if (
        now >= end
    ) {

        workMode.innerHTML = `

            <div class="off-work">
                🎉 下班啦！
            </div>

            <div style="
                margin-top:20px;
                font-size:22px;
                opacity:.75;
            ">
                今天辛苦了，明天继续摸鱼 😎
            </div>

        `;


        return;

    }


    /*
       还没上班
    */

    if (
        now < start
    ) {

        const diff =
            start - now;


        document.getElementById(
            "countdownTitle"
        ).textContent =
            "距离上班还有";


        document.getElementById(
            "countdown"
        ).textContent =
            formatTime(
                diff
            );


        document.getElementById(
            "minutes"
        ).textContent =
            Math.ceil(
                diff / 60000
            );


        document.getElementById(
            "worked"
        ).textContent =
            "0%";


        document.getElementById(
            "percent"
        ).textContent =
            "0%";


        document.getElementById(
            "progressBar"
        ).style.width =
            "0%";


        return;

    }


    /*
       正常工作
    */

    const remaining =
        end - now;


    const countdown =
        document.getElementById(
            "countdown"
        );


    countdown.classList.remove(
        "warning",
        "danger"
    );


    if (
        remaining <=
        10 * 60 * 1000
    ) {

        countdown.classList.add(
            "warning"
        );

    }


    if (
        remaining <=
        5 * 60 * 1000
    ) {

        countdown.classList.remove(
            "warning"
        );


        countdown.classList.add(
            "danger"
        );

    }


    countdown.textContent =
        formatTime(
            remaining
        );


    const total =
        end - start;


    const worked =
        now - start;


    let percent =
        worked /
        total *
        100;


    percent =
        Math.min(
            100,
            Math.max(
                0,
                percent
            )
        );


    document.getElementById(
        "progressBar"
    ).style.width =
        percent.toFixed(2)
        + "%";


    document.getElementById(
        "percent"
    ).textContent =
        percent.toFixed(1)
        + "%";


    document.getElementById(
        "worked"
    ).textContent =
        percent.toFixed(1)
        + "%";


    document.getElementById(
        "minutes"
    ).textContent =
        Math.ceil(
            remaining / 60000
        );

}


/* =====================================================
   更新节日模式
===================================================== */

function updateHolidayMode() {

    const holiday =
        getSelectedHoliday();


    if (!holiday) {

        return;

    }


    const target =
        getNextHoliday(
            holiday
        );


    const now =
        new Date();


    const diff =
        target - now;


    document.getElementById(
        "holidayCountdown"
    ).textContent =

        Math.ceil(
            diff /
            (1000 * 60 * 60 * 24)
        )
        + " 天";


    document.getElementById(
        "holidayDate"
    ).textContent =

        formatDate(
            target
        );


    document.getElementById(
        "pageTitle"
    ).textContent =

        holiday.icon
        + " "
        + holiday.name
        + "倒计时";


    document.getElementById(
        "pageSubtitle"
    ).textContent =

        holiday.description
        ||
        "距离下一个节日越来越近了";


    document.getElementById(
        "holidayHint"
    ).textContent =

        getHolidayHint(
            holiday
        );

}


/* =====================================================
   节日祝福
===================================================== */

function getHolidayHint(
    holiday
) {

    const hints = {

        "元旦":
            "🎆 新的一年，新的开始！",

        "春节":
            "🧧 新年快乐，马上放假！",

        "清明节":
            "🌿 春风和煦，清明将至",

        "劳动节":
            "🌸 劳动最光荣，放假更快乐！",

        "端午节":
            "🥮 粽子已经在路上了！",

        "中秋节":
            "🌕 月饼准备好了吗？",

        "国庆节":
            "🇨🇳 再坚持一下，马上放长假！"

    };


    return hints[
        holiday.name
    ]
    ||
    "🎉 再坚持一下，马上就到了！";

}


/* =====================================================
   更新页面
===================================================== */

function update() {

    updateClock();


    if (
        currentMode ===
        "work"
    ) {

        document.getElementById(
            "pageTitle"
        ).textContent =
            "🧑‍💻 摸鱼结束倒计时";


        document.getElementById(
            "pageSubtitle"
        ).textContent =
            "今天也要努力摸鱼，然后准时下班！";


        document.getElementById(
            "workMode"
        ).style.display =
            "block";


        document.getElementById(
            "holidayMode"
        ).style.display =
            "none";


        updateWorkMode();

    }
    else {

        document.getElementById(
            "workMode"
        ).style.display =
            "none";


        document.getElementById(
            "holidayMode"
        ).style.display =
            "block";


        updateHolidayMode();

    }

}


/* =====================================================
   模式列表
===================================================== */

function renderModeList() {

    const container =
        document.getElementById(
            "modeList"
        );


    container.innerHTML =
        "";


    /*
       摸鱼模式
    */

    const work =
        document.createElement(
            "div"
        );


    work.className =
        "mode-item";


    if (
        currentMode ===
        "work"
    ) {

        work.classList.add(
            "active"
        );

    }


    work.innerHTML = `

        <div class="mode-name">
            🐟 摸鱼结束倒计时
        </div>

        <div class="mode-description">
            每天倒计时到下班时间
        </div>

    `;


    work.onclick =
        function() {

            currentMode =
                "work";


            localStorage.setItem(
                "countdownMode",
                "work"
            );


            renderModeList();

            update();

        };


    container.appendChild(
        work
    );


    /*
       节日
    */

    getHolidays()
        .forEach(
            holiday => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "mode-item";


                if (
                    currentMode ===
                    holiday.id
                ) {

                    item.classList.add(
                        "active"
                    );

                }


                item.innerHTML = `

                    <div class="mode-name">
                        ${holiday.icon}
                        ${holiday.name}
                    </div>

                    <div class="mode-description">
                        ${holiday.date}
                    </div>

                `;


                item.onclick =
                    function() {

                        currentMode =
                            holiday.id;


                        localStorage.setItem(
                            "countdownMode",
                            holiday.id
                        );


                        renderModeList();

                        update();

                    };


                container.appendChild(
                    item
                );

            }
        );

}


/* =====================================================
   渲染节日列表
===================================================== */

function renderHolidayList() {

    const container =
        document.getElementById(
            "holidayList"
        );


    container.innerHTML =
        "";


    getHolidays()
        .forEach(
            holiday => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "holiday-item";


                item.innerHTML = `

                    <div class="holiday-icon">
                        ${holiday.icon}
                    </div>

                    <div class="holiday-info">

                        <div class="holiday-name">
                            ${holiday.name}
                        </div>

                        <div class="holiday-date-text">
                            每年 ${holiday.date}
                        </div>

                    </div>

                    <button
                        class="delete-holiday"
                        data-id="${holiday.id}"
                    >
                        🗑️
                    </button>

                `;


                const deleteButton =
                    item.querySelector(
                        ".delete-holiday"
                    );


                /*
                   默认节日不能删除
                */

                const isDefault =
                    DEFAULT_HOLIDAYS.some(
                        x =>
                            x.id ===
                            holiday.id
                    );


                if (
                    isDefault
                ) {

                    deleteButton.style.display =
                        "none";

                }


                deleteButton.onclick =
                    function() {

                        deleteHoliday(
                            holiday.id
                        );

                    };


                container.appendChild(
                    item
                );

            }
        );

}


/* =====================================================
   添加自定义节日
===================================================== */

function addHoliday() {

    const name =
        prompt(
            "请输入节日名称：",
            "我的节日"
        );


    if (!name) {

        return;

    }


    const icon =
        prompt(
            "请输入节日图标，例如 🎉：",
            "🎉"
        )
        ||
        "🎉";


    const date =
        prompt(
            "请输入日期，格式为 MM-DD，例如 11-11：",
            "11-11"
        );


    if (!date) {

        return;

    }


    /*
       验证日期
    */

    if (
        !/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
            .test(
                date
            )
    ) {

        alert(
            "日期格式不正确，请使用 MM-DD，例如 11-11"
        );

        return;

    }


    const holidays =
        getHolidays();


    const holiday = {

        id:
            "custom_"
            +
            Date.now(),

        name,

        icon,

        date,

        description:
            "自定义节日"

    };


    holidays.push(
        holiday
    );


    saveHolidays(
        holidays
    );


    renderHolidayList();

    renderModeList();

}


/* =====================================================
   删除节日
===================================================== */

function deleteHoliday(
    id
) {

    const holiday =
        getHolidays()
            .find(
                x =>
                    x.id ===
                    id
            );


    if (!holiday) {

        return;

    }


    const confirmed =
        confirm(
            `确定删除「${holiday.name}」吗？`
        );


    if (!confirmed) {

        return;

    }


    const holidays =
        getHolidays()
            .filter(
                x =>
                    x.id !==
                    id
            );


    saveHolidays(
        holidays
    );


    /*
       如果当前正在显示这个节日
       自动切回摸鱼
    */

    if (
        currentMode ===
        id
    ) {

        currentMode =
            "work";


        localStorage.setItem(
            "countdownMode",
            "work"
        );

    }


    renderHolidayList();

    renderModeList();

    update();

}


/* =====================================================
   语录分类
===================================================== */

const CATEGORY_DESCRIPTION = {

    normal:
        "工作时间随机显示",

    warning:
        "距离下班10分钟以内",

    danger:
        "距离下班5分钟以内",

    offWork:
        "下班以后",

    weekend:
        "周六、周日"

};


function renderQuoteList() {

    const container =
        document.getElementById(
            "quoteList"
        );


    const quotes =
        getQuotes();


    const list =
        quotes[
            currentCategory
        ];


    container.innerHTML =
        "";


    list.forEach(
        (quote,index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "quote-row";


            const input =
                document.createElement(
                    "input"
                );


            input.className =
                "quote-input";


            input.value =
                quote;


            input.addEventListener(
                "input",
                function() {

                    const data =
                        getQuotes();


                    data[
                        currentCategory
                    ][index] =
                        input.value;


                    localStorage.setItem(
                        "moyuQuotes",
                        JSON.stringify(
                            data
                        )
                    );

                }
            );


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "delete-quote";


            button.textContent =
                "🗑️";


            button.onclick =
                function() {

                    const data =
                        getQuotes();


                    data[
                        currentCategory
                    ].splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "moyuQuotes",
                        JSON.stringify(
                            data
                        )
                    );


                    renderQuoteList();

                    changeQuote();

                };


            row.appendChild(
                input
            );


            row.appendChild(
                button
            );


            container.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   添加语录
===================================================== */

function addQuote() {

    const quotes =
        getQuotes();


    quotes[
        currentCategory
    ].push(
        "✨ 新语录"
    );


    localStorage.setItem(
        "moyuQuotes",
        JSON.stringify(
            quotes
        )
    );


    renderQuoteList();

}


/* =====================================================
   恢复默认
===================================================== */

function resetAll() {

    const confirmed =
        confirm(
            "确定恢复默认语录和默认节日吗？"
        );


    if (!confirmed) {

        return;

    }


    localStorage.setItem(
        "moyuQuotes",
        JSON.stringify(
            clone(
                DEFAULT_QUOTES
            )
        )
    );


    localStorage.setItem(
        "customHolidays",
        JSON.stringify(
            clone(
                DEFAULT_HOLIDAYS
            )
        )
    );


    renderHolidayList();

    renderModeList();

    renderQuoteList();

    changeQuote();

}


/* =====================================================
   设置窗口
===================================================== */

function openSettings() {

    const settings =
        getSettings();


    document.getElementById(
        "startTimeInput"
    ).value =
        settings.start;


    document.getElementById(
        "endTimeInput"
    ).value =
        settings.end;


    document.getElementById(
        "quoteIntervalInput"
    ).value =
        settings.quoteInterval;


    renderModeList();

    renderHolidayList();

    renderQuoteList();


    document.getElementById(
        "modal"
    ).classList.add(
        "show"
    );

}


function closeSettings() {

    document.getElementById(
        "modal"
    ).classList.remove(
        "show"
    );

}


/* =====================================================
   保存设置
===================================================== */

function saveSettings() {

    const start =
        document.getElementById(
            "startTimeInput"
        ).value;


    const end =
        document.getElementById(
            "endTimeInput"
        ).value;


    const interval =
        Number(
            document.getElementById(
                "quoteIntervalInput"
            ).value
        );


    if (!start || !end) {

        alert(
            "请选择上下班时间"
        );

        return;

    }


    if (
        start >= end
    ) {

        alert(
            "下班时间必须晚于上班时间"
        );

        return;

    }


    localStorage.setItem(
        "workStartTime",
        start
    );


    localStorage.setItem(
        "workEndTime",
        end
    );


    localStorage.setItem(
        "quoteInterval",
        interval
    );


    closeSettings();


    update();

    changeQuote();

    startQuoteTimer();

}


/* =====================================================
   事件
===================================================== */

document
    .getElementById(
        "settingsButton"
    )
    .onclick =
    openSettings;


document
    .getElementById(
        "cancelButton"
    )
    .onclick =
    closeSettings;


document
    .getElementById(
        "saveButton"
    )
    .onclick =
    saveSettings;


document
    .getElementById(
        "resetButton"
    )
    .onclick =
    resetAll;


document
    .getElementById(
        "addHolidayButton"
    )
    .onclick =
    addHoliday;


document
    .getElementById(
        "addQuoteButton"
    )
    .onclick =
    addQuote;


/*
   点击背景关闭
*/

document
    .getElementById(
        "modal"
    )
    .onclick =
    function(event) {

        if (
            event.target ===
            this
        ) {

            closeSettings();

        }

    };


/*
   语录分类
*/

document
    .querySelectorAll(
        ".quote-tab"
    )
    .forEach(
        button => {

            button.onclick =
                function() {

                    currentCategory =
                        this.dataset.category;


                    document
                        .querySelectorAll(
                            ".quote-tab"
                        )
                        .forEach(
                            x =>
                                x.classList.toggle(
                                    "active",
                                    x ===
                                    button
                                )
                        );


                    document.getElementById(
                        "quoteCategoryDescription"
                    ).textContent =
                        CATEGORY_DESCRIPTION[
                            currentCategory
                        ];


                    renderQuoteList();

                };

        }
    );


/* =====================================================
   启动
===================================================== */

update();

changeQuote();

startQuoteTimer();


setInterval(
    update,
    1000
);
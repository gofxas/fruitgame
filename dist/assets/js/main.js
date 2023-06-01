// bar 77 星 西瓜 铃铛 芒果 橘子 苹果
const scale = [100, 40, 30, 20, 20, 15, 10, 5];

const sleep = async (t) => {
    return new Promise((resolve) => setTimeout(resolve, 40 * t));
}
function twobsr(t, a1, a2, a3) {
    return ((1 - t) * (1 - t)) * a1 + 2 * t * (1 - t) * a2 + t * t * a3;
}
function threebsr(t, a1, a2, a3, a4) {
    return a1 * (1 - t) * (1 - t) * (1 - t) + 3 * a2 * t * (1 - t) * (1 - t) + 3 * a3 * t * t * (1 - t) + a4 * t * t * t;
}

const centerTemplate = word => {
    return `<span>${word}</span>`
}


const world = {
    stoped: 0,
    win: 0,
    running: false,
};
world.sence = [{ type: "x1", index: 0, }, { type: "x1", index: 1, }, { type: "x1", index: 2, }, { type: "x1", index: 3, }, { type: "x1", index: 4, }, { type: "x1", index: 5, }, { type: "x1", index: 6, }, { type: "x1", index: 23, }, { type: "x5", index: -1, }, { type: "x1", index: 7, }, { type: "x1", index: 22, }, { type: "x1", index: 8, }, { type: "x1", index: 21, }, { type: "x1", index: 9, }, { type: "x1", index: 20, }, { type: "x1", index: 10, }, { type: "x1", index: 19, }, { type: "x1", index: 11, }, { type: "x1", index: 18, }, { type: "x1", index: 17, }, { type: "x1", index: 16, }, { type: "x1", index: 15, }, { type: "x1", index: 14, }, { type: "x1", index: 13, }, { type: "x1", index: 12, }];

world.gifts = [
    { name: '橘子', scale: scale[6], sound: 'Y102', key: 'donate7' },//0
    { name: '铃铛', scale: scale[5], sound: 'Y104', key: 'donate5' },//1
    { name: 'BAR', scale: scale[0] / 2, sound: 'Y108', key: 'donate1' },//2
    { name: 'BAR', scale: scale[0], sound: 'Y108', key: 'donate1' },//3
    { name: '苹果', scale: scale[7], sound: 'Y101', key: 'donate8' },//4
    { name: '苹果小', scale: 3, sound: 'Y101', key: 'donate8' },//5
    { name: '芒果', scale: scale[5], sound: 'Y103', key: 'donate6' },//6
    { name: '西瓜', scale: scale[3], sound: 'Y105', key: 'donate4' },//7
    { name: '西瓜小', scale: 3, sound: 'Y105', key: 'donate4' },//8
    { name: 'luck', scale: 0, isluck: true, sound: 'hitLukly' },//9
    { name: '苹果', scale: scale[7], sound: 'Y101', key: 'donate8' },//10
    { name: '橘子小', scale: 3, sound: 'Y102', key: 'donate7' },//11
    { name: '橘子', scale: scale[6], sound: 'Y102', key: 'donate7' },//12
    { name: '铃铛', scale: scale[5], sound: 'Y104', key: 'donate5' },//13
    { name: '77小', scale: 3, sound: 'Y107', key: 'donate2' },//14
    { name: '77', scale: scale[1], sound: 'Y107', key: 'donate2' },//15
    { name: '苹果', scale: scale[7], sound: 'Y101', key: 'donate8' },//16
    { name: '芒果小', scale: 3, sound: 'Y103', key: 'donate6' },//17
    { name: '芒果', scale: scale[5], sound: 'Y103', key: 'donate6' },//18
    { name: '星星', scale: scale[2], sound: 'Y106', key: 'donate3' },//19
    { name: '星星小', scale: 3, sound: 'Y106', key: 'donate3' },//20
    { name: 'luck', scale: 0, isluck: true, sound: 'hitLukly' },//21
    { name: '苹果', scale: scale[7], sound: 'Y101', key: 'donate8' },//22
    { name: '铃铛小', scale: 3, sound: 'Y104', key: 'donate5' },//23
]

world.fruits = [
    { name: 'bar', key: 'donate1' },
    { name: '77', key: 'donate2' },
    { name: '星', key: 'donate3' },
    { name: '西瓜', key: 'donate4' },
    { name: '铃铛', key: 'donate5' },
    { name: '芒果', key: 'donate6' },
    { name: '橘子', key: 'donate7' },
    { name: '苹果', key: 'donate8' },
]

world.grid = document.querySelector('#grid');

world.renderCredit = function () {
    const credit = document.querySelector('.m-score-credit');
    const creditNum = String(user.credit);
    let creditHtml = '';
    creditNum.split('').forEach(num => {
        creditHtml += `<span class="num num${num}"></span>`;
    });
    credit.innerHTML = creditHtml;
};

world.rotate = async function () {
    if (this.running) {
        console.log('不要重复开始了')
        return;
    } else {
        this.running = true;
    }
    let rotate_time = 0;
    const center = document.querySelector('.m-grid-item_x5');
    const rotating = () => {
        if (this.stoped < 23) {
            this.stoped += 1;
        } else {
            this.stoped = 0;
        }
        const stoped_list = document.querySelectorAll('.stoped');
        if (stoped_list.length) {
            stoped_list.forEach(tar => {
                tar.classList.remove('stoped')
            })
        }
        const stopedTarget = document.querySelector('.m-data_' + this.stoped);
        stopedTarget.classList.add('stoped');
    };
    const loop = 24 * 4;// bar设置为初始旋转点
    // 概率中奖 随机生成
    const random = Luck.positionGenerate();
    // 偏移量 根据当前停靠位置计算
    const offset = this.stoped;
    const step = random + loop - offset;
    sounds['rotate_start'].play();
    sounds['rotate_start'].once('end', function () {
        sounds['rotating'].play();
    });
    for (let i = 0; i < step; i++) {
        rotating();
        const wait = threebsr((1 - i / step), 3.5, .12, .13, .8);
        if (i > step - 12 && sounds['rotating'].playing()) {
            sounds['rotating'].stop();
            sounds['rotate_end'].play();
        }
        rotate_time += (wait * 40);
        await sleep(1 * wait);
    }
    const gift = this.gifts[this.stoped];
    sounds[gift.sound].play();

    // 当前滚动到的位置，处理是否中奖了啊。

    await this.isWin(gift);
    // center.innerHTML = centerTemplate(gift.name);
    this.running = false;
    user.donatestemp = _.clone(user.donates);
    user.donates = {};
    user.save();
    user.resetDonate();
}

world.renderWins = function (wins) {
    const win = document.querySelector('.m-score-win');
    if (wins) {
        const creditNum = String(wins);
        let creditHtml = '';
        creditNum.split('').forEach(num => {
            creditHtml += `<span class="num num${num}"></span>`;
        });
        win.innerHTML = creditHtml;
    } else {
        win.innerHTML = '';
    }
}


world.isWin = async function (gift) {
    await sleep(20);
    return new Promise(resolve => {
        if (gift.isluck) {
            const type = Luck.luckGenerate();
            if (type == '真可惜') {
                sounds.luklyFail.play();
            } else {
                sounds.luklySuccess.play();
            }
            // 开火车之类的
            sounds[gift.sound].once('end', async function () {
                const luckGift = world.luckgifts.find(t => t.name == type);
                sounds[luckGift.sound].play();
                sounds[luckGift.sound].once('end', async function () {
                    await luckGift.func();
                    resolve()
                })
            });
        } else if (user.donates[gift.key]) {
            // 单中 ;
            this.win = user.donates[gift.key] * gift.scale;
            sounds[gift.sound].once('end', async function () {
                // sounds.zhongle.play();
            });
            this.renderWins(this.win);
            resolve()
        } else {
            resolve()
        };
    })
}

world.create = function () {
    user.read();
    const mfruits = document.querySelector('.m-fruits');
    const items = document.createDocumentFragment();
    const fruits = document.createDocumentFragment();
    this.sence.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('m-grid-item');
        div.classList.add('m-grid-item_' + item.type);
        div.classList.add('m-data_' + item.index);
        div.setAttribute('data-item-index', item.index);
        div.onclick = function () {
            // sayMyName(item.index)
        };
        items.appendChild(div)
    });
    this.fruits.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('fruits-btn');
        div.classList.add('f' + index);
        div.setAttribute('data-key', item.key);
        div.onclick = function () {
            user.addDonates(item.key)
        };
        fruits.appendChild(div)
    })
    this.grid.appendChild(items);
    mfruits.appendChild(fruits);
    this.renderCredit();
    user.renderDonate();

};


world.create();


function sayMyName(index) {
    const sound = world.gifts[index].sound;
    sounds[sound].play()
}


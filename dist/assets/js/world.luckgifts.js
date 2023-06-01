world.luckgifts = [
    {
        name: "大三元",
        sound: 'Y114',
        func: async function () {
            const position = [19, 15, 7],
                gifts = {
                    19: { name: '星星', scale: scale[2], sound: 'Y106', key: 'donate3' },
                    15: { name: '77', scale: scale[1], sound: 'Y107', key: 'donate2' },
                    7: { name: '西瓜', scale: scale[3], sound: 'Y105', key: 'donate4' }
                }// 大三元的位置
            for (let i of position) {
                const stopedTarget = document.querySelector('.m-data_' + i);
                stopedTarget.classList.add('stoped');
                sounds['boo'].play();
                const c = gifts[i];
                world.win += (user.donates[c.key] * c.scale);
                world.renderWins(world.win);
                await sleep(20);
            };
        }
    },
    {
        name: "小三元", sound: 'Y115',
        func: async function () {
            const position = [1, 6, 12],
                gifts = {
                    1: { name: '铃铛', scale: scale[5], sound: 'Y104', key: 'donate5' },
                    6: { name: '芒果', scale: scale[5], sound: 'Y103', key: 'donate6' },
                    12: { name: '橘子', scale: scale[6], sound: 'Y102', key: 'donate7' },
                }// 大三元的位置
            for (let i of position) {
                const stopedTarget = document.querySelector('.m-data_' + i);
                stopedTarget.classList.add('stoped');
                sounds['boo'].play();
                const c = gifts[i];
                world.win += (user.donates[c.key] * c.scale);
                world.renderWins(world.win);
                await sleep(20);
            };
        }
    },
    {
        name: "大4喜", sound: 'Y117',
        func: async function () {
            const position = [3, 7, 15, 19],
                gifts = {
                    3: { name: 'BAR', scale: scale[0], sound: 'Y108', key: 'donate1' },
                    19: { name: '星星', scale: scale[2], sound: 'Y106', key: 'donate3' },
                    15: { name: '77', scale: scale[1], sound: 'Y107', key: 'donate2' },
                    7: { name: '西瓜', scale: scale[3], sound: 'Y105', key: 'donate4' }
                }// 大三元的位置
            for (let i of position) {
                const stopedTarget = document.querySelector('.m-data_' + i);
                stopedTarget.classList.add('stoped');
                sounds['boo'].play();
                const c = gifts[i];
                world.win += (user.donates[c.key] * c.scale);
                world.renderWins(world.win);
                await sleep(20);
            };
        }
    },
    {
        name: "纵横四海", sound: 'Y118',
        func: async function () {
            const seed = _.random(0, 1);
            sounds.C13.play();
            sounds.C13.fade(1.0, 0.5, 4000);
            let k;
            for (let i = 0; i < seed + 10; i++) {
                k = i;
                const mgriditem = document.querySelectorAll('.m-grid-item_x1');
                mgriditem.forEach((tar) => {
                    let index = Number(tar.getAttribute('data-item-index'));
                    if (index % 2 == i % 2) {
                        tar.classList.add('stoped')
                    } else {
                        tar.classList.remove('stoped')
                    }
                })
                await sleep(10);
            }

            sounds.C13.stop();
            sounds['zhongle'].play();
            world.win = world.gifts
                .filter((t, i) => {
                    return i % 2 == k % 2;
                })
                .reduce((p, c) => {
                    return p += ((user.donates[c.key] || 0) * c.scale)
                }, 0);
            world.renderWins(world.win);
            await sleep(10);
        }
    },
    {
        name: "大满贯", sound: 'Y120', func: async function () {
            let stoped = world.stoped;
            sounds.C11.play();
            for (let i = 0; i < 23; i++) {
                if (stoped < 23) {
                    stoped += 1;
                } else {
                    stoped = 0;
                };
                const stopedTarget = document.querySelector('.m-data_' + stoped);
                stopedTarget.classList.add('stoped');
                sounds['boo'].play();
                const c = world.gifts[stoped];
                if (!c.isluck) {
                    world.win += (user.donates[c.key] * c.scale);
                }
                world.renderWins(world.win);
                await sleep(30);
            }
            sounds.C11.stop()
        }
    },
    {
        name: "天女散花", sound: 'Y122', func: async function () {
            // const gifts = [...Array(23)].map((_, x) => x);
            // let shuffled = gifts.slice(0), i = gifts.length, min = i - 4, temp, index;
            // while (i-- > min) {
            //     index = _.random(0, i);
            //     temp = shuffled[index];
            //     shuffled[index] = shuffled[i];
            //     shuffled[i] = temp;
            // };
            // const gifts_res = shuffled.slice(min);
            const seed = _.random(0, 24);
            sounds.C07.play();
            let k;
            for (let i = 0; i < 12 + seed; i++) {
                k = i;
                const mgriditem = document.querySelectorAll('.m-grid-item_x1');
                mgriditem.forEach((tar) => {
                    let index = Number(tar.getAttribute('data-item-index'));
                    if (index % 6 == i % 6) {
                        tar.classList.add('stoped')
                    } else {
                        tar.classList.remove('stoped')
                    }
                })
                await sleep(10);
            }
            sounds.C07.stop();
            sounds['zhongle'].play();
            world.win = world.gifts
                .filter((t, i) => {
                    return i % 6 == k % 6;
                })
                .reduce((p, c) => {
                    return p += ((user.donates[c.key] || 0) * c.scale)
                }, 0);
            world.renderWins(world.win);
            await sleep(10);
        }
    },
    {
        name: "开火车", sound: 'Y124', func: async function () {
            let stoped = world.stoped;
            const seed = _.random(0, 24);
            const loop = 24 * 1;
            let res = [];
            sounds.train.play();
            for (let i = 0; i < loop + seed; i++) {
                if (stoped < 23) {
                    stoped += 1;
                } else {
                    stoped = 0;
                };
                res.push(stoped);
                if (res.length > 5) {
                    res.shift();
                }
                const Target = document.querySelectorAll('.m-grid-item_x1')
                Target.forEach(tar => {
                    let index = Number(tar.getAttribute('data-item-index'));
                    if (res.includes(index)) {
                        tar.classList.add('stoped')
                    } else {
                        tar.classList.remove('stoped')
                    }
                })
                await sleep(12);
            };
            sounds.train.fade(.3, 0, 1000);
            for (let i of res.reverse()) {
                sounds['boo'].play();
                const c = world.gifts[i];
                const Target = document.querySelectorAll('.stoped')
                Target.forEach(tar => {
                    let index = Number(tar.getAttribute('data-item-index'));

                    if (index == i) {
                        tar.classList.add('jumped')
                    }
                })
                if (!c.isluck) {
                    world.win += (user.donates[c.key] * c.scale);
                }
                world.renderWins(world.win);
                await sleep(20);
            }
            const Target = document.querySelectorAll('.jumped')
            Target.forEach(tar => {
                tar.classList.remove('jumped')
            })

            sounds.train.stop();
            sounds['zhongle'].play();
        }
    },
    {
        name: "送灯", sound: 'Y131', func: async function () {
            const seed = _.random(0, 23);
            const mgriditem = document.querySelectorAll('.m-grid-item_x1');
            mgriditem.forEach((tar) => {
                let index = Number(tar.getAttribute('data-item-index'));
                if (index == seed) {
                    tar.classList.add('stoped')
                } else {
                    tar.classList.remove('stoped')
                }
            })
            const c = world.gifts[seed];
            if (!c.isluck) {
                world.win += (user.donates[c.key] * c.scale);
            }
            world.renderWins(world.win);
            await sleep(12);
            // world.rotate(true)
        }
    },
    {
        name: "真可惜", sound: 'zhenkexi', func: async function () {
            // sounds.luklyFail.play();
        }
    },
]
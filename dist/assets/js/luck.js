const Luck = {
    rotate_probability_map: {
        x3: [0, 40],
        luck: [40, 55],
        bar: [55, 57],
        bar_s: [57, 60],
        '77': [60, 65],
        '星': [65, 70],
        '西瓜': [70, 75],
        '铃铛': [75, 80],
        '芒果': [80, 85],
        '橘子': [85, 90],
        '苹果': [90, 100],
    },
    luck_probability_map: {
        '大三元': [0, 5],
        '小三元': [5, 15],
        '大4喜': [15, 20],
        '纵横四海': [20, 25],
        '大满贯': [25, 28],
        '天女散花': [28, 35],
        '开火车': [35, 40],
        '送灯': [40, 55],
        '真可惜': [55, 100],
    },
    gift_positions: {
        x3: [5, 8, 11, 14, 17, 20, 23],
        luck: [9, 21],
        bar: [3],
        bar_s: [2],
        '77': [15],
        '星': [19],
        '西瓜': [7],
        '铃铛': [1, 13],
        '芒果': [6, 18],
        '橘子': [0, 12],
        '苹果': [4, 10, 16, 22],
    },
    positionGenerate: function () {
        const r = _.random(0, 99);
        let key;
        for (let k in this.rotate_probability_map) {
            if (r >= this.rotate_probability_map[k][0] && r < this.rotate_probability_map[k][1]) {
                key = k;
                break;
            }
        };
        const index = _.random(this.gift_positions[key].length - 1);
        return this.gift_positions[key||'x3'][index]
    },
    luckGenerate: function () {
        const r = _.random(0, 99);
        let key;
        for (let k in this.luck_probability_map) {
            if (r >= this.luck_probability_map[k][0] && r < this.luck_probability_map[k][1]) {
                key = k;
                break;
            }
        };

        return key || '真可惜';
    }
}
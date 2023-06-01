const user = {
    credit: 100,
    donates: {},
    donatestemp: {},
    addDonates: function (key, ding = true, v = 1) {
        if (world.running) {
            return;
        };
        if (this.donates[key] && this.donates[key] >= 99) {
            return;
        }
        if (ding) {
            sounds['ding'].play();
        }
        if (this.credit == 0) {
            return;
        }
        if (this.donates[key] && this.donates[key] < 99) {
            this.donates[key] += v;
        }
        else {
            this.donates[key] = v;
        };
        this.credit -= v;
        this.renderDonate();
        world.renderCredit();
    },
    renderDonate: function () {
        for (let i in this.donates) {
            const target = document.querySelector('.' + i);
            let donate = String(this.donates[i]);
            let html = '';
            donate.split('').forEach(num => {
                html += `<span class="snum num${num}"></span>`;
            });
            target.innerHTML = html;
        }
    },
    resetDonate: function () {
        document.querySelectorAll('.m-donate-item').forEach(target => {
            target.innerHTML = ""
        })
    },
    start: function () {
        if (world.running) {
            return;
        };

        if (world.win) {
            this.credit += world.win;
            world.win = 0;
            sounds['alternate'].play();
            world.renderWins(0);
            world.renderCredit();
            user.save();
            return;
        }
        const total = Object.values(this.donates).reduce((p, c) => {
            return p + c;
        }, 0);

        const totaltmp = Object.values(this.donatestemp).reduce((p, c) => {
            return p + c;
        }, 0);

        if (total) {
            world.rotate();
        } else if (totaltmp > 0) {
            if (totaltmp > this.credit) {
                // 超出了可以下注的数量 重置盘子；
                this.resetDonate();
                alert('分数不够了~');
            } else {
                for (let key in this.donatestemp) {
                    this.addDonates(key, false, this.donatestemp[key])
                }
                world.rotate();
            }
        } else {
            alert('请先下注~');
        }
    },
    save: function () {
        localStorage.setItem('userdata', JSON.stringify({
            credit: this.credit,
            donates: this.donates,
            donatestemp: this.donatestemp,
        }))
    },
    read: function () {
        const data = localStorage.getItem('userdata');
        if (data) {
            const { credit, donates, donatestemp } = JSON.parse(data);
            this.credit = credit || 0;
            this.donates = donates || {};
            this.donatestemp = donatestemp || {}
        }
    },
    checkCredit: function () {
        const total = Object.values(this.donatestemp).reduce((p, c) => {
            return p + c;
        }, 0);
        if (total > this.credit) {
            return false;
        } else {
            return true;
        }
    },
    moveWin: function (v = 1) {
        if (this.credit + v > -1 && world.win - v > -1) {
            this.credit += v;
            world.win -= v;
            sounds['ding'].play();
            world.renderWins(world.win);
            world.renderCredit()
        }
    },
    beg: function (v = 0) {
        if (world.win) {
            const seed = _.random(0, 1);
            world.win = v === seed ? world.win = world.win * 2 : 0;
            if (v === seed) {
                sounds.ding.play()
            }
            else {
                sounds.luklyFail.play()
            }
            world.renderWins(world.win);
            world.renderCredit()
        }
    },
    charge: function () {
        this.credit += 100;
        world.renderCredit()
    }
}

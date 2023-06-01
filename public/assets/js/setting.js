const Setting = {
    read: function () {
        const store = JSON.parse(localStorage.getItem('probability'));
        if (store) {
            const { rotate_probability_map, luck_probability_map } = store;
            _.assign(Luck.rotate_probability_map, rotate_probability_map);
            _.assign(Luck.luck_probability_map, luck_probability_map);
        };
    },
    set: function () {
        const { rotate_probability_map, luck_probability_map } = Luck;
        localStorage.setItem('probability', JSON.stringify({ rotate_probability_map, luck_probability_map }))
    }
}

Setting.read();
Setting.set();

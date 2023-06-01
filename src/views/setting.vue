<template>
  <div class="page flex-col">
    <div class="save-btn">
      <el-button type="primary" plain @click="play">游玩</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div class="setting-form">
      <div class="setting-form-item">
        <p
          class="desc"
          :style="{
            color: form1total != 100 ? '#F56C6C' : '#000',
          }"
        >
          当前总概率为：{{ form1total }}%。<span v-if="form1total != 100">{{
            form1total - 100 > 0
              ? `超出${form1total - 100}%`
              : `还差${100 - form1total}%`
          }}</span>
        </p>
        <el-form ref="Ref" :model="form1" label-width="80px" size="small">
          <el-form-item
            v-for="(item, key) in forms1"
            :key="key"
            :label="item.label"
            :prop="item.key"
          >
            <el-input-number v-model="form1[item.key]" :min="0" :max="100" />
          </el-form-item>
        </el-form>
      </div>
      <div class="setting-form-item">
        <p
          class="desc"
          :style="{
            color: form2total != 100 ? '#F56C6C' : '#000',
          }"
        >
          当前总概率为：{{ form2total }}%。<span v-if="form2total != 100">{{
            form2total - 100 > 0
              ? `超出${form2total - 100}%`
              : `还差${100 - form2total}%`
          }}</span>
        </p>
        <el-form ref="Ref2" :model="form2" label-width="80px" size="small">
          <el-form-item
            v-for="(item, key) in forms2"
            :key="key"
            :label="item.label"
            :prop="item.key"
          >
            <el-input-number v-model="form2[item.key]" :min="0" :max="100" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <p>设置概率的，左右两边的概率分别加起来等于<b>100</b>就OK！~</p>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      rotate_probability_map: {},
      luck_probability_map: {},
      forms1: [
        {
          label: "3倍物品",
          key: "x3",
        },
        {
          label: "幸运灯",
          key: "luck",
        },
        {
          label: "大王",
          key: "bar",
        },
        {
          label: "小王",
          key: "bar_s",
        },
        {
          label: "77",
          key: "77",
        },
        {
          label: "星星",
          key: "星",
        },
        {
          label: "西瓜",
          key: "西瓜",
        },
        {
          label: "铃铛",
          key: "铃铛",
        },
        {
          label: "橘子",
          key: "橘子",
        },
        {
          label: "苹果",
          key: "苹果",
        },
      ],
      forms2: [
        {
          label: "大三元",
          key: "大三元",
        },
        {
          label: "小三元",
          key: "小三元",
        },
        {
          label: "大4喜",
          key: "大4喜",
        },
        {
          label: "纵横四海",
          key: "纵横四海",
        },
        {
          label: "大满贯",
          key: "大满贯",
        },
        {
          label: "天女散花",
          key: "天女散花",
        },
        {
          label: "开火车",
          key: "开火车",
        },
        {
          label: "送灯",
          key: "送灯",
        },
        {
          label: "什么都不中",
          key: "真可惜",
        },
      ],
      form1: {},
      form2: {},
    };
  },
  computed: {
    form1total() {
      let count = 0;
      let form1 = Object.values(this.form1);
      for (let i of form1) {
        count += i;
      }
      return count;
    },
    form2total() {
      let count = 0;
      let form2 = Object.values(this.form2);
      for (let i of form2) {
        count += i;
      }
      return count;
    },
  },
  methods: {
    play() {
      location.href = "/game.html";
    },
    save() {
      if (this.form1total == 100 && this.form2total == 100) {
        let form1 = Object.assign({}, this.form1);
        let form2 = Object.assign({}, this.form2);
        let count1 = 0,
          rotate_probability_map = {};
        let count2 = 0,
          luck_probability_map = {};
        for (let i in form1) {
          rotate_probability_map[i] = [count1, count1 + form1[i]];
          count1 += form1[i];
        }
        for (let i in form2) {
          luck_probability_map[i] = [count2, count2 + form2[i]];
          count2 += form2[i];
        }
        console.log(rotate_probability_map, luck_probability_map);

        localStorage.setItem(
          "probability",
          JSON.stringify({
            rotate_probability_map,
            luck_probability_map,
          })
        );
      } else {
        ElMessage("无法保存.");
      }
    },
  },
  mounted() {
    const store = JSON.parse(localStorage.getItem("probability"));
    if (store) {
      const { rotate_probability_map = {}, luck_probability_map = {} } = store;
      this.rotate_probability_map = rotate_probability_map;
      this.luck_probability_map = luck_probability_map;
      for (let i in rotate_probability_map) {
        this.form1[i] =
          Math.max(...rotate_probability_map[i]) -
          Math.min(...rotate_probability_map[i]);
      }
      for (let i in luck_probability_map) {
        this.form2[i] =
          Math.max(...luck_probability_map[i]) -
          Math.min(...luck_probability_map[i]);
      }
    }
  },
};
</script>

<style lang="less" scoped>
.page {
  background-color: #b8b8b8;
  overflow: auto;
}
.flex-col {
  flex-direction: column;
}
.save-btn {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background-color: #b8b8b8;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
}
:deep(.el-input-number--small) {
  width: 85px;
}
.setting-form {
  display: flex;
  justify-content: space-between;
  .setting-form-item {
    width: 50%;
  }
}
.desc {
  font-size: 12px;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: bold;
}
</style>
<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="getlist">点我获取数据</el-button>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getList } from "@/api/table";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  methods:{
    getlist(){
      getList().then((response)=>{
        console.log(response);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<template>
  <div class="home">
    <h1 class="mb-4 text-2xl font-semibold text-gray-900">
      Vue 3 Server Side Rendering
    </h1>
    <img :src="dogInfo.message" class="dog"/>
    <app-counter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AppCounter from "../components/AppCounter.vue";
// import { $dogCeo } from "../libs";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  title: () => Promise.resolve("首页"),
  asyncData ({ route, store }: any) {
    // 手动 dispatch
    return store.dispatch('setDogInfo');
  },
  setup() {
    const store = useStore();
    

    const dogInfo = ref(store.state.dogInfo);
    console.log(store.state.dogInfo);
    // dogInfo.value = store.state.dogInfo;

    // 生命周期组件必须写在上面
    onMounted(async() => {
      // const _dogInfo = await $dogCeo.get("/breeds/image/random");
      // console.log("dogInfo", JSON.stringify(_dogInfo));
    });
    
    return {
      dogInfo
    };
  },
  components: {
    AppCounter,
  },
});
</script>
<style lang="less" scoped>
@import "./Home.less";
</style>
<template>
  <div class="home">
    <el-row class="bottom-line">
      <el-col :span="24">
        <Status />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <CameraView></CameraView>
      </el-col>
      <el-col :span="16">
        <TargetList></TargetList>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <RTInfo></RTInfo>
      </el-col>
      <el-col :span="10">
        <Control></Control>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Status from "@/components/Status.vue";
import CameraView from "@/components/Camera.vue"
import Control from "@/components/Control.vue"
import RTInfo from "@/components/RTInfo.vue"
import TargetList from "@/components/TargetList.vue"

export default {
  name: "Home",
  components: {
    Status,CameraView,Control,RTInfo,TargetList
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>
<style scoped>
.bottom-line{
  border-bottom: 1px solid #afafaf;
}
</style>

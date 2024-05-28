<template>
  <div class="home">
    <el-row class="bottom-line">
      <el-col :span="24">
        <Status />
      </el-col>
    </el-row>
    <el-row class="bottom-line">
      <el-col :span="24" class="center-middle">
        <CameraView ref="cameraView" :parent="this"></CameraView>
        <TargetList ref="targetListView" :parent="this"></TargetList>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <RTInfo></RTInfo>
      </el-col>
      <el-col :span="10">
        <Control :parent="this"></Control>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Status from "@/components/Status.vue";
import CameraView from "@/components/Camera.vue";
import Control from "@/components/Control.vue";
import RTInfo from "@/components/RTInfo.vue";
import TargetList from "@/components/TargetList.vue";

export default {
  name: "Home",
  components: {
    Status,
    CameraView,
    Control,
    RTInfo,
    TargetList,
  },
  data() {
    return {
      text: "",
      socket: null,
      SID: null,
      messageType: {
        msg: "message",
        getVideo: "getVideo",
        video: "video",
        broadcast: "broadcast",
        connected: "connected",
        findTargets: "findTargets",
      },
      getVideoLoopId: null,
      currentImageData: null,
    };
  },
  mounted() {
    this.socketOpen();
    this.resizeBody();
    window.addEventListener("resize", () => {
      this.resizeBody();
    })
  },
  methods: {
    resizeBody() {
      document.getElementById("app").style.height = `${window.innerHeight}px`;
    },
    socketOpen() {
      this.socket = io();
      this.socket.on("response_fail", () => {
        console.log("Fail received.");
      });
      this.socket.on(this.messageType.connected, (data) => {
        console.log("connected sid==>" + data.sid);
        this.SID = data.sid;
        this.getVideoLoop();
      });
      this.socket.on(this.messageType.video, (data) => {
        if (data) {
          this.currentImageData = data;
          this.$refs.cameraView.setVideo(data);
        }
      });
      this.socket.on(this.messageType.findTargets, (data) => {
        console.log("find Targets", data);
        this.$refs.targetListView.showTargets(data);
        this.$refs.cameraView.setBox(data);
      });
    },
    drawImageToList(imgCopy, index) {
      //截取的画面绘制到列表中
      this.$refs.targetListView.setListImageBoxSrc(imgCopy,index);
    },
    getVideoLoop() {
      this.getVideoLoopId = setInterval(() => {
        this.socketSendmsg(this.messageType.getVideo, "");
      }, 50);
    },
    socketSendmsg(type, msg) {
      // 发送消息
      if (this.socket) {
        console.log(type,msg);
        this.socket.emit(type, msg);
      }
    },
  },
};
</script>
<style scoped>
.home{
  height: 100%;
}
.center-middle{
  display: flex;
}
.bottom-line {
  border-bottom: 1px solid #afafaf;
}
</style>


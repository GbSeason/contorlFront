<template>
  <div class="home">
    <el-row class="bottom-line">
      <el-col :span="24">
        <Status ref="statusView" />
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
        msg: "message",//普通消息，暂未定义
        getVideo: "getVideo",//获取当前视图
        video: "video",//接收到视图
        broadcast: "broadcast",//广播
        connected: "connected",//连接成功
        findTargets: "findTargets",//识别到目标
        motoInfo: "info",//机械臂信息
        action: "action",//执行动作
        actionWork: "actionWork",//执行作业
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
          this.$refs.statusView.setStatus("camera",1)
          this.currentImageData = data;
          this.$refs.cameraView.setVideo(data);
        }else{
          this.$refs.statusView.setStatus("camera",0)
        }
      });
      this.socket.on(this.messageType.findTargets, (data) => {
        // console.log("find Targets", data);
        this.$refs.targetListView.showTargets(data);
        this.$refs.cameraView.setBox(data);
      });
      this.socket.on(this.messageType.motoInfo, (data) => {
        console.log("motoInfo", data);
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
    action(index){
      // 执行时，需要按照一下步骤进行：1存储选择的所有box；2将选择的box传入后台；3后台记录所有选择的box，记录机械臂当前所有状态，4依次执行选择的box
      // 目前为每次执行一个目标
      let box = this.$refs.cameraView.getBox(index);
      this.socketSendmsg(this.messageType.actionWork, box);
    },
    socketSendmsg(type, msg) {
      // 发送消息
      if (this.socket) {
        // console.log(type,msg);
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


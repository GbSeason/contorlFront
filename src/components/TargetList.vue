<template>
  <div class="frame">
    <div v-for="(item, index) in targets" :key="index" class="target">
      <img class="backgroundimg" :id="boxName+index">
      <div class="actions">
        <div class="button-border" @click="action(item, index)">执行</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "target",
  props: ["parent"],
  data: function () {
    return {
      boxName: "targetBox_",
      targets: []
    };
  },
  methods: {
    showTargets(data) {
      this.targets = [];
      if (data.length > 2) {
        //[{"frame": [[522.5556640625, 80.27911376953125, 28.788330078125, 38.64739990234375]], "conf": [0.27099180221557617]}]
        let datas = JSON.parse(data);
        if (datas && datas.length > 0) {
          datas.forEach((element) => {
            element.frame.forEach((item, index) => {
              let entity = { frame: [], conf: 0 };
              entity.frame = item;
              entity.conf = element.conf[index];
              this.targets.push(entity);
            });
          });
        }
      }
    },
    setListImageBoxSrc(imgCopy,index){
       let boxEntity = document.getElementById(`${this.boxName}${index}`)
       if(boxEntity){
            boxEntity.src = imgCopy;
       }
    },
    action(item) {},
  },
};
</script>
<style scoped>
.frame {
  display: flex;
  padding: 10px 10px 10px 0;
  justify-content: flex-start;
}
.button-border {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #00ffff;
  border-radius: 3px;
  padding: 0px 2px;
  line-height: 18px;
  cursor: pointer;
}
.button-border:hover {
  background-color: #00999e;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100px;
  color: #00ffff;
}
.backgroundimg {
  max-width: 100px;
  height: auto;
}
.target {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #d68b00;
  width: 150px;
  height: 100px;
  margin-left: 10px;
}
</style>

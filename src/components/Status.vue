<template>
  <div class="status-line">
    <div class="status-cell-frame" v-for="cell in statusList" :key="cell.name">
      <div :class="cell.status ? 'status-cell status-normal' : 'status-cell status-error'"></div>
      <label class="cell-title">{{ cell.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'status',
  props: {

  },
  data: function () {
    return {
      statusList: [
        {
          name: 'camera',
          status: 1
        },
        {
          name: 'joint1',
          status: 1
        },
        {
          name: 'joint2',
          status: 1
        },
        {
          name: 'joint3',
          status: 1
        },
        {
          name: 'joint4',
          status: 1
        },
        {
          name: 'joint5',
          status: 1
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.status-line {
  display: flex;
  padding: 10px;
  justify-content: space-around;
}

.status-cell-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-cell {
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 5px;
}
.cell-title{
  font-size: 20px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.status-normal {
  background-color: #7fff00;
}

.status-error {
  background-color: #ff0800;
}
</style>

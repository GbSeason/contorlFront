<template>
    <div class="frame">
        <div v-for="(item, index) in targets" :key="index" class="target">
            <div class="backgroundimg"></div>
            <div class="actions">
                <div class="button-border">执行</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'target',
    props: {

    },
    data: function () {
        return {
            targets: [{ frame: [], conf: [] },{ frame: [], conf: [] }]
        }
    }
}
</script>
<style scoped>
.frame {
    display: flex;
    padding: 10px 10px 10px 0;
    justify-content: flex-start;
}
.button-border{
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid #00ffff;
    border-radius: 3px;
    padding: 0px 2px;
    line-height: 18px;
    cursor: pointer;
}
.button-border:hover{
    background-color: #00999e;
}
.actions{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100px;
    color: #00ffff;
}
.backgroundimg{
    background-image: url('../assets/logo.png');
    width: 100px;
    height: 100px;
    background-position-y: -10px;
    background-position-x: -10px;
    background-size: 90%;
    background-repeat: no-repeat;
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

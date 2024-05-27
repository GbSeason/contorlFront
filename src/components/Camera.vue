<template>
    <div class="frame">
        <img :src="videoContent" class="video-view">
    </div>
</template>
<script>
export default {
    name: 'cameraview',
    props: {

    },
    data: function () {
        return {
            videoContent:null
        }
    }
}
</script>
<style scoped>
.frame{
    padding: 0px;
}
.video-view{
    width:640px;
    height: 480px;
    border: 1px solid #afafaf;
}
</style>
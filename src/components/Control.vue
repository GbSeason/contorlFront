<template>
    <div class="frame">
        <el-row>
            <el-col :span="8">

            </el-col>
            <el-col :span="8">
                <div class="control-frame">
                    <div class="front">
                        <i class="el-icon-caret-left" type="4" id="front-button"></i>
                    </div>
                    <div id="direction-keys">
                        <div type="0" class="quarter up"></div>
                        <div type="1" class="quarter right"></div>
                        <div type="2" class="quarter down"></div>
                        <div type="3" class="quarter left"></div>
                        <div class="center"></div>
                    </div>
                    <div class="back">
                        <i class="el-icon-caret-right" type="5" id="back-button"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">

            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'control',
    props: ['parent'],
    data: function () {
        return {
            normalColor: "#64d4b8",
            overColor: "#e49b48",
            downColor: "#f16560",
            intervalIds: [],
            directionCodes: { up: 0, right: 1, down: 2, left: 3, front: 4, back: 5 },
        }
    },
    mounted() {
        this.initControl();
        this.initControlMouse();
    },
    methods: {
        startAction(direction) {
            // 0:up  1:right 2:down 3:left 4:front 5:back
            let intervalId = setInterval(() => {
                this.parent.socketSendmsg("action",direction)
            }, 20)
            this.intervalIds.push(intervalId)
        },
        stopAction() {
            this.intervalIds.forEach(item=>{
                clearInterval(item);
            })
        },
        addListener(dom) {
            dom.addEventListener("mousedown", (event) => {
                event.target.style.backgroundColor = this.downColor;
                this.startAction(event.target.type)
            })
            dom.addEventListener("mouseup", (event) => {
                event.target.style.backgroundColor = this.overColor;
                this.stopAction()
            })
            dom.addEventListener("mouseover", (event) => {
                event.target.style.backgroundColor = this.overColor;
            })
            dom.addEventListener("mouseout", (event) => {
                event.target.style.backgroundColor = this.normalColor;
            })
            document.addEventListener("mouseup", (event) => {
                this.stopAction()
            })
        },
        initControlMouse() {
            const keys = document.getElementById('direction-keys').children;
            for (let i = 0; i < 4; i++) {
                this.addListener(keys[i])
            }
            let front = document.getElementById('front-button');
            let back = document.getElementById('back-button');
            this.addListener(front)
            this.addListener(back)
        },
        initControl() {
            document.addEventListener('keydown', (event) => {
                const keys = document.getElementById('direction-keys').children;
                switch (event.keyCode) {
                    case 37: // left
                        keys[3].style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.left)
                        break;
                    case 38: // up
                        keys[0].style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.up)
                        break;
                    case 39: // right
                        keys[1].style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.right)
                        break;
                    case 40: // down
                        keys[2].style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.down)
                        break;
                    case 70: // front
                        document.getElementById('front-button').style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.front)
                        break;
                    case 66: // back
                        document.getElementById('back-button').style.backgroundColor = this.downColor;
                        this.startAction(this.directionCodes.back)
                        break;
                }
            });

            document.addEventListener('keyup', (event) => {
                const keys = document.getElementById('direction-keys').children;
                this.stopAction()
                switch (event.keyCode) {
                    case 37: // left
                        keys[3].style.backgroundColor = this.normalColor;
                        break;
                    case 39: // right
                        keys[1].style.backgroundColor = this.normalColor;
                        break;
                    case 38: // up
                        keys[0].style.backgroundColor = this.normalColor;
                        break;
                    case 40: // down
                        keys[2].style.backgroundColor = this.normalColor;
                        break;
                    case 70: // front
                        document.getElementById('front-button').style.backgroundColor = this.normalColor;
                        break;
                    case 66: // back
                        document.getElementById('back-button').style.backgroundColor = this.normalColor;
                        break;
                }
            });
        }
    },
}
</script>
<style scoped>
.frame {
    padding: 10px 10px;
    height: 230px;
}

.control-frame {
    display: flex;
    height: 250px;
    width: 412px;
}

#direction-keys {
    padding-left: 80px;
}

.front {
    display: flex;
    align-items: center;
    width: 150px;
    font-size: 80px;
}

.back {
    display: flex;
    align-items: center;
    width: 120px;
    font-size: 80px;
}

#front-button {
    background-color: #64d4b8;
}

#back-button {
    background-color: #64d4b8;
}

.quarter {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 100px 0 0;
    background-color: #64d4b8;
    cursor: pointer;
}

.center {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-top: -90px;
    margin-left: 10px;
    background-color: #ffffff;
}

.up {
    transform: rotate(45deg);
}

.right {
    transform: rotate(135deg);
    margin-left: 72px;
    margin-top: -28px;
}

.down {
    transform: rotate(225deg);
    margin-top: -28px;
}

.left {
    transform: rotate(315deg);
    margin-left: -72px;
    margin-top: -172px;
}

/* .quarter-border {
    width: 200px;
    height: 200px;
    border: 100px solid #fff;
    border-right-color: #f00;
    box-sizing: border-box;
    border-radius: 100px;
} */
</style>
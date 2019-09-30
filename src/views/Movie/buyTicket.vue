<template>
    <div id="buyTicketContainer" class="slide-enter-active">
        <Header title="购票">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <div class="cvcontainer">
            <div>不好意思，功能仍在开发中哦~</div>
            <div>
                <canvas id="canvas">
                    您的浏览器不支持Canvas
                </canvas>
            </div>
        </div>
       
    </div>
</template>

<script>

import Header from '@/components/Header';
import { setInterval } from 'timers';
import imgSrc from '@/assets/walking.png';

export default {
    name : 'BuyTicket',
    components : {
        Header
    },
    props : ['movieId'],
    methods : {
        handleToBack(){
            //back返回到前一个页面
            this.$router.back();
        },
        initCanvas(){
            var canvas = document.getElementById('canvas');
            canvas.width = 100;
            canvas.height = 180;

            var ctx = canvas.getContext('2d');

            var img = new Image();
            img.src = imgSrc;
            img.onload = function(){
                var frameIndex = 0;
                setInterval(function(){
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.drawImage(
                        img,
                        frameIndex*184,
                        0,
                        184,
                        325,
                        0,
                        0,
                        184 / 2,
                        325 / 2
                    );
                    frameIndex++;
                    frameIndex %= 8;
                },100)
            }
        }
    },
    mounted() {
        this.$nextTick(()=>{
			this.initCanvas();
		});
        
    }
}
</script>

<style scoped>
/*min-height在内容少时也能保证高度不小于一个屏幕*/
#buyTicketContainer{ position: absolute; left: 0; top: 0; z-index: 100; width: 100%; min-height: 100%; background: white; }
/* 动画滑动效果 */
#buyTicketContainer.slide-enter-active{ animation: .3s slideMove; }
@keyframes slideMove{
    0%{ transform : translateY(100%); }
    100%{ transform : translateY(0); }
}
.cvcontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

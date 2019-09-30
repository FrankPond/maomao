<template>
    <div>
        <!-- <div class="load"></div> -->
        <div class="load2">
            <div class="line">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="circlebg"></div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Loop'
}
</script>

<style scoped>
        /* .load,.load2{width:36px;height:36px;margin:100px auto;} */
        /* .load{background:url('load-v1.gif') #fcfcfc center center no-repeat;} */

        .load2{background:#fcfcfc;width:18px;height:18px;margin-right:5px;}
        .load2{position:relative;}
        .load2 .line div{position:absolute;left:8px;top:0;width:1.5px;height:18px;}
        .load2 .line div:before,.load2 .line div:after{content:'';display:block;height:50%;background:#535353;border-radius:2.5px;}
        .load2 .line div:nth-child(2){-webkit-transform:rotate(30deg);}
        .load2 .line div:nth-child(3){-webkit-transform:rotate(60deg);}
        .load2 .line div:nth-child(4){-webkit-transform:rotate(90deg);}
        .load2 .line div:nth-child(5){-webkit-transform:rotate(120deg);}
        .load2 .line div:nth-child(6){-webkit-transform:rotate(150deg);}
        .load2 .circlebg{position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;background:#fcfcfc;border-radius:9px;}
        
        @-webkit-keyframes load{
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
        
        .load2 .line div:nth-child(1):before{-webkit-animation:load 1.2s linear 0s infinite;}
        .load2 .line div:nth-child(2):before{-webkit-animation:load 1.2s linear 0.1s infinite;}
        .load2 .line div:nth-child(3):before{-webkit-animation:load 1.2s linear 0.2s infinite;}
        .load2 .line div:nth-child(4):before{-webkit-animation:load 1.2s linear 0.3s infinite;}
        .load2 .line div:nth-child(5):before{-webkit-animation:load 1.2s linear 0.4s infinite;}
        .load2 .line div:nth-child(6):before{-webkit-animation:load 1.2s linear 0.5s infinite;}
        .load2 .line div:nth-child(1):after{-webkit-animation:load 1.2s linear 0.6s infinite;}
        .load2 .line div:nth-child(2):after{-webkit-animation:load 1.2s linear 0.7s infinite;}
        .load2 .line div:nth-child(3):after{-webkit-animation:load 1.2s linear 0.8s infinite;}
        .load2 .line div:nth-child(4):after{-webkit-animation:load 1.2s linear 0.9s infinite;}
        .load2 .line div:nth-child(5):after{-webkit-animation:load 1.2s linear 1s infinite;}
        .load2 .line div:nth-child(6):after{-webkit-animation:load 1.2s linear 1.1s infinite;}
</style>

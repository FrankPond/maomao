<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
		<Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			
			<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailMovie.img.replace(/w\.h/,'148.208') +')' }"></div>
			<div class="detail_list_filter"></div>
            <div class="detail_list">
				
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('296.416')" alt="电影封面" preview="0" preview-text="电影封面">
					</div>
					<div class="detail_list_info">
						<h2>{{ detailMovie.nm }}</h2>
						<p>{{ detailMovie.enm }}</p>
						<p>{{ detailMovie.sc }}</p>
						<p>{{ detailMovie.cat }}</p>
						<p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
						<p>{{ detailMovie.pubDesc }}</p>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="detail_intro">
					<div class="distributions">
						<div class="distributions_content">
							<section class="flexBox">
								<div class="flexBox-a">
									<img src="@/assets/logo.png/" alt="logo" id="logo" >
									<span class="rateHeader">实时口碑</span>
								</div>
								<div class="flexBox">
									<div>{{ detailMovie.wish }} 人想看 &nbsp;</div>
									<div>{{ detailMovie.watched }} 人看过</div>
								</div>
							</section>
							<section class="rateBody">
								<!-- 评分柱形图 -->
								<div id="chart-rated" class="rateLeft" style="width:250px;height:90px;"></div>
								<div class="rateRight">
									<div class="rateScord">{{ detailMovie.sc }}</div>
									<div class="rateNumber">{{ detailMovie.watched }} 人评</div>
								</div>
								
							</section>
							<section class="flexBox rateFooter">
								<div v-if="egg">片尾有彩蛋哦~</div>
								<div v-else>无彩蛋~不用等啦</div>
							</section>
						</div>
					</div>
					<div class="head">
						<h4 >简介</h4>
						<div class="show" @click="handleFold" v-show="fold"> <div>展开</div>&nbsp;<div class="to_down"></div> </div>
						<div class="show" @click="handleFold" v-show="!fold"> <div>收起</div>&nbsp; <div class="to_top"></div></div>
					</div>
					<div id="textContainer" :class="fold ? 'fold' : 'unfold'" >
						{{ detailMovie.dra }}
					</div>
				</div>
				<div class="detail_player swiper-container" ref="detail_player">
					<div class="head">
						<h4>视频剧照</h4>
					</div>
					
					<ul class="swiper-wrapper">
						<li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
							<div class="otherImg">
								<img :src="item | setWH('280.250')" alt="剧照" preview="0" preview-text="剧照">
							</div>
						</li>
					</ul>
				</div>

				<div class="flexBox-b video">
					<div class="head">
						<h4>预告片</h4> 
					</div>
					<div class="video-play">
						<video width="100%" height="100%" :poster= vdImg  controls="controls">
							<source :src= vd type="video/mp4">
							你的浏览器不支持video
						</video>
					</div>
					
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>

import Header from '@/components/Header';

export default {
    name : 'Detail',
    data(){
        return{
			detailMovie : {},
			isLoading : true,
			fold : true,
			egg : false,
			distributions : [],
			vd : '',
			vdImg : '',
        }
    },
    components : {
        Header
    },
    props : ['movieId'],
    methods : {
        handleToBack(){
            //back返回到前一个页面
            this.$router.back();
		},
		handleFold(){
			this.fold = !this.fold;
		},
		getEchartsData(arr){
			
			const myChart = this.echarts.init(document.getElementById('chart-rated'))
			const option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '1%',
					right: '5%',
					top: '20%',
					bottom: '1%',
					containLabel: true
				},
				xAxis: {
					show : false
				},
				yAxis: {
					axisTick: {
						show: false
					},
					axisLine:{
						show: false,
						lineStyle: {
							color: '#CFCFCF'
						}
					},
					show: true,
					type: 'category',
					data: ['1-4分','5-8分','9-10分']
				},
				series: [
									{
						type: 'bar',
						itemStyle: {
							
							opacity: 0.05,
							color: '#ddd'
						},
						silent: true,
						barGap: '-100%', // Make series be overlap
						data: [100, 100, 100]
					},
					{
						name: 'proportion',
						type: 'bar',
						itemStyle: {
							color: '#FFA500'
						},
						data: [arr[2].proportion,arr[1].proportion,arr[0].proportion]
					}
				]
			}
			myChart.setOption(option)
			window.addEventListener('resize',function(){
				myChart.resize()
			})
			
		}
    },
    mounted(){
        this.axios.get('/api/detailmovie?movieId='+ this.movieId).then((res)=>{
            var msg = res.data.msg;
            if( msg === 'ok' ){
				this.isLoading = false;
				this.detailMovie = res.data.data.detailMovie;
				this.egg = this.detailMovie.egg;
				this.distributions = this.detailMovie.distributions;
				this.vd = this.detailMovie.vd;
				this.vdImg = this.detailMovie.videoImg;
				//需要等到DOM加载完成
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player , {
						slidesPerView : 'auto',
						freeMode : true,
						freeModeSticky: true
					});
					this.getEchartsData(this.distributions);
					this.$previewRefresh()
				});
            }
        });
    }
}
</script>

<style scoped>
/*min-height在内容少时也能保证高度不小于一个屏幕*/
#detailContrainer{ position: absolute; left: 0; top: 0; z-index: 100; width: 100%; min-height: 100%; background: white; }
/* 动画滑动效果 */
#detailContrainer.slide-enter-active{ animation: .3s slideMove; }
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
#content.contentDetail{ display: block; margin-bottom:0; position: relative;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0; z-index: -2;}
.detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: -1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:110px; height: 152px;  margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

.container { width:100%; display: flex; flex-direction: column; z-index: 2; color: white;}
#content .detail_intro{ padding: 10px; }
.head { margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;}
#content .detail_player{ margin:10px; }
.detail_player .swiper-wrapper { display: flex; flex-direction: row; }
.detail_player .swiper-slide{ width: auto; height:70px; margin-right: 10px; text-align: center; font-size: 14px;}

.otherImg { width:140px;  }
.detail_player .swiper-slide img{ max-width: 100%; max-height:100%; margin-top: 5px; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
#textContainer { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; }
.fold { -webkit-line-clamp : 3; }
/* 选择器可能出问题导致没有正确绑定样式 */
.unfold { -webkit-line-clamp : 100; }
.show { font-size: 12px; color: #ccc; display: flex; flex-direction: row; justify-content: center; align-items: center; }
.to_top {width: 0; height: 0; border-bottom: 5px solid #999; border-left: 5px solid transparent; border-right: 5px solid transparent;}
.to_down {width: 0; height: 0; border-top: 5px solid #999; border-left: 5px solid transparent; border-right: 5px solid transparent;}

.distributions { margin-bottom: 10px; padding: 5px 10px; border-radius: 2%;  font-size: 12px; position: relative;}
.distributions .distributions_content { position: relative; }
.distributions::before { position: absolute; background-color: #5e6166;background-size: cover; opacity: 0.55; top: 0; right: 0; bottom: 0; left: 0; content: ''; }
.flexBox {display: flex; flex-direction: row; justify-content: space-between; align-items: center;}
.rateHeader { font-size: 16px; font-family: 'SimHei'; font-weight: bold; text-align: center;}
.flexBox-a {display: flex; flex-direction: row; justify-content: center;align-items: center;}
.flexBox-b {display: flex; flex-direction: column;}
#logo { width: 30px; height: 30px;  }
.rateBody { display: flex; flex-direction: row; }
.rateBody .rateLeft { flex-grow: 3; }
.rateBody .rateRight { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.rateScord { color: #FFA500; font-size: 45px; text-align: center;}
.rateNumber { text-align: center;}
.rateFooter { font-size: 15px; }
.video { margin: 5px 10px 10px 10px; }
.video-play { flex-grow: 1; }
</style>

<template>
    <!--keep-alive vue内置缓存组件 每次路由切换都会重新加载，需要进行缓存提高性能 -->
    <keep-alive>
        <router-view/>
    </keep-alive>
    
</template>


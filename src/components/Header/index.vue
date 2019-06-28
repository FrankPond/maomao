<template>
  <header id="header">
    <slot></slot> <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
    name : 'Header', //标记组件名字，在调试时不容易出错
    props : {
      title : {
        type : String,
        default : '喵喵影院'
      }
    }
};
</script>

<style>
#header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
</style>

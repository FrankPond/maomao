import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){

    var defaults = {    //默认值
        title : '',
        content : '',
        cancel : '',
        ok : '',
        handleCancel : null,
        handleOk : null
    };

    //通过Vue.extend方法，将组件和vue结合，得到里边的东西，返回一个新类
    var MyComponent = Vue.extend(MessageBox);

    return function( opts ){ //配置参数

        for(var attr in opts){
            defaults[attr] = opts[attr];
        }

        

        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    //通过call将this传进去，让handleCancel能拿到vm这个对象，然后触发调用
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    //点击时将弹窗删掉
                    document.body.removeChild( vm.$el );
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });

        document.body.appendChild( vm.$el );

    };  

})();
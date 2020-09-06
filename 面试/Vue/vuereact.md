[toc]
# Vue
## Vue使用
- 基本使用~组件使用 -必须会
- 高级特性-体现深度
- Vuex和Vue-router使用

### 指令、插值
1. 插值、表达式
2. 指令、动态属性
3. V-html：会有xss风险，会覆盖子组件
### computed和watch
1. computed有缓存，data不变则不会重新计算ß
2. watch如何深度监听 — deep:true
3. watch监听引用类型需要深度监听，拿不到oldVal
### class和style
- 使用动态属性
- 使用驼峰式写法
### 条件渲染
1. v-if和v-else用法，可使用变量或===表达式 
2. v-if和v-show的区别
    - v-if和v-show显示的时候一样
    - v-if和v-show不显示的时候，v-if是直接不渲染，v-show是需要渲染这个标签，只不过将display设置成none。
3. v-if和v-show的使用场景
    - 少次切换用v-if
    - 多次来回切换用v-show
### 循环（列表渲染）渲染
1. 如何遍历对象？ ——— 也可以用v-for
2. key的重要性。可以不能乱写（如random或者index）
    - 根据dfs算法对比虚拟DOM，用index不利于渲染。
3. v-for和v-if不能一起使用
    - v-for执行优先级比v-if要高，所以在每次v-for循环的时候都会渲染执行一次v-if的判断，故消耗性能 - eslint也会报错。
### 事件
1. event参数，自定义参数
    - @click
    - 需要传两个参数的时候，@click = “handle(2，$event)”
    - event构造函数是没经过任何装饰的原生-MouseEvent
    - event.target这个时候什么地方监听的
    - event.currentTarget事件被注册当前元素 
2. 事件修饰符，按键修饰符
    **事件修饰符**
    - 阻止单击时间继续传播
    ```html
    <a @click.stop = “doThis”></a>
    ```
    - 提交时间不再重载界面
    ```html
    <form @click:submit.prevent=“onSubmit”></form>
    ```
    - 修饰符可以串联
    ```html
    <a @click.stop.prevent=“doThat”></a>
    ```
    - 只有修饰符
    ```html
    <form v-on:submit.prevent></form>
    ```
    - 添加事件监听器时使用事件捕获模式，即内部元素出发的事件先在此处理，然后交给由内部元素进行处理。
    ```html 
    <doc @click.capture=“doThis”></div>
    ```
    - 只有当event.target是在当前元素自身时触发处理函数，即事件不是从内部元素触发的
    ```html
    <div @click.self=“doThat”></div>
    ```
    **按键修饰符**
    - 即使Alt 或 Shift 被一同按下时候也会被触发
    ```html
    <button @click.ctrl=“onClick”>A</button>
    ```
    - 有且只有 Ctrl被按下的时候才触发
    ```html
    <button @click.ctrl.exact=“onCtrlClick”>A</button>
    ```
    - 没有任何系统修饰符被按下的时候才会触发
    ```html
    <button @click.exact=“onClick”>A<button>
    ```
3. 事件绑定被绑定到了哪里呢？
    - 事件被挂在到当前元素
### 表单
1. v-model
     - v-model：双向绑定
2. textarea、checkbox、checkbox、radio、select
3. 修饰符lazy、number、trim
## Vue组件使用
1. props和$emit
    - props：父组件通过:list可以将data中的list内容传递给子组件，子组件可以用**props**来接受这个list。子组件接收到以后就可以在自己的组件中进行对应操作，如v-for循环。。。。。。
    - $emit:父组件将方法传递给子组件，子组件用$emit来触发父组件的自定义事件,让父组件的事件来处理。
    ```js
    Methods: {
        addTitle(){
            this.$emit(‘add’,this.title)
        }
    }
    ```
2. 组件通讯-自定义事件
    - 兄弟组件之间传值
    - 我们创建一个bus.js，在bus中创建一个Vue实例。将bus引入到两个兄弟组件之中。
    - 一个兄弟组件用bus.$emit来触发自定义事件，另外一个兄弟组件用bus.$on来接收$emit的回调。
3. 组件生命周期(单个组件)
    - 挂载阶段
        - created 和 mounted的区别
            - created页面没有渲染完成，这个时刻Vue实例已经初始化完成了。
            - mounted是页面渲染完成了，常在mounted做异步请求、操作DOM、定时器
    - 更新阶段
    - 销毁阶段
    **生命周期（父子组件）**
    - 父created  -> 子created -> 子mounted -> 父mounted
    - 父before update -> 子before updated -> 子 updated -> 父updated
    - 父beforeDestory -> 子beforeDestory -> 子destroyed -> 父destoryed
## Vue高级特性
1. 自定义v-model
    **子组件Custom**
    ```Vue
    <template>
        <input type=‘text’
                :value=‘text1’
                @input=‘$emit(‘change1’,$event.target.value)’>
    </template>
    
    <script>
    export default {
        model:{
            ‘text1’, // 对应props text1 
            event: ‘change1’
        },
        props: {
            text: string,
            default() {
                return: ‘’
            }
        }
    }
    </script>
    ```
    **父组件**
    ```vue
        <template>
            <div>
                <p>{{name}}</p>
                <Custom v-model=‘name’>
            </div>
        </template>
        
        <script>
        Import Custom from ‘./Custom’
        Export default {
            components: {
                Custom
            },
            data() {
                return {
                    name: ‘helloWorld’
                } 
            }
        }
        </script>
    ```
    <font color=blue>
    1. 子组件的 input 使用了 :value 而不是 v-model    
    2. 子组件的 chiange1 和 model.event1 要对应起来
    3. text1 属性对应起来
    </font>
    - 颜色选择器
2. $nextTick、refs
    **$nextTick**  
    - vue是异步渲染（原理）
    - data改变之后，DOM不会立刻渲染
    - $nextTick会在DOM渲染之后被触发，以获取最新DOM节点。
    <font color=blue>异步渲染，$nextTick 待 DOM渲染完再回调，页面渲染时会将data的修改做整合，多次data修改只会渲染一次<font>
    **refs**
    ```vue
        <template>
            <ul ref=‘ul1’><ul/>
        </template>
        
        <script>
            const ulElement = this.$refs.ul1; // 获取ul的DOM节点
        <script>
    ```
3. slot
    - 基本使用
        **父组件**
        ```vue
        <template>
            <SlotDemo :url=“website.url”>
                {{website.title}}
            <SlotDemo>
        </template>
        
        <script>
            export default {
                components: {
                    SlotDemo,
                }
            },
            data() {
                return {
                    name: ‘Heath’,
                    website: {
                        url: ‘http://github.com/’,
                        title:’github’,
                        subTitle: ‘程序员’
                    }
                }
            }
        </script>    
        ```
        **子组件**
        ```vue
        <template>
            <a :href=‘url’>
                <slot>
                    默认内容,即父组件没设置内容时，这里显示。
                <slot>
            </a>
        </template>
        ```
    - 作用域插槽
        <font color=blue>父组件来获取子组件的data内容，并使用</font>
        **父组件**
        ```vue
        <template>
            // 作用域插槽
            <ScopedSloteDemo :url=“website.url”>
                <template v-slot=‘slotProps’>
                    {{slotProps.slotData.title}}
                <template>
            <ScopedSloteDemo>
        </template>
        
        <script>
            export default {
                components: {
                    SlotDemo,
                }
            },
            data() {
                return {
                    name: ‘Heath’,
                    website: {
                        url: ‘http://github.com/’,
                        title:’github’,
                        subTitle: ‘程序员’
                    }
                }
            }
        </script>    
        ```
        **子组件**
        ```vue
        <template>
            <a :href=‘url’>
                //  插槽
                <slot :slotData=“website”>
                    {{website.subTitle}}               
                <slot>
            </a>
        </template>
        
        <script>
            export default {
                props: [‘url’]
            },
            data() {
                return {
                    website: {
                        url: ‘http://zhihu.com/’,
                        title:’zhihu’,
                        subTitle: ‘发源地’
                    }
                }
            }
        </scirpt>
        ```
    - 具名插槽
    给每个插槽命名，防止传错
    **子组件**
    ```vue
    <template>
        <div class=‘container’>
            <header>
                <slot name=‘header’></slot>
            <header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name=‘footer’></slot>
            </footer>
        </div>
    </template>    
    ```
    **父组件**
        ```Vue
        <template v-slot:header>
            <h1>将插入 header slot中</h1>
        </template>
        
        <p>将插入到 main slot 中，即未命名多slot</p>
        <template v-slot:footer>
            <p> 将插入到
        </template>
        ```
3. 动态、异步组件
    - 动态组件
        - :is=“component-name” 用法
        - 需要根据数据，动态渲染到场景。即组件类型不确定。
    **动态组件**   
        ```Vue
            <template>
                <div>
                    <div v-for=“(val,key) in newData” :key=“key”>
                        <component :is=“value.type”>
                    </div>
                </div>
            </template>
            
            <script>
            export default{
                components: {
                        
                }
                
                newData:{
                    1:{
                        type: ‘text’
                    },
                    2: {
                        type: ‘text’
                    },
                    3: {
                        type: ‘image’
                    }
                }
            }
            </script>
        ```
    **异步组件**
        ```Vue
            <template>
                <div>
                    <FormDemo v-if=“showFormDemo”/>
                    <button @click=“showFormDemo = true”>show form demo</button>
                </div>
            </template>
            
            <script>
                export default {
                    components: {
                        FormDemo: () => import(‘../Base/FormDemo’)      //  异步加载组件，随用随加载
                      }
                }
            </script>
        ```
4. keep-alive
    - 缓存组件
    - 频繁切换，不需要重复渲染
    - Vue常见性能优化
    **keep-alive:标签包裹到达缓存**
    ```vue
        <template>
            <keep-alive>
                <Consum>
                <Hello>
            </keep-alive>
        <template>
    ```
5. mixin
    - 多个组件有相同的组件，抽离出来
    - mixin并不是完美的解决方法，会有一些问题
        - 变量来源不明确
        - 多个mixin会出现命名冲突
        - mixin和组件可能出现多对多的关系，复杂度高
    - Vue3提出的Composition API旨在解决这些问题
    **mixin**
    ```js
    export default{
        data() {
            return{
                city: ‘北京’
            }
        },
        methods: {
            showName() {
                console.log(this.name)
            }    
        },
        mounted(){
                console.log(‘mixin mounted’,this.name)
        }
    }
    ```

    **主组件**
    ```Vue
    <template>
        <div>
            <p>{{name}} {{major}} {{city}}</p>
            <button @click=“showName”>显示姓名</button>
        </div>
    </template>
    
    <script>
        import myMixin from ‘./mixin’
        
        export default {
            mixins: [myMixin], // 可以添加多个，会自动合并起来
            data() {
                return {
                    name: ‘hello’,
                    major: ‘web 前端’
                }
            },
            methods: {
                
            },   
            mounted() {
                console.log(‘component mounted’, this.name)
            }
        }
    </script>
    ```        
## Vuex使用
![20200803180752](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200803180752.png)
异步操作：在Action操作
## Vue-router使用
1. 路由模式（hash、H5 history）
    ```js
     const router = new VueRouter({
        mode: ‘history’, //使用 h5 history模式
        routes: [...]
     })
    ```
2. 路由配置（动态路由、懒加载）
    **动态路由**
    ```js
    const User = {
        // 获取参数如 10 20
        template: ‘<div>User {{ $route.params.id }}</div>’
    }
    
    const router = new VueRouter({
        routes: [
        // 动态路径参数 以冒号开头。能命中 `/user/10` `/user/20`等格式等路由
            { path: ’/user/:id’,component: User } 
        ]
    })
    ```
    **懒加载**
    ```
    export default new VueRouter({
        routes: [
            {
                path: ‘/’,
                component: () => (
                    /* webpackChunkName: ‘navigator’ */
                    ‘./../components/Nauigator’
                )
            },
            {
                path: ‘/feedback’,
                component: () => import{
                    /* webpackChunkName: ‘feedback’
*/
                    ‘./../components/FeedBack’
                }
            }
        ]
    })
    ```
    异步加载不同的路由的组件，简言之按需加载。
    ### 题目
    1. v-show和v-if的区别
    v-show是通过css的display来控制，v-if是通过vue的本身机制来控制，组件是否渲染和销毁。频繁切换用v-show。注意和keep-alive的对比。
    2. 为何v-for中要用key
    TODO：未解决
    3. 描述Vue组件生命周期（有父子组件的情况）
    画图，创建，更新，销毁这几个阶段的父子组件状况。
    4. Vue组件如何通讯
        - 父子组件通信:属性和触发事件
        - 两个组件没有关系: 自定义事件方式
        - Vuex的通讯
    5. 描述组件渲染和更新的过程
     TODO: 未解决
    6. 双向数据绑定v-model的实现原理
     TODO: 未解决
## Vue原理
组件化、响应式、vdom和diff、模版编译、渲染过程、前端路由
### 组件化的基础
   - 数据驱动视图（MVVM，setState）
   - 传统个组件，只是静态渲染，更新还要依赖DOM更新
   - 画图VUE的MVVM数据驱动的视图
### MVVM
MVVM是Model-View-ViewModel
![20200901225951](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200901225951.png)
[mvvm原理](https://yq.aliyun.com/articles/610059)
### Vue响应式
1. 组件data的数据一旦变化，立刻触发视图的更新
    - 核心API -Object.defineProperty
    - Object.defineProperty的缺点（Vue3.0启用Proxy）
    - Proxy兼容性不好，且无法polyfill
    ```js
    const data = {};
    const name = ‘zhangsan’;
    Object.defineProperty(data,”name”,{
        get: function () {
            console.log(‘get’);
            return name;
        }
        set: function (newVal) {
            console.log(‘set’);
            name = newVal;
        }
    });
    ```
    
    ```js
    // 测试
    console.log(data.name);  // get zhangsan
    data.name = ‘lisi’      // set
    ```
    - 监听对象observer()，监听数组
    - 复杂对象，深度监听
    ```js
    // 重新定义数组原型
    const oldArrayProperty = Array.prototype
    // 创建新对象，原型指向 oldArrayProperty ，再拓展新的方法不会影响原型
    const arrProto = Object。create(oldArrayProperty);
    [‘push’,’pop’,’shift’,’unshift’,’splice’].forEach(methodName => {
    arrProto[methodName] = function() {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this,...arguments)
        // Array.prototype.push.call(this,...arguments)
         }
    })
    ```
    - Object.defineProperty的几个缺点
        - 深度监听，需要递归到底，一次计算量大
        - 无法新增删除属性（vue.set 和 Vue.delete)
        - 无法与监听数组，需要重写
2. 动视图的第一步
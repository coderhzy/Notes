# transition
当一个元素被transition包裹。Vue会自动分析元素的css样式，分析构建动画的流程。在动画即将被执行的时候，Vue会在标签汇总添加两个Class，一个叫fade-enter，一个叫fade-enter-active。当动画第一帧执行结束之后，Vue在第二帧去掉fade-enter，并且添加一个叫fade-enter-to的Class名字。然后动画继续执行，执行到最后Vue会去掉两个Class，一个是fade-enter-active，一个是fade-enter-to。
```Vue
<transition name="fade">
    <div v-if="show">Hello World</div>
</transition>
```
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/07/15914962247900.jpg)
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/07/15914984916479.jpg)

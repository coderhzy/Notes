## 05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？
![20200831224414](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831224414.png)
![20200831224446](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831224446.png)

### 渲染流水线
由于渲染机制的复杂，渲染模块在执行过程中会被划分成多个子阶段，输入的HTML进过这些子阶段，最后输出像素。这个处理流程叫做渲染流水线。
![20200831224744](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831224744.png)

*按照渲染时间分*
构建DOM树、样式计算、布局阶段、分层、绘制、分块、光栅化、合成。
<font color="blue">子阶段</font>
- 开始每个子阶段都有其输入的内容；
- 然后每个子阶段有其处理过程；
- 最终每个子阶段会生成输出内容。

### 构建 DOM 树
HTML 转换为浏览器能够理解的结构——DOM 树。
![20200831225046](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225046.png)
构建DOM树过程：
![20200831225122](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225122.png)

### 样式计算
1. 把 CSS 转换为浏览器能够理解的结构
当渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets。
![20200831225248](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225248.png)
2. 转换样式表中的属性值，使其标准化
![20200831225412](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225412.png)
3. 计算出 DOM 树中每个节点的具体样式
1CSS 的继承规则和层叠
<font color="blue">继承</font>
![20200831225508](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225508.png)
<font color="blue">层叠</font>是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称“层叠样式表”正是强调了这一点。最终保存在ComputedStyle中。

### 布局阶段
1. 创建布局树
- 遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中；
- 而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 body.p.span 这个元素，因为它的属性包含 dispaly:none，所以这个元素也没有被包进布局树。
![20200831225750](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225750.png)
2. 计算布局
计算布局树节点的坐标位置。


## 渲染流水线
![20200831225952](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831225952.png)
- 转换HTML让浏览器理解，生成DOM树。
- 生成DOM树以后，根据CSS样式表来计算所有节点的样式。
- 最后计算DOM元素的布局信息，使其保存在布局树中。

**小问题**
如果下载 CSS 文件阻塞了，会阻塞 DOM 树的合成吗？会阻塞页面的显示吗？
- 1 不会阻塞dom树的构建，原因Html转化为dom树的过程，发现文件请求会交给网络进程去请求对应文件，渲染进程继续解析Html。
- 2 会阻塞页面的显示，当计算样式的时候需要等待css文件的资源进行层叠样式。资源阻塞了，会进行等待，直到网络超时，network直接报出相应错误，渲染进程继续层叠样式计算
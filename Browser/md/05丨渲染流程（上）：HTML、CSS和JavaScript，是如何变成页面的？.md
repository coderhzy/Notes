## 渲染流程：HTML、CSS和JavaScript，是如何变成页面的？
首先我们要了解渲染是什么，一般来说。浏览器将我们编写好的HTML、CSS、JavaScript进行渲染，生成我们可见的页面。这个时候我们需要考虑一下，到底是怎样渲染的呢？

**下面一张渲染效果**
![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172282c6bbce6b2d-20200525152143792.png)

<center>渲染流程示意图</center>

上图我们可以看出，HTML、CSS、JavaScript经过渲染生成了旺财。

**我们再来看一张图**

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172282dc47692b07-20200525152151074.png)
<center>HTML、CSS 和 JavaScript 关系图</center>

- HTML：超文本标记语言，浏览器会根据不同的标签来渲染静态的结构。
- CSS：层叠样式表。它可以通过选择题选出HTML的标签，并对选中的样式进行修改。如：颜色，字体大小等。
- JavaScript：使网页**动**。如上图中，可以通过 JavaScript 来修改 CSS 样式值。


### 渲染流程
我们将渲染模块划分成很多子阶段，输入的 HTML 经过这些子阶段，最后输出像素。 称为 <font color=red>渲染流水线</font>。

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172283251e912d41.png)
<center>渲染流水线示意图</center>

<font color=red>渲染流水线</font>

1. 构建 DOM 树
2. 样式计算
3. 布局阶段
4. 分层
5. 绘制
6. 分块
7. 光栅化
8. 合成

***
**以下是每个阶段的重点**
- 开始每个子阶段都有其输入的内容
- 然后每个子阶段有其处理过程
- 最终每个子阶段会生成输出内容

1. **构建 DOM 树**
构建DOM树的目的为了能将 HTML 转换为浏览器能够理解的结构——DOM 树。

**下图是DOM树结构：**
![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1722836241c9b52a.png)

<center>树结构示意图</center>
如果你学习过数据结构，当然知道父子关系。

**下面我们再来看下DOM树的构建过程**

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1722837053ced906.png)
<center>DOM 树构建过程示意图
</center>

图中你可以看出，浏览器将HTML代码生成了DOM树。

下图为Chrome的查看DOM树方法，打开 Chrome 的“开发者工具”，选择“Console”标签来打开控制台，然后在控制台里面输入“document”后回车，这样你就能看到一个完整的 DOM 树结构。

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1722838b5af32477.png)
<center>DOM 可视化</center>

图中的 document 就是 DOM 结构。

**如何使用js代码来修改DOM的内容**
```js
document.getElementsByTagName("p")[0].innerText = "black"
```
执行代码后如下图：
![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172283a06d9f45f8.png)

<center>通过 JavaScript 修改 DOM</center>

我们从上图可以看出：
执行了一段修改第一个<p>标签的 JavaScript 代码后，DOM 的第一个 p 节点的内容成功被修改，同时页面中的内容也被修改了。


2. **样式计算（Recalculate Style）**
样式计算就是计算出DOM节点中每个元素的样式。

- 1.**把 CSS 转换为浏览器能够理解的结构**

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17228437a5559900.png)
<center>HTML 加载 CSS 的三种方式</center>

<font color=blue>CSS 样式来源</font>

1. 通过 link 引用的外部 CSS 文件
2. 将style标记内的 CSS
3. 元素的 style 属性内嵌的 CSS

我们前面了解到了浏览器会去解析HTML代码，浏览器同样回去解析CSS，当渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets

**如果你想看下document.styleSheets**，那么Chrome 控制台中查看其结构，只需要在控制台中输入 document.styleSheets

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172284a5aafb8f97.png)
<center>styleSheets</center>

- 2.**转换样式表中的属性值，使其标准化**

属性值的标准化操作
```
body { font-size: 2em }
p {color:blue;}
span  {display: none}
div {font-weight: bold}
div  p {color:green;}
div {color:red; }
```
如 2em、blue、bold，这些类型数值不容易被渲染引擎理解，所以需要将所有值转换为渲染引擎容易理解的、标准化的计算值，这个过程就是属性值标准化。

**标准化后的属性值**

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172284ce26c9caf6.png)
<center>标准化属性值</center>

我们可以看到：2em 被解析成了 32px,red 被解析成了 rgb(255,0,0)，bold 被解析成了 700

- 3.**计算出 DOM 树中每个节点的具体样式**
上图的样式表最终应用地点：

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172284eb64e03c95.png)
<center>计算后 DOM 的样式
</center>

我们可以从图中看出：**body 节点的 font-size 属性是 20，那 body 节点下面的所有节点的 font-size 都是 20**

下图你可以看出CSS的继承：
打开 Chrome 的“开发者工具”，选择第一个“element”标签，再选择“style”子标签

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/172285004330217e.png)
<center>样式的继承过程界面</center>

 - 元素的样式（位于图中的区域 2 中）
 - 样式来源（位于图中的区域 3 中）
 - UserAgent 样式，它是浏览器提供的一组默认样式，如果你不提供任何样式，默认使用的就是 UserAgent 样式。
 - 通过区域 2 和区域 3 来查看样式继承的具体。


**CSS特性**

层叠是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称“层叠样式表”正是强调了这一点。

**样式计算的目的**

为了精确计算每个元素样式，然后按照CSS继承和层叠规则计算。最终输出的内容是每个 DOM 节点的样式，并被保存在 ComputedStyle 的结构内。


**了解每个 DOM 元素最终的计算样式**

可以打开 Chrome 的“开发者工具”，选择第一个“element”标签，然后再选择“Computed”子标签

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17228533ac546652.png)
<center>DOM 元素最终计算的样式
</center>

图中我们可以看出：**红色方框中显示了 html.body.div.p 标签的 ComputedStyle 的值**

3. **布局阶段**

- 1. 创建布局树

DOM 树还含有很多不可见的元素，在显示之前，我们还要额外地构建一棵只包含可见元素布局树。

![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/17228553dee8c341-20200525152712898.png)
<center>布局树构造过程示意图
</center>

构建布局树，浏览器完成的工作：
- 遍历 DOM 树中的所有可见节点，并把这些节点加到布局中；
- 而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 body.p.span 这个元素，因为它的属性包含 dispaly:none，所以这个元素也没有被包进布局树。

- 2. 布局计算
- 
明日更新

**完整的渲染流水线**
![](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/1722856d79c73bac.png)

<center>渲染流水线图
</center>
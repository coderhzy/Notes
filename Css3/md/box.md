# box

1.box-sizing:border-box;



2.overflow:scroll;

```css
div{
  overflow:scroll;/*滑动出现滚动条*/
  overflow-x:auto;/*图片左右滑动*/
}
```



3.reszie

```css
resize:both;/*用户可以自己拖动来扩大容器*/
```



**4.bfc**







5.flex和inline-flex

```css
display:flex; /*弹性盒子*/
display:inline-flex;
```



6.flex-direction:轴方向

```css
flex-direction:row-reverse;
/*row:左到右，左对齐 , row-reverse:与row相反 ， column:上到下，顶对齐 , column-reverse:与colunmn相反 */
```



7.flex-wrap

```css
flex-wrap:nowrap; /*flex容器是单行，子项可能会溢出容器*/
flex-wrap:wrap;/*flex容器是多行，溢出部分放到新行，子项内部发生断行*/
flex-wrap:wrap-reverse:反转wrap排列
```



8.justfy-content

```css
justify-content:flex-start;
/*flex-start , flex-end , center , space-between , space-around*/
```



9.align-item：主要还是针对，单行元素来处理对齐方式

```css
align-items:flex-start; 
/*flex-start ， flex-end , center , baseline , stretch*/
align-items:stretch;/*没设置高度的时候，会撑开*/
```



10.order

```css
order:数字; /*用整数来定义排列顺序，数值小可排前面，可以为负值*/
```



12.align-self

```css
/*优先级听自己的*/
/*flex-start ， flex-end , center , baseline , stretch*/
```



13.flex-grow , flex-shrink , flex-basis

```css
flex-grow:1;/*当一行有剩余空间，根据自己的比例，把盒子形成新的宽度，来瓜分剩下空白区*/
flex-basis:150px;/*basis优先级比width高*/
flex-shrink:1； /*按照比例去计算占比，然后按照占比来收缩*/
/*我们使用加权值来定义，本质缩减的是盒模型的content区域*/
```



**14**.flex-basis和width区别

```css
flex-basis:120px; /*没设置width的时候，用这个，元素真实的宽的最小值是等于basis。当你填充多值，内容不会换行，合模型会随着填充内容宽度来变*/


/*当width和flex-basis。 
basis小于width，这个时候宽度的取值区间[basis,width],width设置的值上限值
width大于basis，元素则就是basis值*/
width:150px;
flex-basis:200px;
```



```markdown
注意点:
1.被不换行的文字撑开的容器，都不参与shrink
```


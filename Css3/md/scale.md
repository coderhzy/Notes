# scale

1. transform: scale(x,y);

   ```css
   transform: scale(2,1); /*伸缩的是元素的变化变化坐标轴的刻度，所在的坐标轴扩大就按照scale比例*/
   
   /*可叠加*/
   transform: scale(.5,.5) scale(3,3);
   
   /*第一次伸缩，然后旋转，第二次伸缩的时候会在第一次的基础上进行伸缩，其中伸缩轴发生改变*/
   transform:scale(2,1) rotate(-45deg) scale(2,1);
   
   /*很少用*/
   scaleZ(-45deg);
   ```


# border and background

1. border-radius

   ```css
   div{
     width:100px;
     height:100px;
     border:1px solid #000;
     position:absolute;
     left:calc(50% - 50px);
     tip:calc(50% - 50px);
     
     border-radius: 50%; /*圆*/
     border-radius:10px; /* 与 border-radius: 10px 10px 10px 10px; 一样。值 左上 右上 右下 左下*/
     
     /*举例 : 右上写法,其他同理*/
     border-top-right-radius:10px;
     
     /*边角切割*/
     border-top-left-radius:10px 10px; /* 前者是水平放方向切割，后者是垂直方向。 都是90px，则为1/4圆*/
     
     border-radius:10px 20px 30px 40px / 10px 20px 30px 40px; /*10px 10px左上 同理*/
   }
   ```

   <img src="/Users/weijie/Desktop/截屏2020-05-05 07.57.32.png" alt="截屏2020-05-05 07.57.32" style="zoom: 25%;" />



2. boxshadow

   ```css
   div{
     position:absolute;
     left:calc(50% - 50px);
     top:calc(50% - 50px);
     width:100px;
     height:100px;
     background-color:transparent;
     border:1px solid #fff;
     
     /*水平偏移 垂直便宜 模糊（blur） 传播距离(在水平和垂直方向同时加)*/
     box-shadow:0px 0px 0px 0px #fff; /*加了偏移量就会偏移看出来*/
    	/*模糊是基于边框的位置，向两边模糊*/
     
     /*内阴影*/
     box-shadow:inset 0px 0px 1px 0px #fff;
     
     /*外阴影*/
     box-shadow:outset 0px 0px 1px 0px #fff;
     
     /*内外阴影*/
     box-shadow:outset 0px 0px 1px 0px #fff,inset 0px 0px 1px 0px #fff;
    
     /*最轴问题：先设置谁就会在谁上面*/
     box-shadow:inset 0px 0px 10px #fff,
       								3px 0px 10px #f0f,
       								0px -3px 10px #0ff,
       								-3px 0px 10px #00f,
       							  0px 3px 10px #ff0,
       								0px 3px 10px #f0f;
   }
   
   /*文字在阴影的上方，在一切的上方*/
   ```

   <img src="/Users/weijie/Library/Application Support/typora-user-images/image-20200505093443899.png" alt="image-20200505093443899" style="zoom:25%;" />

3.border-image

```css
div{
  width:100px;
  height:100px;
  border:10px solid black;
  left:calc(50% - 50px);
  top:calc(50% - 50px);
  /*支持渐变色*/
  border-color:lightpink;
  /*也可以加url*/
  border-image-source:linear-gradient(red,yellow);
  border-image-slice:10;
  
  /*slice分割线 上右下左*/
  border-image-slice:10 20 30 40;
  border-image-repeat:stretch; /*拉伸填充*/
  /*strech:拉伸，repeat：平铺，round：与repeat类似，space：与repeat类似*/
  
  /*将背景图片往外拉伸*/
  border-image-outset:30px;
  
  
  /*设置可以填充的背景图片的长*/
  border-image-width:30px;
  
  
  /*添加多个背景图片*/
  background-image:url(),url();
  
  
  /*规定背景图片从哪个地方渲染*/
  background-origin:border-box; 
  background-repeat:no-repeat;
  background-position:30px 30px;/*从border-box的定位的左上顶点开始渲染*/
  /*border-box,padding-box,content-box*/
  
  
  /*背景图片从哪个地方截断*/
  background-clip();
  -webkit-background-clip:text;/*用文字反切背景图片，只有文字内能看到背景图片*/
  -webkit-text-fill-color:transparent;/*webkit的时候好使*/
  text-fill-color:transparent;
  /*border-box,padding-box,content-box,text*/
  
  
  /*背景图片的定位*/
  background-attachment:scroll;/*相对于视口定位*/
  background-attachment:local;/*相对于容器定位*/
  background-attachment:fixed;/*相对于真正的视口定位*/
  /*scroll,local,fixed*/
  
  
  background-size:cover;/*失真传满*/
  background-size:containl/*让图片的一条边和容器另一边对齐*/
  /*cover，contain*/
  
  
  background-repeat:space round;
  /*space,用空白来填充图像周围间隔*/
  
  
  linear-gradient
  background-image:linear-gradient:(to right,red,green)  /*线性渐变*/
  background-image:linear-gradient:(90deg,red,green)  /*线性渐变,角度*/
  background-image:linear-gradient:(90deg,red 20px,green 60px)  /*线性渐变,20开始 60结束*/
    
  
  background-image:radial-gradient:(red 20%,green 30px,#0ff)	/*径向渐变,从内向外扩散*/
 	background-image:radial-gradient:(circle at,red 20%,green 30px,#0ff)	/*设置圆心位置，可以将circle换成ellipse*/
    
  /*设置放射到什么位置， closest-corner:最近的角落，closest-side:最近的边,farthest-corner:最远的角落,farthest-side:最远的边*/
  background-image:radial-gradient:(ellipse farthest-corner at 50px 50px,red 20%,green 30px,#0ff)
   
}
```



4.中转颜色

```css
div{
  border-style:solid;
  color:red;
  /*css1 css2 border-color : currentColor*/
  border-color:currentColor;
  //当设置color时候，currentColor会作为中转变量来接受color的值，最后作用到border-color上
}
```


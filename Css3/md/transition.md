# transition

1.transition-property:all;    transition-duration:1s;    transition-timing-function:linear;    transition-delay:1s;

```css
div{
	transition:width 2s linear 1s; 
  transition:width 2s,height 1s;
}

div:hover{
  width:200px;
  height:200px;
}
```



2. transition-timing-function

   ### 贝塞尔曲线

   ```css
   cubic-bezier(x,y,x,y); /*第一个x的范围[0,1]*/
   ```

   


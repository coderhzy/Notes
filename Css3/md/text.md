# text

1. Text-shadow

   ```css
   text-shadow: 10px 10px 3px #fff;
   
   /*浮雕效果*/
   text-shadow:1px 1px #000,-1px -1px #fff;
   
   /*镂刻效果*/
   text-shadow:-1px -1px #000,1px 1px #fff;
   
   ```



2. 小bug，当你用了background-clip，在用text-shadow就会出现bug。每当你用了background-clip用文字来反切背景图片的时候，这个时候文字就变成了背景图片的一部分。这个时候需要设置textshadow的透明度。



3. 字体包

   ```css
   @font-face{
     font-family:"diyfont";
     src:url();
   }
   ```

   

4. White-space

   ```css
   div{
    	 white-space:pre; /*保留你文本中的空格*/
   }
   ```



5. word-break

   ```css
   div{
     word-break:keep-all;/*出容器边界但是不换行*/
     word-break:break-all;/*到边界就换行*/
     word-break:break-word;/*尽可能在换行的时候来保留英文单词完整性*/
   }
   ```



## 多列

1. 多列

   ```css
   div{
     column-count:3;  /*三栏*/
     column-gap:30px;	/*栏栏之间的间隙*/
     column-span:all;/*一行文字贯穿全文*/
   }
   ```

   
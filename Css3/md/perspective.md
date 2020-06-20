# perspective

1. Perspective ： 设置景深效果

   ```css
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
           * {
               margin: 0;
               padding: 0;
           }
           
           :root{
               height: 100%;
           }
   
           body{
               perspective: 800px;
               height: 100%;
           }
   
           .content1,
           .content2,
           .content3,
           .content4,
           .content5 {
               width: 200px;
               height: 200px;
               background-image: url(1.png);
               background-size: cover;
               position: absolute;
               top: 200px;
               transform: rotatey(45deg);
           }
   
           .content1 {
               left: 200px;
           }
   
           .content2 {
               left: 400px;
           }
   
           .content3 {
               left: 600px;
           }
   
           .content4 {
               left: 800px
           }
   
           .content5 {
               left: 1000px;
           }
       </style>
   </head>
   
   <body>
   
       <script>
           document.body.onmousemove = function (e) {
               this.style.perspectiveOrigin = "" + e.pageX + "px" + e.pageY + "px";
           }
       </script>
       
       <div class="content1"></div>
       <div class="content2"></div>
       <div class="content3"></div>
       <div class="content4"></div>
       <div class="content5"></div>
   
   </body>
   
   </html>
   
   /*景深可叠加*/
   ```


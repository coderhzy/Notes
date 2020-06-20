# rotate

1. rotate() 

   ```css
   rotateX()
   rotateY()
   rotateZ()
   
   transform-origin: 0 0;/*旋转中心*/
   transform: rotate(10deg);
   
   
   transform:rotate(x,y,z,angle)/*3D旋转看比值*/
   transform: rotate3d(1,1,0,1deg);
   
   
   
    @keyframes change {
               0% {
                   transform: rotateX(-45deg) rotateY(45deg);
               }
   
               100% {
                   transform: rotateX(45deg) rotateY(60deg);
               }
           }
   
           body {
               perspective: 800px;
               transform-style: preserve-3d;
               perspective-origin: 300px 300px;
           }
   
           div {
               position: absolute;
               left: 200px;
               top: 200px;
               width: 200px;
               height: 266px;
               background-image: url(1.png);
               background-size: cover;
               /* transform-origin: 0 0; */
               animation: change 2s cubic-bezier(.5, 0, .5, 1) infinite alternate;
   
           }
   ```

   

   

   
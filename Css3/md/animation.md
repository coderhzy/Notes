# animation

1.anmiation

```css
@keyframes run{
  0%{
    left:10px;
     top:20px;
  }
  25%{
    left:20px;
    top:12px;
  }
  50%{
    left: 0px;
    top:100px;
  }
  75%{
    left:30px;
    top:103px
  }
  100%{
    left:20px;
    top: 70px;
  }
}

div{
  animation:run 4s;
}
```



2.animation-iteration-count: infinite 无限循环

```css
animation:run 4s cublic-bezier(.5,1,1,1) 1s infinite;
```



3. Animation-direction : normal , reverse,alternate-reverse

   ```css
   	/*normal , reverse , alternate , alternate-reverse*/
   animation:run 4s cublic-bezier(.5,1,1,1) 1s 1 reverse;/*从百分之百往百分之0执行*/
   animation:run 4s cublic-bezier(.5,1,1,1) 1s 2 alternate;/*先正序执行一次再倒叙执行一次*/
   
   div:hover{
     animation-play-state:paused; /*鼠标悬停到动画上，会暂停动画*/
   }
   ```

   

4. Animation-fill-mode:

   ```css
   /*forwards , */
   animation:run 4s cublic-bezier(.5,1,1,1) 1s 2 forwards;/*保留动画最后一帧的状态*/
   animation:run 4s cublic-bezier(.5,1,1,1) 1s 2 backwards;/*设置动画开始之前的状态*/
   animation:run 4s cublic-bezier(.5,1,1,1) 1s 2 both;/*both是forwards和backwards的集合*/
   ```

   

   
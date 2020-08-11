# Graph Search Algorithms II(DFS)

Depth-First Search:(DFS)

First,let's recall the pre-order traverse binary tree code.
```js
                10 == root
              /   \
             5     15
           /  \   /  \
          2    7 12   20   <----- all leaf node's level == 3
        /  \
       null null
```

```js
function printTreePreOrder(Node root){
  if(root == null) {    // base case
    return;
  } 
  console.log(root.val);
  printTreePreOrder(root.left); // case1: try left first
  printTreePreOrder(root.right); // case2: try right then
}

// pre-order: 10 5 2 7 15 12 20 
```

**Discussion**:
1. DFS can only be implemented by using recursion way?
  -- No,it can be imlpemented by using either iterative way(explicity maintain a stack),or in a recursive way.
  -- it is easier to use recursive way to implement DFS.

  ![20200730091117](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200730091117.png)

**DFS基本方法：**
1. what does it store on each level? (每层代表什么意义？ 一般来讲解题之前就要知道DFS要recurse多少层)
  a. For each level,it makes the decision on whether to put this element into the final set or not.   n elements --> n layers
2. How many different states should we try to put on this level?（每层有多少个状态/case 需要try?）

  **DFS经典例题一：** Print all subsets of a set S = {'a','b','c'}
                    sub-set1: empty
                    sub-set2: 2
                    sub-set3: b
      a x b x c 
      0   0   0
      1   1   1
  ![20200730094849](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200730094849.png)


```js
function FindSubset(input,index,solution){
  if(index == input.length(){
    if(solution.size() == 0){
      console.log("empty set");
    }else{
      console.log("solution");
    }
    return;
  }

  // case1: add string.at(index) to subset
  solution.push_back(input.at(index)); // add "A"
  FindSubset(input,index+1,solution); // breaking point..
  solution.pop_back(); // pop出当前层，物理意义上实现回到上一层

  // case2: add nothing (= don't add string at (index) to subset);
  FindSubset(input,index+1,sulution);
}
```

**DFS经典例题二：**
（）（）（） find all valid permutation using the parenthesis is provided.

1. six levels,each level represents a position in which we could place a either
2. two status


![20200730100958](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200730100958.png)

solution:
- when could we place a left parenthests '(' ???
  - a. if only there are still 'c' left
- when could we place a left parenthests ')' ???
  - a. if only the '(' added so far > ')' added so far

```js
function DFS(let n,let l,let r,let solu_prefix){
  if(l + r == 2 * n){
    console.log(solu_prefix);
    return;
  }

  // cas1 : add '(' on this level
  if (l < n){
    solu_prefix.push_back( '(' );
    DFS(n , l + 1 , r , solu_prefix);
    solu_prefix.pop_back();
  }

  // case2: add ')' on this level
  if (l > r){
    solu_prefix.push_back( '(' );
    DFS(n , l + 1 , r , solu_prefix);
    solu_prefix.pop_back();
  }
}
```
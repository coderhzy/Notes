function find(nums){
  if(nums == null || nums.length == 0) return null;
  var stack = new Stack();
  let Arr = len => [...new Array(len).keys()];
  let lis = Arr(nums.length);
  let ris = Arr(nums.length);
  // 初始化
  for(let i = 0;i< nums.length; i++) {
    ris[i] = -1;
    lis[i] = -1;
  }

  // 返回左右比这个值大的索引
  for(let i = 0 ;i < nums.length; i++){
    while(!isEmpty(stack) && nums[i] > nums[stack.peek()]){
      ris[stack.pop()] = i;
    }
    if(!isEmpty(stack)){
      lis[i] = stack.peek();
    }
    console.log(isEmpty(stack));
    stack.push(i)
  }   
  // TODO:[ undefined, 0, 1, undefined, 3, 3 ] [ 3, 3, 3, -1, 5, -1 ]
  console.log(lis);
  console.log(ris);

  //  TODO: 因为有undefind 所以不返回
  // 返回父节点索引
  var pis = Arr(nums.length);
  for(let i = 0;i < pis.length; i++){
    if(lis[i] == -1 && ris[i] == -1){
      // i位置是根节点
      pis[i] = -1;
      continue;
    }

    if(lis[i] == -1){
      pis[i] = ris[i];
    } else if (ris[i] == -1){
      pis[i] = lis[i];
    } else if (nums[lis[i]] > nums[ris[i]]){
      pis[i] = lis[i];
    } else {
      pis[i] = ris[i];
    }
    return pis;
  }
  console.log(pis);
}

let nums  = [3 , 2 , 1 , 6 , 0 , 5];
find(nums);

function Stack() {
    this.dataStore=[];
    this.top=0;
    this.push=push;
    this.pop=pop;
    this.peek=peek;
    this.len=length;
    this.clear=clear;
}

function push(element) {
    this.dataStore[this.top++]=element;
}
function pop() {
    return this.dataStore[--this.top];
}
function peek(){
    return this.dataStore[this.top-1];
}
function length(){
    return this.top;
}
function clear() {
    this.top=0;
}

function isEmpty(e){
   return e.top == -1;
}


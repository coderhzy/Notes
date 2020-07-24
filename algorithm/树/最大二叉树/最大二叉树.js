/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  return findRoot(nums,0,nums.length -1 )
};

function findRoot(nums,left,right){
  // 出口
  if(left == right){
    var root = new TreeNode(nums[left]);
    return root;
  }

  // 找到数组中最大时值
  var maxIndex = getMaxIndex(nums,left,right);
  var root = new TreeNode(nums[maxIndex]);
  // 最大值是最左或者最右，以及正常创建
  if(maxIndex == left){
    var rightNode = findRoot(nums,left+1,right);
    root.right =  rightNode;
    return root;
  }else if (maxIndex == right){
    var leftNode = findRoot(nums , left , right - 1);
    root.left = leftNode;
    return root;
  }else{
    var leftNode = findRoot(nums , left , maxIndex - 1);
    var rightNode = findRoot(nums , maxIndex + 1, right);
    root.left = leftNode;
    root.right = rightNode;
    return root
  }
}

// 找数组最大值的索引
function getMaxIndex(nums,left,right){
  let maxIndex = left;
  for(let i = left;i <= right;i++){
    if(nums[i] > nums[maxIndex]){
      maxIndex = i;
    }
  }
  return maxIndex;
}
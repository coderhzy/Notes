//创建一个空链表
function Node(value) {
    this.value = value;
    this.next = null;
};

//给链表加几项
var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
var node6 = new Node(6);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
node6.next = null;

//逆置链表
function nizhi(root) {
    //递归出口
    if(root.next.next == null){ //代表 当前节点的倒数第二个节点
        root.next.next = root; //将最后一个节点的指向自己
        return root.next; //返回最后一个节点（return的是新的链表的根结点,即node6）
    }
    else
    {
        var result = nizhi(root.next);
        root.next.next = root;   //将自己的下个节点指向指向自己
        root.next = null;       //将原来自己的指向滞空
        return result;
    }
}
var newRoot = nizhi(node1);

//遍历链表
function bianLink(root) {
    if(root == null) return;
    console.log(root.value);
    bianLink(root.next); //再次调用bianlink
}
bianLink(newRoot);

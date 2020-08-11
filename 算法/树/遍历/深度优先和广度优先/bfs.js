const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: [],
                },
                {
                    val: 'e',
                    children: [],
                }
            ],
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [],
                },
                {
                    val: 'g',
                    children: [],
                }
            ],
        }
    ],
};

const bfs = (root) => {
    /**
     * 1. 创建一个队列，不断地将根节点入队
     * 2. 将头结点出队访问，并且将children节点推到队列里面
     */
    const q = [root];
    while (q.length > 0) {
        const n = q.shift();
        console.log(n.val);
        n.children.forEach(child => {
            q.push(child);
        });
    }
};

bfs(tree);

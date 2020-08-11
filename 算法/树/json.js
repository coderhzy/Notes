const json = {
  a: { b: { c: 1 } },
  d: [1, 2]
}

const dfs = (n, path) => {
  console.log(n, path);
  // 得到所有节点的key,path是遍历对象我们得到的数
  Object.keys(n).forEach(k => {
    dfs(n[k], path.concat(k));
  });
};

dfs(json, []);

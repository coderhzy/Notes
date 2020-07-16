[toc]
# TodoList

## V-model
![20200706183525](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200706183525.png)


## v-for
```js
 <li v-for="item in list">{{item}}</li>
```

## demo
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue实现TodoList</title>
    <script src="../vue.js"></script>
</head>

<body>
    <div id="app">
        <input type="text" v-model="inputValue">
        <button @click="handleBtnClick">提交</button>
        <ul>
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>

    <script>
        var app = new Vue({
            el: "#app",
            data: {
                list: [],
                inputValue: ''
            },
            methods: {
                handleBtnClick() {
                    this.list.push(this.inputValue);
                    this.inputValue = '';
                }
            },
        });
    </script>
</body>

</html>
```

![20200706183921](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200706183921.png)

# MVVM

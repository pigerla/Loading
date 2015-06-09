Loading
=======

> 这个一个很轻量级的加载显示js插件，叫 **Loading** 。支持默认显示方式和自定义显示方式。

## 如何使用?

下载本源码，将`Loading`引入页面，例外初始化`Loading`即可，如：

    var loading = new Loading();

    或者

    var loading = new Loading(options);

其中 `options`是一个配置对象，可配置字段如下 ：

    var options = {
      className: '' | transitionClassName,   // 过渡的类名
      content: string | domNode,             // 字符串 或者是 Dom对象
      overlay: true ｜ false                  // true为加覆盖层，false则为覆盖层完全透明
    };

### 调用Loading的方法

#### show()

显示加载中时，可以调用`show()`方法，代码如下：

    loading.show();

#### hide()

去掉加载时，可以调用`hide()`方法，代码如下：

    loading.hide();


### 自定义Loading

例如下面例子：

#### html

    <div id="loadingWrapper">
        <div class="loading">这是一个loading</div>
    </div>

#### css

    .loading { ... }

#### js

    var loadingWrapper = document.querySelector('#loadingWrapper');

    或者

    var loadingWrapper = document.getElementById('loadingWrapper');

    var Loading = new Loading({
        content: loadingWrapper,
        ...                 // other options
    });



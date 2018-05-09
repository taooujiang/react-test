React
=====
[React中文文档](https://doc.react-china.org/)
环境
-----
node version 6.x 以上
安装
-----
使用npm安装

```
npm init
npm install --save react react-dom
```
使用yarn安装

```
yarn init
yarn add react react-dom
```
>#####注意：

为防止潜在的不兼容性，所有反应包应使用相同的版本。 （这包括react，react-dom，react-test-renderer等）

元素渲染
-----
元素是构成 React 应用的最小单位。

将元素渲染到 DOM 中
-----
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello,world!</h1>,
  document.getElementById('root')
);
```

更新元素渲染
-----
React 元素都是`immutable 不可变`的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。

根据我们现阶段了解的有关 React 知识，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法：

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

React 只会更新必要的部分
-----
React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

我们看下刚才的那个例子。

即便我们每秒都创建了一个描述整个UI树的新元素，React DOM 也只会更新渲染文本节点中发生变化的内容。

根据我们以往的经验，将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画），将会有利于我们理清开发思路，减少各种bugs。

组件 & Props
-----
组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

函数定义/类定义组件
-----
使用JavaScript函数：

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
使用 ES6 class 来定义一个组件:

```JavaScript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为“props”。

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}.</h1>;
}

ReactDOM.render(
  <Welcome name="Sara" />,
  document.getElementById('root')
);
```
我们来回顾一下在这个例子中发生了什么：

我们对<Welcome name="Sara" />元素调用了ReactDOM.render()方法。

React将{name: 'Sara'}作为props传入并调用Welcome组件。

Welcome组件将`<h1>Hello, Sara</h1>`元素作为结果返回。

React DOM将DOM更新为`<h1>Hello, Sara</h1>`。

>#####警告：

组件名称必须以大写字母开头。
例如，<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。

组合组件
-----
组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。

例如，我们可以创建一个App组件，用来多次渲染Welcome组件：

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
>#####警告：

组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。

提取组件
-----
提取组件一开始看起来像是一项单调乏味的工作，但是在大型应用中，构建可复用的组件完全是值得的。当你的UI中有一部分重复使用了好几次（比如，Button、Panel、Avatar），或者其自身就足够复杂（比如，App、FeedStory、Comment），类似这些都是抽象成一个可复用组件的绝佳选择，这也是一个比较好的做法。

Props的只读性
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
来看这个sum函数：

```JavaScript
function sum(a, b) {
  return a + b;
}
```
类似于上面的这种函数称为“纯函数”，它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果。

与之相对的是非纯函数，它会改变它自身的输入值：

```JavaScript
function withdraw(account, amount) {
  account.total -= amount;
}
```
React是非常灵活的，但它也有一个严格的规则：

**所有的React组件必须像纯函数那样使用它们的props**

State & 生命周期
-----
我们将学习如何使Clock组件真正可重用和封装。它将设置自己的计时器，并每秒钟更新一次。

```JavaScript
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
然而，它错过了一个关键的要求：`Clock` 设置一个定时器并且每秒更新UI应该是 `Clock` 的实现细节。

理想情况下，我们写一次 `Clock` 然后它能更新自身：

```JavaScript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

为了实现这个需求，我们需要为 `Clock` 组件添加`状态`

状态与属性十分相似，但是状态是私有的，完全受控于当前组件。

我们之前提到过，定义为类的组件有一些特性。局部状态就是如此：一个功能只适用于类。

**将函数转换为类**
你可以通过5个步骤将函数组件 `Clock` 转换为类

1. 创建一个名称扩展为 `React.Component` 的ES6 类

2. 创建一个叫做`render()`的空方法

3. 将函数体移动到 `render()` 方法中

4. 在 `render()` 方法中，使用 `this.props` 替换 `props`

5. 删除剩余的空函数声明

```JavaScript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
`Clock` 现在被定义为一个类而不只是一个函数

使用类就允许我们使用其它特性，例如局部状态、生命周期钩子

**为一个类添加局部状态**
我们会通过3个步骤将 `date` 从属性移动到状态中：

1. 在 `render()` 方法中使用 `this.state.date` 替代 `this.props.date`

```JavaScript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
2. 添加一个`类构造函数`来初始化状态 `this.state`

```JavaScript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

注意我们如何传递 `props` 到基础构造函数的：

```JavaScript
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```
类组件应始终使用 `props` 调用基础构造函数。
3. 从 `<Clock />` 元素移除 `date` 属性：

```JavaScript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
稍后将定时器代码添加回组件本身。

结果如下：

```JavaScript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

**将生命周期方法添加到类中**
在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。

每当 `Clock` 组件第一次加载到DOM中的时候，我们都想生成定时器，这在React中被称为`挂载`

同样，每当 `Clock` 生成的这个DOM被移除的时候，我们也会想要清除定时器，这在React中被称为`卸载`。

我们可以在组件类上声明特殊的方法，当组件挂载或卸载时，来运行一些代码：

```JavaScript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
这些方法被称作`生命周期钩子`。

当组件输出到 DOM 后会执行 `componentDidMount()` 钩子，这是一个建立定时器的好地方：

```JavaScript
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```
我们将在 `componentWillUnmount()` 生命周期钩子中卸载计时器：

```JavaScript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```
最后，我们实现了每秒钟执行的 `tick()` 方法。

它将使用 `this.setState()` 来更新组件局部状态：

```JavaScript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

现在时钟每秒钟都会执行。

让我们快速回顾一下发生了什么以及调用方法的顺序：

1. 当 `<Clock />` 被传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state` 。 我们稍后会更新此状态。

2. React 然后调用 `Clock` 组件的 `render()` 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 `Clock` 的渲染输出。

3. 当 `Clock` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。 在其中，`Clock` 组件要求浏览器设置一个定时器，每秒钟调用一次 `tick()`。

4. 浏览器每秒钟调用 `tick()` 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。

5. 一旦`Clock`组件被从DOM中移除，React会调用`componentWillUnmount()`这个钩子函数，定时器也就会被清除。

**正确地使用状态**
关于 `setState()` 这里有三件事情需要知道

**1. 不要直接更新状态**
例如，此代码不会重新渲染组件：

```JavaScript
// Wrong
this.state.comment = 'Hello';
```
应当使用 `setState()`:

```JavaScript
// Correct
this.setState({comment: 'Hello'});
```
>#####注意
构造函数是唯一能够初始化 `this.state` 的地方。

**2. 状态更新可能是异步的**
React 可以将多个`setState()` 调用合并成一个调用来提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```JavaScript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要修复它，请使用第二种形式的 `setState()` 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：

```JavaScript
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
上方代码使用了`箭头函数`，但它也适用于常规函数：

```JavaScript
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```
**3. 状态更新合并**
当你调用 setState() 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含一些独立的变量：

```JavaScript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```
你可以调用 setState() 独立地更新它们：

```JavaScript
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```
这里的合并是浅合并，也就是说`this.setState({comments})`完整保留了`this.state.posts`，但完全替换了`this.state.comments`。

**组件生命周期**
每一个组件都有几个你可以重写以让代码在处理环节的特定时期运行的“生命周期方法”。方法中带有前缀 **will** 的在特定环节之前被调用，而带有前缀 **did** 的方法则会在特定环节之后被调用。

装配

这些方法会在组件实例被创建和插入DOM中时被调用：

+ `constructor()`
+ `static getDerivedStateFromProps()`*
+ `componentWillMount() / UNSAFE_componentWillMount()`
+ `render()`
+ `componentDidMount()`

更新

属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

+ `componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()`
+ `static getDerivedStateFromProps()`*
+ `shouldComponentUpdate()`
+ `componentWillUpdate() / UNSAFE_componentWillUpdate()`
+ `render()`
+ `getSnapshotBeforeUpdate()`*
+ `componentDidUpdate()`

卸载

当一个组件被从DOM中移除时，该方法被调用：

+ `componentWillUnmount()`

错误处理

在渲染过程中发生错误时会被调用：

+ `componentDidCatch()`

![生命周期图](https://images2015.cnblogs.com/blog/588767/201612/588767-20161205190022429-1074951616.jpg)

| first render |
|-|
|getDefaultProps|
|getInitialState|
|static getDerivedStateFromProps|
|componentWillMount / UNSAFE_componentWillMount|
|render|
|componentDidMount|

| seconde render |
|-|
|getInitialState|
|static getDerivedStateFromProps|
|componentWillMount / UNSAFE_componentWillMount|
|render|
|componentDidMount|

| props change |
|-|
|componentWillReceiveProps / UNSAFE_componentWillReceiveProps|
|static getDerivedStateFromProps|
|shouldComponentUpdate|
|componentWillUpdate / UNSAFE_componentWillUpdate|
|render|
|getSnapshotBeforeUpdate|
|componentDidUpdate|

| state change |
|-|
|shouldComponentUpdate|
|componentWillUpdate / UNSAFE_componentWillUpdate|
|render|
|getSnapshotBeforeUpdate|
|componentDidUpdate|

| unmount |
|-|
|componentWillUnmount|

**static getDerivedStateFromProps()**

```JavaScript
static getDerivedStateFromProps(nextProps, prevState)
```
组件实例化后和接受新属性时将会调用`getDerivedStateFromProps`。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。

注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。

调用`this.setState()` 通常不会触发 `getDerivedStateFromProps()`。

**getSnapshotBeforeUpdate()**
`getSnapshotBeforeUpdate()`在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`。

```JavaScript
getSnapshotBeforeUpdate(prevProps, prevState) {
  // Are we adding new items to the list?
  // Capture the current height of the list so we can adjust scroll later.
  if (prevProps.list.length < this.props.list.length) {
    return this.listRef.current.scrollHeight;
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // If we have a snapshot value, we've just added new items.
  // Adjust scroll so these new items don't push the old ones out of view.
  if (snapshot !== null) {
    this.listRef.current.scrollTop +=
      this.listRef.current.scrollHeight - snapshot;
  }
}
```

在上面的例子中，为了支持异步渲染，在`getSnapshotBeforeUpdate` 中读取`scrollHeight`而不是`componentWillUpdate`，这点很重要。由于异步渲染，在“渲染”时期（如`componentWillUpdate`和`render`）和“提交”时期（如`getSnapshotBeforeUpdate`和`componentDidUpdate`）间可能会存在延迟。如果一个用户在这期间做了像改变浏览器尺寸的事，从`componentWillUpdate`中读出的`scrollHeight`值将是滞后的。

react diff dom参考文献：
[React diff机制（比较虚拟DOM的机制）](https://www.jianshu.com/p/1da5c91f5e5d)
[深入理解react中的虚拟DOM、diff算法](http://www.cnblogs.com/zhuzhenwei918/p/7271305.html)
[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

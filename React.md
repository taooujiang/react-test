React
=====
[React中文文档](https://doc.react-china.org/)
环境
-----
node version 6.x 以上
安装
-----
创建React APP

```
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

现有项目中添加React

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

JSX 简介
-----

```javascript
const element = <h1>Hello, world!</h1>;
```
种看起来可能有些奇怪的标签语法既不是字符串也不是 HTML。

它被称为 JSX， 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。

**在 JSX 中使用表达式**

你可以任意地在 JSX 当中使用 JavaScript 表达式

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

//在 JSX 当中的表达式要包含在大括号里
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
与此同时，我们同样推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入 的 bug。

**JSX 本身其实也是一种表达式**

在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象。

这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以

```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

**JSX 属性**

你可以使用引号来定义以字符串为值的属性：

```javascript
const element = <div tabIndex="0"></div>;
```
也可以使用大括号来定义以 JavaScript 表达式为值的属性：

```javascript
const element = <img src={user.avatarUrl}></img>;
```
切记你使用了大括号包裹的 JavaScript 表达式时就不要再到外面套引号了。JSX 会将引号当中的内容识别为字符串而不是表达式。

**JSX 嵌套**

如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 就好像 XML/HTML 一样：

```javascript
const element = <img src={user.avatarUrl} />;
```
JSX 标签同样可以相互嵌套：

```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

>#####警告:
因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。
例如，class 变成了 className，而 tabindex 则对应着 tabIndex。

```javascript
const element = (
  <div>
    <h1 className="title" style={{ fontSize:"14px", lineHeight:1.5 }}>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

**JSX 防注入攻击**

你可以放心地在 JSX 当中使用用户输入：

```javascript
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。

**JSX 代表 Objects**

Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。

下面两种代码的作用是完全相同的：

```javascript
const element = (
  <h1 className="greeting" style={{ fontSize:"14px", lineHeight:1.5 }}>
    Hello, world!
  </h1>
);
```

```javascript
const element = React.createElement(
  'h1',
  {
    className: 'greeting',
    style: {
      fontSize:"14px",
      lineHeight:1.5
    }
  },
  'Hello, world!'
);
```
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

事件处理
-----
React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

React事件绑定属性的命名采用驼峰式写法，而不是小写。
如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

例如，传统的 HTML：

```javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
React 中稍稍有点不同：

```javascript
<button onClick={this.activateLasers.bind(this)}>
  Activate Lasers
</button>
```
你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：

**call()/apply()/bind()**

```javascript
function apply1(num1, num2){
  return sum.apply(this, [num1, num2]);
}
function call1(num1, num2){
  return sum.call(this, num1, num2);
}
```
这两段代码，只是想告诉你call和apply的区别。

call的第二部分参数要一个一个传，apply要把这些参数放到数组中。

然后，不得不说的一点：它们的第二个参数都可以传arguments。


下面来讲bind()函数，bind()是es5中的方法，他也是用来实现上下文绑定，看它的函数名就知道。bind()和call与apply不同。bind是新创建一个函数，然后把它的上下文绑定到bind()括号中的参数上，然后将它返回。

所以，bind后函数不会执行，而只是返回一个改变了上下文的函数副本，而call和apply是直接执行函数。

下面代码可以反映出这点，而且也显示了bind的用法

```javascript
var button = document.getElementById("button"),
    text = document.getElementById("text");
button.onclick = function() {
    alert(this.id); // 弹出text
}.bind(text);
```

```javascript
//1
class LoggingButton extends React.Component {
  constructor(props) {
    //1. 调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this
    //2. super(props)的目的：在constructor中可以使用this.props
    super(props)
  	this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

//2
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

//3
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

使用这个语法有个问题就是每次 `LoggingButton` 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

向事件处理程序传递参数
-----
通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
```javascript
deleteRow(id,e){
  e.preventDefault()
}
```

条件渲染
-----
在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

ReactDOM.render(
  {
    this.state.isLoggedIn && <UserGreeting />,
  }
  document.getElementById('root')
);

ReactDOM.render(
  {
    this.state.isLoggedIn ? <UserGreeting /> : <GuestGreeting />,
  }
  document.getElementById('root')
);
```

列表 & Keys
-----
Javascript中如何转化列表

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
//代码打印出[2, 4, 6, 8, 10]
```
我们使用Javascript中的map()方法遍历numbers数组。对数组中的每个元素返回<li>标签

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
//这段代码生成了一个1到5的数字列表
```

当我们运行这段代码，将会看到一个警告 a key should be provided for list items ，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。

让我们来给每个列表元素分配一个 key 来解决上面的那个警告

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

+ 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key
+ 当元素没有确定的id时，你可以使用他的序列号索引index作为key
+ 如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。

react diff dom参考文献：

[React diff机制（比较虚拟DOM的机制）](https://www.jianshu.com/p/1da5c91f5e5d)

[深入理解react中的虚拟DOM、diff算法](http://www.cnblogs.com/zhuzhenwei918/p/7271305.html)

[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

使用 PropTypes 进行类型检查
-----
>#####注意:
React.PropTypes 自 React v15.5 起已弃用。请使用 prop-types 库代替。

随着应用日渐庞大，你可以通过类型检查捕获大量错误。
对于某些应用来说，你还可以使用 Flow 或 TypeScript 这样的 JavsScript 扩展来对整个应用程序进行类型检查。然而即使你不用它们，React 也有一些内置的类型检查功能。要检查组件的属性，你需要配置特殊的 propTypes 属性：

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
`PropTypes` 包含一整套验证器，可用于确保你接收的数据是有效的。在这个示例中，我们使用了 `PropTypes.string`。当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，`propTypes` 只在开发模式下进行检查。

**PropTypes**

下面是使用不同验证器的例子：

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
  optionalNode: PropTypes.node,

  // 一个 React 元素
  optionalElement: PropTypes.element,

  // 你也可以声明属性为某个类的实例，这里使用 JS 的
  // instanceof 操作符实现。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你也可以限制你的属性值是某个特定值之一
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 限制它为列举类型之一的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个指定元素类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 一个指定类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个指定属性及其类型的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你也可以在任何 PropTypes 属性后面加上 `isRequired`
  // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你也可以指定一个自定义验证器。它应该在验证失败时返回
  // 一个 Error 对象而不是 `console.warn` 或抛出异常。
  // 不过在 `oneOfType` 中它不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf`
  // 验证器，它应该在验证失败时返回一个 Error 对象。 它被用
  // 于验证数组或对象的每个值。验证器前两个参数的第一个是数组
  // 或对象本身，第二个是它们对应的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

**限制单个子代**

使用 PropTypes.element 你可以指定只传递一个子代

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

**属性默认值**

你可以通过配置 defaultProps 为 props定义默认值：

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Context
-----
Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props 。

**何时使用 Context**

Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。例如，在下面的代码中，我们通过一个“theme”属性手动调整一个按钮组件的样式：

```javascript
function ThemedButton(props) {
  return <Button theme={props.theme} />;
}

// 中间组件
function Toolbar(props) {
  // Toolbar 组件必须添加一个额外的 theme 属性
  // 然后传递它给 ThemedButton 组件
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}
```

使用 context, 我可以避免通过中间元素传递 props：

```javascript
// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  console.log(props)
  return (
    <ThemeContext.Consumer>
      {theme => <button {...props} theme={theme.color} value={theme.name}>{theme.name}</button>}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton {...props} />
    </div>
  );
}

ReactDOM.render(
  (
    <ThemeContext.Provider value={{color:"dark1", name:"button"}}>
      <Toolbar style={{backgroundColor:"red"}} />
    </ThemeContext.Provider>
  ),
  document.getElementById('root')
);
```

>#####注意
不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

Context API
-----
**React.createContext**

```javascript
const {Provider, Consumer} = React.createContext(defaultValue);
```
创建一对 { Provider, Consumer }。当 React 渲染 context 组件 Consumer 时，它将从组件树的上层中最接近的匹配的 Provider 读取当前的 context 值。

如果上层的组件树没有一个匹配的 Provider，而此时你需要渲染一个 Consumer 组件，那么你可以用到 defaultValue 。这有助于在不封装它们的情况下对组件进行测试。

**Provider**

```javascript
<Provider value={/* some value */}>
```
React 组件允许 Consumers 订阅 context 的改变。

接收一个 value 属性传递给 Provider 的后代 Consumers。一个 Provider 可以联系到多个 Consumers。Providers 可以被嵌套以覆盖组件树内更深层次的值。

**Consumer**

```javascript
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```
一个可以订阅 context 变化的 React 组件。

接收一个 函数作为子节点. 函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue 。

每当 Provider 的值发生改变时，所有的 Consumers 都将会重新渲染。通过使用相同的算法如Object.is比较新旧值来确定变化。（这在传递对象作为 value 时会引发一些问题Caveats.）

React优点
-----
1. 效率高

React可以创建存放组件的虚拟DOM（文档对象模型Document Object Model），这一特点为开发人员提供了高度灵活性和惊人的性能收益，因为React能够提前计算出DOM中哪些内容需要更改，并对DOM树做出相应地更新。通过这种方式，React避免了代价高昂的DOM操作，从而大幅提升了工作效率。
![React virtual dom](http://ww1.sinaimg.cn/mw690/005NrfBdjw1f9128qif6ij30f206dt8r.jpg)

2. 组件化

一切都是component：代码更加模块化，重用代码更容易，可维护性高。

3. 跨浏览器兼容

虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

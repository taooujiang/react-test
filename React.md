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
Welcome组件将<h1>Hello, Sara</h1>元素作为结果返回。
React DOM将DOM更新为<h1>Hello, Sara</h1>。

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

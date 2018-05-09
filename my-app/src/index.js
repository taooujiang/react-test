import React from 'react';
import ReactDOM from 'react-dom';
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }
//
// setInterval(tick, 1000);

class Welcome extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      age: 0
    }
  }

  tick() {
    this.setState(function(prevState, props){
      return {age: ++prevState.age}
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("getDerivedStateFromProps")
    console.log(nextProps,prevState)
    return {age: 10}
  }

  componentWillMount() {
    console.log("componentWillMount")
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentDidMount() {
    console.log("componentDidMount")
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps")
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    return true
  }

  componentWillUpdate() {
    console.log("componentWillUpdate")
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate")
    console.log(prevProps, prevState)
    return {hello:"hello"}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate")
    if(snapshot != null){
      console.log(snapshot)
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  render(){
    console.log("render")
    console.log(this.state)
    return <h1>Hello, {this.props.name}.</h1>;
  }

}

let age = 18
let timer = setInterval(function(){
  ++age
  const element = <Welcome name="Sara" age={age} />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  if(age>=20) {
    clearInterval(timer)
  }
},1000)

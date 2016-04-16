// import React
import Canvas from "./Canvas/Canvas";

export default React.createClass({
  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
        <Canvas/>
      </div>
    )
  }
})
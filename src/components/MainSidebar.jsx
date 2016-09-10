import "./../style/default/framework"

export default React.createClass({
  render() {
    return (
      <div className="leftframe">
        {this.props.children}
      </div>
    )
  }
})
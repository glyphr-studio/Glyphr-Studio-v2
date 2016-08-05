export default React.createClass({
  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
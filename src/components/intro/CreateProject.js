import {storage} from "../../lib/storage/Storage";

export default React.createClass({
  componentWillMount() {

  },
  save() {
    // validate projectName...
    storage.setHead(this.refs.projectName.value);
    window.location.reload();
  },
  render() {
    return (
      <div>
        {storage.getAllHeads() === null ? "You have not created any projects yet." : `Your projects: ${storage.getAllHeads().join(", ")}`}
        <fieldset>
          <label htmlFor="#projectName">Project name</label>
          <input type="text" id="projectName" ref="projectName"/>
          <button onClick={this.save}>Add</button>
        </fieldset>
      </div>
    );
  }
})
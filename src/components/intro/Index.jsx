import {storage} from "../../lib/storage/Storage";
import * as $ from "../../utils/helpers";
import DevLabel from "../DevLabel";
import OpenProject from "./OpenProject";

export default React.createClass({
  getInitialState() {
    return null;
  },
  componentWillMount() {
  },
  componentDidMount(){
  },
  resetHead() {
    window.localStorage.clear();
    window.location.reload();
  },
  downloadProject() {
    $.download(`${storage.getHead()}`, storage.exportProjectToJson());
  },
  render() {
    return (
      <OpenProject/>
    )
  }
})
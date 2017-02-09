// import React
// import ReactRouter
import {config} from "./../config/config";
// import FrameLeft from "./FrameLeft";
// import EditCanvas from "./EditCanvas";
import Glyph from "./../lib/glyph/Glyph";
import GlyphrStudioProject from "./../lib/glyphrStudioProject/GlyphrStudioProject";
import Locale from "../locale/Locale";

export default React.createClass({
  getInitialState() {
    return null;
  },
  componentWillMount() {
  },
  componentDidMount(){
  },
  render() {
    return (
      <div>
        <h2>We're currently working at</h2> <Link to="/project/editor/leftframe/tray/attributes">project editor</Link>
      </div>
    )
  }
})
import EventUnit from "./../support/eventStream/EventUnit";
import PluginEventStream from "./PluginEventStream";
import EventUnitAccess from "./../support/eventStream/EventUnitAccess";

export default class PluginEventUnit extends EventUnit {

  constructor(eventRootName, accessLevel) {
    super(eventRootName, new EventUnitAccess(eventRootName, accessLevel));

    this._streamName  = PluginEventStream.getStreamName();

    // Make sure the event loop is attached
    if(! this._windowRegister.getStatic(this._streamName)) {
      this._windowRegister.attachStatic({
        [this._streamName]: new PluginEventStream()
      });
    }

    this._stream = this._windowRegister.getStatic(this._streamName);
  }
}
import EventStream from "./../support/eventStream/EventStream";

export default class PluginEventStream extends EventStream {
  constructor() {
    super(PluginEventStream.getStreamName());
  }

  static getStreamName() {
    return "PluginEventStream";
  }
}
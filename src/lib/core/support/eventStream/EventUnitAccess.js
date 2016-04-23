import Access from "./../../security/Access";

export default class EventUnitAccess extends Access {

  constructor(eventRootName, accessLevel) {
    super(eventRootName, {
      read: 1,
      subscribe: 1,
      write: 2,
      emit: 3,
      mute: 4,
      muteForeign: 5,
      teardown: 6
    }, accessLevel);
  }
}
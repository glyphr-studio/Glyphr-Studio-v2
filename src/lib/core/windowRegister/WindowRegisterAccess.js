import Access from "../security/Access";

export default class WindowRegisterAccess extends Access {
  constructor(instanceName, accessLevel) {
    super(instanceName, {
      read: 1,
      write: 2
    }, accessLevel)
  }
}
const { Service } = require("feathers-knex");

exports.Users = class Users extends Service {
  // constructor(options) {}
  create(data, params) {
    return super.create(data, params);
  }
  update(id, data, params) {
    return super.update(id, data, params);
  }
  delete(id, params) {
    return super.delete(id, params);
  }
  get(id) {
    return super.get(id);
  }
  find(params) {
    return super.find(params);
  }
};

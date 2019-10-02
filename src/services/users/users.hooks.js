const { authenticate } = require("@feathersjs/authentication").hooks;

const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

const beforeCreateUser = require("../../hooks/before-create-user");

const beforeUpdateUsers = require("../../hooks/before-update-users");

const beforeDeleteUsers = require("../../hooks/before-delete-users");

const beforeGetUser = require("../../hooks/before-get-user");

const beforeFindUsers = require("../../hooks/before-find-users");

const validationInput = require("../../hooks/validation-input");

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt"), beforeFindUsers()],
    get: [authenticate("jwt"), beforeGetUser()],
    create: [hashPassword("password"), validationInput(), beforeCreateUser()],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      validationInput(),
      beforeUpdateUsers()
    ],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt"), beforeDeleteUsers()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password")
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

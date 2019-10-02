// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { id, data, app, params } = context;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      throw new Error("sorry no data to update it");
    }

    const userData = params.user; //get user data from params
    const { userType } = userData; //get userType
    if (userType === "user") {
      if (+id !== +params.authentication.payload.sub) {
        //check id id from url is equal id from auth
        throw new Error("You are not owner");
      }
      const { userType, isAccept, disappled } = data;
      if (userType || isAccept || disappled) {
        //if user try to change in permissions return error
        throw new Error("you havent permission to edit some felid");
      }
      if (!userData.isAccept) {
        // check if user accept
        throw new Error(
          "Wait when admin accpet you to be able to user our service"
        );
      }
      //check user have not block by admin
      if (userData.disappled) {
        throw new Error("admin block you you can connect with him");
      }
      const valuesOfDataSend = Object.keys(data); //get all keys of data user need to change it
      valuesOfDataSend.forEach(keys => {
        //change an original data by new data user send
        userData[keys] = data[keys];
      });
      context.data = userData;
      return context;
    } else if (userType === "admin") {
      const userDB = await app.service("users").find({
        //find the user admin need to change his data
        query: {
          id: id
        }
      });

      const userData = { ...userDB.data[0] }; //get user data
      const adminData = params.user; //get admin data from params
      const adminId = adminData.id;
      if (userData.id == 1) {
        // check main admin server
        if (adminId != userData) {
          //check if not the main admin
          throw new Error("you cant delete the update of server");
        }
      }
      const valuesOfDataSend = Object.keys(data); //get all data admin need to change it
      valuesOfDataSend.forEach(keys => {
        //change an original data admin require to change it with a data admin send it
        userData[keys] = data[keys];
      });
      // eslint-disable-next-line require-atomic-updates
      context.data = userData;
      return context;
    }
  };
};

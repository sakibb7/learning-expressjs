export const createUserValidationSchema = {
  userName: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5 charecter",
    },
    notEmpty: {
      errorMessage: "UserName must not be empty",
    },
    isString: {
      errorMessage: "User name must be String",
    },
  },
};


//This is the class which we will be using to throw the Errors
//It has a constructor that takes in an error message and uses it as the base for the error

//ApplicationError inherits the properties of the Error class(built in class in the js)
  class ApplicationError extends Error{
    constructor(message,code){           //code->status code
        super(message);
        this.code =code;


    }
}
export default ApplicationError;
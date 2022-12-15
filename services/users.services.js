//fname:{mandatory},lname:{mandatory},email:{mandatory,valid email,unique},
// password:{mandatory}

const { user_Collection } = require("../connector");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidEmail = function (value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};
const isValidRequestBody = function (value) {
  return Object.keys(value).length > 0;
};

//Admin /admins
const createUser = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "request body not found" });
    }
    const { firstname, lastname, email, password } = requestBody;
    if (!isValid(firstname)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "First name is required" });
    }
    if (!isValid(lastname)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "Last name is required" });
    }
    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "E-mail is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: 400,
        error: true,
        message: "Valid E-mail is required",
      });
    }
    const isEmailAlreadyUsed = await user_Collection.findOne({ email });
    if (isEmailAlreadyUsed) {
      return res.status(404).send({
        status: 404,
        error: true,
        message: `${email} is already used`,
      });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "Password is required" });
    }
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    const adminData = await user_Collection.create(data);
    return res.status(201).send({
      status: 201,
      error: false,
      message: "Admin account created successfully",
      data: adminData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, error: true, message: err.message });
  }
};

//Allow an author to login with their email and password.
//On a successful login attempt return a JWT token contatining the authorId

//POST /login
const login = async function (req, res) {
  try {
    const requestBody = req.body;
    //console.log(process.env.super_admin);
    const { email, password } = requestBody;
    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "request body not found" });
    }
    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "E-mail is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: 400,
        error: true,
        message: "Valid E-mail is required",
      });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: 400, error: true, message: "Password is required" });
    }
    const loginAuthor = await user_Collection.findOne({ email, password });
    if (!loginAuthor) {
      return res
        .status(404)
        .send({ status: 404, error: true, message: "User not found" });
    }
    const token = jwt.sign({ authorId: loginAuthor._id }, "secretkey");
    res.header("x-api-key", token);
    return res.status(200).send({
      status: 200,
      error: false,
      data: {
        id: loginAuthor._id,
        email: email,
        admin_type: loginAuthor.admin_type,
        token: token,
      },
      message: "User successfully logged in",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: 500, error: true, message: err.message });
  }
};

const eventApply = async function (req, res) {
  const { user_id, event_id } = req.body;

  try {
    const user_found = await user_Collection.findOne({ _id: user_id });
    if (user_found) {
      let userObj = { ...user_found._doc };
      console.log(userObj);
      userObj.applied.push(event_id);
      user_Collection
        .replaceOne({ _id: user_id }, userObj)
        .then(() => {
          res.status(200).send({
            status: 200,
            error: false,
            message: "Applied sucessfully !!",
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message,
            status: 500,
            error: true,
          });
        });
    } else {
      return res
        .status(404)
        .send({ status: 404, error: true, message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: 500,
      error: true,
    });
  }
};

module.exports = { login, createUser, eventApply };

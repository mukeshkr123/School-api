const AysncHandler = require("express-async-handler");
const Teacher = require("../../model/Academic/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if teacher already exists
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  //send teacher data
  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: teacherCreated,
  });
});

//@desc  Admin login Teacher
//@route POST /api/teachers/login
//@acess  Private

exports.loginTeacher = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find the uset
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify the password
  const isMatched = await isPassMatched(password, teacher?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Login teacher Successfully",
      data: generateToken(teacher?._id),
    });
  }
});

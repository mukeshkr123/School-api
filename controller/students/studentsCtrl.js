const expressAsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword } = require("../../utils/helpers");

//@desc  Admin Register Students
//@route POST /api/students/admin/register
//@acess  Private

exports.adminRegisterStudent = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if student already exists
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("student already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const studentCreated = await Student.create({
    name,
    email,
    password: hashedPassword,
  });
  //send student data
  res.status(201).json({
    status: "success",
    message: "student registered successfully",
    data: studentCreated,
  });
});

const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//@desc  Admin Register Students
//@route POST /api/students/admin/register
//@acess  Private

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
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

//@desc  Admin login students
//@route POST /api/students/login
//@acess  Private

exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find the uset
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify the password
  const isMatched = await isPassMatched(password, student?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Login student Successfully",
      data: generateToken(student?._id),
    });
  }
});

//@desc  Admin get students
//@route POST /api/students/profile
//@acess  Private // students only

exports.getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id).select(
    "-password, -updatedAt"
  );
  if (!student) {
    throw new Error("student not found");
  }
  res.status(200).json({
    status: "status",
    message: "students Fetched successfully",
    data: student,
  });
});

//@desc  Admin get student
//@route POST /api/admins/students
//@acess  Private // admin only

exports.getAllStudentsAdmin = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "status",
    message: "students Fetched successfully",
    data: students,
  });
});

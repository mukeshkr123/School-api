const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const bcrypt = require("bcryptjs");

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

//@desc  Admin get Student
//@route POST /api/student/:studentId/admin
//@acess  Private // admin only

exports.getStudentsByAdmin = AsyncHandler(async (req, res) => {
  const { studentID } = req.params;
  //find the student
  const student = await Student.findById(studentID);
  if (!student) {
    throw new Error("student not found");
  }
  res.status(200).json({
    status: "status",
    message: "students Fetched successfully",
    data: student,
  });
});

//@desc  update studen
//@route POST /api/students/:studentID/update
//@acess  Private // student only

exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  // find the student
  // if email is taken
  const emailExist = await Student.findOne({ email });
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  const passwordHashed = await bcrypt.hash(password, salt);
  if (emailExist) {
    throw new Error("This is taken/exist");
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: passwordHashed,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "student  updated Successfully",
    });
  }
});

//@desc  admin updating studensts assignine classess
//@route POST /api/students/:studentID/update/admin
//@acess  Private admin only

exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, name, email, prefectName } =
    req.body;
  // find the student by id
  const studenFound = await Student.findById(req.params.studentID);
  if (!studenFound) {
    throw new Error("Student not found ");
  }
  //update
  const studenUpdated = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );
  // send the response
  res.status(200).json({
    status: "success",
    data: studenUpdated,
    message: " Student updated Successfully",
  });
});

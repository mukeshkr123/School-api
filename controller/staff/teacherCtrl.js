const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Academic/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");

//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
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

exports.loginTeacher = AsyncHandler(async (req, res) => {
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

//@desc  Admin get Teacher
//@route POST /api/admins/teachers
//@acess  Private // admin only

exports.getAllTechersAdmin = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: "status",
    message: "Teachers Fetched successfully",
    data: teachers,
  });
});

//@desc  Admin get Teacher
//@route POST /api/teachers/:techerId/admin
//@acess  Private // admin only

exports.getTecherByAdmin = AsyncHandler(async (req, res) => {
  const { teacherID } = req.params;
  //find the teacher
  const teacher = await Teacher.findById(teacherID);
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.status(200).json({
    status: "status",
    message: "Teachers Fetched successfully",
    data: teacher,
  });
});

//@desc  Admin get Teacher
//@route POST /api/teachers/profile
//@acess  Private // admin only

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password, -updatedAt"
  );
  console.log(req.userAuth?._id);
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.status(200).json({
    status: "status",
    message: "Teachers Fetched successfully",
    data: teacher,
  });
});

//@desc  Admin get Teacher
//@route POST /api/teachers/:/teacherIDupdate
//@acess  Private // admin only

exports.teacherUpdateProfike = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  // find the teacher
  // if email is taken
  const emailExist = await Teacher.findOne({ email });
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  const passwordHashed = await bcrypt.hash(password, salt);
  if (emailExist) {
    throw new Error("This is taken/exist");
  } else {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
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
      data: teacher,
      message: "Teacher  updated Successfully",
    });
  }
});

//@desc  Admin updating teacher profile
//@route POST /api/teachers/:teacherID/admin
//@acess  Private // admin only

exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  const teacherID = req.params.teacherID;

  try {
    const teacherFound = await Teacher.findById(teacherID);
    if (!teacherFound) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }

    if (teacherFound.isWithdrawn) {
      return res.status(403).json({
        status: "error",
        message: "Action denied, teacher is withdrawn",
      });
    }

    // Update attributes
    if (program) teacherFound.program = program;
    if (classLevel) teacherFound.classLevel = classLevel;
    if (academicYear) teacherFound.academicYear = academicYear;
    if (subject) teacherFound.subject = subject;

    await teacherFound.save();

    return res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while updating the teacher",
    });
  }
});

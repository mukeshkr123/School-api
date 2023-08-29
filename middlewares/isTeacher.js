const Teacher = require("../model/Academic/Teacher");

const isTeacher = async (req, res, next) => {
  // find the user
  const userId = req?.userAuth?._id;
  const TeacherFound = await Teacher.findById(userId);
  console.log(TeacherFound);
  //check if
  if (TeacherFound?.role === "teacher") {
    next();
    Teacher;
  } else {
    next(new Error("Access Denied , Teacher only"));
  }
};

module.exports = isTeacher;

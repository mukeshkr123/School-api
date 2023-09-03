const Student = require("../model/Academic/Student");

const isStudent = async (req, res, next) => {
  // find the user
  const userId = req?.userAuth?._id;
  const StudentFound = await Student.findById(userId);
  //check if
  if (StudentFound?.role === "Student") {
    next();
    Student;
  } else {
    next(new Error("Access Denied , Student only"));
  }
};

module.exports = isStudent;

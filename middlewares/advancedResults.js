// Model and Populate

export const advancedResult = (model, populate) => {
  return async (req, res, next) => {
    let TeachersQuery = model.find();
    // Convert query stings into numbr
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const startIndex = (page - 1) * limit;
    const endexIndex = page * limit;
    // Finding the total count of teachers
    const totalTeachers = await model.countDocuments();

    // Populate
    if(populate){
        TeachersQuery = TeachersQuery.populate(populate)
    }
    // Pagination Result
    const pagination = {};
    // add next
    if (endexIndex < totalTeachers) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    // add Previous
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // Filtering / Searching
    if (req.query.name) {
      TeachersQuery = TeachersQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    const teachers = await TeachersQuery.find().skip(skip).limit(limit);

    res.result = {
      status: "Success",
      message: "Teachers List Fetched Successfully",
      totalTeachers,
      pagination,
      result: teachers.length,
      data: teachers,
    };


    next();

  };
};

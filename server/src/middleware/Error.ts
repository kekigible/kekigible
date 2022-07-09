import ErrorClass from "../errors/Error";

const ErrorMiddleWare = (err, req, res, next) => {
  if (err instanceof ErrorClass) throw new ErrorClass(404, err.message);
  else return res.status(404).json("Something went wrong");
};

const NoRouteMiddleWare = (req, res) => {
  return res.status(404).json("No route Found");
};

export { ErrorMiddleWare, NoRouteMiddleWare };

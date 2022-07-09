const AsyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); // something to look into doesnt work without await and async function
    } catch (error: any) {
      next(error);
    }
  };
};

export default AsyncWrapper;

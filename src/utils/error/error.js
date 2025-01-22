
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return next(err);
        });
    };
};

export const globalError = (err, req, res, next) => {
    const statusCode = err.cause || 500; 
    const response = {
        message: "global error",
        errorMessage: err.message,
    };

    if (process.env.MOOD === "DEV") {
        
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};

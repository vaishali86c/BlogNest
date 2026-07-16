import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Only expose detailed messages for known ApiError instances.
    // Unexpected errors get a generic message to avoid leaking internals.
    const message = err instanceof ApiError
        ? err.message
        : 'Internal Server Error';

    return res.status(statusCode).json({
        statusCode,
        data: err.data || null,
        success: false,
        message,
        errors: err.errors || []
    });
};

export default errorHandler;

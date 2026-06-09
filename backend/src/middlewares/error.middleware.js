const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        statusCode,
        data: err.data || null,
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || []
    })
}

export default errorHandler

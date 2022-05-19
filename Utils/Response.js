module.exports = {
    successResponse: (data, message) => {
        return {
            data: data,
            message: message,
            success: true,
        }
    },
    errorResponse: (message) => {
        return {
            data: [],
            message: message,
            success: false,
        }
    }
}

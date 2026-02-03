/**
 * Alingo Super App - Universal Response Handler
 * مقصد: تمام API جوابات کو ایک جیسا بنانا
 */

// 1. کامیابی کا جواب (Success Response)
export const sendSuccess = (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};

// 2. غلطی کا جواب (Error Response)
export const sendError = (res, message = "Internal Server Error", statusCode = 500, error = null) => {
    // اگر ڈیویلپمنٹ موڈ ہو تو ایرر کی تفصیل بھی بھیج سکتے ہیں
    const response = {
        success: false,
        message: message
    };

    if (error && process.env.NODE_ENV === "development") {
        response.error = error.message || error;
    }

    return res.status(statusCode).json(response);
};

// 3. مخصوص جوابات (Common Helpers)
export const notFound = (res, item = "Resource") => {
    return sendError(res, `${item} not found`, 404);
};

export const unauthorized = (res, message = "Unauthorized access") => {
    return sendError(res, message, 401);
};

export const validationError = (res, message = "Invalid input data") => {
    return sendError(res, message, 400);
};

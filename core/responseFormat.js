
const ResponseFormat = {
    successResponse: (res, result, code, message, paginationInfo, otherInfo) => {
        return res.status(code).json({
            data: result,
            message: message,
            statusCode: code,
            statusType: "success",
            paginationInfo: paginationInfo,
            otherInfo: otherInfo
        });
    },
    errorResponse: (res, code, message, err = "{}") => {
        return res.status(code).json({
            error: err,
            message: message,
            statusCode: code,
            statusType: "error"
        });
    },
    requiredResponse: (res, columnName) => {
        return res.status(400).json({
            error: "{}",
            message: columnName + " is required",
            statusCode: 400,
            statusType: "error"
        });
    },
}

module.exports = ResponseFormat;

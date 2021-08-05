const resResult = (status = false, code = 400, message = '', data = null) => {
    return {
        status: status,
        code: code,
        message: message,
        data: data,
    };
};

module.exports = resResult;

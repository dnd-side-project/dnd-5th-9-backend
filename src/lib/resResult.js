const resResult = (status = false, code = 400, message = '', data = null) => {
    return {
        status,
        code,
        message,
        data,
    };
};

module.exports = resResult;

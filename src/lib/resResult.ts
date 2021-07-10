export default (status = false, code = 400, message = '', data: any = null) => {
    return {
        status,
        code,
        message,
        data,
    };
};

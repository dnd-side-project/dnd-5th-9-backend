interface ResultType {
    status: boolean;
    code: number;
    message: string;
    data: any;
}

export default (
    status = false,
    code = 400,
    message = '',
    data: any = null
): ResultType => {
    return {
        status,
        code,
        message,
        data,
    };
};

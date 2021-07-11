import resResult from '@/lib/resResult';

const test = async ({ userId, password }) => {
    try {
        console.log(userId, password);
        return resResult(true, 200, '통신완료', userId);
    } catch (err) {
        console.log(err);
        return resResult(false, 500, '데이터베이스 오류', err);
    }
};

export { test };
import express from 'express';
import Joi from 'joi';
import * as test from '../service/users.svc';
import resResult from '../../lib/resResult';

const router = express.Router();

router.post('/test', async (req, res) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error)
        return res
            .status(400)
            .send(resResult(false, 400, '필수 값 확인', error.message));

    const isCreate = await test.createUser(value);
    if (isCreate)
        return res.status(200).json(resResult(true, 200, '통신완료', value));
    return res
        .status(500)
        .json(resResult(false, 500, '데이터베이스 오류', null));
});

export default router;

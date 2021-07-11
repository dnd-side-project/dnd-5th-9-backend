import express from 'express';
import Joi from 'joi';
import { test } from '@/api/service/users.svc';
import resResult from '@/lib/resResult';

const router = express.Router();

router.post('/test', async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error)
        return res
            .status(400)
            .send(resResult(false, 400, '필수 값 확인', error.message));

    try {
        const result = await test(value);

        return res.status(result.code).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send(resResult(false, 500, '서버 오류', err));
    }
});

export default router;

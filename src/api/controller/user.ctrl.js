const express = require('express');

const router = express.Router();
const Joi = require('joi');
const users = require('../service/users.svc');
const resResult = require('../../lib/resResult');

router.post('/test', async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error)
        return res
            .status(400)
            .send(resResult(400, false, '필수 값 확인', error.message));

    try {
        const result = await users.test(value);

        return res.status(result.code).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send(resResult(false, 500, '서버 오류', err));
    }
});

module.exports = router;

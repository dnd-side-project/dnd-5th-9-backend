const express = require('express');
const Sequelize = require('sequelize');
const db = require('../../models');
const resResult = require('../../lib/resResult');

/* 
    제작일 : 
    제작자 : 
    기능 : 테스트
*/
exports.test = async ({user_id, password}) => {
    try {
        console.log(user_id, password);
        return resResult(true, 200, '통신완료', user_id);
    } catch (err) {
        console.log(err);
        return resResult(false, 500, '데이터베이스 오류', err);
    }
};

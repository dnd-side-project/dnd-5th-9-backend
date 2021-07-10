const express = require('express');
const Sequelize = require('sequelize');
const db = require('../../models');
const resResult = require('../../lib/resResult');

/* 
    제작일 : 
    제작자 : 
    기능 : 테스트
*/
exports.test = async ({ userId, password }) => {
    try {
        console.log(userId, password);
        return resResult(true, 200, '통신완료', userId);
    } catch (err) {
        console.log(err);
        return resResult(false, 500, '데이터베이스 오류', err);
    }
};

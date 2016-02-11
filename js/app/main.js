define([
    'business-world',
    'business-world-view'
],

function (BusinessWorld, BusinessWorldView) {
    'use strict';
    new BusinessWorld(new BusinessWorldView());
});
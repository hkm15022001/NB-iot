const { Joi } = require('express-validation');

const createDeviceValidation = {
    body: Joi.object({
        userId: Joi.string().required(),
    })
};

module.exports = createDeviceValidation;

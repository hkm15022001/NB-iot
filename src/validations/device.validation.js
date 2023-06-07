const { Joi } = require('express-validation');

const createDeviceValidation = {
    body: Joi.object({
        userId: Joi.string().required(),
        name:Joi.string()
    })
};

module.exports = createDeviceValidation;

'use strict';

/**
 * brochure service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::brochure.brochure');

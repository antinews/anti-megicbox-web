/**
 * @author antinew 2357729423@qq.com
 * @description Exports all configure: setting、network、theme
 * @date 2022-01-08 22:30:02
 */
const setting = require("./settings.config");
const network = require("./network.config");
const theme = require("./theme.config");
module.exports = Object.assign({}, setting, network, theme);

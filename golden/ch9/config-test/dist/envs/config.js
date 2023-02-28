"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const local_1 = require("./local");
const dev_1 = require("./dev");
const prod_1 = require("./prod");
const fs_1 = require("fs");
const yaml = require("js-yaml");
const phase = process.env.NODE_ENV;
let conf = {};
if (phase === 'local') {
    conf = local_1.default;
}
else if (phase === 'dev') {
    conf = dev_1.default;
}
else if (phase === 'prod') {
    conf = prod_1.default;
}
const yamlConfig = yaml.load((0, fs_1.readFileSync)(`${process.cwd()}/envs/config.yaml`, 'utf8'));
exports.default = () => (Object.assign(Object.assign(Object.assign({}, common_1.default), conf), yamlConfig));
//# sourceMappingURL=config.js.map
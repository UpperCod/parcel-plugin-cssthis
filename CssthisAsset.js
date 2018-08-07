const CSSAsset = require("parcel-bundler/src/assets/CSSAsset");
const cssthis = require("cssthis-parse");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = class CssthisAsset extends CSSAsset {
    async generate(data) {
        if (/\.this\.css$/.test(this.basename)) {
            let fns = await cssthis([
                autoprefixer({ browsers: ["last 2 versions"] }),
                cssnano()
            ])(this.contents);
            return {
                js: `module.exports=(props)=>\`${fns}\``
            };
        } else {
            return await super.generate(data);
        }
    }
};

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const alsatian_1 = require("alsatian");
const normaliser_1 = require("./normaliser");
let NormaliserTestFixture = class NormaliserTestFixture {
    url_normalised_for_cache_has_http_and_www_stripped() {
        // ARRANGE
        const httpsInput = "https://benji7425.io/", httpInput = "http://benji7425.io/", wwwInput = "www.benji7425.io/", httpsWWWInput = "https://www.benji7425.io/", httpWWWInput = "http://www.benji7425.io/";
        const expectedOutput = "benji7425.io/";
        // ACT
        const httpsOutput = normaliser_1.default.forCache(httpsInput), httpOutput = normaliser_1.default.forCache(httpInput), wwwOutput = normaliser_1.default.forCache(wwwInput), httpsWWWOnput = normaliser_1.default.forCache(httpsWWWInput), httpWWWOnput = normaliser_1.default.forCache(httpWWWInput);
        // ASSERT
        alsatian_1.Expect(httpsOutput).toBe(expectedOutput);
        alsatian_1.Expect(httpOutput).toBe(expectedOutput);
        alsatian_1.Expect(wwwOutput).toBe(expectedOutput);
        alsatian_1.Expect(httpsWWWOnput).toBe(expectedOutput);
        alsatian_1.Expect(httpWWWOnput).toBe(expectedOutput);
    }
    youtube_com_url_normalised_for_discord_is_converted_to_youtu_be() {
        // ARRANGE
        const input = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        const expectedOutput = "https://youtu.be/dQw4w9WgXcQ";
        // ACT
        const output = normaliser_1.default.forDiscord(input);
        // ASSERT
        alsatian_1.Expect(output).toBe(expectedOutput);
    }
};
__decorate([
    alsatian_1.Test()
], NormaliserTestFixture.prototype, "url_normalised_for_cache_has_http_and_www_stripped", null);
__decorate([
    alsatian_1.Test()
], NormaliserTestFixture.prototype, "youtube_com_url_normalised_for_discord_is_converted_to_youtu_be", null);
NormaliserTestFixture = __decorate([
    alsatian_1.TestFixture("Normaliser")
], NormaliserTestFixture);
exports.NormaliserTestFixture = NormaliserTestFixture;
//# sourceMappingURL=normaliser.spec.js.map
"use strict";
exports.__esModule = true;
var checkDisabledLinters_1 = require("./checkDisabledLinters");
var GITHUB_TOKEN = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : "";
var action = new checkDisabledLinters_1["default"](GITHUB_TOKEN);
action.run();
action.runCheckDisabledLinters();

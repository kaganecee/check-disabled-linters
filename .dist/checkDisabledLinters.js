"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var github = require("@actions/github");
var core = require("@actions/core");
var CheckDisabledLinters = /** @class */ (function () {
    function CheckDisabledLinters(authToken) {
        var _this = this;
        this.run = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.runCheckDisabledLinters();
                return [2 /*return*/];
            });
        }); };
        this.runCheckDisabledLinters = function () {
            try {
                _this.findLintersString();
            }
            catch (e) {
                if (e instanceof Error) {
                    exitWithError("".concat(e.message));
                }
                else {
                    console.log('Unexpected error', e);
                }
                return null;
            }
        };
        this.authToken = authToken;
        this.context = github.context;
    }
    CheckDisabledLinters.prototype.findLintersString = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var base, head, owner, octokit, response, files, check;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        base = (_a = this.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.base.sha;
                        head = (_b = this.context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.head.sha;
                        owner = (_c = this.context.payload.repository) === null || _c === void 0 ? void 0 : _c.owner.login;
                        octokit = (0, github.getOctokit)(this.authToken);
                        return [4 /*yield*/, octokit.rest.repos.compareCommits(__assign(__assign({}, github.context.repo), { base: base, head: head }))];
                    case 1:
                        response = _d.sent();
                        files = response.data.files;
                        check = false;
                        files === null || files === void 0 ? void 0 : files.find(function (file, index) {
                            if (file.filename.includes("eslint-disable-line") || file.filename.includes("eslint-disable")) {
                                check = true;
                            }
                        });
                        if (check) {
                            this.comment();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckDisabledLinters.prototype.comment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var octokit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        octokit = (0, github.getOctokit)(this.authToken);
                        return [4 /*yield*/, octokit.rest.issues.createComment({
                                issue_number: this.context.issue.number,
                                owner: this.context.repo.owner,
                                repo: this.context.repo.repo,
                                body: 'Pleaes specifiy why did you disabled linters.'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CheckDisabledLinters;
}());
function exitWithError(errorMessage) {
    (0, core.error)(errorMessage);
    process.exit(1);
}
exports["default"] = CheckDisabledLinters;

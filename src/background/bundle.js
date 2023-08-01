(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "name": "@notionhq/client",
    "version": "2.2.9",
    "description": "A simple and easy to use client for the Notion API",
    "engines": {
        "node": ">=12"
    },
    "homepage": "https://developers.notion.com/docs/getting-started",
    "bugs": {
        "url": "https://github.com/makenotion/notion-sdk-js/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/makenotion/notion-sdk-js/"
    },
    "keywords": [
        "notion",
        "notionapi",
        "rest",
        "notion-api"
    ],
    "main": "./build/src",
    "types": "./build/src/index.d.ts",
    "scripts": {
        "prepare": "npm run build",
        "prepublishOnly": "npm run checkLoggedIn && npm run lint && npm run test",
        "build": "tsc",
        "prettier": "prettier --write .",
        "lint": "prettier --check . && eslint . --ext .ts && cspell '**/*' ",
        "test": "jest ./test",
        "check-links": "git ls-files | grep md$ | xargs -n 1 markdown-link-check",
        "prebuild": "npm run clean",
        "clean": "rm -rf ./build",
        "checkLoggedIn": "./scripts/verifyLoggedIn.sh"
    },
    "author": "",
    "license": "MIT",
    "files": [
        "build/package.json",
        "build/src/**"
    ],
    "dependencies": {
        "@types/node-fetch": "^2.5.10",
        "node-fetch": "^2.6.1"
    },
    "devDependencies": {
        "@types/jest": "^28.1.4",
        "@typescript-eslint/eslint-plugin": "^5.39.0",
        "@typescript-eslint/parser": "^5.39.0",
        "cspell": "^5.4.1",
        "eslint": "^7.24.0",
        "jest": "^28.1.2",
        "markdown-link-check": "^3.8.7",
        "prettier": "^2.8.8",
        "ts-jest": "^28.0.5",
        "typescript": "^4.8.4"
    }
}

},{}],2:[function(require,module,exports){
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Client_auth, _Client_logLevel, _Client_logger, _Client_prefixUrl, _Client_timeoutMs, _Client_notionVersion, _Client_fetch, _Client_agent, _Client_userAgent;
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./logging");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const api_endpoints_1 = require("./api-endpoints");
const node_fetch_1 = require("node-fetch");
const package_json_1 = require("../package.json");
class Client {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f;
        _Client_auth.set(this, void 0);
        _Client_logLevel.set(this, void 0);
        _Client_logger.set(this, void 0);
        _Client_prefixUrl.set(this, void 0);
        _Client_timeoutMs.set(this, void 0);
        _Client_notionVersion.set(this, void 0);
        _Client_fetch.set(this, void 0);
        _Client_agent.set(this, void 0);
        _Client_userAgent.set(this, void 0);
        /*
         * Notion API endpoints
         */
        this.blocks = {
            /**
             * Retrieve block
             */
            retrieve: (args) => {
                return this.request({
                    path: api_endpoints_1.getBlock.path(args),
                    method: api_endpoints_1.getBlock.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.getBlock.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.getBlock.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Update block
             */
            update: (args) => {
                return this.request({
                    path: api_endpoints_1.updateBlock.path(args),
                    method: api_endpoints_1.updateBlock.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.updateBlock.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.updateBlock.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Delete block
             */
            delete: (args) => {
                return this.request({
                    path: api_endpoints_1.deleteBlock.path(args),
                    method: api_endpoints_1.deleteBlock.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.deleteBlock.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.deleteBlock.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            children: {
                /**
                 * Append block children
                 */
                append: (args) => {
                    return this.request({
                        path: api_endpoints_1.appendBlockChildren.path(args),
                        method: api_endpoints_1.appendBlockChildren.method,
                        query: (0, utils_1.pick)(args, api_endpoints_1.appendBlockChildren.queryParams),
                        body: (0, utils_1.pick)(args, api_endpoints_1.appendBlockChildren.bodyParams),
                        auth: args === null || args === void 0 ? void 0 : args.auth,
                    });
                },
                /**
                 * Retrieve block children
                 */
                list: (args) => {
                    return this.request({
                        path: api_endpoints_1.listBlockChildren.path(args),
                        method: api_endpoints_1.listBlockChildren.method,
                        query: (0, utils_1.pick)(args, api_endpoints_1.listBlockChildren.queryParams),
                        body: (0, utils_1.pick)(args, api_endpoints_1.listBlockChildren.bodyParams),
                        auth: args === null || args === void 0 ? void 0 : args.auth,
                    });
                },
            },
        };
        this.databases = {
            /**
             * List databases
             *
             * @deprecated Please use `search`
             */
            list: (args) => {
                return this.request({
                    path: api_endpoints_1.listDatabases.path(),
                    method: api_endpoints_1.listDatabases.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.listDatabases.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.listDatabases.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Retrieve a database
             */
            retrieve: (args) => {
                return this.request({
                    path: api_endpoints_1.getDatabase.path(args),
                    method: api_endpoints_1.getDatabase.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.getDatabase.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.getDatabase.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Query a database
             */
            query: (args) => {
                return this.request({
                    path: api_endpoints_1.queryDatabase.path(args),
                    method: api_endpoints_1.queryDatabase.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.queryDatabase.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.queryDatabase.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Create a database
             */
            create: (args) => {
                return this.request({
                    path: api_endpoints_1.createDatabase.path(),
                    method: api_endpoints_1.createDatabase.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.createDatabase.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.createDatabase.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Update a database
             */
            update: (args) => {
                return this.request({
                    path: api_endpoints_1.updateDatabase.path(args),
                    method: api_endpoints_1.updateDatabase.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.updateDatabase.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.updateDatabase.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
        };
        this.pages = {
            /**
             * Create a page
             */
            create: (args) => {
                return this.request({
                    path: api_endpoints_1.createPage.path(),
                    method: api_endpoints_1.createPage.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.createPage.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.createPage.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Retrieve a page
             */
            retrieve: (args) => {
                return this.request({
                    path: api_endpoints_1.getPage.path(args),
                    method: api_endpoints_1.getPage.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.getPage.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.getPage.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Update page properties
             */
            update: (args) => {
                return this.request({
                    path: api_endpoints_1.updatePage.path(args),
                    method: api_endpoints_1.updatePage.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.updatePage.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.updatePage.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            properties: {
                /**
                 * Retrieve page property
                 */
                retrieve: (args) => {
                    return this.request({
                        path: api_endpoints_1.getPageProperty.path(args),
                        method: api_endpoints_1.getPageProperty.method,
                        query: (0, utils_1.pick)(args, api_endpoints_1.getPageProperty.queryParams),
                        body: (0, utils_1.pick)(args, api_endpoints_1.getPageProperty.bodyParams),
                        auth: args === null || args === void 0 ? void 0 : args.auth,
                    });
                },
            },
        };
        this.users = {
            /**
             * Retrieve a user
             */
            retrieve: (args) => {
                return this.request({
                    path: api_endpoints_1.getUser.path(args),
                    method: api_endpoints_1.getUser.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.getUser.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.getUser.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * List all users
             */
            list: (args) => {
                return this.request({
                    path: api_endpoints_1.listUsers.path(),
                    method: api_endpoints_1.listUsers.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.listUsers.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.listUsers.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * Get details about bot
             */
            me: (args) => {
                return this.request({
                    path: api_endpoints_1.getSelf.path(),
                    method: api_endpoints_1.getSelf.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.getSelf.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.getSelf.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
        };
        this.comments = {
            /**
             * Create a comment
             */
            create: (args) => {
                return this.request({
                    path: api_endpoints_1.createComment.path(),
                    method: api_endpoints_1.createComment.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.createComment.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.createComment.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
            /**
             * List comments
             */
            list: (args) => {
                return this.request({
                    path: api_endpoints_1.listComments.path(),
                    method: api_endpoints_1.listComments.method,
                    query: (0, utils_1.pick)(args, api_endpoints_1.listComments.queryParams),
                    body: (0, utils_1.pick)(args, api_endpoints_1.listComments.bodyParams),
                    auth: args === null || args === void 0 ? void 0 : args.auth,
                });
            },
        };
        /**
         * Search
         */
        this.search = (args) => {
            return this.request({
                path: api_endpoints_1.search.path(),
                method: api_endpoints_1.search.method,
                query: (0, utils_1.pick)(args, api_endpoints_1.search.queryParams),
                body: (0, utils_1.pick)(args, api_endpoints_1.search.bodyParams),
                auth: args === null || args === void 0 ? void 0 : args.auth,
            });
        };
        __classPrivateFieldSet(this, _Client_auth, options === null || options === void 0 ? void 0 : options.auth, "f");
        __classPrivateFieldSet(this, _Client_logLevel, (_a = options === null || options === void 0 ? void 0 : options.logLevel) !== null && _a !== void 0 ? _a : logging_1.LogLevel.WARN, "f");
        __classPrivateFieldSet(this, _Client_logger, (_b = options === null || options === void 0 ? void 0 : options.logger) !== null && _b !== void 0 ? _b : (0, logging_1.makeConsoleLogger)(package_json_1.name), "f");
        __classPrivateFieldSet(this, _Client_prefixUrl, ((_c = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _c !== void 0 ? _c : "https://api.notion.com") + "/v1/", "f");
        __classPrivateFieldSet(this, _Client_timeoutMs, (_d = options === null || options === void 0 ? void 0 : options.timeoutMs) !== null && _d !== void 0 ? _d : 60000, "f");
        __classPrivateFieldSet(this, _Client_notionVersion, (_e = options === null || options === void 0 ? void 0 : options.notionVersion) !== null && _e !== void 0 ? _e : Client.defaultNotionVersion, "f");
        __classPrivateFieldSet(this, _Client_fetch, (_f = options === null || options === void 0 ? void 0 : options.fetch) !== null && _f !== void 0 ? _f : node_fetch_1.default, "f");
        __classPrivateFieldSet(this, _Client_agent, options === null || options === void 0 ? void 0 : options.agent, "f");
        __classPrivateFieldSet(this, _Client_userAgent, `notionhq-client/${package_json_1.version}`, "f");
    }
    /**
     * Sends a request.
     *
     * @param path
     * @param method
     * @param query
     * @param body
     * @returns
     */
    async request({ path, method, query, body, auth, }) {
        this.log(logging_1.LogLevel.INFO, "request start", { method, path });
        // If the body is empty, don't send the body in the HTTP request
        const bodyAsJsonString = !body || Object.entries(body).length === 0
            ? undefined
            : JSON.stringify(body);
        const url = new URL(`${__classPrivateFieldGet(this, _Client_prefixUrl, "f")}${path}`);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(val => url.searchParams.append(key, decodeURIComponent(val)));
                    }
                    else {
                        url.searchParams.append(key, String(value));
                    }
                }
            }
        }
        const headers = {
            ...this.authAsHeaders(auth),
            "Notion-Version": __classPrivateFieldGet(this, _Client_notionVersion, "f"),
            "user-agent": __classPrivateFieldGet(this, _Client_userAgent, "f"),
        };
        if (bodyAsJsonString !== undefined) {
            headers["content-type"] = "application/json";
        }
        try {
            const response = await errors_1.RequestTimeoutError.rejectAfterTimeout(__classPrivateFieldGet(this, _Client_fetch, "f").call(this, url.toString(), {
                method: method.toUpperCase(),
                headers,
                body: bodyAsJsonString,
                agent: __classPrivateFieldGet(this, _Client_agent, "f"),
            }), __classPrivateFieldGet(this, _Client_timeoutMs, "f"));
            const responseText = await response.text();
            if (!response.ok) {
                throw (0, errors_1.buildRequestError)(response, responseText);
            }
            const responseJson = JSON.parse(responseText);
            this.log(logging_1.LogLevel.INFO, `request success`, { method, path });
            return responseJson;
        }
        catch (error) {
            if (!(0, errors_1.isNotionClientError)(error)) {
                throw error;
            }
            // Log the error if it's one of our known error types
            this.log(logging_1.LogLevel.WARN, `request fail`, {
                code: error.code,
                message: error.message,
            });
            if ((0, errors_1.isHTTPResponseError)(error)) {
                // The response body may contain sensitive information so it is logged separately at the DEBUG level
                this.log(logging_1.LogLevel.DEBUG, `failed response body`, {
                    body: error.body,
                });
            }
            throw error;
        }
    }
    /**
     * Emits a log message to the console.
     *
     * @param level The level for this message
     * @param args Arguments to send to the console
     */
    log(level, message, extraInfo) {
        if ((0, logging_1.logLevelSeverity)(level) >= (0, logging_1.logLevelSeverity)(__classPrivateFieldGet(this, _Client_logLevel, "f"))) {
            __classPrivateFieldGet(this, _Client_logger, "f").call(this, level, message, extraInfo);
        }
    }
    /**
     * Transforms an API key or access token into a headers object suitable for an HTTP request.
     *
     * This method uses the instance's value as the default when the input is undefined. If neither are defined, it returns
     * an empty object
     *
     * @param auth API key or access token
     * @returns headers key-value object
     */
    authAsHeaders(auth) {
        const headers = {};
        const authHeaderValue = auth !== null && auth !== void 0 ? auth : __classPrivateFieldGet(this, _Client_auth, "f");
        if (authHeaderValue !== undefined) {
            headers["authorization"] = `Bearer ${authHeaderValue}`;
        }
        return headers;
    }
}
exports.default = Client;
_Client_auth = new WeakMap(), _Client_logLevel = new WeakMap(), _Client_logger = new WeakMap(), _Client_prefixUrl = new WeakMap(), _Client_timeoutMs = new WeakMap(), _Client_notionVersion = new WeakMap(), _Client_fetch = new WeakMap(), _Client_agent = new WeakMap(), _Client_userAgent = new WeakMap();
Client.defaultNotionVersion = "2022-06-28";

},{"../package.json":1,"./api-endpoints":3,"./errors":4,"./logging":7,"./utils":8,"node-fetch":9}],3:[function(require,module,exports){
"use strict";
// cspell:disable-file
// Note: This is a generated file.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listComments = exports.createComment = exports.search = exports.createDatabase = exports.listDatabases = exports.queryDatabase = exports.updateDatabase = exports.getDatabase = exports.appendBlockChildren = exports.listBlockChildren = exports.deleteBlock = exports.updateBlock = exports.getBlock = exports.getPageProperty = exports.updatePage = exports.getPage = exports.createPage = exports.listUsers = exports.getUser = exports.getSelf = void 0;
exports.getSelf = {
    method: "get",
    pathParams: [],
    queryParams: [],
    bodyParams: [],
    path: () => `users/me`,
};
exports.getUser = {
    method: "get",
    pathParams: ["user_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `users/${p.user_id}`,
};
exports.listUsers = {
    method: "get",
    pathParams: [],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: () => `users`,
};
exports.createPage = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],
    path: () => `pages`,
};
exports.getPage = {
    method: "get",
    pathParams: ["page_id"],
    queryParams: ["filter_properties"],
    bodyParams: [],
    path: (p) => `pages/${p.page_id}`,
};
exports.updatePage = {
    method: "patch",
    pathParams: ["page_id"],
    queryParams: [],
    bodyParams: ["properties", "icon", "cover", "archived"],
    path: (p) => `pages/${p.page_id}`,
};
exports.getPageProperty = {
    method: "get",
    pathParams: ["page_id", "property_id"],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: (p) => `pages/${p.page_id}/properties/${p.property_id}`,
};
exports.getBlock = {
    method: "get",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}`,
};
exports.updateBlock = {
    method: "patch",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [
        "embed",
        "type",
        "archived",
        "bookmark",
        "image",
        "video",
        "pdf",
        "file",
        "audio",
        "code",
        "equation",
        "divider",
        "breadcrumb",
        "table_of_contents",
        "link_to_page",
        "table_row",
        "heading_1",
        "heading_2",
        "heading_3",
        "paragraph",
        "bulleted_list_item",
        "numbered_list_item",
        "quote",
        "to_do",
        "toggle",
        "template",
        "callout",
        "synced_block",
        "table",
    ],
    path: (p) => `blocks/${p.block_id}`,
};
exports.deleteBlock = {
    method: "delete",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}`,
};
exports.listBlockChildren = {
    method: "get",
    pathParams: ["block_id"],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}/children`,
};
exports.appendBlockChildren = {
    method: "patch",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: ["children", "after"],
    path: (p) => `blocks/${p.block_id}/children`,
};
exports.getDatabase = {
    method: "get",
    pathParams: ["database_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `databases/${p.database_id}`,
};
exports.updateDatabase = {
    method: "patch",
    pathParams: ["database_id"],
    queryParams: [],
    bodyParams: [
        "title",
        "description",
        "icon",
        "cover",
        "properties",
        "is_inline",
        "archived",
    ],
    path: (p) => `databases/${p.database_id}`,
};
exports.queryDatabase = {
    method: "post",
    pathParams: ["database_id"],
    queryParams: ["filter_properties"],
    bodyParams: ["sorts", "filter", "start_cursor", "page_size", "archived"],
    path: (p) => `databases/${p.database_id}/query`,
};
exports.listDatabases = {
    method: "get",
    pathParams: [],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: () => `databases`,
};
exports.createDatabase = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: [
        "parent",
        "properties",
        "icon",
        "cover",
        "title",
        "description",
        "is_inline",
    ],
    path: () => `databases`,
};
exports.search = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],
    path: () => `search`,
};
exports.createComment = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["parent", "rich_text", "discussion_id"],
    path: () => `comments`,
};
exports.listComments = {
    method: "get",
    pathParams: [],
    queryParams: ["block_id", "start_cursor", "page_size"],
    bodyParams: [],
    path: () => `comments`,
};

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequestError = exports.APIResponseError = exports.UnknownHTTPResponseError = exports.isHTTPResponseError = exports.RequestTimeoutError = exports.isNotionClientError = exports.ClientErrorCode = exports.APIErrorCode = void 0;
const utils_1 = require("./utils");
/**
 * Error codes returned in responses from the API.
 */
var APIErrorCode;
(function (APIErrorCode) {
    APIErrorCode["Unauthorized"] = "unauthorized";
    APIErrorCode["RestrictedResource"] = "restricted_resource";
    APIErrorCode["ObjectNotFound"] = "object_not_found";
    APIErrorCode["RateLimited"] = "rate_limited";
    APIErrorCode["InvalidJSON"] = "invalid_json";
    APIErrorCode["InvalidRequestURL"] = "invalid_request_url";
    APIErrorCode["InvalidRequest"] = "invalid_request";
    APIErrorCode["ValidationError"] = "validation_error";
    APIErrorCode["ConflictError"] = "conflict_error";
    APIErrorCode["InternalServerError"] = "internal_server_error";
    APIErrorCode["ServiceUnavailable"] = "service_unavailable";
})(APIErrorCode = exports.APIErrorCode || (exports.APIErrorCode = {}));
/**
 * Error codes generated for client errors.
 */
var ClientErrorCode;
(function (ClientErrorCode) {
    ClientErrorCode["RequestTimeout"] = "notionhq_client_request_timeout";
    ClientErrorCode["ResponseError"] = "notionhq_client_response_error";
})(ClientErrorCode = exports.ClientErrorCode || (exports.ClientErrorCode = {}));
/**
 * Base error type.
 */
class NotionClientErrorBase extends Error {
}
/**
 * @param error any value, usually a caught error.
 * @returns `true` if error is a `NotionClientError`.
 */
function isNotionClientError(error) {
    return (0, utils_1.isObject)(error) && error instanceof NotionClientErrorBase;
}
exports.isNotionClientError = isNotionClientError;
/**
 * Narrows down the types of a NotionClientError.
 * @param error any value, usually a caught error.
 * @param codes an object mapping from possible error codes to `true`
 * @returns `true` if error is a `NotionClientError` with a code in `codes`.
 */
function isNotionClientErrorWithCode(error, codes) {
    return isNotionClientError(error) && error.code in codes;
}
/**
 * Error thrown by the client if a request times out.
 */
class RequestTimeoutError extends NotionClientErrorBase {
    constructor(message = "Request to Notion API has timed out") {
        super(message);
        this.code = ClientErrorCode.RequestTimeout;
        this.name = "RequestTimeoutError";
    }
    static isRequestTimeoutError(error) {
        return isNotionClientErrorWithCode(error, {
            [ClientErrorCode.RequestTimeout]: true,
        });
    }
    static rejectAfterTimeout(promise, timeoutMS) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new RequestTimeoutError());
            }, timeoutMS);
            promise
                .then(resolve)
                .catch(reject)
                .then(() => clearTimeout(timeoutId));
        });
    }
}
exports.RequestTimeoutError = RequestTimeoutError;
class HTTPResponseError extends NotionClientErrorBase {
    constructor(args) {
        super(args.message);
        this.name = "HTTPResponseError";
        const { code, status, headers, rawBodyText } = args;
        this.code = code;
        this.status = status;
        this.headers = headers;
        this.body = rawBodyText;
    }
}
const httpResponseErrorCodes = {
    [ClientErrorCode.ResponseError]: true,
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};
function isHTTPResponseError(error) {
    if (!isNotionClientErrorWithCode(error, httpResponseErrorCodes)) {
        return false;
    }
    return true;
}
exports.isHTTPResponseError = isHTTPResponseError;
/**
 * Error thrown if an API call responds with an unknown error code, or does not respond with
 * a property-formatted error.
 */
class UnknownHTTPResponseError extends HTTPResponseError {
    constructor(args) {
        var _a;
        super({
            ...args,
            code: ClientErrorCode.ResponseError,
            message: (_a = args.message) !== null && _a !== void 0 ? _a : `Request to Notion API failed with status: ${args.status}`,
        });
        this.name = "UnknownHTTPResponseError";
    }
    static isUnknownHTTPResponseError(error) {
        return isNotionClientErrorWithCode(error, {
            [ClientErrorCode.ResponseError]: true,
        });
    }
}
exports.UnknownHTTPResponseError = UnknownHTTPResponseError;
const apiErrorCodes = {
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};
/**
 * A response from the API indicating a problem.
 * Use the `code` property to handle various kinds of errors. All its possible values are in `APIErrorCode`.
 */
class APIResponseError extends HTTPResponseError {
    constructor() {
        super(...arguments);
        this.name = "APIResponseError";
    }
    static isAPIResponseError(error) {
        return isNotionClientErrorWithCode(error, apiErrorCodes);
    }
}
exports.APIResponseError = APIResponseError;
function buildRequestError(response, bodyText) {
    const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText);
    if (apiErrorResponseBody !== undefined) {
        return new APIResponseError({
            code: apiErrorResponseBody.code,
            message: apiErrorResponseBody.message,
            headers: response.headers,
            status: response.status,
            rawBodyText: bodyText,
        });
    }
    return new UnknownHTTPResponseError({
        message: undefined,
        headers: response.headers,
        status: response.status,
        rawBodyText: bodyText,
    });
}
exports.buildRequestError = buildRequestError;
function parseAPIErrorResponseBody(body) {
    if (typeof body !== "string") {
        return;
    }
    let parsed;
    try {
        parsed = JSON.parse(body);
    }
    catch (parseError) {
        return;
    }
    if (!(0, utils_1.isObject)(parsed) ||
        typeof parsed["message"] !== "string" ||
        !isAPIErrorCode(parsed["code"])) {
        return;
    }
    return {
        ...parsed,
        code: parsed["code"],
        message: parsed["message"],
    };
}
function isAPIErrorCode(code) {
    return typeof code === "string" && code in apiErrorCodes;
}

},{"./utils":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFullComment = exports.isFullUser = exports.isFullPageOrDatabase = exports.isFullDatabase = exports.isFullPage = exports.isFullBlock = exports.collectPaginatedAPI = exports.iteratePaginatedAPI = void 0;
/**
 * Returns an async iterator over the results of any paginated Notion API.
 *
 * Example (given a notion Client called `notion`):
 *
 * ```
 * for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
 *   block_id: parentBlockId,
 * })) {
 *   // Do something with block.
 * }
 * ```
 *
 * @param listFn A bound function on the Notion client that represents a conforming paginated
 *   API. Example: `notion.blocks.children.list`.
 * @param firstPageArgs Arguments that should be passed to the API on the first and subsequent
 *   calls to the API. Any necessary `next_cursor` will be automatically populated by
 *   this function. Example: `{ block_id: "<my block id>" }`
 */
async function* iteratePaginatedAPI(listFn, firstPageArgs) {
    let nextCursor = firstPageArgs.start_cursor;
    do {
        const response = await listFn({
            ...firstPageArgs,
            start_cursor: nextCursor,
        });
        yield* response.results;
        nextCursor = response.next_cursor;
    } while (nextCursor);
}
exports.iteratePaginatedAPI = iteratePaginatedAPI;
/**
 * Collect all of the results of paginating an API into an in-memory array.
 *
 * Example (given a notion Client called `notion`):
 *
 * ```
 * const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
 *   block_id: parentBlockId,
 * })
 * // Do something with blocks.
 * ```
 *
 * @param listFn A bound function on the Notion client that represents a conforming paginated
 *   API. Example: `notion.blocks.children.list`.
 * @param firstPageArgs Arguments that should be passed to the API on the first and subsequent
 *   calls to the API. Any necessary `next_cursor` will be automatically populated by
 *   this function. Example: `{ block_id: "<my block id>" }`
 */
async function collectPaginatedAPI(listFn, firstPageArgs) {
    const results = [];
    for await (const item of iteratePaginatedAPI(listFn, firstPageArgs)) {
        results.push(item);
    }
    return results;
}
exports.collectPaginatedAPI = collectPaginatedAPI;
/**
 * @returns `true` if `response` is a full `BlockObjectResponse`.
 */
function isFullBlock(response) {
    return "type" in response;
}
exports.isFullBlock = isFullBlock;
/**
 * @returns `true` if `response` is a full `PageObjectResponse`.
 */
function isFullPage(response) {
    return "url" in response;
}
exports.isFullPage = isFullPage;
/**
 * @returns `true` if `response` is a full `DatabaseObjectResponse`.
 */
function isFullDatabase(response) {
    return "title" in response;
}
exports.isFullDatabase = isFullDatabase;
/**
 * @returns `true` if `response` is a full `DatabaseObjectResponse` or a full
 * `PageObjectResponse`.
 */
function isFullPageOrDatabase(response) {
    if (response.object === "database") {
        return isFullDatabase(response);
    }
    else {
        return isFullPage(response);
    }
}
exports.isFullPageOrDatabase = isFullPageOrDatabase;
/**
 * @returns `true` if `response` is a full `UserObjectResponse`.
 */
function isFullUser(response) {
    return "type" in response;
}
exports.isFullUser = isFullUser;
/**
 * @returns `true` if `response` is a full `CommentObjectResponse`.
 */
function isFullComment(response) {
    return "created_by" in response;
}
exports.isFullComment = isFullComment;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFullComment = exports.isFullUser = exports.isFullPage = exports.isFullDatabase = exports.isFullBlock = exports.iteratePaginatedAPI = exports.collectPaginatedAPI = exports.isNotionClientError = exports.RequestTimeoutError = exports.UnknownHTTPResponseError = exports.APIResponseError = exports.ClientErrorCode = exports.APIErrorCode = exports.LogLevel = exports.Client = void 0;
var Client_1 = require("./Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.default; } });
var logging_1 = require("./logging");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logging_1.LogLevel; } });
var errors_1 = require("./errors");
Object.defineProperty(exports, "APIErrorCode", { enumerable: true, get: function () { return errors_1.APIErrorCode; } });
Object.defineProperty(exports, "ClientErrorCode", { enumerable: true, get: function () { return errors_1.ClientErrorCode; } });
Object.defineProperty(exports, "APIResponseError", { enumerable: true, get: function () { return errors_1.APIResponseError; } });
Object.defineProperty(exports, "UnknownHTTPResponseError", { enumerable: true, get: function () { return errors_1.UnknownHTTPResponseError; } });
Object.defineProperty(exports, "RequestTimeoutError", { enumerable: true, get: function () { return errors_1.RequestTimeoutError; } });
// Error helpers
Object.defineProperty(exports, "isNotionClientError", { enumerable: true, get: function () { return errors_1.isNotionClientError; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "collectPaginatedAPI", { enumerable: true, get: function () { return helpers_1.collectPaginatedAPI; } });
Object.defineProperty(exports, "iteratePaginatedAPI", { enumerable: true, get: function () { return helpers_1.iteratePaginatedAPI; } });
Object.defineProperty(exports, "isFullBlock", { enumerable: true, get: function () { return helpers_1.isFullBlock; } });
Object.defineProperty(exports, "isFullDatabase", { enumerable: true, get: function () { return helpers_1.isFullDatabase; } });
Object.defineProperty(exports, "isFullPage", { enumerable: true, get: function () { return helpers_1.isFullPage; } });
Object.defineProperty(exports, "isFullUser", { enumerable: true, get: function () { return helpers_1.isFullUser; } });
Object.defineProperty(exports, "isFullComment", { enumerable: true, get: function () { return helpers_1.isFullComment; } });

},{"./Client":2,"./errors":4,"./helpers":5,"./logging":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevelSeverity = exports.makeConsoleLogger = exports.LogLevel = void 0;
const utils_1 = require("./utils");
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
function makeConsoleLogger(name) {
    return (level, message, extraInfo) => {
        console[level](`${name} ${level}:`, message, extraInfo);
    };
}
exports.makeConsoleLogger = makeConsoleLogger;
/**
 * Transforms a log level into a comparable (numerical) value ordered by severity.
 */
function logLevelSeverity(level) {
    switch (level) {
        case LogLevel.DEBUG:
            return 20;
        case LogLevel.INFO:
            return 40;
        case LogLevel.WARN:
            return 60;
        case LogLevel.ERROR:
            return 80;
        default:
            return (0, utils_1.assertNever)(level);
    }
}
exports.logLevelSeverity = logLevelSeverity;

},{"./utils":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.pick = exports.assertNever = void 0;
/**
 * Utility for enforcing exhaustiveness checks in the type system.
 *
 * @see https://basarat.gitbook.io/typescript/type-system/discriminated-unions#throw-in-exhaustive-checks
 *
 * @param value The variable with no remaining values
 */
function assertNever(value) {
    throw new Error(`Unexpected value should never occur: ${value}`);
}
exports.assertNever = assertNever;
function pick(base, keys) {
    const entries = keys.map(key => [key, base === null || base === void 0 ? void 0 : base[key]]);
    return Object.fromEntries(entries);
}
exports.pick = pick;
function isObject(o) {
    return typeof o === "object" && o !== null;
}
exports.isObject = isObject;

},{}],9:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

module.exports = exports = globalObject.fetch;

// Needed for TypeScript and Webpack.
if (globalObject.fetch) {
	exports.default = globalObject.fetch.bind(globalObject);
}

exports.Headers = globalObject.Headers;
exports.Request = globalObject.Request;
exports.Response = globalObject.Response;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){



chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action == "sendToNotion"){
        const messageDt = message.data;
        addToNotionDatabase(messageDt)
        .then((response) => {
            sendResponse({ success: true, data: response });
        })
        .catch((error) => {
            sendResponse({ success: false, error: error.message });
        });
    return true;
  }
});

function retrieveInfo() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["KEY", "DATABASE_ID"], function(data) {
        if (chrome.runtime.lastError) {
          console.log("Error reading data from local storage:", chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
          return;
        }
        
        const KEY = "secret_"+data.KEY;
        const ID = data.DATABASE_ID;
        resolve({ KEY: KEY, ID: ID });
      });
    });
  }
  
async function addToNotionDatabase(data){
    try{
        let NOTION_API_KEY, NOTION_DATABASE_ID;
        try{
            const { KEY, ID } = await retrieveInfo();
            NOTION_API_KEY = KEY;
            NOTION_DATABASE_ID = ID;
        }catch(error){
            console.error("Error retrieving info from local storage:", error.message);
        }
        
        const { Client } = require('@notionhq/client');
        const notion = new Client({ auth: NOTION_API_KEY });
        if(data.pos){
            const response = await notion.pages.create({
                parent: { 
                    "type" : "database_id",
                    "database_id": NOTION_DATABASE_ID 
                },
                properties: {
                "Word": {
                        "title": [
                            {
                                "type": "text",
                                "text":{
                                    "content": data.word
                                },
                            },
                        ],
                    },
                    "Pos": {
                        "select" :{
                            "name": data.pos
                        }
                    },
                    "Added Date": {
                        "date":{
                            "start" : data.date,
                            "end" : null
                        }
                    },
                    "Definition": {
                        "rich_text": [
                            {
                            "type": "text",
                            "text": {
                                "content": data.definition,
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": data.definition,
                            "href": null
                            }
                        ]
                    }
                },
            });
            return response;
        }
        else{
            const response = await notion.pages.create({
                parent: { 
                    "type" : "database_id",
                    "database_id": NOTION_DATABASE_ID 
                },
                properties: {
                "Word": {
                        "title": [
                            {
                                "type": "text",
                                "text":{
                                    "content": data.word
                                },
                            },
                        ],
                    },
                    "Added Date": {
                        "date":{
                            "start" : data.date,
                            "end" : null
                        }
                    },
                    "Definition": {
                        "rich_text": [
                            {
                            "type": "text",
                            "text": {
                                "content": data.definition,
                                "link": null
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": data.definition,
                            "href": null
                            }
                        ]
                    }
                },
            });
            return response;
        }  
    }catch(error){
        throw new Error(`Failed to add to Notion database: ${error.message}`);
    }
}
},{"@notionhq/client":6}]},{},[10]);

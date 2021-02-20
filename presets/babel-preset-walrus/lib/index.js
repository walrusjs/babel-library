"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const merge_config_1 = tslib_1.__importDefault(require("@birman/utils/lib/merge-config"));
const lodash_1 = require("lodash");
const defaultEnvConfig = {
    exclude: [
        'transform-typeof-symbol',
        'transform-unicode-regex',
        'transform-sticky-regex',
        'transform-new-target',
        'transform-modules-umd',
        'transform-modules-systemjs',
        'transform-modules-amd',
        'transform-literals',
    ],
};
function toObject(obj) {
    return (typeof obj === 'object' && obj !== null) ? obj : {};
}
exports.default = helper_plugin_utils_1.declare((api, opts = {}) => {
    api.assertVersion(7);
    const defaulrAsyncToPromisesOptions = {
        inlineHelpers: true,
        externalHelpers: false,
        minify: true,
    };
    return {
        presets: [
            opts.env && [
                require.resolve('@babel/preset-env'),
                {
                    ...merge_config_1.default(defaultEnvConfig, toObject(opts.env)),
                    debug: opts.debug,
                }
            ],
            opts.react && [
                require.resolve('@babel/preset-react'),
                toObject(opts.react)
            ],
            opts.typescript && [
                require.resolve('@babel/preset-typescript'),
                {
                    allowNamespaces: true,
                    ...toObject(opts.typescript)
                }
            ],
        ].filter(Boolean),
        plugins: [
            opts.defines && [
                require.resolve('babel-plugin-transform-replace-expressions'),
                {
                    replace: lodash_1.mapValues(opts.defines, function (item) {
                        return item + '';
                    }),
                }
            ],
            opts.asyncToPromises && [
                require.resolve('babel-plugin-transform-async-to-promises'),
                {
                    ...merge_config_1.default(defaulrAsyncToPromisesOptions, toObject(opts.asyncToPromises)),
                }
            ],
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['.'],
                    alias: {
                        ...opts.alias
                    }
                }
            ],
            [
                require.resolve('@babel/plugin-proposal-optional-chaining'),
                { loose: false },
            ],
            [
                require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
                { loose: false },
            ],
            require.resolve('@babel/plugin-syntax-top-level-await'),
            [
                require.resolve('@babel/plugin-transform-destructuring'),
                { loose: false },
            ],
            opts.typescript && [
                require.resolve('babel-plugin-transform-typescript-metadata'),
            ],
            [
                require.resolve('@babel/plugin-proposal-decorators'),
                { legacy: true }
            ],
            [
                require.resolve('@babel/plugin-proposal-class-properties'),
                { loose: true },
            ],
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            [
                require.resolve('@babel/plugin-proposal-pipeline-operator'),
                {
                    proposal: 'minimal',
                },
            ],
            require.resolve('@babel/plugin-proposal-do-expressions'),
            require.resolve('@babel/plugin-proposal-function-bind'),
            require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
            opts.dynamicImportNode && [
                require.resolve('babel-plugin-dynamic-import-node')
            ],
            ...(opts.import
                ? opts.import.map((item) => {
                    return [
                        require.resolve('babel-plugin-import'),
                        item,
                        item.libraryName,
                    ];
                })
                : []),
        ].filter(Boolean),
    };
});
tslib_1.__exportStar(require("./types"), exports);

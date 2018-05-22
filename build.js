const path = require('path');
const workspaceLoader1 = require("@angular/cli/models/workspace-loader");
const core1 = require("@angular-devkit/core");
const node1 = require('@angular-devkit/core/node');
const architect1 = require("@angular-devkit/architect");
const builderModule = require('@angular-devkit/build-angular/src/browser');
const builderConstructor = builderModule['default'];
const readTsConfig = require('@angular-devkit/build-angular/src/angular-cli-files/utilities/read-tsconfig');
const readWebpackConfig = require('@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs');
const rxjs = require('rxjs');
const ops = require('rxjs/operators');
const webpack = require('webpack');

const logger = node1.createConsoleLogger();
const host = new node1.NodeJsSyncHost();
const workspaceLoader = new workspaceLoader1.WorkspaceLoader(host);
var workspace, architect;
workspaceLoader
    .loadWorkspace(__dirname)
    .pipe(
        ops.tap(o => workspace = o),
        ops.concatMap(ws => new architect1.Architect(ws).loadArchitect()),
        ops.tap(o => architect = o)
    )
    .subscribe(() => {});

var builderConfig = architect.getBuilderConfiguration({
    project: 'app',
    target: 'build'
});

architect
    .getBuilderDescription(builderConfig)
    .pipe(
        ops.concatMap(description => architect.validateBuilderOptions(builderConfig, description)),
        ops.tap(config => builderConfig = config)
    )
    .subscribe(() => {});

const root = workspace.root;
const projectRoot = path.resolve(root, builderConfig.root);
const builder = new builderConstructor({
    logger: logger,
    host: host
});
const options = builderConfig.options;
const webpackConfig = builder.buildWebpackConfig(root, projectRoot, host, options);

delete webpackConfig.entry.main;
webpackConfig.entry['table-search'] = ['src/table-search/app.module.ts'];

// host.exists(webpackConfig.output.path)
//     .pipe(ops.concatMap(exists => exists ? host.delete(webpackConfig.output.path) : rxjs.of(null)))
//     .subscribe(() => {});

const webpackCompiler = webpack(webpackConfig);
webpackCompiler.run((err, stats) => {



    if (err) {
        console.error(err);
    } else {
        console.info(stats.toString({
            colors: true,
            hash: true,
            timings: true,
            chunks: true,
            chunkModules: false,
            children: false,
            modules: false,
            reasons: false,
            warnings: true,
            errors: true,
            assets: true,
            version: false,
            errorDetails: false,
            moduleTrace: false,
            children: true,
            assets: true,
            version: true,
            reasons: true,
            chunkModules: false,
            errorDetails: true,
            moduleTrace: true,
        }));
    }
})

// const WebpackDevServer = require('webpack-dev-server');
// const server = new WebpackDevServer(webpackCompiler, {});
// server.listen(8080, error => {
//     console.log(error);
// });
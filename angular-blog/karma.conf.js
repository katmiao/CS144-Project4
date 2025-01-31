// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-blog'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_sandbox'],
    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'] // with sandbox it fails under Docker
      }
    },
    singleRun: false,
    restartOnFileChange: true,
    proxies: {
      "/api": { 
          "target": "http://localhost:3000",
          "changeOrigin": true 
      },
      "/api/*": { 
          "target": "http://localhost:3000",
          "changeOrigin": true 
      },
      "/login": { 
          "target": "http://localhost:3000",
          "changeOrigin": true
      }
    },
    
  });
};

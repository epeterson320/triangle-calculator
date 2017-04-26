const path = require('path');

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'test/output',

  selenium: {
    start_process: true,
    server_path: path.resolve(__dirname, 'selenium-server-standalone.jar'),
    log_path: path.resolve(__dirname, '../output'),
    port: 4444,
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
};

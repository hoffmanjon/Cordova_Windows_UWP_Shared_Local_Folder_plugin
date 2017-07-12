var exec = require('cordova/exec')

exports.supported = function (arg0, success, error) {
  exec(success, error, 'FileSavePlugin', 'supported', [arg0])
}

exports.saveFileWithPicker = function (arg0, success, error) {
  exec(success, error, 'FileSavePlugin', 'saveFileWithPicker', [arg0])
}

exports.saveFileLocal = function (args, success, error) {
  if (null == args || !args.hasOwnProperty('filename') || !args.hasOwnProperty('data')) {
    error('---Missing required fields: ')
  } else {
    var options = [args.filename, args.data]
    exec(success, error, 'FileSavePlugin', 'saveFileLocal', options)
  }

  exports.saveFileShared = function (args, success, error) {
    if (null == args || !args.hasOwnProperty('filename') || !args.hasOwnProperty('data')) {
      error('---Missing required fields: ')
    } else {
      var options = [args.filename, args.data]
      exec(success, error, 'FileSavePlugin', 'saveFileShared', options)
    }
  }
}

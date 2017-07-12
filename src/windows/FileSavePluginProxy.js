/* eslint-disable indent, eqeqeq*/
var cordova = require('cordova')

cordova.commandProxy.add('FileSavePlugin', {
    supported: function (successCallback, errorCallback, args) {
        supported(successCallback, errorCallback, args)
    },
    saveFileWithPicker: function (successCallback, errorCallback, args) {
        saveFileWithPicker(successCallback, errorCallback, args)
    },
    saveFileLocal: function (successCallback, errorCallback, args) {
        saveFileLocal(successCallback, errorCallback, args)
    },
    saveFileShared: function (successCallback, errorCallback, args) {
        saveFileShared(successCallback, errorCallback, args)
    }
})


var supported = function (successCallback, errorCallback, args) {
  var retstr = 'empty'
  if (args.length > 0) {
      retstr = args[0]
  }

  successCallback(retstr + ': ' + true)
}

var saveFileWithPicker = function (successCallback, errorCallback, args) {
  if (null == args || args.length < 1) {
    errorCallback('No certificate name provided')
  } else {
    var data = args[0]
    var savePicker = new Windows.Storage.Pickers.FileSavePicker()
    savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary
    savePicker.fileTypeChoices.insert('Plain Text', ['.txt'])
    savePicker.suggestedFileName = 'Transaction'
    savePicker.pickSaveFileAsync().then(function (file) {
        if (file) {
            Windows.Storage.CachedFileManager.deferUpdates(file)
            // write to file
            Windows.Storage.FileIO.writeTextAsync(file, data).done(function () {
                Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                    if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                      successCallback(file.name)
                    } else {
                      errorCallback('Error: Unable to save file')
                    }
                }, function (err) {
                  errorCallback(err)
                })
            }, function (err) {
              errorCallback(err)
            })
        } else {
          successCallback('Canceled')
        }
    }, function (err) {
      errorCallback('Error with picker: ' + err)
    })
  }
}

var saveFileLocal = function (successCallback, errorCallback, args) {
  if (null == args || args.length < 2) {
    errorCallback('Missing required fields')
  } else {
    var folder = Windows.Storage.ApplicationData.current.localFolder
    args.push(folder)
    saveFile(successCallback, errorCallback, args)
  }
}

var saveFileShared = function (successCallback, errorCallback, args) {
  if (null == args || args.length < 2) {
    errorCallback('Missing required fields')
  } else {
    var folder = Windows.Storage.ApplicationData.current.sharedLocalFolder
    args.push(folder)
    saveFile(successCallback, errorCallback, args)
  }
}

var saveFile = function (successCallback, errorCallback, args) {
  if (null == args || args.length < 3) {
    errorCallback('Missing required fields')
  } else {
    var fileName = args[0]
    var data = args[1]
    var folder = args[2]
    folder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.replaceExisting).done(function (file) {
      Windows.Storage.CachedFileManager.deferUpdates(file)
      Windows.Storage.FileIO.writeTextAsync(file, data).done(function () {
        Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
            if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
              successCallback(file.name)
            } else {
              errorCallback('Error: Unable to save file')
            }
        }, function (err) {
          errorCallback(err)
        })
      }, function (err) {
        errorCallback(err)
      })
    }, function (err) {
      errorCallback(err)
    })
  }
}



/**
 * To the best of my knowledge this should work but needs a lot of testing
 * No testing done at this point
 * This is mainly to have the skeleton needed to add iOS support in future if needed
 */
@objc(ModusEchoSwift) class FileSavePlugin : CDVPlugin {
  func supported(command: CDVInvokedUrlCommand) {

    var pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: "false")

    self.commandDelegate!.sendPluginResult(pluginResult, callbackId: command.callbackId)
  }
}
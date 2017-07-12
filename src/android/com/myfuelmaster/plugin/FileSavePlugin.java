public class FileSavePlugin extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext
  ) throws JSONException {
    if ("supported".equals(action)) {
      supported(args.getString(0), callbackContext);
      return true;
    }
    
    return false;
  }

  private void supported(String msg, CallbackContext callbackContext) { 
      callbackContext.success("false");
  }
}
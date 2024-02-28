import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    Function("setContacts") { (contacts: String) -> Void in
      UserDefaults.standard.set(contacts, forKey:"contacts")
    }

    Function("getContacts") { () -> String in
      UserDefaults.standard.string(forKey: "contacts") ?? "[]"
    }
  }
}

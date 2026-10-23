import ExpoModulesCore

public class HeroUIModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HeroUI")

    View(HeroUIView.self) {
    }
  }
}

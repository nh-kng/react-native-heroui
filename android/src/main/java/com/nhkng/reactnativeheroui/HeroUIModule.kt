package com.nhkng.reactnativeheroui

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class HeroUIModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("HeroUI")

    View(HeroUIView::class) {
    }
  }
}

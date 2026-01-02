package darkmode

import (
	htmx "github.com/katallaxie/htmx"
)

// DarkMode is the dark mode component.
func DarkMode(children ...htmx.Node) htmx.Node {
	return htmx.CustomElement("htmx-dark-mode", children...)
}

// DarkTheme sets the dark theme for the dark mode component.
func DarkTheme(theme string) htmx.Node {
	return htmx.Attribute("dark-theme", theme)
}

// LightTheme sets the light theme for the dark mode component.
func LightTheme(theme string) htmx.Node {
	return htmx.Attribute("light-theme", theme)
}

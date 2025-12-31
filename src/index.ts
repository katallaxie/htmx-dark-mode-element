export {}

declare global {
  interface Window {
    HTMXDarkModeElement: typeof HTMXDarkModeElement
  }
  interface HTMLElementTagNameMap {
    'htmx-dark-mode': HTMXDarkModeElement
  }
}

export class HTMXDarkModeElement extends HTMLElement {
  private static storageKey = 'htmx-dark-mode'
  private initialValue: boolean = false

  constructor() {
    super()

    const value =
      localStorage.getItem(HTMXDarkModeElement.storageKey) ?? window.matchMedia('(prefers-color-scheme: dark)').matches
    this.initialValue = typeof value === 'string' ? value === 'true' : value
  }

  connectedCallback() {
    this.setDarkMode(this.initialValue)
  }

  setDarkMode(enabled: boolean) {
    localStorage.setItem(HTMXDarkModeElement.storageKey, String(enabled))

    if (enabled) {
      document.documentElement.setAttribute('data-dark-mode', 'true')
    } else {
      document.documentElement.removeAttribute('data-dark-mode')
    }
  }
}

customElements.define('htmx-dark-mode', HTMXDarkModeElement)

export const defineHTMXDarkModeElement = () => {
  customElements.define('htmx-dark-mode', HTMXDarkModeElement)
}

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

  get darkTheme(): string {
    return this.getAttribute('dark-theme') ?? 'dark'
  }

  get lightTheme(): string {
    return this.getAttribute('light-theme') ?? 'light'
  }

  constructor() {
    super()

    const value =
      localStorage.getItem(HTMXDarkModeElement.storageKey) ?? window.matchMedia('(prefers-color-scheme: dark)').matches
    this.initialValue = typeof value === 'string' ? value === this.darkTheme : value
  }

  connectedCallback() {
    const checkbox: HTMLInputElement | null = this.querySelector('input[type=checkbox]')

    if (!checkbox) {
      throw new Error('No input[type=checkbox] found')
    }

    checkbox.checked = this.initialValue
    checkbox.addEventListener('change', event => this.handleChange(event))
    this.setDarkMode(this.initialValue)
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.setDarkMode(target.checked)
  }

  setDarkMode(enabled: boolean) {
    const value = enabled ? this.darkTheme : this.lightTheme
    localStorage.setItem(HTMXDarkModeElement.storageKey, value)
    document.documentElement.setAttribute('data-theme', value)
  }
}

customElements.define('htmx-dark-mode', HTMXDarkModeElement)

export const defineHTMXDarkModeElement = () => {
  customElements.define('htmx-dark-mode', HTMXDarkModeElement)
}

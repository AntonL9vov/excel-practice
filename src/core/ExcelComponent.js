import {DomListner} from '@core/DOMListner'

export class ExcelComponent extends DomListner {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  unplug() {
    this.removeDOMListeners()
  }
}

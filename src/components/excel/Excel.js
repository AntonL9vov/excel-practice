import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Componet => {
      const $el = $.create('div', Componet.className)
      const component = new Componet($el)
      $el.html(component.toHLTM())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(components => components.init())
  }

  remove() {
    this.components.forEach(components => components.unplug())
  }
}

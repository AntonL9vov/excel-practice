import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'click']
      });
    }
    toHLTM() {
      return `
      <div class="formula-info"> fx</div>
            <div class="formula-input" contenteditable spellcheck="false"></div>
      `
    }

    onInput(event) {
      console.log(this.$root)
      console.log(event, event.target.textContent.trim())
    }

    onClick() {
      console.log('click')
    }
}

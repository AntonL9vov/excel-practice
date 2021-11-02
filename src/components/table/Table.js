import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {matrix, nextSelector, shouldResize, shouldSelect} from '@/components/table/table.functions';
import {$} from '@core/dom';


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:1"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  toHTML() {
    return createTable(100)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const {column, row} = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, column, row))
      this.selectCell($next)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (shouldSelect(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($cell)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

// onKeydown(key) {
//   const id = this.selection.current.id(true)
//   if (key.key === 'Tab' || key.key === 'ArrowRight') {
//     const $el = this.$root.find(`[data-id="${id.row}:${id.column+1}"]`)
//     this.selection.select($el)
//   } else if (key.key === 'Enter' || key.key === 'ArrowDown') {
//     const $el = this.$root.find(`[data-id="${id.row+1}:${id.column}"]`)
//     this.selection.select($el)
//   } else if (key.key === 'ArrowLeft') {
//     if (id.column === 1) return
//     const $el = this.$root.find(`[data-id="${id.row}:${id.column-1}"]`)
//     this.selection.select($el)
//   } else if (key.key === 'ArrowUp') {
//     if (id.row === 1) return
//     const $el = this.$root.find(`[data-id="${id.row-1}:${id.column}"]`)
//     this.selection.select($el)
//   }
// }
// onMousedown(event) {
//   if (shouldResize(event)) {
//     resizeHandler(this.$root, event)
//   } else if (shouldSelect(event)) {
//     const $cell = $(event.target)
//     this.selection.select($cell)
//     if (event.shiftKey) {
//       const $first = $(event.target)
//       let $second
//       this.selection.select($first)
//       document.onmousemove = e => {
//         $second = $(e.target)
//       }
//       document.onmouseup = () => {
//         if ($second) {
//           this.selection.selectGroup($first, $second)
//         } else {
//           this.selection.select($first)
//         }
//         document.onmousemove = null
//         document.onmouseup = null
//       }
//     } else {
//       const $cells = []
//       document.onmousemove = e => {
//         const $current = $(e.target)
//         $cells.push($current)
//         this.selection.selectAll($cells)
//       }
//       document.onmouseup = () => {
//         document.onmousemove = null
//         document.onmouseup = null
//       }
//     }
//   }
// }

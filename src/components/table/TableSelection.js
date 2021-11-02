
export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
    this.current.focus()
  }

  clear() {
    this.group.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }

  selectGroup($group =[]) {
    this.clear()
    this.group = $group
    $group.forEach($el => $el.addClass(TableSelection.className))
  }
}

// import {$} from '@core/dom';
//
// export class TableSelection {
//   static className = 'selected'
//
//   constructor() {
//     this.group = []
//   }
//
//   select($el) {
//     this.clear()
//     this.group.push($el)
//     $el.addClass(TableSelection.className)
//   }
//
//   clear() {
//     this.group.forEach($el => {
//       $el.removeClass(TableSelection.className)
//     })
//     this.group = []
//   }
//
//   selectAll($elements) {
//     this.clear()
//     this.group = this.group.concat($elements)
//     $elements.forEach(el => el.addClass(TableSelection.className))
//   }
//
//   selectGroup($first, $second) {
//     this.clear()
//     let sr = Number($second.data.id.split(':')[0])
//     let sc = Number($second.data.id.split(':')[1])
//     let fr = Number($first.data.id.split(':')[0])
//     let fc = Number($first.data.id.split(':')[1])
//     if (fr === sr && fc === sc) {
//       return
//     }
//     if (fr > sr) [fr, sr] = [sr, fr]
//     if (fc > sc) [fc, sc] = [sc, fc]
//     for (let i = fr; i < sr + 1; i++) {
//       for (let j = fc; j < sc + 1; j++) {
//         const $cell = $(document.querySelector(`[data-id="${i}:${j}"]`))
//         $cell.addClass(TableSelection.className)
//         this.group.push($cell)
//       }
//     }
//   }
// }


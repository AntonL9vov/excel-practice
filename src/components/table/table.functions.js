import {range} from '@core/utils';

export function shouldResize(el) {
  return el.target.dataset.resize
}

export function shouldSelect(el) {
  return el.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const columns = range(current.column, target.column)
  const rows = range(current.row, target.row)
  const ids = columns.reduce((acc, columns) => {
    rows.forEach(row => acc.push(`${row}:${columns}`))
    return acc
  }, [])
  return ids
}

export function nextSelector(key, column, row) {
  const MIN_VALUE = 1
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      column++
      break
    case 'ArrowUp':
      row = row - 1 <MIN_VALUE ? MIN_VALUE : row-1
      break
    case 'ArrowLeft':
      column = column - 1 <MIN_VALUE ? MIN_VALUE : column-1
      break
  }

  return `[data-id="${row}:${column}"]`
}

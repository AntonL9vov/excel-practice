const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, number) {
  return `<div class="cell" data-column="${number+1}" contentEditable></div>`
}

function createColumn(content, number) {
  return `
  <div class="column" data-type="resizable" data-column="${number+1}">
    ${content} 
    <div class="column-resize" data-resize="column"></div>
  </div>
  `
}

function createRow(content, number) {
  return `
        <div class="row" data-type="resizable">
                <div class="row-info">
                ${number ? number : ''}
               ${number
      ? '<div class="row-resize" data-resize="row" ></div>'
      : ''}
               </div>
                
                <div class="row-data">${content}</div>
        </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 25) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []
  const columns = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')
  rows.push(createRow(columns))

  for (let i = 0; i<rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}

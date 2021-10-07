import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const $column = $root.findAll(`[data-column="${$parent.data.column}"]`)
  const sideProp = $target.data.resize === 'column' ? 'bottom' : 'right'
  $target.css({
    opacity: 1,
    zIndex: 1000,
    [sideProp]: '-5000 px'
  })
  let value
  if (event.target.dataset.resize === 'column') {
    document.onmousemove = e => {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $target.css({
        right: -delta + 'px',
        [sideProp]: '-5000 px'
      })
    }
    document.onmouseup = () => {
      $target.css({
        opacity: 0
      })
      $parent.css({width: (value) + 'px'})
      $target.css({right: 0})
      $column.forEach(el => el.style.width = $parent.getCss('width'))
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  if (event.target.dataset.resize === 'row') {
    document.onmousemove = e => {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $target.css({
        bottom: -delta + 'px',
      })
    }
    document.onmouseup = () => {
      $target.css({
        opacity: 0
      })
      $parent.css({height: (value) + 'px'})
      $target.css({bottom: 0})
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}

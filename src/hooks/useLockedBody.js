import { useEffect } from 'react'

const saveAndRestoreScrollFx = node => () => {
  let scrollLeft = node && node.scrollLeft
  let scrollTop = node && node.scrollTop
  return node ? () => node.scrollTo(scrollLeft, scrollTop) : undefined
}

const addStyleRules = rules => () => {
  const sheetNode = document.createElement('style')
  document.head.appendChild(sheetNode)
  for (const rule of rules) {
    sheetNode.sheet.insertRule(rule, 0)
  }
  return () => document.head.removeChild(sheetNode)
}

const lockedBodySheetContent = `html, body { position: fixed; overflow: hidden !important; }`

const useLockedBody = node => {
  useEffect(saveAndRestoreScrollFx(node), [])
  useEffect(addStyleRules([lockedBodySheetContent]), [])
}

export default useLockedBody

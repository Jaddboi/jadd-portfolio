// Icons behave like a real desktop: on a touch screen one tap opens; with a
// mouse a click selects and a double-click (or Enter) opens.
export function iconClicks({ touch, select, open }) {
  return {
    onClick: touch ? open : select,
    onDoubleClick: open,
    onKeyDown: (e) => e.key === 'Enter' && open(),
  }
}

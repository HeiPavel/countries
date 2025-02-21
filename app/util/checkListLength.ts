export function checkListLength(list: string[]) {
  return list.length > 1 ? list : list.join('')
}
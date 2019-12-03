export function getAllChildrenIds(ids, data) {
  if (data.children !== undefined) {
    for (let i = 0; i < data.children.length; i++) {
      ids.push(data.children[i].id)
      const child = data.children[i]
      getAllChildrenIds(ids, child)
    }
  } else {
    return
  }
}

export function findTreeNodePath(paht, data) {
  let findTreeNode
  if (data.children !== undefined) {
    for (let i = 0; i < data.children.length; i++) {
      const child = data.children[i]
      findTreeNode = findTreeNodePath(path, child)
      if (findTreeNode !== undefined) {
        break
      } else if (child.path === path) {
        findTreeNode = child
        break
      }
    }
  }
  return findTreeNode
}

export function treeConvertList(root) {
  const list = []
  if (root) {
    const Root = JSON.parse(JSON.stringify(root))
    const queue = []
    queue.push(Root)
    while(queue.length) {
      const node = queue.shift()
      if (node.children && node.children.length) {
        queue.push(...node.children)
      }
      delete node.children
      if (node.parentId !== null && node.parentId !== undefined) {
        list.push(node)
      }
    }
  }
  return list
}

export function listConvertTree(list) {
  let root = null
  if (list && list.length) {
    root = { id: 0, parentId: null, children: [] }
    const group = {}
    for (let index = 0; index < list.length; index++) {
      if (list[index].parentId !== null && list[index].parentId !== undefined) {
        if (!group[list[index].parentId]) {
          group[list[index].parentId] = []
        }
        group[list[index].parentId].push(list[index])
      }
    }
    const queue = []
    queue.push(root)
    while (queue.length) {
      const node = queue.shift()
      node.children = group[node.id] && group[node.id].length ? group[node.id] : null
      if (node.children) {
        queue.push(...node.children)
      }
    }
  }
  return root
}
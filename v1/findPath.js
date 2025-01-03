const findPath = (edges) => {
  const graph = {}
  for (const [from, to] of edges) {
    if (!graph[from]) graph[from] = []
    if (!graph[to]) graph[to] = []
    graph[from].push(to)
    graph[to].push(from)
  }

  let oddNodes = []
  for (const node in graph) {
    if (graph[node].length % 2 === 1) {
      oddNodes.push(node)
    }
  }

  if (oddNodes.length !== 0 && oddNodes.length !== 2) return null

  const startNode = oddNodes.length === 2 ? oddNodes[0] : Object.keys(graph)[0]

  const path = []
  const visitedEdges = new Set()

  const dfs = (node) => {
    while (graph[node].length > 0) {
      const nextNode = graph[node].pop()
      const key1 = `${node}${nextNode}`
      const key2 = `${nextNode}${node}`
      if (!visitedEdges.has(key1) && !visitedEdges.has(key2)) {
        visitedEdges.add(key1)
        visitedEdges.add(key2)
        dfs(nextNode)
      }
    }
    path.push(node)
  }

  dfs(startNode)

  if (visitedEdges.size / 2 !== edges.length) {
    return null
  }

  return path.reverse()
}

// INPUT
// [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]

// OUTPUT
// ['A', 'B', 'C', 'D', 'B']

const graph = [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]
const path = findPath(graph)

if (path) {
  console.log(path) // [ 'A', 'B', 'D', 'C', 'B' ]
} else {
  console.log('경로를 찾을 수 없습니다.')
}
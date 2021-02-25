type INodeVertex = {
  [vertex: string]: number
}

class Graph {
  private _startNode = ''
  private _vertexes = {}
  private _nodes: any = {}
  private _dist: any = {}
  private _prev: any = {}

  set startNode(startNode: string) {
    this._startNode = startNode
  }

  addEdge(fromVertex: string, nodes: INodeVertex): void {
    for (const toVertex in nodes) {
      if (!this._nodes[fromVertex]) {
        this._nodes[fromVertex] = {}
      }

      this._nodes[fromVertex][toVertex] = nodes[toVertex]

      this._vertexes = { ...this._vertexes, ...{ [fromVertex]: true, [toVertex]: true } }
    }
  }

  private dijkstra(): void {
    for (const vertex in this._vertexes) {
      this._dist[vertex] = Infinity
      this._prev[vertex] = undefined
    }

    this._dist[this._startNode] = 0

    const Q = Object.keys(this._nodes)
    while (Q.length > 0) {
      let u = ''

      for (const min of Q) {
        if (u === '' || (this._dist[min] && this._dist[min] < this._dist[u])) {
          u = min
        }
      }

      if (this._dist[u] === Infinity) {
        break
      }

      Q.splice(Q.indexOf(String(u)), 1)

      for (const v in this._nodes[u]) {
        const alt = this._dist[u] + this._nodes[u][v]
        if (alt < this._dist[v]) {
          this._dist[v] = alt
          this._prev[v] = u
        }
      }
    }
  }

  printPath(dest: string) {
    if (this._prev[dest] != undefined) {
      this.printPath(this._prev[dest])
    }
    console.log(`> ${dest}`)
  }

  getShortestPath(startNode: string): void {
    this.startNode = startNode

    this.dijkstra()

    console.log(`Source: ${startNode}`)
    for (const dest of this.getVertexes()) {
      console.log(`\nTarget: ${dest}`)
      this.printPath(dest)
      if (this._dist[dest] != Infinity) {
        console.log(`Distance: ${this._dist[dest]}`)
      } else {
        console.log('No path')
      }
    }
  }

  getVertexes() {
    return Object.keys(this._vertexes)
  }
}

const g = new Graph()

g.addEdge('A', { B: 5, C: 3 })
g.addEdge('B', { C: 4, D: 3, E: 4 })
g.addEdge('C', { B: 2, D: 5, E: 6 })
g.addEdge('E', { D: 2 })

g.getShortestPath('A')

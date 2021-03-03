class Dijkstra {
  private _startNode = ''
  private _nodes: any = {}
  private _dist: any = {}
  private _prev: any = {}

  set startNode(startNode: string) {
    this._startNode = startNode
  }

  addEdge(fromVertex: string, nodes: { [vertex: string]: number }): void {
    for (const toVertex in nodes) {
      if (!this._nodes[fromVertex]) {
        this._nodes[fromVertex] = {}
      }

      this._nodes[fromVertex][toVertex] = nodes[toVertex]

      if (!this._nodes[toVertex]) {
        this._nodes[toVertex] = {}
      }
    }
  }

  private calculate(): void {
    for (const vertex in this._nodes) {
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

      // if (this._dist[u] === Infinity) {
      //   break
      // }

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

    process.stdout.write(`→ ${dest} `)
  }

  getShortestPath(startNode: string): void {
    this.startNode = startNode

    this.calculate()

    console.log(`Source: ${startNode}`)
    console.table(this._nodes)
    for (const dest in this._nodes) {
      console.log(`\nTarget: ${dest}`)
      this.printPath(dest)
      if (this._dist[dest] != Infinity) {
        console.log(`\nDistance: ${this._dist[dest]}`)
      } else {
        console.log('\nNo path')
      }
    }
  }
}

const graphDijkstra = new Dijkstra()

graphDijkstra.addEdge('A', { B: 5, C: 3 })
graphDijkstra.addEdge('B', { C: 4, D: 3, E: 4 })
graphDijkstra.addEdge('C', { B: 2, D: 5, E: 6 })
graphDijkstra.addEdge('E', { D: 2 })

graphDijkstra.getShortestPath('B')

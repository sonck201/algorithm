class BellmanFord {
  private _startNode = ''
  private _vertexes = {}
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

      this._vertexes = { ...this._vertexes, ...{ [fromVertex]: true, [toVertex]: true } }
    }
  }

  private calculate(): void {
    console.log('BellmanFord')
  }

  printPath(dest: string) {
    console.log(`printPath: ${dest}`)
  }

  getShortestPath(startNode: string): void {
    this.startNode = startNode

    this.calculate()

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

const graphBellmanFord = new BellmanFord()

graphBellmanFord.addEdge('A', { B: 3, E: 4 })
graphBellmanFord.addEdge('B', { C: 2, D: 2, E: 9 })
graphBellmanFord.addEdge('C', { B: -2 })
graphBellmanFord.addEdge('D', { C: 3 })
graphBellmanFord.addEdge('E', { C: -5 })

graphBellmanFord.getShortestPath('A')

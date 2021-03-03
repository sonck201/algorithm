class BellmanFord {
  private _startNode = ''
  private _nodes: any = {}
  private _distance: any = {}
  private _predecessor: any = {}

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
    // console.log('Step 1: initialize graph')
    for (const vertex of Object.keys(this._nodes)) {
      this._distance[vertex] = Infinity
      this._predecessor[vertex] = null
    }

    this._distance[this._startNode] = 0

    // console.log('Step 2: relax edges repeatedly')
    for (let i = 0; i < Object.keys(this._nodes).length; i++) {
      for (const u in this._nodes) {
        for (const v in this._nodes[u]) {
          const w = this._nodes[u][v]
          if (this._distance[u] + w < this._distance[v]) {
            this._distance[v] = this._distance[u] + w
            this._predecessor[v] = u
          }
        }
      }
    }

    // console.log('Step 3: check for negative-weight cycles')
    for (const u in this._nodes) {
      for (const v in this._nodes[u]) {
        const w = this._nodes[u][v]
        if (this._distance[u] + w < this._distance[v]) {
          throw new Error('Graph contains a negative-weight cycle')
        }
      }
    }
  }

  printPath(dest: string) {
    if (this._predecessor[dest] != null) {
      this.printPath(this._predecessor[dest])
    }

    process.stdout.write(`→ ${dest} `)
  }

  getShortestPath(startNode: string): void {
    this.startNode = startNode

    this.calculate()

    console.log(`Source: ${this._startNode}`)
    console.table(this._nodes)
    console.table(this._predecessor)

    for (const dest of Object.keys(this._nodes)) {
      console.log(`\nTarget: ${dest}`)
      this.printPath(dest)
      if (this._distance[dest] != Infinity) {
        console.log(`\nDistance: ${this._distance[dest]}`)
      } else {
        console.log('\nNo path')
      }
    }
  }
}

const graphBellmanFord = new BellmanFord()

graphBellmanFord.addEdge('A', { B: 3, E: 4 })
graphBellmanFord.addEdge('B', { C: 2, D: 2, E: 9 })
graphBellmanFord.addEdge('C', { B: -3 })
graphBellmanFord.addEdge('D', { C: 3 })
graphBellmanFord.addEdge('E', { C: -5 })

graphBellmanFord.getShortestPath('A')

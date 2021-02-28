class FloydWarshall {
  private _startNode = ''
  private _vertexes = {}
  private _nodes: any = {}
  private _dist: any = {}
  private _next: any = {}

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
    for (const u in this._nodes) {
      for (const v in this._nodes) {
        if (!this._dist[u]) {
          this._dist[u] = {}
        }
        // let dist be a array of minimum distances initialized to infinity
        this._dist[u][v] = Infinity

        if (!this._next[u]) {
          this._next[u] = {}
        }
        // let dist be a array of minimum distances initialized to null
        this._next[u][v] = null
      }
    }

    // for each edge (u, v) do
    //     dist[u][v] ← w(u, v)  // The weight of the edge (u, v)
    //     next[u][v] ← v
    for (const u in this._nodes) {
      for (const v in this._nodes[u]) {
        this._dist[u][v] = this._nodes[u][v]
        this._next[u][v] = v
      }
    }

    // for each vertex v do
    //     dist[v][v] ← 0
    //     next[v][v] ← v
    for (const v in this._nodes) {
      this._dist[v][v] = 0
      this._next[v][v] = v
    }

    // for k from 1 to |V| do // standard Floyd-Warshall implementation
    //     for i from 1 to |V|
    //         for j from 1 to |V|
    //             if dist[i][j] > dist[i][k] + dist[k][j] then
    //                 dist[i][j] ← dist[i][k] + dist[k][j]
    //                 next[i][j] ← next[i][k]

    for (let k = 1; k <= Object.keys(this._nodes).length; k++) {
      for (let i = 1; i <= Object.keys(this._nodes).length; i++) {
        for (let j = 1; j <= Object.keys(this._nodes).length; j++) {
          if (this._dist[i][j] > this._dist[i][k] + this._dist[k][j]) {
            this._dist[i][j] = this._dist[i][k] + this._dist[k][j]
            this._next[i][j] = this._next[i][k]
          }
        }
      }
    }
  }

  printPath(u: string, v: string) {
    // if next[u][v] = null then
    //     return []
    // path = [u]
    // while u ≠ v
    //     u ← next[u][v]
    //     path.append(u)
    // return path

    if (this._next[u][v] === null) {
      return []
    }

    const path = [u]
    while (u != v) {
      u = this._next[u][v]
      path.push(u)
    }

    return path
  }

  getShortestPath(): void {
    this.calculate()

    console.log(`Source: ${this._startNode}`)
    for (const u in this._dist) {
      console.log(`\nTarget: ${u}`)
      for (const v in this._dist[u]) {
        console.log(`${u} → ${v}::`, this._dist[u][v])
        this.printPath(u, v)
      }
    }
  }

  getVertexes() {
    return Object.keys(this._vertexes)
  }
}

const graphFloydWarshall = new FloydWarshall()

graphFloydWarshall.addEdge('1', { '3': -2 })
graphFloydWarshall.addEdge('2', { '1': 4, '3': 3 })
graphFloydWarshall.addEdge('3', { '4': 2 })
graphFloydWarshall.addEdge('4', { '2': -1 })

graphFloydWarshall.getShortestPath()

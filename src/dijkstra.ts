type IListNode = {
  [vertex: string]: {
    [vertex: string]: number
  }
}

type IListPassedNode = {
  [vertex: string]: number
}

class Graph {
  private _startNode: string
  private _vertexes = {}
  private _nodes: IListNode = {}
  private _passedNodes: any = {}

  constructor(startNode: string) {
    this._startNode = startNode

    this._nodes[this._startNode] = { ...this._nodes[this._startNode], ...{ [this._startNode]: 0 } }
  }

  addEdge(fromVertex: string, toVertex: string, weight: number): void {
    if (!this._nodes[fromVertex]) {
      this._nodes[fromVertex] = { [toVertex]: weight }
    } else {
      this._nodes[fromVertex][toVertex] = weight
    }

    if (!this._nodes[toVertex]) {
      this._nodes[toVertex] = { [fromVertex]: weight }
    } else {
      this._nodes[toVertex][fromVertex] = weight
    }

    this._vertexes = { ...this._vertexes, ...{ [fromVertex]: true, [toVertex]: true } }
  }

  private dijkstra(): void {
    console.log('dijkstra')

    const d: any = {},
      prev: any = {}
    for (const vertex in this._nodes) {
      d[vertex] = Number.MAX_VALUE
      prev[vertex] = -1
    }

    d[this._startNode] = 0

    // for (const vertex of this.getVertexes()) {
    //   this._passedNodes[vertex] = -1
    // }

    // for (const vertex of this.getVertexes()) {
    //   if (!this._passedNodes[k]) {
    //     this._passedNodes[k] = {}
    //   }
    //   this._passedNodes[k][vertex] = -1
    // }

    for (const fromVertex in this._nodes) {
      const i = this._nodes[fromVertex]
      if (!this._passedNodes[fromVertex]) {
        this._passedNodes[fromVertex] = {}
      }

      for (const toVertex in i) {
        const j = i[toVertex]
        // if (fromVertex === this._startNode) {
        //   this._passedNodes[k][fromVertex][toVertex] = j
        // } else {
        //   this._passedNodes[k][fromVertex][toVertex] = 0
        // }

        this._passedNodes[fromVertex][toVertex] = j

        // if (!this._passedNodes[fromVertex]) {
        //   this._passedNodes[fromVertex] = {}
        // }
        // this._passedNodes[fromVertex][toVertex] = this._nodes[fromVertex][toVertex]
      }
    }
  }

  getShortestPath(): void {
    this.dijkstra()

    console.log('getShortestPath')
    for (const vertex of this.getVertexes()) {
      console.log(`From ${this._startNode} to ${vertex}: ...`)
    }
  }

  getVertexes() {
    return Object.keys(this._vertexes)
  }
}

const g = new Graph('A')

g.addEdge('A', 'B', 5)
g.addEdge('A', 'C', 3)

g.addEdge('B', 'C', 4)
g.addEdge('B', 'D', 3)
g.addEdge('B', 'E', 4)

g.addEdge('C', 'B', 2)
g.addEdge('C', 'D', 3)
g.addEdge('C', 'E', 6)

g.addEdge('E', 'D', 2)

g.getShortestPath()

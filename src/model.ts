import randomIndex from './randomIndex'

export type RNG = ()=>number
export type Boundary = Array<null|number>
export type Boundaries = {
  left: number[]
  up: number[]
  right: number[]
  down: number[]
}

// const Model = function Model () {};
export default abstract class Model {
  WIDTH = 0
  HEIGHT = 0
  NODES_TOTAL = 0
  TILES_TOTAL = 0
  BOUNDARY_NODES_TOTAL = 0
  N = 0
  
  initiliazedField = false
  generationComplete = false
  
  wave!: Array<Array<boolean>>
  /**
   * holds the compatible tile for each point
   * The first array has an entry for every point (ie. if we are generating a 10x10 grid, compatible.length should equal 100)
   * The second array has an entry for every tile type (ie. if we have 3 tiles * cardinality [1, 2, 4] for each, should have length 7)
   * The third array is a tuple of directions [Left, Up, Right, Down] where the value is 
   */
  compatible!: Array<Array<[left: number, up: number, right: number, down: number]>>
  weightLogWeights!: number[]
  sumOfWeights = 0
  sumOfWeightLogWeights = 0
  
  startingEntropy = 0
  
  sumsOfOnes!: number[]
  sumsOfWeights!: number[]
  sumsOfWeightLogWeights!: number[]
  entropies!: number[]

  boundaries!: Boundaries
  boundaryNodes!: Array<null|undefined|number>
  BOUNDARY_NODE_MAP!: Array<[x: number, y: number]>
  
  /**
   * 
   * The first array is a tuple indexed by the direction [Left Up, Right, Down]
   * The second array is indexed by tileId (each of length TILES_TOTAL)
   * The third array is a a list of valid tile ids
   * 
   * ie.
   * propagator[dir][tileId] = [possible tile ids]
   */
  propagator!: Array<Array<number[]>>
  observed!: number[]
  distribution!: number[]
  
  stack!: Array<[nodeId: number, tileId: number]>
  stackSize = 0

  weights!: number[]
  
  //     L, U, R,  D
  DX = [-1, 0, 1,  0]
  DY = [ 0, 1, 0, -1]
  opposite = [2, 3, 0, 1]

  abstract onBoundary (x: number, y: number): boolean
  abstract tileName(tileId: number): string

  /**
   * @protected
   */
  initialize() {
    this.distribution = new Array(this.TILES_TOTAL)

    this.wave = new Array(this.NODES_TOTAL)
    this.compatible = new Array(this.NODES_TOTAL)

    for (let nodeId = 0-this.BOUNDARY_NODES_TOTAL; nodeId < this.NODES_TOTAL; nodeId++) {
      this.wave[nodeId] = new Array(this.TILES_TOTAL)
      this.compatible[nodeId] = new Array(this.TILES_TOTAL)

      for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
        this.compatible[nodeId][tileId] = [0,0,0,0]
      }
    }

    this.weightLogWeights = new Array(this.TILES_TOTAL)
    this.sumOfWeights = 0
    this.sumOfWeightLogWeights = 0

    for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
      this.weightLogWeights[tileId] = this.weights[tileId] * Math.log(this.weights[tileId])
      this.sumOfWeights += this.weights[tileId]
      this.sumOfWeightLogWeights += this.weightLogWeights[tileId]
    }

    this.startingEntropy = Math.log(this.sumOfWeights) - this.sumOfWeightLogWeights / this.sumOfWeights

    this.sumsOfOnes = new Array(this.NODES_TOTAL)
    this.sumsOfWeights = new Array(this.NODES_TOTAL)
    this.sumsOfWeightLogWeights = new Array(this.NODES_TOTAL)
    this.entropies = new Array(this.NODES_TOTAL)

    this.stack = new Array(this.NODES_TOTAL * this.TILES_TOTAL)
    this.stackSize = 0

    this.boundaryNodes = []
  }

  /**
   *
   * @param {Function} rng Random number generator function
   *
   * @returns {*}
   *
   * @protected
   */
  observe (rng: RNG) {
    // console.log('observe')

    // find the node with the lowest entropy
    const nodeId = this.nextUnobservedNode(rng)

    // console.log(' > nodeId', nodeId)
    // if we dont have any more nodes then we should initialize
    // the observed array and write our final tile ids into each
    // node index.
    if (nodeId === -1) {
      this.observed = new Array(this.NODES_TOTAL);
      // console.log('init observed')

      for (let nodeId = 0; nodeId < this.NODES_TOTAL; nodeId++) {
        for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
          if (this.wave[nodeId][tileId]) {
            // console.log('set observed', nodeId, tileId)
            this.observed[nodeId] = tileId;
            break;
          }
        }
      }
      return true;
    }

    // generate the distribution of weights for each of the tile types
    for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
      this.distribution[tileId] = this.wave[nodeId][tileId] ? this.weights[tileId] : 0
    }

    // choose at random a tile id from the distribution for this node.
    const randomTileId = randomIndex(this.distribution, rng())
    // console.log(' > selected tile id', randomTileId, this.tileName(randomTileId))

    this.observeNode(nodeId, randomTileId)

    return null
  }

  private observeNode(nodeId: number, observedTileId: number){
    const wave = this.wave[nodeId];
    // console.log('observe node', nodeId, observedTileId, wave.slice())
    for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
      // console.log(' > wave', tileId, wave[tileId], (tileId === randomTileId), wave[tileId] !== (tileId === randomTileId) ? 'ban' : 'skip')
      // 
      if (wave[tileId] !== (tileId === observedTileId)){
        this.ban(nodeId, tileId)
      }
    }
  }

  private nextUnobservedNode(rng: RNG){
    let min = 1000;
    let argmin = -1;

    for (let nodeId = 0; nodeId < this.NODES_TOTAL; nodeId++) {
      const [x, y] = this.nodeIdToCoordinates(nodeId)
      if (this.onBoundary(x, y)){
        // console.log(' > on boundary; continue', nodeId, nodeId % this.WIDTH, nodeId / this.WIDTH | 0)
        continue;
      }
      
      const amount = this.sumsOfOnes[nodeId];
      
      if (amount === 0){
        // console.log(' > amount === 0; return false', nodeId)
        return -1
        // return false
      };
      
      const entropy = this.entropies[nodeId];
      // console.log('get next node', nodeId, amount, entropy)

      if (amount > 1 && entropy <= min) {
        const noise = 0.000001 * rng();

        if (entropy + noise < min) {
          min = entropy + noise;
          argmin = nodeId;
        }
      }
    }
    return argmin
  }

  protected propagate () {
    // console.log('propagate', this.stackSize)
    // 
    while (this.stackSize > 0) {
      const [nodeId, tileId] = this.stack[this.stackSize - 1];
      // console.log(' > stack item', nodeId, tileId)
      this.stackSize--;

      // take the nodeId (an index) and compute the x/y coordinates in the tile grid
      const [x1, y1] = this.nodeIdToCoordinates(nodeId)
      // console.log(' > x1, y1', x1, y1)
      // console.log(' > DX, DY', this.DX, this.DY)
      this.propagateCoordinate(x1, y1, tileId)
    }
  }

  protected propagateCoordinate(x: number, y: number, tileId: number){
    // console.log('propagate coord', x, y, tileId)
    // for each of the neighbor directions (left, up, right, down)
    for (const dir of DIRS) {
      const dx = this.DX[dir];
      const dy = this.DY[dir];

      let x2 = x + dx;
      let y2 = y + dy;
      // console.log('  > x2, y2', x2, y2)

      // if this neighbor is out of bounds, skip it
      if (this.onBoundary(x2, y2)){
        // console.log('  > on boundary; skip', x2, y2)
        continue
      }

      // if the neighbor is out of bounds but we didn't skip it
      // wrap it around the respective axis
      if (x2 < 0) {
        x2 += this.WIDTH
      } else if (x2 >= this.WIDTH) {
        x2 -= this.WIDTH
      }
      if (y2 < 0) {
        y2 += this.HEIGHT
      } else if (y2 >= this.HEIGHT) {
        y2 -= this.HEIGHT
      }

      // convert the neighbor's x/y coordinate to an index value (nodeId)
      const nodeIndex2 = this.coordinatesToNodeId(x2, y2)
      const propagator = this.propagator[dir][tileId];
      const compat = this.compatible[nodeIndex2];
      // console.log('  > propagator', propagator, compat)

      // console.log('  > propagator for tile', dir, this.tileName(tileId), propagator.slice())
      // console.log('  > compat for node', nodeIndex2, compat.slice())
      propagator.forEach((tileId2)=>{
        const comp = compat[tileId2];
        // console.log('   > ', tileId2, comp, comp[dir])
        comp[dir]--;
        // console.log('   > comp[dir]', this.tileName(tileId2), comp[dir])

        if (comp[dir] == 0){
          this.ban(nodeIndex2, tileId2)
        }
      })
    }
  }

  protected propagateBoundary(){
    // TODO
  }

  protected nodeIdToCoordinates(nodeId: number): [x: number, y: number] {
    // console.log('node to coord', nodeId)
    if(nodeId >= 0){
      const x = nodeId % this.WIDTH // x is just the modulus of the width (ie. 5%10 = 15%10 = 5)
      const y = Math.floor(nodeId / this.WIDTH) // y is the floor of the index/width (ie. 5/10 = 0.5 -floor-> 0; 15/10 = 1.5 -floor-> 1)
      return [x, y]
    } else {
      // TODO: error handling of if the coord for the node id does not exist
      // console.log(' > boundary', Math.abs(nodeId)-1, this.BOUNDARY_NODE_MAP[Math.abs(nodeId)-1])
      return this.BOUNDARY_NODE_MAP[Math.abs(nodeId)-1]
    }
  }
  protected coordinatesToNodeId(x: number, y: number): number {
    return x + y * this.WIDTH
  }

  /**
   * Execute a single iteration
   *
   * @param {Function} rng Random number generator function
   *
   * @returns {boolean|null}
   */
  protected singleIteration (rng: RNG) {
    // console.log('single iteration')
    const result = this.observe(rng);

    if (result !== null) {
      this.generationComplete = result;

      return !!result;
    }

    this.propagate();

    return null;
  };

  /**
   * Execute a fixed number of iterations. Stop when the generation is successful or reaches a contradiction.
   *
   * @param {int} [iterations=0] Maximum number of iterations to execute (0 = infinite)
   * @param {Function|null} [rng=Math.random] Random number generator function
   *
   * @returns {boolean} Success
   */
  iterate (iterations: number=0, rng?: RNG) {
    if (!this.wave) this.initialize();

    if (!this.initiliazedField) {
      this.clear();
    }

    iterations = iterations || 0;
    rng = rng || Math.random;

    for (let i = 0; i < iterations || iterations === 0; i++) {
      const result = this.singleIteration(rng);

      if (result !== null) {
        return !!result;
      }
    }

    return true;
  };

  /**
   * Execute a complete new generation
   *
   * @param {Function|null} [rng=Math.random] Random number generator function
   *
   * @returns {boolean} Success
   */
  generate(arg?: RNG|({rng?: RNG}&Boundaries)) {
    let rng = Math.random
    if(typeof arg === 'function'){
      rng = arg
    } else if(typeof arg === 'object') {
      rng = arg.rng ?? rng
    }

    if (!this.wave){
      this.initialize()
      // this.boundaries.left?.forEach((tileId, ix)=>{
      //   if(tileId != null && tileId >= 0){
      //     this.propagateCoordinate()
      //   }
      // })
      // this.boundaries.down?.forEach((tileId, ix)=>{
      //   if(tileId != null && tileId >= 0){
      //     this.propagateCoordinate(ix, -1, tileId)
      //   }
      // })
    }

    this.clear()

    if(typeof arg === 'object'){
      this.boundaryNodes = [
        ...(arg.left ?? []).concat(Array(this.HEIGHT - (arg.left?.length ?? 0))),
        ...(arg.up ?? []).concat(Array(this.WIDTH - (arg.up?.length ?? 0))),
        ...(arg.right ?? []).concat(Array(this.HEIGHT - (arg.right?.length ?? 0))),
        ...(arg.down ?? []).concat(Array(this.WIDTH - (arg.down?.length ?? 0))),
      ]
      // console.log(this.boundaryNodes)
    }

    this.boundaryNodes.forEach((tileId, nodeId)=>{
      if(tileId != null && tileId >= 0){
        this.observeNode(-nodeId-1, tileId)
        this.propagate()
      }
    })
    // console.log('generate')

    while(true) {
      const result = this.singleIteration(rng)

      if (result !== null) {
        return !!result
      }
    }
  }

  /**
   * Check whether the previous generation completed successfully
   *
   * @returns {boolean}
   */
  isGenerationComplete () {
    return this.generationComplete;
  };

  /**
   *
   * @param {int} nodeId the node id.
   * @param {int} tileId the tile id.
   */
  protected ban (nodeId: number, tileId: number) {
    // console.log('ban', nodeId, tileId, this.tileName(tileId), this.stackSize)
    const comp = this.compatible[nodeId][tileId];
    // zero out the compatibility for this node to be this tile
    comp.fill(0)
    // disable this tile id for this node
    this.wave[nodeId][tileId] = false;
    // push this tile node id / tile id pair onto the stack
    this.stack[this.stackSize] = [nodeId, tileId];
    this.stackSize++;

    this.sumsOfOnes[nodeId] -= 1;
    this.sumsOfWeights[nodeId] -= this.weights[tileId];
    this.sumsOfWeightLogWeights[nodeId] -= this.weightLogWeights[tileId];

    const sum = this.sumsOfWeights[nodeId];
    this.entropies[nodeId] = Math.log(sum) - this.sumsOfWeightLogWeights[nodeId] / sum;
  };

  /**
   * Clear the internal state to start a new generation
   *
   * @public
   */
  clear () {
    for (let nodeId = 0-this.BOUNDARY_NODES_TOTAL; nodeId < this.NODES_TOTAL; nodeId++) {
      for (let tileId = 0; tileId < this.TILES_TOTAL; tileId++) {
        this.wave[nodeId][tileId] = true;

        for (const dir of DIRS) {
          this.compatible[nodeId][tileId][dir] = this.propagator[this.opposite[dir]][tileId].length
        }
      }

      this.sumsOfOnes[nodeId] = this.weights.length;
      this.sumsOfWeights[nodeId] = this.sumOfWeights;
      this.sumsOfWeightLogWeights[nodeId] = this.sumOfWeightLogWeights;
      this.entropies[nodeId] = this.startingEntropy;
    }

    this.boundaries = {
      left: [],
      up: [],
      right: [],
      down: [],
    }

    // console.log('clear', this)
    this.initiliazedField = true;
    this.generationComplete = false;
  };
  
}

export enum Direction {
  LEFT  = 0,
  UP    = 1,
  RIGHT = 2,
  DOWN  = 3,
}

export const DIRS = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN]

export const dirName = function(dir: Direction){
  if(dir == Direction.LEFT){
    return 'left'
  } else if(dir == Direction.UP){
    return 'up'
  } else if(dir == Direction.RIGHT){
    return 'right'
  } else if(dir == Direction.DOWN){
    return 'down'
  }
}

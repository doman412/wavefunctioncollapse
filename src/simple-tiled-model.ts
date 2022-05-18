import Model, { RNG, DIRS, dirName, Boundaries, Direction } from './model'

/**
 *
 * @param {object} data Tiles, subset and constraints definitions
 * @param {string} subsetName Name of the subset to use from the data, use all tiles if falsy
 * @param {int} width The width of the generation
 * @param {int} height The height of the generation
 * @param {boolean} periodic Whether the source image is to be considered as periodic / as a repeatable texture
 *
 * @constructor
 */
export default class SimpleTiledModel extends Model {

  periodic: boolean
  tilesize: number

  tiles: Array<Tile>

  tilemap: Array<SimpleTiledModel['tiles'][number]> = []

  constructor(data: SimpleTiledData, subsetName: string|null, width: number, height: number, periodic: boolean) {
    super()
    const tilesize = data.tilesize || 16;
  
    this.WIDTH = width;
    this.HEIGHT = height;
    this.NODES_TOTAL = width * height;

    // generate the boundary node id to coord maps
    this.BOUNDARY_NODE_MAP = []
    // LEFT
    for(let y=0; y<this.HEIGHT; y++){
      this.BOUNDARY_NODE_MAP.push([-1, y])
    }
    // UP
    for(let x=0; x<this.WIDTH; x++){
      this.BOUNDARY_NODE_MAP.push([x, this.HEIGHT])
    }
    // RIGHT
    for(let y=this.HEIGHT-1; y>=0; y--){
      this.BOUNDARY_NODE_MAP.push([this.WIDTH, y])
    }
    // DOWN
    for(let x=this.WIDTH-1; x>=0; x--){
      this.BOUNDARY_NODE_MAP.push([x, -1])
    }
    this.BOUNDARY_NODES_TOTAL = this.BOUNDARY_NODE_MAP.length

  
    this.periodic = periodic;
    this.tilesize = tilesize;
  
    const unique = !!data.unique;
    let subset = null;
  
    if (subsetName && data.subsets && !!data.subsets[subsetName]) {
      subset = data.subsets[subsetName];
    }
  
    const tile = (currTile: SimpleTiledDataTile, f: (x: number, y: number)=>[number, number, number, number]): Tile => {
      const pixels = new Array<[number, number, number, number]>(tilesize * tilesize);
  
      for (let y = 0; y < tilesize; y++) {
        for (let x = 0; x < tilesize; x++) {
          pixels[x + y * tilesize] = f(x, y);
        }
      }
  
      return {id: this.tiles.length, name: currTile.name, pixels};
    };
  
    const rotate = function rotate (currTile: SimpleTiledDataTile, array: Array<[number, number, number, number]>) {
      return tile(currTile, function (x, y) {
        return array[tilesize - 1 - y + x * tilesize];
      });
    };
  
    const reflect = function reflect(currTile: SimpleTiledDataTile, array: Array<[number, number, number, number]>) {
      return tile(currTile, function (x, y) {
        return array[tilesize - 1 - x + y * tilesize];
      });
    };
  
    this.tiles = [];
    const tempStationary = [];
  
    const action = [];
    const firstOccurrence: {[name: string]: number} = {};
  
    let funcA: (i: number)=>number;
    let funcB: (i: number)=>number;
    let cardinality;
  
    for (let i = 0; i < data.tiles.length; i++) {
      const currentTile = data.tiles[i];
  
      if (subset !== null && subset.indexOf(currentTile.name) === -1) {
        continue;
      }
  
      switch (currentTile.symmetry) {
        case 'L':
          cardinality = 4;
          funcA = function (i) {
            return (i + 1) % 4;
          };
          funcB = function (i) {
            return i % 2 === 0 ? i + 1 : i - 1;
          };
          break;
        case 'T':
          cardinality = 4;
          funcA = function (i) {
            return (i + 1) % 4;
          };
          funcB = function (i) {
            return i % 2 === 0 ? i : 4 - i;
          };
          break;
        case 'I':
          cardinality = 2;
          funcA = function (i) {
            return 1 - i;
          };
          funcB = function (i) {
            return i;
          };
          break;
        case '\\':
          cardinality = 2;
          funcA = function (i) {
            return 1 - i;
          };
          funcB = function (i) {
            return 1 - i;
          };
          break;
        case 'F':
          cardinality = 8;
          funcA = function (i) {
            return i < 4 ? (i + 1) % 4 : 4 + (i - 1) % 4;
          };
          funcB = function (i) {
            return i < 4 ? i + 4 : i - 4;
          };
          break;
        default:
          cardinality = 1;
          funcA = function (i) {
            return i;
          };
          funcB = function (i) {
            return i;
          };
          break;
      }
  
      this.TILES_TOTAL = action.length;
      firstOccurrence[currentTile.name] = this.TILES_TOTAL;
      for (let t = 0; t < cardinality; t++) {
        action.push([
          this.TILES_TOTAL + t,
          this.TILES_TOTAL + funcA(t),
          this.TILES_TOTAL + funcA(funcA(t)),
          this.TILES_TOTAL + funcA(funcA(funcA(t))),
          this.TILES_TOTAL + funcB(t),
          this.TILES_TOTAL + funcB(funcA(t)),
          this.TILES_TOTAL + funcB(funcA(funcA(t))),
          this.TILES_TOTAL + funcB(funcA(funcA(funcA(t))))
        ]);
      }
      // console.log(currentTile.name, currentTile.symmetry, cardinality, action.slice())
  
      if (unique) {
        for (let t = 0; t < cardinality; t++) {
          const bitmap = (currentTile.bitmap as Array<Uint8Array|Uint8ClampedArray>)[t] as Uint8Array|Uint8ClampedArray;
          this.tiles.push(tile(currentTile, function (x, y) {
            return [
              bitmap[(tilesize * y + x) * 4],
              bitmap[(tilesize * y + x) * 4 + 1],
              bitmap[(tilesize * y + x) * 4 + 2],
              bitmap[(tilesize * y + x) * 4 + 3]
            ];
          }));
        }
      } else {
        const bitmap = currentTile.bitmap as Uint8Array|Uint8ClampedArray;
        this.tiles.push(tile(currentTile, function (x, y) {
          return [
            bitmap[(tilesize * y + x) * 4],
            bitmap[(tilesize * y + x) * 4 + 1],
            bitmap[(tilesize * y + x) * 4 + 2],
            bitmap[(tilesize * y + x) * 4 + 3]
          ];
        }));
        
        for (let t = 1; t < cardinality; t++) {
          this.tiles.push(t < 4 ? rotate(currentTile, this.tiles[this.TILES_TOTAL + t - 1].pixels) : reflect(currentTile, this.tiles[this.TILES_TOTAL + t - 4].pixels));
        }
      }
  
      for (let t = 0; t < cardinality; t++) {
        tempStationary.push(currentTile.weight || 1);
      }
  
    }
  
    this.TILES_TOTAL = action.length;
    // console.log(action)
    // console.log(firstOccurrence)
    this.weights = tempStationary;
  
    this.propagator = new Array(4);
    const tempPropagator = new Array(4);
  
    // for each direction initialize the propagator
    for(const dir of DIRS){
      this.propagator[dir] = new Array(this.TILES_TOTAL);
      tempPropagator[dir] = new Array(this.TILES_TOTAL);
      // we first initialize a temp propagator and set all the values to false.
      // this loop creates a 2d array that says whether a tile can be next to another
      for (let tileId1 = 0; tileId1 < this.TILES_TOTAL; tileId1++) {
        tempPropagator[dir][tileId1] = new Array(this.TILES_TOTAL);
        for (let tileId2 = 0; tileId2 < this.TILES_TOTAL; tileId2++) {
          tempPropagator[dir][tileId1][tileId2] = false;
        }
      }
    }
  
    for (let i = 0; i < data.neighbors.length; i++) {
      const neighbor = data.neighbors[i];
  
      const [left, leftOffset] = neighbor.left.split(' ').filter(function (v) {
        return v.length;
      }) as [string, string|undefined]
      const [right, rightOffset] = neighbor.right.split(' ').filter(function (v) {
        return v.length;
      }) as [string, string|undefined]
  
      if (subset !== null && (subset.indexOf(left) === -1 || subset.indexOf(right) === -1)) {
        continue;
      }
  
      // console.log('left  >', left,  firstOccurrence[left])
      // console.log('right >', right, firstOccurrence[right])
      const LEFT_TILE_ID = action[firstOccurrence[left]][leftOffset == null ? 0 : parseInt(leftOffset)]
      const DOWN_TILE_ID = action[LEFT_TILE_ID][1]
      const RIGHT_TILE_ID = action[firstOccurrence[right]][rightOffset == null ? 0 : parseInt(rightOffset)]
      const UP_TILE_ID = action[RIGHT_TILE_ID][1]
      // console.log(LEFT_TILE_ID, DOWN_TILE_ID, RIGHT_TILE_ID, UP_TILE_ID)
  
      tempPropagator[0][RIGHT_TILE_ID][LEFT_TILE_ID] = true;
      tempPropagator[0][action[RIGHT_TILE_ID][6]][action[LEFT_TILE_ID][6]] = true;
      tempPropagator[0][action[LEFT_TILE_ID][4]][action[RIGHT_TILE_ID][4]] = true;
      tempPropagator[0][action[LEFT_TILE_ID][2]][action[RIGHT_TILE_ID][2]] = true;
      // console.log('left temp propagator', tempPropagator[0])
  
      tempPropagator[1][UP_TILE_ID][DOWN_TILE_ID] = true;
      tempPropagator[1][action[DOWN_TILE_ID][6]][action[UP_TILE_ID][6]] = true;
      tempPropagator[1][action[UP_TILE_ID][4]][action[DOWN_TILE_ID][4]] = true;
      tempPropagator[1][action[DOWN_TILE_ID][2]][action[UP_TILE_ID][2]] = true;
      // console.log(tempPropagator)
    }
  
    for (let tileId1 = 0; tileId1 < this.TILES_TOTAL; tileId1++) {
      for (let tileId2 = 0; tileId2 < this.TILES_TOTAL; tileId2++) {
        tempPropagator[2][tileId1][tileId2] = tempPropagator[0][tileId2][tileId1];
        tempPropagator[3][tileId1][tileId2] = tempPropagator[1][tileId2][tileId1];
      }
    }
  
    for (const dir of DIRS) {
      for (let tileId1 = 0; tileId1 < this.TILES_TOTAL; tileId1++) {
        const sp = [];
        const tp = tempPropagator[dir][tileId1];
  
        for (let tileId2 = 0; tileId2 < this.TILES_TOTAL; tileId2++) {
          if (tp[tileId2]) {
            sp.push(tileId2);
          }
        }
  
        this.propagator[dir][tileId1] = sp;
      }
    }
    // console.log('propagator', this.propagator)
  }

  /**
   *
   * @param {int} x
   * @param {int} y
   *
   * @returns {boolean}
   *
   * @protected
   */
  onBoundary (x: number, y: number) {
    const isOnBoundary = !this.periodic && (x < 0 || y < 0 || x >= this.WIDTH || y >= this.HEIGHT);
    // if(isOnBoundary){
    //   console.log(x, y)
    // }
    return isOnBoundary
  }

  tileName(tileId: number): string {
    return this.tiles[tileId].name
  }

  /**
   * Retrieve the RGBA data
   *
   * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into (must already be set to the correct size), if not set a new Uint8Array will be created and returned
   * @param {Array|Uint8Array|Uint8ClampedArray} [defaultColor] RGBA data of the default color to use on untouched tiles
   *
   * @returns {Array|Uint8Array|Uint8ClampedArray} RGBA data
   *
   * @public
   */
  graphics (array: Uint8Array|Uint8ClampedArray, defaultColor?: Uint8Array|Uint8ClampedArray) {
    array = array || new Uint8Array(this.NODES_TOTAL * this.tilesize * this.tilesize * 4);

    if (this.isGenerationComplete()) {
      this.graphicsComplete(array);
    } else {
      this.graphicsIncomplete(array, defaultColor);
    }

    return array;
  };

  /**
   * Set the RGBA data for a complete generation in a given array
   *
   * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into, if not set a new Uint8Array will be created and returned
   *
   * @protected
   */
  graphicsComplete (array: Uint8Array|Uint8ClampedArray) {
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        const tile = this.tiles[this.observed[this.coordinatesToNodeId(x, y)]].pixels;

        for (let yt = 0; yt < this.tilesize; yt++) {
          for (let xt = 0; xt < this.tilesize; xt++) {
            const pixelIndex = (x * this.tilesize + xt + (y * this.tilesize + yt) * this.WIDTH * this.tilesize) * 4;
            const color = tile[xt + yt * this.tilesize];

            array[pixelIndex] = color[0];
            array[pixelIndex + 1] = color[1];
            array[pixelIndex + 2] = color[2];
            array[pixelIndex + 3] = color[3];
          }
        }
      }
    }
  }

  /**
   * Set the RGBA data for an incomplete generation in a given array
   *
   * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into, if not set a new Uint8Array will be created and returned
   * @param {Array|Uint8Array|Uint8ClampedArray} [defaultColor] RGBA data of the default color to use on untouched tiles
   *
   * @protected
   */
  graphicsIncomplete (array: Uint8Array|Uint8ClampedArray, defaultColor: Uint8Array|Uint8ClampedArray|false=false) {
    if (!defaultColor || defaultColor.length !== 4) {
      defaultColor = false;
    }

    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        const w = this.wave[this.coordinatesToNodeId(x, y)];
        let amount = 0;
        let sumWeights = 0;

        for (let t = 0; t < this.TILES_TOTAL; t++) {
          if (w[t]) {
            amount++;
            sumWeights += this.weights[t];
          }
        }

        const lambda = 1 / sumWeights;

        for (let yt = 0; yt < this.tilesize; yt++) {
          for (let xt = 0; xt < this.tilesize; xt++) {
            const pixelIndex = (x * this.tilesize + xt + (y * this.tilesize + yt) * this.WIDTH * this.tilesize) * 4;

            if (defaultColor && amount === this.TILES_TOTAL) {
              array[pixelIndex] = defaultColor[0];
              array[pixelIndex + 1] = defaultColor[1];
              array[pixelIndex + 2] = defaultColor[2];
              array[pixelIndex + 3] = defaultColor[3];
            } else {
              let r = 0;
              let g = 0;
              let b = 0;
              let a = 0;

              for (let t = 0; t < this.TILES_TOTAL; t++) {
                if (w[t]) {
                  const c = this.tiles[t].pixels[xt + yt * this.tilesize];
                  const weight = this.weights[t] * lambda;
                  r+= c[0] * weight;
                  g+= c[1] * weight;
                  b+= c[2] * weight;
                  a+= c[3] * weight;
                }
              }

              array[pixelIndex] = r;
              array[pixelIndex + 1] = g;
              array[pixelIndex + 2] = b;
              array[pixelIndex + 3] = a;
            }
          }
        }
      }
    }
  }

  generate(arg?: RNG | ({rng?: RNG}&Boundaries)): boolean {
    let result = super.generate(arg)
    // generate tilemap
    this.observed.forEach((tileId, nodeId)=>{
      this.tilemap[nodeId] = this.tiles[tileId]
    })
    // set the observed edges
    // console.log('boundary index; left', Array(this.HEIGHT).fill(null).map((_, ix)=>[ix*this.WIDTH, this.observed[ix*this.WIDTH]]))
    this.boundaries.left = Array(this.HEIGHT).fill(null).map((_, ix)=>this.observed[ix*this.WIDTH])
    this.boundaries.up = this.observed.slice(this.WIDTH*(this.HEIGHT-1))
    // console.log('boundary index; right', Array(this.HEIGHT).fill(null).map((_, ix)=>[ix*this.WIDTH+9, this.observed[ix*this.WIDTH+9]]).reverse())
    this.boundaries.right = Array(this.HEIGHT).fill(null).map((_, ix)=>this.observed[ix*this.WIDTH+9]).reverse()
    this.boundaries.down = this.observed.slice(0, this.WIDTH)
    return result
  }
}


export interface SimpleTiledDataTile {
  name: string
  symmetry: 'I'|'X'|'L'|'T'|'F'|'\\'
  weight?: number
  bitmap?: Uint8Array|Uint8ClampedArray|Array<Uint8Array|Uint8ClampedArray>
}
export interface SimpleTiledDataNeighbor {
  left: string
  right: string
}
export interface SimpleTiledData {
  tilesize: number
  tiles: SimpleTiledDataTile[]
  neighbors: SimpleTiledDataNeighbor[]
  unique?: boolean
  subsets?: {
    [name: string]: string[]
  }
}

export interface Tile {
  id: number
  name: string
  pixels: Array<[number, number, number, number]>
}
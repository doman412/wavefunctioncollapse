export const data = {
    Castle: {
        tilesize: 7,
        tiles: [
            { name:"bridge", symmetry:"I" },
            { name:"ground", symmetry:"X" },
            { name:"river", symmetry:"I" },
            { name:"riverturn", symmetry:"L" },
            { name:"road", symmetry:"I" },
            { name:"roadturn", symmetry:"L" },
            { name:"t", symmetry:"T" },
            { name:"tower", symmetry:"L" },
            { name:"wall", symmetry:"I" },
            { name:"wallriver", symmetry:"I" },
            { name:"wallroad", symmetry:"I" }
        ],
        neighbors: [
            { left:"bridge 1", right:"river 1" },
            { left:"bridge 1", right:"riverturn 1" },
            { left:"bridge", right:"road 1" },
            { left:"bridge", right:"roadturn 1" },
            { left:"bridge", right:"t" },
            { left:"bridge", right:"t 3" },
            { left:"bridge", right:"wallroad" },
            { left:"ground", right:"ground" },
            { left:"ground", right:"river" },
            { left:"ground", right:"riverturn" },
            { left:"ground", right:"road" },
            { left:"ground", right:"roadturn" },
            { left:"ground", right:"t 1" },
            { left:"ground", right:"tower" },
            { left:"ground", right:"wall" },
            { left:"river 1", right:"river 1" },
            { left:"river 1", right:"riverturn 1" },
            { left:"river", right:"road" },
            { left:"river", right:"roadturn" },
            { left:"river", right:"t 1" },
            { left:"river", right:"tower" },
            { left:"river", right:"wall" },
            { left:"river 1", right:"wallriver" },
            { left:"riverturn", right:"riverturn 2" },
            { left:"road", right:"riverturn" },
            { left:"roadturn 1", right:"riverturn" },
            { left:"roadturn 2", right:"riverturn" },
            { left:"t 3", right:"riverturn" },
            { left:"tower 1", right:"riverturn" },
            { left:"tower 2", right:"riverturn" },
            { left:"wall", right:"riverturn" },
            { left:"riverturn", right:"wallriver" },
            { left:"road 1", right:"road 1" },
            { left:"roadturn", right:"road 1" },
            { left:"road 1", right:"t" },
            { left:"road 1", right:"t 3" },
            { left:"road", right:"tower" },
            { left:"road", right:"wall" },
            { left:"road 1", right:"wallroad" },
            { left:"roadturn", right:"roadturn 2" },
            { left:"roadturn", right:"t" },
            { left:"roadturn 1", right:"tower" },
            { left:"roadturn 2", right:"tower" },
            { left:"roadturn 1", right:"wall" },
            { left:"roadturn", right:"wallroad" },
            { left:"t", right:"t 2" },
            { left:"t 3", right:"tower" },
            { left:"t 3", right:"wall" },
            { left:"t", right:"wallroad" },
            { left:"t 1", right:"wallroad" },
            { left:"tower", right:"wall 1" },
            { left:"tower", right:"wallriver 1" },
            { left:"tower", right:"wallroad 1" },
            { left:"wall 1", right:"wall 1" },
            { left:"wall 1", right:"wallriver 1" },
            { left:"wall 1", right:"wallroad 1" },
            { left:"wallriver 1", right:"wallroad 1" }
        ]
    },
    Circles: {
        tilesize: 32,
        tiles: [
            { name:"b_half", symmetry:"T" },
            { name:"b_i", symmetry:"I" },
            { name:"b_quarter", symmetry:"L" },
            { name:"w_half", symmetry:"T" },
            { name:"w_i", symmetry:"I" },
            { name:"w_quarter", symmetry:"L" },
            { name:"b", symmetry:"X" },
            { name:"w", symmetry:"X" }
        ],
        neighbors: [
            { left:"b_half", right:"b_half" },
            { left:"b_half 1", right:"b_half 3" },
            { left:"b_half 3", right:"b_half 1" },
            { left:"b_half", right:"b_half 3" },
            { left:"b_half", right:"b_half 2" },
            { left:"b_half", right:"b_i" },
            { left:"b_half 3", right:"b_i 3" },
            { left:"b_half 1", right:"b_i" },
            { left:"b_half", right:"b_quarter" },
            { left:"b_half 1", right:"b_quarter" },
            { left:"b_half 2", right:"b_quarter" },
            { left:"b_half 3", right:"b_quarter 1" },
            { left:"b_i", right:"b_i" },
            { left:"b_i 1", right:"b_i 1" },
            { left:"b_i", right:"b_quarter" },
            { left:"b_i 1", right:"b_quarter 1" },
            { left:"b_quarter", right:"b_quarter 1" },
            { left:"b_quarter 1", right:"b_quarter" },
            { left:"b_quarter 2", right:"b_quarter" },
            { left:"b_quarter", right:"b_quarter 2" },
            { left:"b_half 1", right:"w_half 1" },
            { left:"b_half", right:"w_half 1" },
            { left:"b_half 3", right:"w_half" },
            { left:"b_half 3", right:"w_half 3" },
            { left:"b_half", right:"w_i 1" },
            { left:"b_half 1", right:"w_i 1" },
            { left:"b_half 3", right:"w_i" },
            { left:"b_half", right:"w_quarter 1" },
            { left:"b_half", right:"w_quarter 2" },
            { left:"b_half 1", right:"w_quarter 1" },
            { left:"b_half 3", right:"w_quarter" },
            { left:"b_i", right:"w_half 1" },
            { left:"b_i 1", right:"w_half" },
            { left:"b_i 1", right:"w_half 3" },
            { left:"b_i", right:"w_i 1" },
            { left:"b_i 1", right:"w_i" },
            { left:"b_i", right:"w_quarter 1" },
            { left:"b_i 1", right:"w_quarter" },
            { left:"b_quarter", right:"w_half" },
            { left:"b_quarter", right:"w_half 3" },
            { left:"b_quarter", right:"w_half 2" },
            { left:"b_quarter 1", right:"w_half 1" },
            { left:"b_quarter", right:"w_i" },
            { left:"b_quarter 1", right:"w_i 1" },
            { left:"b_quarter", right:"w_quarter" },
            { left:"b_quarter", right:"w_quarter 3" },
            { left:"b_quarter 1", right:"w_quarter 1" },
            { left:"b_quarter 1", right:"w_quarter 2" },
            { left:"w_half", right:"w_half" },
            { left:"w_half 1", right:"w_half 3" },
            { left:"w_half 3", right:"w_half 1" },
            { left:"w_half", right:"w_half 3" },
            { left:"w_half", right:"w_half 2" },
            { left:"w_half", right:"w_i" },
            { left:"w_half 3", right:"w_i 3" },
            { left:"w_half 1", right:"w_i" },
            { left:"w_half", right:"w_quarter" },
            { left:"w_half 1", right:"w_quarter" },
            { left:"w_half 2", right:"w_quarter" },
            { left:"w_half 3", right:"w_quarter 1" },
            { left:"w_i", right:"w_i" },
            { left:"w_i 1", right:"w_i 1" },
            { left:"w_i", right:"w_quarter" },
            { left:"w_i 1", right:"w_quarter 1" },
            { left:"w_quarter", right:"w_quarter 1" },
            { left:"w_quarter 1", right:"w_quarter" },
            { left:"w_quarter 2", right:"w_quarter" },
            { left:"w_quarter", right:"w_quarter 2" },
            { left:"b", right:"b" },
            { left:"b", right:"b_half 1" },
            { left:"b", right:"b_i 1" },
            { left:"b", right:"b_quarter 1" },
            { left:"b", right:"w_half" },
            { left:"b", right:"w_half 3" },
            { left:"b", right:"w_i" },
            { left:"b", right:"w_quarter" },
            { left:"w", right:"w" },
            { left:"w", right:"w_half 1" },
            { left:"w", right:"w_i 1" },
            { left:"w", right:"w_quarter 1" },
            { left:"w", right:"b_half" },
            { left:"w", right:"b_half 3" },
            { left:"w", right:"b_i" },
            { left:"w", right:"b_quarter" }
        ],
        subsets: {
            Large: ["b_quarter", "w_quarter"],
            More: ["b_quarter", "w_quarter", "b", "w"],
            Without: ["b_quarter", "b_i", "b_quarter", "w_quarter", "w_i", "w_quarter"]
        }
    },
    Circuit: {
        tilesize: 14,
        tiles: [
            { name:"bridge", symmetry:"I", weight:1.0 },
            { name:"component", symmetry:"X", weight:20.0 },
            { name:"connection", symmetry:"T", weight:10.0 },
            { name:"corner", symmetry:"L", weight:10.0 },
            { name:"substrate", symmetry:"X", weight:2.0 },
            { name:"t", symmetry:"T", weight:0.1 },
            { name:"track", symmetry:"I", weight:2.0 },
            { name:"transition", symmetry:"T", weight:0.4 },
            { name:"turn", symmetry:"L", weight:1.0 },
            { name:"viad", symmetry:"I", weight:0.1 },
            { name:"vias", symmetry:"T", weight:0.3 },
            { name:"wire", symmetry:"I", weight:0.5 },
            { name:"skew", symmetry:"L", weight:2.0 },
            { name:"dskew", symmetry:"\\", weight:2.0 }
        ],
        neighbors: [
            { left:"bridge", right:"bridge" },
            { left:"bridge 1", right:"bridge 1" },
            { left:"bridge 1", right:"connection 1" },
            { left:"bridge 1", right:"t 2" },
            { left:"bridge 1", right:"t 3" },
            { left:"bridge 1", right:"track 1" },
            { left:"bridge", right:"transition 1" },
            { left:"bridge 1", right:"turn 1" },
            { left:"bridge 1", right:"viad" },
            { left:"bridge 1", right:"vias 1" },
            { left:"bridge", right:"wire" },
            { left:"component", right:"component" },
            { left:"connection 1", right:"component" },
            { left:"connection", right:"connection" },
            { left:"connection", right:"corner" },
            { left:"t 1", right:"connection 1" },
            { left:"t 2", right:"connection 1" },
            { left:"track 1", right:"connection 1" },
            { left:"turn", right:"connection 1" },
            { left:"substrate", right:"corner 1" },
            { left:"t 3", right:"corner 1" },
            { left:"track", right:"corner 1" },
            { left:"transition 2", right:"corner 1" },
            { left:"transition", right:"corner 1" },
            { left:"turn 1", right:"corner 1" },
            { left:"turn 2", right:"corner 1" },
            { left:"viad 1", right:"corner 1" },
            { left:"vias 1", right:"corner 1" },
            { left:"vias 2", right:"corner 1" },
            { left:"vias", right:"corner 1" },
            { left:"wire 1", right:"corner 1" },
            { left:"substrate", right:"substrate" },
            { left:"substrate", right:"t 1" },
            { left:"substrate", right:"track" },
            { left:"substrate", right:"transition 2" },
            { left:"substrate", right:"turn" },
            { left:"substrate", right:"viad 1" },
            { left:"substrate", right:"vias 2" },
            { left:"substrate", right:"vias 3" },
            { left:"substrate", right:"wire 1" },
            { left:"t 1", right:"t 3" },
            { left:"t 3", right:"t 1" },
            { left:"t 1", right:"t 2" },
            { left:"t 2", right:"t 2" },
            { left:"t 2", right:"t" },
            { left:"t 3", right:"track" },
            { left:"t 1", right:"track 1" },
            { left:"t 2", right:"track 1" },
            { left:"t 1", right:"transition 3" },
            { left:"t 3", right:"transition 2" },
            { left:"t 2", right:"transition 3" },
            { left:"t 3", right:"turn" },
            { left:"t 1", right:"turn 1" },
            { left:"t 2", right:"turn 1" },
            { left:"t 2", right:"turn 2" },
            { left:"t 3", right:"viad 1" },
            { left:"t 1", right:"viad" },
            { left:"t 2", right:"viad" },
            { left:"t 2", right:"vias 1" },
            { left:"t 1", right:"vias 1" },
            { left:"vias 1", right:"t 1" },
            { left:"vias 2", right:"t 1" },
            { left:"wire 1", right:"t 1" },
            { left:"track", right:"track" },
            { left:"track 1", right:"track 1" },
            { left:"track 1", right:"transition 3" },
            { left:"track", right:"transition 2" },
            { left:"track", right:"turn" },
            { left:"track 1", right:"turn 1" },
            { left:"track", right:"viad 1" },
            { left:"track 1", right:"viad" },
            { left:"track", right:"vias 2" },
            { left:"track", right:"vias 3" },
            { left:"track 1", right:"vias 1" },
            { left:"track", right:"wire 1" },
            { left:"transition 2", right:"turn" },
            { left:"transition", right:"turn" },
            { left:"transition 1", right:"turn 1" },
            { left:"transition 2", right:"viad 1" },
            { left:"transition 2", right:"vias 2" },
            { left:"transition 2", right:"vias 3" },
            { left:"transition 2", right:"vias" },
            { left:"wire", right:"transition 1" },
            { left:"transition 2", right:"wire 1" },
            { left:"turn 1", right:"turn" },
            { left:"turn 2", right:"turn" },
            { left:"turn", right:"turn 1" },
            { left:"turn", right:"turn 2" },
            { left:"turn 1", right:"viad 1" },
            { left:"turn", right:"viad" },
            { left:"turn 1", right:"vias 2" },
            { left:"turn 1", right:"vias 3" },
            { left:"turn 1", right:"vias" },
            { left:"turn", right:"vias 1" },
            { left:"turn 1", right:"wire 1" },
            { left:"viad 1", right:"viad 1" },
            { left:"viad 1", right:"vias 2" },
            { left:"viad 1", right:"vias 3" },
            { left:"viad 1", right:"wire 1" },
            { left:"vias 1", right:"wire 1" },
            { left:"vias 2", right:"wire 1" },
            { left:"vias 1", right:"vias 3" },
            { left:"vias 2", right:"vias 2" },
            { left:"vias 2", right:"vias" },
            { left:"wire", right:"wire" },
            { left:"wire 1", right:"wire 1" },
            { left:"bridge 1", right:"dskew" },
            { left:"connection 3", right:"dskew" },
            { left:"dskew", right:"dskew" },
            { left:"skew", right:"dskew" },
            { left:"t", right:"dskew" },
            { left:"t 2", right:"dskew" },
            { left:"t 1", right:"dskew" },
            { left:"track 1", right:"dskew" },
            { left:"transition 1", right:"dskew" },
            { left:"turn 3", right:"dskew" },
            { left:"viad", right:"dskew" },
            { left:"vias 3", right:"dskew" },
            { left:"skew", right:"bridge 1" },
            { left:"skew", right:"connection 1" },
            { left:"corner", right:"skew" },
            { left:"corner 3", right:"skew" },
            { left:"skew", right:"dskew" },
            { left:"skew", right:"skew 2" },
            { left:"skew 1", right:"skew" },
            { left:"skew 1", right:"skew 3" },
            { left:"substrate", right:"skew" },
            { left:"t 3", right:"skew" },
            { left:"t", right:"skew 2" },
            { left:"t 2", right:"skew 2" },
            { left:"t 1", right:"skew 2" },
            { left:"track", right:"skew" },
            { left:"track 1", right:"skew 2" },
            { left:"transition", right:"skew" },
            { left:"transition 1", right:"skew 2" },
            { left:"turn 1", right:"skew" },
            { left:"turn 2", right:"skew" },
            { left:"turn 3", right:"skew 2" },
            { left:"viad 1", right:"skew" },
            { left:"viad", right:"skew 2" },
            { left:"vias", right:"skew" },
            { left:"vias 1", right:"skew" },
            { left:"vias 2", right:"skew" },
            { left:"vias 3", right:"skew 2" },
            { left:"wire 1", right:"skew" }
        ],
        subsets: {
            Debug: ["substrate", "turn"],
            Chips: ["component", "substrate", "turn", "connection", "corner", "track", "t"],
            Turnless: ["bridge", "component", "connection", "corner", "substrate", "t", "track", "transition", "viad", "vias", "wire", "skew", "dskew"]
        }
    },
    Knots: {
        tilesize: 10,
        tiles: [
            { name:"corner", symmetry:"L" },
            { name:"cross", symmetry:"I" },
            { name:"empty", symmetry:"X" },
            { name:"line", symmetry:"I" },
            { name:"t", symmetry:"T" }
        ],
        neighbors: [
            { left:"corner 1", right:"empty" },
            { left:"corner", right:"cross" },
            { left:"corner", right:"cross 1" },
            { left:"corner", right:"line" },
            { left:"corner 1", right:"line 1" },
            { left:"corner", right:"t 2" },
            { left:"corner", right:"t 3" },
            { left:"corner", right:"t" },
            { left:"corner 1", right:"t 1" },
            { left:"corner 1", right:"corner 3" },
            { left:"corner 1", right:"corner" },
            { left:"corner", right:"corner 1" },
            { left:"corner", right:"corner 2" },
            { left:"cross", right:"cross" },
            { left:"cross", right:"cross 1" },
            { left:"cross 1", right:"cross 1" },
            { left:"cross", right:"line" },
            { left:"cross 1", right:"line" },
            { left:"cross", right:"t" },
            { left:"cross", right:"t 3" },
            { left:"cross 1", right:"t" },
            { left:"cross 1", right:"t 3" },
            { left:"empty", right:"empty" },
            { left:"empty", right:"line 1" },
            { left:"empty", right:"t 1" },
            { left:"line", right:"line" },
            { left:"line 1", right:"line 1" },
            { left:"line", right:"t" },
            { left:"line 1", right:"t 1" },
            { left:"line", right:"t 3" },
            { left:"t 1", right:"t 3" },
            { left:"t", right:"t" },
            { left:"t 2", right:"t" },
            { left:"t 1", right:"t" },
            { left:"t 3", right:"t 1" }
        ],
        subsets: {
            "Standard": ["corner", "cross", "empty", "line"],
            "Something": ["corner", "cross", "line"],
            "Crossless": ["corner", "empty", "line"],
            "TE": ["t", "empty"],
            "Only T": ["t"],
            "Urban": ["corner", "line"],
            "Suburban": ["corner", "empty"],
            "Manhattan": ["corner"],
            "Fabric": ["cross", "line"],
            "Dense Fabric": ["cross"]
        }
    },
    Rooms: {
        tilesize: 3,
        tiles: [
            { name:"bend", symmetry:"L", weight:0.5 },
            { name:"corner", symmetry:"L", weight:0.5 },
            { name:"corridor", symmetry:"I", weight:1.0 },
            { name:"door", symmetry:"T", weight:0.5 },
            { name:"empty", symmetry:"X" },
            { name:"side", symmetry:"T", weight:2.0 },
            { name:"t", symmetry:"T", weight:0.5 },
            { name:"turn", symmetry:"L", weight:0.25 },
            { name:"wall", symmetry:"X" }
        ],
        neighbors: [
            { left:"corner 1", right:"corner" },
            { left:"corner 2", right:"corner" },
            { left:"corner", right:"door" },
            { left:"corner", right:"side 2" },
            { left:"corner 1", right:"side 1" },
            { left:"corner 1", right:"t 1" },
            { left:"corner 1", right:"turn" },
            { left:"corner 2", right:"turn" },
            { left:"wall", right:"corner" },
            { left:"corridor 1", right:"corridor 1" },
            { left:"corridor 1", right:"door 3" },
            { left:"corridor", right:"side 1" },
            { left:"corridor 1", right:"t" },
            { left:"corridor 1", right:"t 3" },
            { left:"corridor 1", right:"turn 1" },
            { left:"corridor", right:"wall" },
            { left:"door 1", right:"door 3" },
            { left:"door 3", right:"empty" },
            { left:"door", right:"side 2" },
            { left:"door 1", right:"t" },
            { left:"door 1", right:"t 3" },
            { left:"door 1", right:"turn 1" },
            { left:"empty", right:"empty" },
            { left:"empty", right:"side 3" },
            { left:"side", right:"side" },
            { left:"side 3", right:"side 1" },
            { left:"side 3", right:"t 1" },
            { left:"side 3", right:"turn" },
            { left:"side 3", right:"wall" },
            { left:"t", right:"t 2" },
            { left:"t", right:"turn 1" },
            { left:"t 3", right:"wall" },
            { left:"turn", right:"turn 2" },
            { left:"turn 1", right:"wall" },
            { left:"wall", right:"wall" },
            { left:"bend", right:"bend 1" },
            { left:"corner", right:"bend 2" },
            { left:"door", right:"bend 2" },
            { left:"empty", right:"bend" },
            { left:"side", right:"bend 1" }
        ]
    },
    Summer: {
        tilesize: 48,
        unique: true,
        tiles: [
            { name:"cliff", symmetry:"T" },
            { name:"cliffcorner", symmetry:"L" },
            { name:"cliffturn", symmetry:"L" },
            { name:"grass", symmetry:"X" },
            { name:"grasscorner", symmetry:"L", weight:0.0001 },
            { name:"road", symmetry:"T", weight:0.1 },
            { name:"roadturn", symmetry:"L", weight:0.1 },
            { name:"water_a", symmetry:"X" },
            { name:"water_b", symmetry:"X" },
            { name:"water_c", symmetry:"X" },
            { name:"watercorner", symmetry:"L" },
            { name:"waterside", symmetry:"T" },
            { name:"waterturn", symmetry:"L" }
        ],
        neighbors: [
            { left:"cliff 0", right:"cliff 0" },
            { left:"cliff 2", right:"cliffcorner 1" },
            { left:"cliff 2", right:"cliffturn 2" },
            { left:"cliff 1", right:"grass 0" },
            { left:"grass 0", right:"cliff 1" },
            { left:"cliff 1", right:"road 3" },
            { left:"road 1", right:"cliff 1" },
            { left:"cliff 1", right:"roadturn 0" },
            { left:"roadturn 1", right:"cliff 1" },
            { left:"cliffcorner 0", right:"cliffturn 2" },
            { left:"cliffcorner 1", right:"road 3" },
            { left:"cliffcorner 1", right:"roadturn 0" },
            { left:"cliffcorner 1", right:"roadturn 3" },
            { left:"cliffcorner 1", right:"grass 0" },
            { left:"cliffturn 1", right:"grass 0" },
            { left:"cliffturn 1", right:"road 3" },
            { left:"cliffturn 1", right:"roadturn 0" },
            { left:"cliffturn 1", right:"roadturn 3" },
            { left:"grass 0", right:"grass 0" },
            { left:"grass 0", right:"road 3" },
            { left:"grass 0", right:"roadturn 0" },
            { left:"grass 0", right:"watercorner 0" },
            { left:"grass 0", right:"waterside 3" },
            { left:"grasscorner 1", right:"grasscorner 0" },
            { left:"grasscorner 1", right:"grasscorner 3" },
            { left:"grasscorner 1", right:"road 1" },
            { left:"grasscorner 3", right:"road 0" },
            { left:"grasscorner 3", right:"roadturn 1" },
            { left:"road 3", right:"road 1" },
            { left:"road 0", right:"road 0" },
            { left:"road 0", right:"roadturn 1" },
            { left:"road 1", right:"watercorner 0" },
            { left:"road 1", right:"waterside 3" },
            { left:"roadturn 1", right:"watercorner 0" },
            { left:"roadturn 1", right:"watercorner 3" },
            { left:"roadturn 1", right:"waterside 3" },
            { left:"water_a 0", right:"water_a 0" },
            { left:"water_a 0", right:"water_b 0" },
            { left:"water_a 0", right:"water_c 0" },
            { left:"water_a 0", right:"waterside 1" },
            { left:"water_a 0", right:"waterturn 1" },
            { left:"water_b 0", right:"waterside 1" },
            { left:"water_b 0", right:"waterturn 1" },
            { left:"water_c 0", right:"waterside 1" },
            { left:"water_c 0", right:"waterturn 1" },
            { left:"watercorner 0", right:"waterside 0" },
            { left:"watercorner 0", right:"waterturn 0" },
            { left:"waterside 0", right:"waterside 0" },
            { left:"waterside 0", right:"waterturn 0" }
        ]
    },
    FloorPlan: {
        tilesize: 9,
        tiles: [
            { name:"empty", symmetry:"X", weight:0.1 },
            { name:"out", symmetry:"L" },
            { name:"wall", symmetry:"T" },
            { name:"in", symmetry:"L" },
            { name:"floor", symmetry:"X" },
            { name:"halfglass", symmetry:"F" },
            { name:"glass", symmetry:"T" },

            { name:"walldiv", symmetry:"T" },
            { name:"divturn", symmetry:"L" },
            { name:"div", symmetry:"I" },
            { name:"divt", symmetry:"T" },
            { name:"stairs", symmetry:"T" },

            { name:"w", symmetry:"T" },
            { name:"window", symmetry:"T" },
            { name:"door", symmetry:"I", weight:0.5 },
            { name:"vent", symmetry:"X", weight:0.5 },
            { name:"table", symmetry:"X", weight:0.8 }
        ],
        neighbors: [
            { left:"empty", right:"empty" },
            { left:"empty", right:"out" },
            { left:"empty", right:"wall 3" },
            { left:"out", right:"wall" },
            { left:"wall", right:"wall" },
            { left:"wall", right:"in" },
            { left:"wall 3", right:"floor" },
            { left:"in", right:"floor" },
            { left:"floor", right:"floor" },

            { left:"empty", right:"halfglass 3" },
            { left:"out", right:"halfglass" },
            { left:"in 1", right:"halfglass" },
            { left:"halfglass 3", right:"floor" },
            { left:"halfglass", right:"glass" },
            { left:"glass", right:"glass" },
            { left:"empty", right:"glass 3" },
            { left:"glass 3", right:"floor" },

            { left:"empty", right:"walldiv 3" },
            { left:"out", right:"walldiv" },
            { left:"wall", right:"walldiv" },
            { left:"walldiv", right:"in" },
            { left:"walldiv", right:"halfglass" },
            { left:"divturn", right:"walldiv 1" },
            { left:"div", right:"walldiv 1" },
            { left:"divt", right:"walldiv 1" },

            { left:"wall 3", right:"divturn" },
            { left:"in", right:"divturn" },
            { left:"in", right:"divturn 3" },
            { left:"floor", right:"divturn" },
            { left:"halfglass 3", right:"divturn" },
            { left:"halfglass 3", right:"divturn 3" },
            { left:"glass 3", right:"divturn" },
            { left:"divturn 1", right:"divturn" },
            { left:"divturn 2", right:"divturn" },

            { left:"wall 3", right:"div 1" },
            { left:"in", right:"div 1" },
            { left:"floor", right:"div 1" },
            { left:"halfglass 3", right:"div 1" },
            { left:"glass 3", right:"div 1" },
            { left:"div 1", right:"divturn" },
            { left:"divturn", right:"div" },
            { left:"div", right:"div" },
            { left:"div 1", right:"div 1" },

            { left:"wall 3", right:"divt 1" },
            { left:"in", right:"divt 1" },
            { left:"floor", right:"divt 1" },
            { left:"halfglass 3", right:"divt 1" },
            { left:"glass 3", right:"divt 1" },
            { left:"divturn 1", right:"divt 1" },
            { left:"divturn", right:"divt" },
            { left:"div 1", right:"divt 1" },
            { left:"div", right:"divt" },
            { left:"div", right:"divt 3" },
            { left:"divt 3", right:"divt 1" },
            { left:"divt", right:"divt 2" },

            { left:"wall 3", right:"stairs 1" },
            { left:"in", right:"stairs 1" },
            { left:"floor", right:"stairs 1" },
            { left:"halfglass 3", right:"stairs 1" },
            { left:"glass 3", right:"stairs 1" },
            { left:"stairs 3", right:"divturn" },
            { left:"divturn", right:"stairs" },
            { left:"div 1", right:"stairs 1" },
            { left:"div", right:"stairs" },
            { left:"divt 3", right:"stairs 1" },
            { left:"divt 2", right:"stairs" },
            { left:"stairs 3", right:"stairs 1" },
            { left:"stairs 1", right:"stairs 3" },

            { left:"empty", right:"w 3" },
            { left:"out", right:"w" },
            { left:"w", right:"in" },
            { left:"floor", right:"w 1" },
            { left:"walldiv", right:"w" },
            { left:"w", right:"w" },
            { left:"w 3", right:"divturn" },
            { left:"w 3", right:"div 1" },
            { left:"w 3", right:"divt 1" },
            { left:"w 3", right:"stairs 1" },
            { left:"empty", right:"window 3" },
            { left:"out", right:"window" },
            { left:"window", right:"in" },
            { left:"floor", right:"window 1" },
            { left:"walldiv", right:"window" },
            { left:"window", right:"window" },
            { left:"window 3", right:"divturn" },
            { left:"window 3", right:"div 1" },
            { left:"window 3", right:"divt 1" },
            { left:"window 3", right:"stairs 1" },

            { left:"wall 3", right:"door 1" },
            { left:"in", right:"door 1" },
            { left:"floor", right:"door 1" },
            { left:"halfglass 3", right:"door 1" },
            { left:"glass 3", right:"door 1" },
            { left:"walldiv 3", right:"door" },
            { left:"w", right:"door 1" },
            { left:"window", right:"door 1" },
            { left:"door 1", right:"divturn" },
            { left:"divturn", right:"door" },
            { left:"div 1", right:"door 1" },
            { left:"div", right:"door" },
            { left:"divt 3", right:"door 1" },
            { left:"divt", right:"door" },
            { left:"divt 1", right:"door" },
            { left:"stairs 3", right:"door 1" },
            { left:"stairs", right:"door" },
            { left:"door 1", right:"door 1" },
            { left:"door", right:"door" },

            { left:"wall 3", right:"vent" },
            { left:"in", right:"vent" },
            { left:"halfglass 3", right:"vent" },
            { left:"glass 3", right:"vent" },
            { left:"w 3", right:"vent" },
            { left:"window 3", right:"vent" },
            { left:"vent", right:"divturn" },
            { left:"div 1", right:"vent" },
            { left:"divt 3", right:"vent" },
            { left:"vent", right:"vent" },
            { left:"stairs 3", right:"vent" },
            { left:"door 1", right:"vent" },
            { left:"wall 3", right:"table" },
            { left:"in", right:"table" },
            { left:"halfglass 3", right:"table" },
            { left:"glass 3", right:"table" },
            { left:"w 3", right:"table" },
            { left:"window 3", right:"table" },
            { left:"table", right:"divturn" },
            { left:"div 1", right:"table" },
            { left:"divt 3", right:"table" },
            { left:"table", right:"table" },
            { left:"stairs 3", right:"table" },
            { left:"door 1", right:"table" }
        ]
    }
};
import { data } from './data/simple-tiled-model-data'

var currentPreset = null,
    currentSubset = null,
    currentZoom = 2,
    loadingCanvas = document.createElement('canvas'),
    loadingContext = loadingCanvas.getContext('2d');
  
console.log(loadingCanvas)

var loadTile = function loadTile (tile, number, presetName, callback) {
    var img = new Image();
    img.onload = function () {
        loadingCanvas.width = img.width;
        loadingCanvas.height = img.height;
        loadingContext.drawImage(img, 0, 0 );

        var imageData = loadingContext.getImageData(0, 0, img.width, img.height);

        if (number === null) {
            tile.bitmap = imageData.data;
        } else {
            tile.bitmap[number] = imageData.data;
        }

        callback();
    };
    img.src = './data/' + presetName + '/' + tile.name + (number === null ? '' : ' ' + number) + '.png';
};

var selectPreset = function selectPreset (presetName, subsetName, callback) {
    var preset = data[presetName];
    currentPreset = preset;
    currentSubset = subsetName;

    if (!!preset.loaded) {
        callback();
    } else if (!!preset.unique) {
        var remaining = 0;

        var loadingCallback = function loadingCallback () {
            remaining = remaining - 1;

            if (remaining === 0 && currentPreset === preset) {
                preset.loaded = true;
                callback();
            }
        };

        for (var i = 0; i < preset.tiles.length; i++) {
            if (preset.tiles[i].symmetry === 'X') {
                remaining++;
                preset.tiles[i].bitmap = new Array(1);
                loadTile(preset.tiles[i], 0, presetName, loadingCallback);
            } else {
                remaining = remaining + 4;
                preset.tiles[i].bitmap = new Array(4);
                loadTile(preset.tiles[i], 0, presetName, loadingCallback);
                loadTile(preset.tiles[i], 1, presetName, loadingCallback);
                loadTile(preset.tiles[i], 2, presetName, loadingCallback);
                loadTile(preset.tiles[i], 3, presetName, loadingCallback);
            }
        }
    } else {
        var remaining = preset.tiles.length;

        var loadingCallback = function loadingCallback () {
            remaining = remaining - 1;

            if (remaining === 0 && currentPreset === preset) {
                preset.loaded = true;
                callback();
            }
        };

        for (var i = 0; i < preset.tiles.length; i++) {
            loadTile(preset.tiles[i], null, presetName, loadingCallback);
        }
    }
};

const myWorker = new Worker(new URL('./worker/simple-tiled-model-worker.ts', import.meta.url), {
  type: 'module'
})

var defaultOptions = {
    periodic: 0,
    width: 10,
    height: 10
};

var workerMessagesElements = document.getElementById('worker-messages');
console.log(workerMessagesElements)

var options = Object.assign({}, defaultOptions),
    optionsKeys = Object.keys(options),
    optionsElements = {},
    valueElement = {};

var generateCanvas = document.getElementById('generatedPattern'),
    generateContext = generateCanvas.getContext('2d'),
    generateData = null;

var generateButton = document.getElementById('generate');

optionsKeys.forEach(function (key) {
    optionsElements[key] = document.getElementById(key);
    valueElement[key] = optionsElements[key].parentNode.querySelector('.value');

    optionsElements[key].addEventListener('input', function () {
        var value = parseInt(this.value, 10);
        valueElement[key].innerHTML = value;
        options[key] = value;

        if (key === 'width' || key === 'height') {
            changeGenerateSize();
        }
    });

    if (key !== 'width' && key !== 'height') {
        optionsElements[key].addEventListener('dblclick', function () {
            var value = Math.max(0, parseInt(optionsElements[key].min, 10));
            optionsElements[key].value = value;
            valueElement[key].innerHTML = value;
            options[key] = value;
        });
    }
});

var select = document.getElementById('preset');

function changeGenerateSize () {
    var width = options.width;
    var height = options.height;
    var tilesize = currentPreset && currentPreset.tilesize ? currentPreset.tilesize : 5;

    generateCanvas.width = width * tilesize;
    generateCanvas.height = height * tilesize;
    generateCanvas.style.width = (width * tilesize * currentZoom) + 'px';
    generateCanvas.style.height = (height * tilesize * currentZoom) + 'px';

    if (generateData !== null) {
        generateContext.putImageData(generateData, 0, 0);
        generateData = generateContext.getImageData(0, 0, width * tilesize, height * tilesize);
    }
}

var updateGenerateData = function updateGenerateData () {
    if (generateData === null || generateCanvas.width != options.width || generateCanvas.height != options.height) {
        var tilesize = currentPreset && currentPreset.tilesize ? currentPreset.tilesize : 5;

        generateCanvas.width = options.width * tilesize;
        generateCanvas.height = options.height * tilesize;
        generateCanvas.style.width = (options.width * tilesize * currentZoom) + 'px';
        generateCanvas.style.height = (options.height * tilesize * currentZoom) + 'px';
        generateData = generateContext.createImageData(options.width * tilesize, options.height * tilesize);
    }
};

select.addEventListener('change', function () {
    document.body.classList.remove('allow-generation');

    var val = select.value;

    if (val.length === 0) {
        return;
    }

    var valX = val.split(':'),
        presetName = valX[0],
        subsetName = valX.length > 1 ? valX[1] : null;

    var presentOption = select.options[select.selectedIndex];

    currentZoom = parseInt(presentOption.getAttribute('data-zoom'), 10) || 2;

    for (var i = 0; i < optionsKeys.length; i++) {
        var key = optionsKeys[i];
        var value = presentOption.getAttribute('data-' + key);
        options[key] = (value === null ? defaultOptions[key] : parseInt(value, 10));
        optionsElements[key].value = options[key];
        valueElement[key].innerHTML = options[key];
    }

    selectPreset(presetName, subsetName, function () {
        document.body.classList.add('allow-generation');
    });

    updateGenerateData();
});

myWorker.onmessage = function (e) {
    if (e.data.type === 'message') {
        var p = document.createElement('p');
        p.innerText = e.data.message;
        workerMessagesElements.appendChild(p);
    } else {
        generateData = new ImageData(
            new Uint8ClampedArray(e.data.data),
            options.width * currentPreset.tilesize,
            options.height * currentPreset.tilesize
        );

        if (e.data.finished) {
            generateContext.putImageData(generateData, 0, 0);
        }

        setTimeout(function () {
            document.body.classList.remove('computing');
        }, 600);
    }
};

generateButton.addEventListener('click', function () {
    workerMessagesElements.innerHTML = null;
    document.body.classList.add('computing');

    var message = {
        generateData: generateData.data.buffer,
        data: currentPreset,
        subset: currentSubset,
        width: options.width,
        height: options.height,
        periodic: options.periodic,
        black: 1
    };
    console.log(message)

    myWorker.postMessage(message, [message.generateData]);
});
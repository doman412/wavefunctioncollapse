import { SimpleTiledModel } from '../../src/index'

onmessage = function(e) {
    postMessage({type:'message', message: '> Initiated the WebWorker'});

    var tries = 0;
    var instance = new SimpleTiledModel(e.data.data, e.data.subset, e.data.width, e.data.height, e.data.periodic);
    console.log(instance)

    postMessage({type:'message', message: '> Instantiated SimpleTiledModel'});


    var finished = false;
    var time;

    do {
        tries++;
        postMessage({type:'message', message: '> Generation attempt #' + tries + ' out of 5'});
        time = Date.now();
        finished = instance.generate();
        console.log(instance.tiles)
        postMessage({type:'message', message: '> Generation completed ' + (finished ? 'successfully' : 'unsuccessfully') + ' in ' + ((Date.now() - time) / 1000).toFixed(3) + 's'});
    } while (tries < 5 && !finished);

    var messageObject = {
        type: 'data',
        data: finished ? instance.graphics(new Uint8Array(e.data.generateData)).buffer : e.data.generateData,
        finished: finished
    };

    postMessage(messageObject, [messageObject.data]);
};

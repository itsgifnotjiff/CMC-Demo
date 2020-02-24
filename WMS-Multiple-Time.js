
var layers_map_1 = [
            new ol.layer.Tile({
            source: new ol.source.OSM()
            }),
            new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: {'LAYERS': 'RADAR_1KM_RSNO'},
                ratio: 1,
                serverType: 'mapserver'
            })
            })
        ]

var layers_map_2 = [
            new ol.layer.Tile({
            source: new ol.source.OSM()
            }),
            new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: {'LAYERS': 'CURRENT_CONDITIONS'},
                ratio: 1,
                serverType: 'mapserver'
            })
            })
        ]
var layers_map_3 = [
            new ol.layer.Tile({
            source: new ol.source.OSM()
            }),
            new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'https://geo.weather.gc.ca/geomet',
                params: {'LAYERS': 'HRDPS.CONTINENTAL_TT'},
                ratio: 1,
                serverType: 'mapserver'
            })
            })
        ]

var layers_map_4 = [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        }),
        new ol.layer.Image({
            source: new ol.source.ImageWMS({
            url: 'https://geo.weather.gc.ca/geomet',
            params: {'LAYERS': 'HRDPS.CONTINENTAL_HU'},
            ratio: 1,
            serverType: 'mapserver'
        }),
        opacity: 0.4
        })
    ]

var view_map_1 = new ol.View({center: ol.proj.fromLonLat([-100, 45]),zoom: 4})

var map1 = new ol.Map({
    target: 'map1',
    layers: layers_map_1,
    view: view_map_1
});


var map2 = new ol.Map({
    target: 'map2',
    layers: layers_map_2,
    view: new ol.View({
        center: ol.proj.fromLonLat([-100, 45]),
        zoom: 4
    })
});

var map3 = new ol.Map({
    target: 'map3',
    layers: layers_map_3,
    view: new ol.View({
        center: ol.proj.fromLonLat([-100, 45]),
        zoom: 4
    })
});

var map4 = new ol.Map({
    target: 'map4',
    layers: layers_map_4,

    view: new ol.View({
        center: ol.proj.fromLonLat([-100, 45]),
        zoom: 4
    })
});

function sync() {
	map2.setView(map1.getView());
	map3.setView(map1.getView());
	map4.setView(map1.getView());
    
}

function sync1() {
    map2.setView(map1.getView());
    map3.setView(map1.getView());
    map4.setView(map1.getView());
    
}
function sync2() {
    map1.setView(map2.getView());
    map3.setView(map2.getView());
    map4.setView(map2.getView());
}
function sync3() {
    map1.setView(map3.getView());
    map2.setView(map3.getView());
    map4.setView(map3.getView()); 
}
function sync4() {
    map1.setView(map4.getView());
    map2.setView(map4.getView());
    map3.setView(map4.getView()); 
}

function unsync() {
    map2.setView(new ol.View({
        projection: map2.getView().getProjection(),
        center: map2.getView().getCenter(),
        resolution: map2.getView().getResolution(),
        rotation: map2.getView().getRotation(),
        maxZoom: map2.getView().getMaxZoom(),
        minZoom: map2.getView().getMinZoom()
    }));
    map3.setView(new ol.View({
        projection: map3.getView().getProjection(),
        center: map3.getView().getCenter(),
        resolution: map3.getView().getResolution(),
        rotation: map3.getView().getRotation(),
        maxZoom: map3.getView().getMaxZoom(),
        minZoom: map3.getView().getMinZoom()
    }));
    map4.setView(new ol.View({
        projection: map4.getView().getProjection(),
        center: map4.getView().getCenter(),
        resolution: map4.getView().getResolution(),
        rotation: map4.getView().getRotation(),
        maxZoom: map4.getView().getMaxZoom(),
        minZoom: map4.getView().getMinZoom()
    }));
}

const parser = new DOMParser();

async function getTitle_1() {
  let response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=RADAR_1KM_RSNO')
  let data = await response.text().then(
    data => parser.parseFromString(data, 'text/xml').getElementsByTagName('Title')[5].innerHTML
  )
  return data
}

async function getTitle_2() {
  let response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=CURRENT_CONDITIONS')
  let data = await response.text().then(
    data => parser.parseFromString(data, 'text/xml').getElementsByTagName('Title')[3].innerHTML
  )
  return data
}

async function getTitle_3() {
  let response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=HRDPS.CONTINENTAL_TT')
  let data = await response.text().then(
    data => parser.parseFromString(data, 'text/xml').getElementsByTagName('Title')[5].innerHTML
  )
  return data
}

async function getTitle_4() {
  let response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=HRDPS.CONTINENTAL_HU')
  let data = await response.text().then(
    data => parser.parseFromString(data, 'text/xml').getElementsByTagName('Title')[5].innerHTML
  )
  return data
}


async function getRadarStartEndTime() {
  let response = await fetch('https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=RADAR_1KM_RSNO')
  let data = await response.text().then(
    data => parser.parseFromString(data, 'text/xml').getElementsByTagName('Dimension')[0].innerHTML.split('/')
  )
  return [new Date(data[0]), new Date(data[1])]
}

var frameRate = 5.0;
var animationId = null;
let current_time = null;

async function updateInfo(current_time) 
{
    let el = document.getElementById('info');
    el.innerHTML = `Time : ${current_time.toISOString()}`
}

async function updateTitle_1() 
{
    let title_1 =  await getTitle_1();
    let el = document.getElementById('Title_1');
    el.innerHTML = `Title 1 : ${title_1}`
}

async function updateTitle_2() 
{
    let title_2 =  await getTitle_2();
    let el = document.getElementById('Title_2');
    el.innerHTML = `Title 2 : ${title_2}`
}

async function updateTitle_3() 
{
    let title_3 =  await getTitle_3();
    let el = document.getElementById('Title_3');
    el.innerHTML = `Title 3 : ${title_3}`
}

async function updateTitle_4() 
{
    let title_4 =  await getTitle_4();
    let el = document.getElementById('Title_4');
    el.innerHTML = `Title 4 : ${title_4}`
}


function setTime() {
  current_time = current_time
  getRadarStartEndTime().then(data => {
    if (current_time === null) {
      current_time = data[0];
    } else if (current_time >= data[1]) {
      current_time = data[0]
    } else {
      current_time = new Date(current_time.setMinutes(current_time.getMinutes() + 10));
    }
    layers_map_1[1].getSource().updateParams({'TIME': current_time.toISOString().split('.')[0]+"Z"});
    updateInfo(current_time)
  });
  updateTitle_1();
  updateTitle_2();
  updateTitle_3();
  updateTitle_4();
}

setTime();

var stop = function() 
{
    if (animationId !== null) 
    {
        window.clearInterval(animationId);
        animationId = null;
    }
};

var play = function() 
{
    stop();
    animationId = window.setInterval(setTime, 1000 / frameRate);
};

var startButton = document.getElementById('play');
startButton.addEventListener('click', play, false);

var stopButton = document.getElementById('pause');
stopButton.addEventListener('click', stop, false);

updateInfo();

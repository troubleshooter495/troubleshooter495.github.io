initMap();

async function initMap() {
    await ymaps3.ready;
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature, YMapFeatureDataSource, YMapLayer } = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: { center: [38.0, 55.0], zoom: 4}, // [37.588144, 55.733842]
        mode: 'vector',
        restrictMapArea: [
            [16.0, 30.0], // Координаты юго-западного угла ограниченной области
            [170.0, 79.0]  // Координаты северо-восточного угла ограниченной области
        ]
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    map.addChild(
        new YMapFeatureDataSource({
            id: 'featureSource'
        })
    );

    map.addChild(
        new YMapLayer({
            source: 'featureSource',
            type: 'features',
            zIndex: 2010
        })
    );
    // [
    //     [34.218958, 55.677464,],
    //     [37.484504, 57.342795],
    //     [40.687084, 55.757388],
    //     [37.631454, 54.158750]
    // ]

    COORDINATES.forEach(item => {
        console.log(`ID: ${item.id}, Coordinates: ${item.coords}`);

        polygonFeature = new YMapFeature({
            id: item.id,
            class: 'node',
            source: 'featureSource',
            geometry: {
                type: 'Polygon',
                coordinates: item.coords
            },
            style: {
                stroke: [{width: 3, color: 'rgb(246, 0, 2)'}],
                fill: 'rgba(246, 0, 2, 0.5)'
            }
        });
        map.addChild(polygonFeature);
    });


    function clickCallback(e) {
        if (e) {
            console.log(e)
            var id = e.entity._props.id

            document.querySelectorAll('.polygon-info').forEach(div => {
                div.classList.remove('active');
            });

            document.getElementById(id).classList.add('active');
            // document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Создание объекта-слушателя.
    const mapListener = new ymaps3.YMapListener({
        layer: 'any',
        // Добавление обработчиков на слушатель.
        onClick: clickCallback,
    });
    map.addChild(mapListener);
}

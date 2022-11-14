function displayGaugeChart(wfreq) {
    // Trig to calc wash frequency point
    var degrees = 9 - wfreq,
        radius = .5;
    var radians = degrees * Math.PI / 9;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [
        { 
            type: 'scatter',
            x: [0], 
            y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'wfreq',
            text: wfreq,
            hoverinfo: 'text+name'
        },
        { 
            values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
            rotation: 105,
            text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:[
            "#84b589",
            "#89bc8d",
            "#8ac086",
            "#b7cd8f",
            "#d5e599",
            "#e5e8b0",
            "#e9e6c9",
            "#f4f1e4",
            "#f8f3ec", 
            'white']},
            labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }
    ];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 400,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}
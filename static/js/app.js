const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dataset = []

d3.json(url).then(function(data) {
    console.log(data);
    dataset = data

    init();
});

function init() {
    // Display Test Subject ID No dropdown
        d3.select("#selDataset")
        .selectAll("option")
        .data(dataset.samples)
        .enter()
        .append("option")
        .attr("value", function (d) { return d.id; })
        .text(function (d) { return d.id; });

    // Display the default demographics
    displayMetadata(dataset.samples[0].id);
    
    // Display the default horizontal bar chart plot
    displayBarChart(dataset.samples[0]);

    // Display the default bubble chart plot
    displayBubbleChart(dataset.samples[0]);
}

function displayBarChart(data) {
    console.log("display bar chart");
    let barData = [{
        type: "bar",
        showlegend: false,
        x: data.sample_values.slice(0,10),
        y: data.otu_ids.slice(0,10),
        hovertext: data.otu_labels.slice(0,10),
        orientation: 'h',
        marker: {
            sizemin: 8
        }
    }];

    let layout = {
        height: 600,
        width: 400
    };

    Plotly.newPlot("bar", barData, layout);
}

function displayBubbleChart(data) {
    console.log("display bubble chart");
    let bubbleData = [{
        type: "bubble",
        showlegend: false,
        x: data.otu_ids.slice(0,10),
        y: data.sample_values.slice(0,10),
        mode: 'markers',
        marker: {
            color: data.otu_ids.slice(0,10),
            size: data.sample_values.slice(0,10)
        },
        text: data.otu_labels.slice(0,10),
    }];

    let layout = {
        margin: { t: 0, b: 0 }
    }

    Plotly.newPlot("bubble", bubbleData, layout);
}

function displayMetadata(subjectId) {
    console.log("display metadata");
    let metadata = dataset.metadata.filter(meta => meta.id == subjectId)[0]
    console.log(metadata);
    let data = Object.entries(metadata);
    console.log(data);

    d3.select("#sample-metadata")
    .html("")
    .selectAll("p")
    .data(data)
    .enter()
      .append("p")
      .text(function (d) { return d[0] + ": " + d[1]; });

    displayGaugeChart(metadata.wfreq)
}

function optionChanged(subjectId) {
    console.log("test subject changed");
    console.log(subjectId);
    displayMetadata(subjectId);

    let subjectData = dataset.samples.filter(sample => sample.id == subjectId)[0];
    console.log(subjectData);

    displayBarChart(subjectData);

    displayBubbleChart(subjectData);
}


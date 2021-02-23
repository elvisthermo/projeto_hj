
function pieChart(data, name, svg) {
    let width = 250;
    let height = 250;
    let margin = { top: 30, right: 30, bottom: 30, left: 30 }

    const dataset = data;


    svg
        .attr("width", width)
        .attr("height", height)

    const radius = Math.min(width, height) / 2

    const pie = d3.pie()
        .padAngle(0.005)
        .sort(null)
        .value(d => d.value)

    arcs = pie(dataset)

    const arc = d3.arc().innerRadius(radius * 0.01).outerRadius(radius)

    const color = d3.scaleOrdinal()
        .domain(dataset.map(d =>d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())


    svg.selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
        .attr("transform", `translate(${width / 2},${height / 2})`)


    svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)

        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .attr("font-size", "12px")
            .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("font-size", "10px")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value.toLocaleString()))


}
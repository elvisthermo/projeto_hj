// 

function barchart(data, eixoX, eixoY, svg) {
    let width = 400;
    let height = 200;
    let margin = { top: 30, right: 30, bottom: 30, left: 30 }

    svg
        .attr("width", width)
        .attr("height", height)

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[eixoY])]).nice()
        .range([height - margin.bottom, margin.top])

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .style('font-size', "8px")
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data[eixoX]))



    svg.append("g")
        .attr("fill", 'steelblue')
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d[eixoY]))
        .attr("height", d => y(0) - y(d[eixoY]))
        .attr("width", x.bandwidth());
    svg
        .selectAll("text")
        .data(data)
        .join("text")
        .text(d => d[eixoY])
        .attr('x',(d, i) => x(i)+ x.bandwidth() / 2)
        .attr('y', d => y(d[eixoY]))
        .attr('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .style('font-size', "12px")
        .style('fill', 'black');

    svg.append("g")
        .call(xAxis);

}
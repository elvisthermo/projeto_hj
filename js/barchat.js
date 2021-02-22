// 

function barchart(data, eixoX, eixoY, svg) {
    let width = 600;
    let height = 200;
    let margin = { top: 30, right: 30, bottom: 30, left: 30 }

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[eixoY])]).nice()
        .range([height - margin.bottom, margin.top])

        console.log(data);
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

    svg.append("g")
        .call(xAxis);

    // svg.append("g")
    //     .call(yAxis);


    // const x = d3
    //     .scaleBand()
    //     .domain(results.map(d => d[eixoX]))
    //     .range([0, width])
    //     .padding(0.1)

    // const y = d3
    //     .scaleLinear()
    //     .domain([0, d3.max(results, d => d[eixoY])])
    //     .range([height, 0])

    // const g = svg
    //     .append('g')
    //     .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // g.append('g').call(d3.axisLeft(y));

    // g.append('g')
    //     .attr('transform', `translate(0, ${height})`) //move x axis to the bottom
    //     .call(d3.axisBottom(x))
    //     .selectAll('text')
    //     .attr('x', x.bandwidth() / 2)
    //     .attr('y', 0)
    //     .attr('dy', '.35em')
    //     .attr('transform', 'rotate(90)')
    //     .attr('text-anchor', 'start');

    // let bar = g
    //     .selectAll('.bar')
    //     .data(results)
    //     .enter()
    //     .append('g')
    //     .attr('class', 'bar-group');

    // bar
    //     .append('rect')
    //     .attr('class', '.bar')
    //     .attr('x', d => x(d[eixoX]))
    //     .attr('y', d => y(d[eixoY]))
    //     .attr('width', x.bandwidth())
    //     .attr('height', d => height - y(d[eixoY]))
    //     .style('fill', 'steelblue');

    // bar
    //     .append('text')
    //     .text(d => d.sales)
    //     .attr('x', d => x(d[eixoX]) + x.bandwidth() / 2)
    //     .attr('y', d => y(d[eixoY]) + 15)
    //     .attr('text-anchor', 'middle')
    //     .style('font-family', 'sans-serif')
    //     .style('font-size', 12)
    //     .style('fill', 'white');
}
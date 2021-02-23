async function main() {

    function loadDataSet() {
        const dataset = d3.csv("/database/vendas-TF.csv", function (data) {
            return data;
        });

        return dataset;
    }

    function loadDataSetAnos(ano) {
        const dataset = d3.csv("/database/vendas-TF.csv", function (data) {
            if (data.ano === ano) {
                return data;
            }
        });

        return dataset;
    }

    function tratamentoPieChartDadosCount(data, attr) {

        let values = data.map(d => d[attr]);
        var valores = values;
        var unique = [... new Set(valores)].sort();

        let arrays_attr = [];
        for (let index = 0; index < unique.length; index++) {
            let count = 0;
            data.map(d => {
                if (d[attr] === unique[index]) {
                    count += 1;
                }
            })

            arrays_attr.push({ "name": unique[index], "value": count*100/data.length });
        }
        return arrays_attr;
    }


    function tratamentoBarChartDadosCount(data, attr) {

        let values = data.map(d => d[attr]);
        var valores = values;
        var unique = [... new Set(valores)].sort();

        let arrays_attr = [];
        for (let index = 0; index < unique.length; index++) {
            let count = 0;
            data.map(d => {
                if (d[attr] === unique[index]) {
                    count += 1;
                }
            })
            arrays_attr.push({ "name": unique[index], "size": count });
        }
        return arrays_attr;
    }


    function tratamentoDadosSomar(data, attrX, attrY) {
        let values = data.map(d => d[attrX]);
        var valores = values;

        var unique = [... new Set(valores)].sort();

        let arrays_attr = [];
        for (let index = 0; index < unique.length; index++) {
            let soma = 0;
            data.map(d => {
                if (d[attrX] === unique[index]) {

                    soma += parseFloat(d[attrY]);
                }
            })
            arrays_attr.push({ "name": unique[index], [attrY]: soma });
        }
        return arrays_attr;
    }


    function filtro_dataset(data, coluna, valor) {
        return data.filter(d => d[coluna] === valor);
    }


    // let dataset2016 = await loadDataSetAnos("2016");
    // let dataset2017 = await loadDataSetAnos("2017");
    // let dataset2018 = await loadDataSetAnos("2018");


    // const dataset_load_ano = await filtro_dataset(dataset_load, "mes", "JUN")
    // const dataset_load_ano_mes = await filtro_dataset(dataset_load_ano, "ano", "2016")
    // const filtro_marca = filtro_dataset(dataset_load_ano_mes, "marca", "KIA")

    // console.log("mes", dataset_load_ano);
    // console.log("mes", dataset_load_ano_mes);
    // console.log("marca", filtro_marca);


    // const modelos_contados2016 = await tratamentoDadosCount(dataset2016, "modelo");
    // const modelos_contados2017 = await tratamentoDadosCount(dataset2017, "modelo");
    // const modelos_contados2018 = await tratamentoDadosCount(dataset2018, "modelo");

    // const modelos_valor_2018 = await tratamentoDadosSomar(filtro_marca, "modelo", "preco");

    // const modelos_margem_2018 = await tratamentoDadosSomar(filtro_marca, "modelo", "margem");
    // console.log("margem:", modelos_margem_2018);

    // const modelos_qtd_2018 = await tratamentoDadosCount(filtro_marca, "modelo");


    // console.log("size count", modelos_contados2016);

    // console.log("preco 2018", modelos_valor_2018);

    // console.log(dataset2016)
    // console.log(dataset2017)
    // console.log(dataset2018)
    // console.log("teste:", dataset_load);

    const dataset_load = await loadDataSet();

    // tratamento de dados 
    const modelo_qtd = await tratamentoBarChartDadosCount(dataset_load, "modelo");
    const modelo_valor = await tratamentoDadosSomar(dataset_load, "modelo", "preco");
    const modelo_margem = await tratamentoDadosSomar(dataset_load, "modelo", "margem");

    const marca_qtd = await tratamentoPieChartDadosCount(dataset_load, "marca");
    const marca_qtd_bar = await tratamentoBarChartDadosCount(dataset_load, "marca");
    const marca_valor = await tratamentoDadosSomar(dataset_load, "marca", "preco");
    const marca_margem = await tratamentoDadosSomar(dataset_load, "marca", "margem");

    const estilo_qtd = await tratamentoPieChartDadosCount(dataset_load, "estilo");
    const estilo_qtd_bar = await tratamentoBarChartDadosCount(dataset_load, "estilo");
    const estilo_valor = await tratamentoDadosSomar(dataset_load, "estilo", "preco");
    const estilo_margem = await tratamentoDadosSomar(dataset_load, "estilo", "margem");



    // containers svg
    const svgModelo_1 = d3.select("#qtd_modelo");
    const svgModelo_2 = d3.select("#preco_modelo");
    const svgModelo_3 = d3.select("#margem_modelo");


    const svgMarcaParticipacao = d3.select("#piechart_marca");
    const svgMarca_1 = d3.select("#qtd_marca");
    const svgMarca_2 = d3.select("#preco_marca");
    const svgMarca_3 = d3.select("#margem_marca");

    const svgEstiloParticipacao = d3.select("#piechart_estilo");
    const svgEstilo_1 = d3.select("#qtd_estilo");
    const svgEstilo_2 = d3.select("#preco_estilo");
    const svgEstilo_3 = d3.select("#margem_estilo");


    // bachart d3
    barchart(modelo_qtd, "modelo", "size", svgModelo_1);
    barchart(modelo_valor, "modelo", "preco", svgModelo_2);
    barchart(modelo_margem, "modelo", "margem", svgModelo_3);

    // piechart
    pieChart(marca_qtd, "value", svgMarcaParticipacao)
    barchart(marca_qtd_bar, "marca", "size", svgMarca_1);
    barchart(marca_valor, "marca", "preco", svgMarca_2);
    barchart(marca_margem, "marca", "margem", svgMarca_3);

    pieChart(estilo_qtd, "value", svgEstiloParticipacao)
    barchart(estilo_qtd_bar, "estilo", "size", svgEstilo_1);
    barchart(estilo_valor, "estilo", "preco", svgEstilo_2);
    barchart(estilo_margem, "estilo", "margem", svgEstilo_3);

    // painel 2


    // barchart(modelos_qtd_2018, "modelo", "size", svgMarca_1);
}

main();
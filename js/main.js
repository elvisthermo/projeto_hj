async function main() {
    function loadDataSet() {
        const dataset = d3.csv("/database/vendas-TF.csv", function (data) {
            return data;
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

            arrays_attr.push({ "name": unique[index], "value": count * 100 / data.length });
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


    function filtro_dataset_ano(data, coluna, valores) {
        const dataset = [];
        const valor = valores;
        for (let i = 0; i < valores.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if(data[j][coluna] == valores[i]){
                    dataset.push(data[j]);
                }
                
            }
        }
        return dataset;
    }

    const dataset_load = await loadDataSet();
    let novoDataset;

    document.getElementById("filtro_marca").addEventListener("change", filtro_marca);

    document.getElementById("filtro_filial").addEventListener("change", filtro_marca);

    document.getElementById("filtro_ano").addEventListener("change", filtro_marca);

    const elements = document.getElementsByClassName("filtro_mes");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', filtro_marca, false);
    }

    function filtro_marca() {
        let atributo_marca = document.getElementById("filtro_marca").value;
        let atributo_filial = document.getElementById("filtro_filial").value;
        let atributo_ano = document.getElementById("filtro_ano").value;

        var array_check = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array_check.push(checkboxes[i].value)
        }


        let datesetFiltros_2 = dataset_load;

        if (atributo_filial === "...") {
            tratarDados(dataset_load)
        }
        if (atributo_filial != "...") {
            datesetFiltros_2 = filtro_dataset(datesetFiltros_2, "filial", atributo_filial);
            tratarDados(datesetFiltros_2)
        }
        if (atributo_marca != "...") {
            datesetFiltros_2 = filtro_dataset(datesetFiltros_2, "marca", atributo_marca);
            tratarDados(datesetFiltros_2)
        }
        if (atributo_ano != "...") {
            datesetFiltros_2 = filtro_dataset(datesetFiltros_2, "ano", atributo_ano);
            tratarDados(datesetFiltros_2)
        }
        if (array_check.length) {
            datesetFiltros_2 = filtro_dataset_ano(datesetFiltros_2, "mes", array_check);
            tratarDados(datesetFiltros_2)
        }


    };

    async function tratarDados(dados) {
        // tratamento de dados 
        const modelo_qtd = await tratamentoBarChartDadosCount(dados, "modelo");
        const modelo_valor = await tratamentoDadosSomar(dados, "modelo", "preco");
        const modelo_margem = await tratamentoDadosSomar(dados, "modelo", "margem");


        const marca_qtd_bar = await tratamentoBarChartDadosCount(dados, "marca");
        const marca_valor = await tratamentoDadosSomar(dados, "marca", "preco");
        const marca_margem = await tratamentoDadosSomar(dados, "marca", "margem");


        const estilo_qtd_bar = await tratamentoBarChartDadosCount(dados, "estilo");
        const estilo_valor = await tratamentoDadosSomar(dados, "estilo", "preco");
        const estilo_margem = await tratamentoDadosSomar(dados, "estilo", "margem");

        // bachart d3
        barchart(modelo_qtd, "modelo", "size", svgModelo_1);
        barchart(modelo_valor, "modelo", "preco", svgModelo_2);
        barchart(modelo_margem, "modelo", "margem", svgModelo_3);

        // piechart

        barchart(marca_qtd_bar, "marca", "size", svgMarca_1);
        barchart(marca_valor, "marca", "preco", svgMarca_2);
        barchart(marca_margem, "marca", "margem", svgMarca_3);


        barchart(estilo_qtd_bar, "estilo", "size", svgEstilo_1);
        barchart(estilo_valor, "estilo", "preco", svgEstilo_2);
        barchart(estilo_margem, "estilo", "margem", svgEstilo_3);


    }

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


    //filtro
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


}

main();


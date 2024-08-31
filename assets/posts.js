// 假设数据已准备为以下格式：
const treeData = [
    {
        name: "根节点",
        gini: 0.5,
        children: [
            // ...子节点
        ]
    }
];

// 使用D3.js创建树形图
const svg = d3.select("#tree-chart")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600);

const g = svg.append("g")
    .attr("transform", "translate(20,0)");

// ... D3.js的树形布局和节点、连线的生成代码
// 在生成节点时，可以将基尼系数作为节点的属性，并在鼠标悬停时显示

// 示例：
const node = g.selectAll(".node")
    .data(root)
    .enter().append("g")
    .attr("class", "node")
    .on("mouseover", function (d) {
        // 显示工具提示，显示节点的基尼系数
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("基尼系数：" + d.data.gini)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
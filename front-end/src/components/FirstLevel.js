import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

var fetch = require("node-fetch");
let mockDataFileName = window.location.search.substring(
  window.location.search.indexOf("=") + 1,
  window.location.search.length
);

// var data = fetch("../json-data/firstLevelData.json").then(response => {
//   return response.json();
// });

var data = require("./json-data/firstLevelData.json");

class FirstLevel extends Component {
  componentDidMount() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("first_lvl", am4charts.RadarChart);

    // Add data
    chart.data = data;

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add("fill", function(
      fill,
      target
    ) {
      return target.dataItem.index >= 0
        ? chart.colors.getIndex(target.dataItem.index)
        : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    //chart.cursor = new am4charts.RadarCursor();
  }
  render() {
    return <div id="first_lvl" style={{ width: "40%", height: "200px" }} />;
  }
}

export default FirstLevel;

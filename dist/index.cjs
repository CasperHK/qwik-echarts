"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  QwikECharts: () => QwikECharts,
  QwikLineChart: () => QwikLineChart
});
module.exports = __toCommonJS(index_exports);

// src/components/qwik-echarts.tsx
var import_qwik = require("@builder.io/qwik");
var import_jsx_runtime = require("@builder.io/qwik/jsx-runtime");
var QwikECharts = (0, import_qwik.component$)((props) => {
  const containerRef = (0, import_qwik.createSignal)();
  const chartRef = (0, import_qwik.createSignal)(void 0);
  const resizeObserverRef = (0, import_qwik.createSignal)(void 0);
  (0, import_qwik.useVisibleTask$)(({ track }) => {
    const options = track(() => props.options);
    const theme = track(() => props.theme);
    const autoResize = track(() => props.autoResize);
    const container = containerRef.value;
    if (!container) {
      return;
    }
    let active = true;
    void (async () => {
      const echarts = await import("echarts");
      if (!active) {
        return;
      }
      const chart = chartRef.value ?? echarts.init(container, theme, { renderer: "canvas" });
      chartRef.value = chart;
      chart.setOption(options, { notMerge: false, replaceMerge: ["series"] });
      if (autoResize !== false) {
        if (!resizeObserverRef.value) {
          const observer = new ResizeObserver(() => {
            chart.resize();
          });
          observer.observe(container);
          resizeObserverRef.value = observer;
        }
        chart.resize();
      } else {
        resizeObserverRef.value?.disconnect();
        resizeObserverRef.value = void 0;
      }
    })();
    return () => {
      active = false;
    };
  });
  (0, import_qwik.useTask$)(() => {
    return () => {
      resizeObserverRef.value?.disconnect();
      chartRef.value?.dispose();
      chartRef.value = void 0;
      resizeObserverRef.value = void 0;
    };
  });
  const height = props.height ?? 400;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: containerRef,
      class: props.class,
      style: {
        width: "100%",
        height: `${height}px`,
        ...props.style
      }
    }
  );
});

// src/components/qwik-line-chart.tsx
var import_qwik2 = require("@builder.io/qwik");

// src/components/line-chart-options.ts
function buildLineChartOptions(props) {
  const series = (props.series?.length ? props.series : [{ name: props.seriesName ?? "Series", data: props.data ?? [] }]).map((item) => ({
    type: "line",
    name: item.name ?? props.seriesName ?? "Series",
    data: item.data.map(
      (entry) => typeof entry === "number" ? entry : { value: entry.value, name: entry.name }
    ),
    smooth: item.smooth ?? props.smooth ?? true,
    color: item.color ?? props.color
  }));
  return {
    title: props.title ? { text: props.title } : void 0,
    tooltip: { trigger: "axis" },
    legend: props.legend ? { data: series.map((item) => item.name).filter((name) => Boolean(name)) } : void 0,
    xAxis: {
      type: "category",
      data: props.xAxisData
    },
    yAxis: {
      type: "value",
      name: props.yAxisName
    },
    series
  };
}

// src/components/qwik-line-chart.tsx
var import_jsx_runtime2 = require("@builder.io/qwik/jsx-runtime");
var QwikLineChart = (0, import_qwik2.component$)((props) => {
  const options = buildLineChartOptions(props);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    QwikECharts,
    {
      options,
      height: props.height,
      class: props.class,
      style: props.style
    }
  );
});

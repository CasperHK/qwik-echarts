// src/components/qwik-echarts.tsx
import {
  component$,
  createSignal,
  useTask$,
  useVisibleTask$
} from "@builder.io/qwik";
import { jsx } from "@builder.io/qwik/jsx-runtime";
var QwikECharts = component$((props) => {
  const containerRef = createSignal();
  const chartRef = createSignal(void 0);
  const resizeObserverRef = createSignal(void 0);
  useVisibleTask$(({ track }) => {
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
  useTask$(() => {
    return () => {
      resizeObserverRef.value?.disconnect();
      chartRef.value?.dispose();
      chartRef.value = void 0;
      resizeObserverRef.value = void 0;
    };
  });
  const height = props.height ?? 400;
  return /* @__PURE__ */ jsx(
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
import { component$ as component$2 } from "@builder.io/qwik";

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
import { jsx as jsx2 } from "@builder.io/qwik/jsx-runtime";
var QwikLineChart = component$2((props) => {
  const options = buildLineChartOptions(props);
  return /* @__PURE__ */ jsx2(
    QwikECharts,
    {
      options,
      height: props.height,
      class: props.class,
      style: props.style
    }
  );
});
export {
  QwikECharts,
  QwikLineChart
};

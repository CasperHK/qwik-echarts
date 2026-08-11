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
export {
  QwikECharts
};

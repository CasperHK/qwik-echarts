import { component$, createSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { EChartsOption, EChartsType } from 'echarts';

export interface QwikEChartsPlainProps {
  options: EChartsOption;
  theme?: string | Record<string, unknown>;
  height?: number;
  autoResize?: boolean;
  class?: string;
  style?: Record<string, string | number>;
}

export const QwikEChartsPlain = component$((props: QwikEChartsPlainProps) => {
  const containerRef = createSignal<HTMLDivElement>();
  const chartRef = createSignal<EChartsType | undefined>(undefined);
  const resizeObserverRef = createSignal<ResizeObserver | undefined>(undefined);

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
      const echarts = await import('echarts');
      if (!active) {
        return;
      }

      const chart = chartRef.value ?? echarts.init(container, theme as never, { renderer: 'canvas' });
      chartRef.value = chart;
      chart.setOption(options, { notMerge: false, replaceMerge: ['series'] });

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
        resizeObserverRef.value = undefined;
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
      chartRef.value = undefined;
      resizeObserverRef.value = undefined;
    };
  });

  const height = props.height ?? 400;

  return (
    <div
      ref={containerRef}
      class={props.class}
      style={{
        width: '100%',
        height: `${height}px`,
        ...props.style,
      }}
    />
  );
});

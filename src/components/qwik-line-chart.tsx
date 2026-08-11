import { component$ } from '@builder.io/qwik';
import { QwikECharts } from './qwik-echarts';
import { buildLineChartOptions, type LineChartOptionsProps, type LineSeriesInput } from './line-chart-options';

export interface QwikLineChartProps extends LineChartOptionsProps {
  height?: number;
  class?: string;
  style?: Record<string, string | number>;
}

export { buildLineChartOptions } from './line-chart-options';
export type { LineChartOptionsProps, LineSeriesInput } from './line-chart-options';

export const QwikLineChart = component$((props: QwikLineChartProps) => {
  const options = buildLineChartOptions(props);

  return (
    <QwikECharts
      options={options}
      height={props.height}
      class={props.class}
      style={props.style}
    />
  );
});

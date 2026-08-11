import { component$ } from '@builder.io/qwik';
import { QwikECharts } from './qwik-echarts';
import { buildBarChartOptions, type BarChartOptionsProps } from './bar-chart-options';

export interface QwikBarChartProps extends BarChartOptionsProps {
  height?: number;
  class?: string;
  style?: Record<string, string | number>;
}

export const QwikBarChart = component$((props: QwikBarChartProps) => {
  const options = buildBarChartOptions(props);

  return (
    <QwikECharts
      options={options}
      height={props.height}
      class={props.class}
      style={props.style}
    />
  );
});

import * as _builder_io_qwik from '@builder.io/qwik';
import { EChartsOption } from 'echarts';

interface QwikEChartsProps {
    options: EChartsOption;
    theme?: string | Record<string, unknown>;
    height?: number;
    autoResize?: boolean;
    class?: string;
    style?: Record<string, string | number>;
}
declare const QwikECharts: _builder_io_qwik.Component<QwikEChartsProps>;

interface LineSeriesInput {
    name?: string;
    data: Array<number | {
        value: number;
        name?: string;
    }>;
    color?: string;
    smooth?: boolean;
}
interface LineChartOptionsProps {
    data?: Array<number | {
        value: number;
        name?: string;
    }>;
    series?: LineSeriesInput[];
    xAxisData?: string[];
    title?: string;
    seriesName?: string;
    smooth?: boolean;
    color?: string;
    yAxisName?: string;
    legend?: boolean;
}

interface QwikLineChartProps extends LineChartOptionsProps {
    height?: number;
    class?: string;
    style?: Record<string, string | number>;
}

declare const QwikLineChart: _builder_io_qwik.Component<QwikLineChartProps>;

export { QwikECharts, type QwikEChartsProps, QwikLineChart, type QwikLineChartProps };

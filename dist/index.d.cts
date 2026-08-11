import * as _builder_io_qwik from '@builder.io/qwik';
import { EChartsOption } from 'echarts';

interface QwikEChartsPlainProps {
    options: EChartsOption;
    theme?: string | Record<string, unknown>;
    height?: number;
    autoResize?: boolean;
    class?: string;
    style?: Record<string, string | number>;
}
declare const QwikEChartsPlain: _builder_io_qwik.Component<QwikEChartsPlainProps>;

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
declare function buildLineChartOptions(props: LineChartOptionsProps): EChartsOption;

interface QwikLineChartProps extends LineChartOptionsProps {
    height?: number;
    class?: string;
    style?: Record<string, string | number>;
}

declare const QwikLineChart: _builder_io_qwik.Component<QwikLineChartProps>;

interface BarSeriesInput {
    name?: string;
    data: Array<number | {
        value: number;
        name?: string;
    }>;
    color?: string;
}
interface BarChartOptionsProps {
    data?: Array<number | {
        value: number;
        name?: string;
    }>;
    series?: BarSeriesInput[];
    categories?: string[];
    title?: string;
    seriesName?: string;
    color?: string;
    yAxisName?: string;
    legend?: boolean;
    stack?: boolean;
}
declare function buildBarChartOptions(props: BarChartOptionsProps): EChartsOption;

interface QwikBarChartProps extends BarChartOptionsProps {
    height?: number;
    class?: string;
    style?: Record<string, string | number>;
}
declare const QwikBarChart: _builder_io_qwik.Component<QwikBarChartProps>;

export { type BarChartOptionsProps, type BarSeriesInput, type LineChartOptionsProps, type LineSeriesInput, QwikBarChart, type QwikBarChartProps, QwikEChartsPlain as QwikECharts, type QwikEChartsPlainProps as QwikEChartsProps, QwikLineChart, type QwikLineChartProps, buildBarChartOptions, buildLineChartOptions };

# qwik-echarts 📊

[![npm version](https://shields.io)](https://npmjs.com)
[![license](https://shields.io)](https://github.com)

The enterprise-ready, rich-feature chart visualization library (**Apache ECharts**) meets the ultra-fast web framework (**Qwik**).

`qwik-echarts` provides a robust, responsive, and performance-optimized wrapper around Apache ECharts, built intentionally for Qwik's **Resumability** architecture. It entirely skips canvas calculations during server-side pre-rendering (SSR) and lazy-loads zero charting code until it mounts in the client browser.

---

## ✨ Features

- ⚡ **Zero Hydration Cost:** Fully leverages Qwik's lazy-loading. No ECharts bundle overhead is pushed to the client on initial HTML page loads.
- 📐 **Auto-Responsive Layout:** Houses a built-in `ResizeObserver` that automatically triggers `.resize()` on the chart canvas when its parent DOM node alters width.
- 🔄 **Efficient Delta Redraws:** Tracks Qwik properties reactively, invoking `.setOption()` behind the scenes to seamlessly update data points without tearing down or remounting the canvas node.
- 🎨 **Theme Customization:** Seamlessly forwards custom ECharts theme keywords or style configurations right into the initialization runtime.
- 🦺 **First-Class TypeScript Support:** Inherits official, raw type definitions directly from `echarts` for precise compile-time verification and auto-completion.

---

## 📦 Installation

Make sure you have both `echarts` and `@builder.io/qwik` added to your parent application dependencies.

```bash
npm install qwik-echarts echarts
# or using alternative package managers
pnpm add qwik-echarts echarts
yarn add qwik-echarts echarts
```

---

## 🚀 Quick Start

Render a completely reactive, fluid enterprise-ready chart within any Qwik component using the following setup:

```tsx
import { component\$, useStore } from '@builder.io/qwik';
import { QwikECharts } from 'qwik-echarts';
import type { EChartsOption } from 'echarts';

export default component\$(() => {
  // 1. Maintain your dashboard variables reactively using Qwik state
  const state = useStore({
    salesData:,
  });

  // 2. Configure standard ECharts parameters
  const chartOptions: EChartsOption = {
    title: {
      text: 'Monthly Analytics Overview',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: state.salesData,
        type: 'bar',
        color: '#3b82f6', // Tailored modern blue bars
      },
    ],
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Analytics Panel</h2>
      
      {/* Container providing flexible responsive boundaries */}
      <div style={{ width: '100%', padding: '16px', background: '#fff', borderRadius: '8px' }}>
        <QwikECharts 
          options={chartOptions} 
          height={400} 
        />
      </div>
    </div>
  );
});
```

---

## ⚙️ Component API (Props)

The `<QwikECharts />` component accepts the following declarative configurations:

| Prop | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `options` | `echarts.EChartsOption` | **Yes** | — | Standard Apache ECharts option map. Controls styling, series data, interactions, and grids. |
| `theme` | `string \| object` | No | — | Pre-registered theme name string or inline custom theme configuration map. |
| `height` | `number` | No | `400` | Static canvas rendering element height specified in pixels. |

---

## 🛠️ Performance Optimization & Updating Data

When injecting live-streaming telemetry metrics (e.g., via WebSockets or real-time polling pools), mutate your Qwik store properties carefully. Since `qwik-echarts` leverages high-performance reactivity mapping, updating properties inline will execute a surgical chart redraw rather than forcing a layout shift.

```tsx
// Optimized mutation approach inside any streaming task/callback:
state.salesData = [...state.salesData.slice(1), freshIncomingMetricValue];
```

---

## 📄 License

This open-source package is distributed under the conditions of the [MIT License](LICENSE).


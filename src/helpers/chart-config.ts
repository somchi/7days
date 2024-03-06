export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: '7 days Price Chart of $ATOM-$NTRN pair',
    },
    filler: {
      propagate: false,
    },
  },
  layout: {
    autoPadding: true,
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },

    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

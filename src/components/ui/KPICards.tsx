import { useEffect, useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { formatCurrency, formatNumber, formatMinutes } from '../../lib/formatters';

function AnimatedValue({ value, format }: { value: string; format?: (v: string) => string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsChanging(true);
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsChanging(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  return (
    <div
      className={`text-2xl font-bold tabular-nums transition-all duration-300 ${
        isChanging ? 'text-blue-600 scale-105' : 'text-gray-900 scale-100'
      }`}
    >
      {displayValue}
    </div>
  );
}

export function KPICards() {
  const kpis = useSimulationStore((state) => state.snapshot.kpis);

  const cards = [
    {
      label: 'F&B per Capita',
      value: `$${formatNumber(kpis.fnb_per_capita)}`,
      color: 'border-blue-500',
    },
    {
      label: 'Queue Time',
      value: formatMinutes(kpis.queue_time_min),
      color: 'border-red-500',
    },
    {
      label: 'Orders / Min',
      value: kpis.orders_per_min.toString(),
      color: 'border-green-500',
    },
    {
      label: 'Revenue',
      value: formatCurrency(kpis.revenue_usd),
      color: 'border-purple-500',
    },
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bg-white/90 backdrop-blur rounded-lg px-6 py-3 shadow-lg border-b-4 ${card.color} transition-all hover:shadow-xl`}
        >
          <div className="text-sm text-gray-600 font-medium">{card.label}</div>
          <AnimatedValue value={card.value} />
        </div>
      ))}
    </div>
  );
}

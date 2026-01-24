import { useEffect, useState } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

interface MonthlyReachCardProps {
  onClick: () => void;
}

export const MonthlyReachCard = ({ onClick }: MonthlyReachCardProps) => {
  const TARGET_VALUE = 8264985;
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const duration = 2000;
      const steps = 60;
      const increment = TARGET_VALUE / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayValue(TARGET_VALUE);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(increment * currentStep));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const interval = setInterval(() => {
        const fluctuation = Math.floor(Math.random() * 10) - 5;
        setDisplayValue(prev => TARGET_VALUE + fluctuation);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [hasAnimated]);

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Reach</h3>
              <p className="text-sm text-gray-500">Total Impressions</p>
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <div className="mb-2">
          <div className="text-4xl font-bold text-gray-900">
            {displayValue.toLocaleString()}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Monthly content reach across all channels
        </p>
      </div>
    </div>
  );
};

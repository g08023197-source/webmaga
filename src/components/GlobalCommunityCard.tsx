import { Users } from 'lucide-react';

interface GlobalCommunityCardProps {
  total: number;
  onClick: () => void;
}

export const GlobalCommunityCard = ({ total, onClick }: GlobalCommunityCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Global Community</h3>
              <p className="text-sm text-gray-500">Total Audience</p>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-4xl font-bold text-gray-900">
            {total.toLocaleString()}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Combined reach across all platforms
        </p>
      </div>
    </div>
  );
};

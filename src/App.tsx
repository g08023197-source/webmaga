import { useState } from 'react';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { RevenueCard } from './components/RevenueCard';
import { AudienceCard } from './components/AudienceCard';
import { GlobalCommunityCard } from './components/GlobalCommunityCard';
import { MonthlyReachCard } from './components/MonthlyReachCard';
import { UpcomingReviews } from './components/UpcomingReviews';
import { ActivityTicker } from './components/ActivityTicker';
import { AnalyticsOverlay } from './components/AnalyticsOverlay';
import { useLiveMetrics } from './hooks/useLiveMetrics';
import { generateChartData } from './lib/storage';
import 'leaflet/dist/leaflet.css';

function App() {
  const { metrics, isLoading } = useLiveMetrics();
  const [analyticsView, setAnalyticsView] = useState<{
    isOpen: boolean;
    title: string;
    data: any[];
    color?: string;
  }>({ isOpen: false, title: '', data: [], color: '#3b82f6' });

  const openAnalytics = (title: string, currentValue: number, color?: string) => {
    setAnalyticsView({
      isOpen: true,
      title,
      data: generateChartData(currentValue, 30),
      color: color || '#3b82f6'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading platform data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="mb-6">
          <WorldMap />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GlobalCommunityCard
              total={metrics.linkedinFollowers + metrics.linkedinGroupMembers + metrics.facebookFollowers + metrics.discordMembers}
              onClick={() => openAnalytics('Global Community Growth', metrics.linkedinFollowers + metrics.linkedinGroupMembers + metrics.facebookFollowers + metrics.discordMembers, '#3b82f6')}
            />
            <MonthlyReachCard
              onClick={() => openAnalytics('Monthly Reach Analytics', 8264985, '#10b981')}
            />
          </div>
          <RevenueCard
            revenue={metrics.revenue}
            onClick={() => openAnalytics('Influencer Revenue Analytics', metrics.revenue, '#10b981')}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Audience Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudienceCard
              platform="LinkedIn"
              count={metrics.linkedinFollowers}
              subtitle="Professional Network"
              icon="linkedin"
              views={metrics.linkedinViews}
              onClick={() => openAnalytics('LinkedIn Followers', metrics.linkedinFollowers, '#0A66C2')}
            />
            <AudienceCard
              platform="LinkedIn Group"
              count={metrics.linkedinGroupMembers}
              subtitle="Community Members"
              icon="linkedinGroup"
              onClick={() => openAnalytics('LinkedIn Group Members', metrics.linkedinGroupMembers, '#0A66C2')}
            />
            <AudienceCard
              platform="Facebook"
              count={metrics.facebookFollowers}
              subtitle="Social Media"
              icon="facebook"
              onClick={() => openAnalytics('Facebook Followers', metrics.facebookFollowers, '#1877F2')}
            />
            <AudienceCard
              platform="Discord"
              count={metrics.discordMembers}
              subtitle="Community Hub"
              icon="discord"
              views={metrics.discordActivity}
              onClick={() => openAnalytics('Discord Members', metrics.discordMembers, '#5865F2')}
            />
          </div>
        </div>

        <UpcomingReviews />
      </main>

      <ActivityTicker />

      <AnalyticsOverlay
        isOpen={analyticsView.isOpen}
        onClose={() => setAnalyticsView({ ...analyticsView, isOpen: false })}
        title={analyticsView.title}
        data={analyticsView.data}
        color={analyticsView.color}
      />
    </div>
  );
}

export default App;

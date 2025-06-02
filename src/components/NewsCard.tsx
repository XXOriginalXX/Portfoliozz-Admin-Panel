import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

interface NewsCardProps {
  news: Array<{
    id: string;
    title: string;
    content: string;
    impact: 'high' | 'medium' | 'low';
    createdAt: any;
    isActive: boolean;
  }>;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const activeNews = news.filter(item => item.isActive).slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Latest Market News</h2>
      </div>
      <div className="p-6">
        {activeNews.length > 0 ? (
          <div className="space-y-4">
            {activeNews.map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.content.substring(0, 120)}...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                        <TrendingUp className="w-3 h-3" />
                        {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No active news items</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
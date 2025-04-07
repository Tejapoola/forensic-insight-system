
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string | null;
}

interface TimelineActivityProps {
  activities: Activity[];
  showViewAll?: boolean;
}

const TimelineActivity: React.FC<TimelineActivityProps> = ({ activities, showViewAll = false }) => {
  return (
    <div className="bg-forensic-dark rounded-lg border border-gray-700 h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Activity Timeline</h2>
      </div>
      
      <div className="p-4">
        {activities.length > 0 ? (
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700" />
            
            {/* Timeline events */}
            <div className="space-y-6">
              {activities.map((activity) => {
                const date = new Date(activity.timestamp);
                const timeAgo = formatDistanceToNow(date, { addSuffix: true });
                const formattedTime = format(date, 'MMM d, yyyy HH:mm');
                
                return (
                  <div key={activity.id} className="relative pl-10">
                    {/* Dot */}
                    <div className="absolute left-0 mt-1.5 w-10 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-forensic-blue"></div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <p className="text-white">
                        <span className="font-medium text-forensic-blue">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      
                      {activity.details && (
                        <p className="mt-1 text-sm text-gray-400">{activity.details}</p>
                      )}
                      
                      <p className="mt-1 text-xs text-gray-500">
                        <span title={formattedTime}>{timeAgo}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No activities recorded yet.</p>
        )}
      </div>
      
      {showViewAll && (
        <div className="p-4 border-t border-gray-700">
          <Link to="#timeline" className="text-forensic-blue hover:text-blue-400 text-sm">
            View full timeline
          </Link>
        </div>
      )}
    </div>
  );
};

export default TimelineActivity;

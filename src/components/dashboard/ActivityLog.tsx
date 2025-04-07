
import React from 'react';

interface LogEntry {
  id: string;
  user: string;
  action: string;
  case?: string;
  timestamp: string;
}

interface ActivityLogProps {
  logs: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="bg-forensic-dark rounded-lg border border-gray-700 shadow-md">
      <div className="p-5 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Activity Log</h3>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-forensic-blue rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-white">
                  <span className="font-medium text-forensic-blue">{log.user}</span> {log.action}
                  {log.case && <span className="text-gray-300"> on case {log.case}</span>}
                </p>
                <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;

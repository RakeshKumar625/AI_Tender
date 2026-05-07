import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Calendar, Globe, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

interface TimeData {
  date: string;
  time: string;
  timezone: string;
  timestamp: string;
}

const DateTimeDisplay: React.FC = () => {
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchTime = async () => {
    setIsSyncing(true);
    try {
      // Use the base URL from window.location if needed, but 127.0.0.1:8000 is default for local dev
      const response = await axios.get('http://127.0.0.1:8000/api/system/time');
      setTimeData(response.data);
      setLocalTime(new Date(response.data.timestamp));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch system time:', err);
      setError('Connection Error');
      setLoading(false);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchTime();
    // Auto-refresh from server every 5 minutes to keep in sync with server drift
    const refreshInterval = setInterval(fetchTime, 300000);
    
    // Live clock update every second
    const tickInterval = setInterval(() => {
      setLocalTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(tickInterval);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toUpperCase();
  };

  if (loading && !timeData) {
    return (
      <div className="flex items-center space-x-2 text-slate-400 animate-pulse bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
        <Clock className="w-4 h-4 animate-spin-slow" />
        <span className="text-xs font-semibold tracking-wide uppercase">Synchronizing System Time...</span>
      </div>
    );
  }

  if (error && !timeData) {
    return (
      <button 
        onClick={fetchTime}
        className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-100 transition-colors group"
      >
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-tight">{error}</span>
        <RefreshCw className="w-3 h-3 ml-1 group-hover:rotate-180 transition-transform duration-500" />
      </button>
    );
  }

  const [dayOfWeek, ...dateParts] = formatDate(localTime).split(',');
  const dateString = dateParts.join(',').trim();

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden min-w-[280px]">
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* Date Section */}
          <div className="flex flex-col items-center justify-center bg-slate-50 border-r border-slate-100 px-4 py-2 min-w-[100px]">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-0.5">
              {dayOfWeek}
            </span>
            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
              {dateString}
            </span>
          </div>

          {/* Time Section */}
          <div className="flex-1 px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-mono font-bold text-slate-900 tracking-tighter">
                  {formatTime(localTime).split(' ')[0]}
                </span>
                <span className="text-[10px] font-black text-slate-500">
                  {formatTime(localTime).split(' ')[1]}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm">
                  IST
                </span>
                <div className={`h-1.5 w-1.5 rounded-full ${isSyncing ? 'bg-blue-400 animate-ping' : 'bg-green-500'} transition-colors`} />
              </div>
            </div>
            <div className="flex items-center text-[9px] text-slate-400 font-medium mt-0.5">
              <Globe className="w-2.5 h-2.5 mr-1 text-slate-300" />
              <span className="uppercase tracking-widest">Secure Server Sync</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTimeDisplay;


import { useState } from 'react';
import { ExecutionAuditTrail } from './components/ExecutionAuditTrail';
import { SOPVersionHistory } from './components/SOPVersionHistory';

export default function App() {
    const [activeScreen, setActiveScreen] = useState<'audit' | 'history'>('audit');

return (
    <div className="min-h-screen bg-[#F5F5F5]">
    {/* Navigation Tabs */}
    <div className="bg-white border-b border-gray-200">
    <div className="max-w-[1440px] mx-auto px-6 py-4">
    <div className="flex gap-4">
    <button
    onClick={() => setActiveScreen('audit')}
className={`px-6 py-2 rounded-t transition-colors ${
    activeScreen === 'audit'
? 'bg-[#007AFF] text-white'
: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}`}
>
Execution Audit Trail
                </button>
                  <button
onClick={() => setActiveScreen('history')}
className={`px-6 py-2 rounded-t transition-colors ${
    activeScreen === 'history'
? 'bg-[#007AFF] text-white'
: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}`}
>
SOP Version History
            </button>
              </div>
                </div>
                  </div>

                    {/* Screen Content */}
<div className="max-w-[1440px] mx-auto">
               {activeScreen === 'audit' ? <ExecutionAuditTrail /> : <SOPVersionHistory />}
</div>
  </div>
);
}

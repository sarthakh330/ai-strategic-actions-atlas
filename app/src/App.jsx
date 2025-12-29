import { useState } from 'react';
import { useData } from './hooks/useData';
import TimelineGrid from './components/TimelineGrid';
import RightPanel from './components/RightPanel';
import EventDrawer from './components/EventDrawer';

function App() {
  const { events, patterns, entities, stackLayers, actionTypes, entityClasses, loading, error } = useData();
  const [showSpend, setShowSpend] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-startup mx-auto mb-4"></div>
          <div className="text-text-muted font-body">Loading AI Strategic Actions Atlas...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-600">
          <div className="text-xl font-display font-semibold mb-2">Error loading data</div>
          <div className="text-sm font-body">{error}</div>
          <div className="text-xs mt-4 text-text-muted">
            Make sure the /data folder is accessible via the dev server
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Navigation */}
      <header className="flex-none bg-white border-b border-border-subtle z-40 relative">
        <div className="px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title */}
          <div className="flex flex-col gap-0.5 min-w-[220px]">
            <h1 className="text-base font-display font-medium tracking-tight text-text-main">
              AI Strategic Actions Atlas
            </h1>
            <p className="text-text-muted text-[10px] font-medium tracking-wide uppercase">
              Evolution Map 2023-2025
            </p>
          </div>

          {/* Navigation and Filters */}
          <div className="flex flex-1 items-center gap-6 justify-center">
            <div className="flex items-center gap-2 text-xs">
              {/* Entity Class Filter with Legend */}
              <div className="flex items-center border-r border-gray-200 pr-4 mr-2 gap-3">
                <button className="flex items-center gap-2 px-2 py-1.5 border border-gray-200 rounded-sm hover:border-gray-400 hover:bg-gray-50 transition-all bg-white shadow-sm">
                  <span className="font-medium text-text-main">Entity Class</span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-startup to-frontier-lab"></div>
                  <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>

                {/* Inline legend */}
                <div className="hidden xl:flex items-center gap-3 text-[10px] text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-big-tech"></span>Big Tech
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-startup"></span>Startup
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-frontier-lab"></span>Frontier Lab
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-open-source"></span>Open Source
                  </div>
                </div>
              </div>

              {/* Impact Filter */}
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-sm hover:border-gray-400 hover:bg-gray-50 transition-all bg-white text-text-muted">
                <span className="font-medium text-text-main">Impact</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Action Type Filter */}
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-sm hover:border-gray-400 hover:bg-gray-50 transition-all bg-white text-text-muted">
                <span className="font-medium text-text-main">Action Type</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Show Spend Toggle */}
          <div className="flex items-center gap-3 min-w-[140px] justify-end">
            <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
              Show Spend
            </span>
            <button
              onClick={() => setShowSpend(!showSpend)}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
                showSpend ? 'bg-startup' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                  showSpend ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Timeline with Right Panel */}
      <main className="flex-1 overflow-hidden bg-white flex">
        {/* Timeline Grid - scrollable */}
        <div className="flex-1 overflow-auto">
          <TimelineGrid
            events={events}
            stackLayers={stackLayers}
            entityClasses={entityClasses}
            entities={entities}
            showSpend={showSpend}
            onEventClick={setSelectedEvent}
          />
        </div>

        {/* Right Panel - fixed width */}
        {selectedEvent ? (
          <EventDrawer
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            entities={entities}
            entityClasses={entityClasses}
            actionTypes={actionTypes}
            events={events}
          />
        ) : (
          <RightPanel
            events={events}
            patterns={patterns}
            entityClasses={entityClasses}
          />
        )}
      </main>

      {/* Strategic Patterns Section */}
      <div className="border-t border-black p-8 bg-gray-50/80">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-display font-medium text-text-main flex items-center gap-2">
            <svg className="w-4 h-4 text-startup" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Strategic Patterns & Derived Insights
            <span className="text-text-muted font-normal ml-3 text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full">
              Explore Overlay Mode
            </span>
          </h3>
          <span className="text-[10px] uppercase tracking-wider text-text-muted cursor-pointer hover:text-black hover:underline">
            View All Patterns
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pattern Card 1 */}
          <div className="bg-white border border-black p-5 relative group cursor-pointer shadow-soft flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 w-1 h-full bg-startup"></div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-startup">
                Consolidation Motif
              </span>
              <svg className="w-4 h-4 text-text-muted group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-text-main mb-2 leading-snug">
              Model API Consolidation
            </h4>
            <p className="text-xs text-text-muted leading-relaxed mb-4 flex-1">
              Independent inference providers saw a 40% reduction in share as foundational labs verticalized serving stacks in early 2025.
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <div className="flex -space-x-1">
                <span className="w-4 h-4 rounded-full bg-frontier-lab border border-white"></span>
                <span className="w-4 h-4 rounded-full bg-startup border border-white"></span>
              </div>
              <span className="text-[10px] font-medium text-text-main ml-1 underline decoration-dotted">
                Show 3 matching events
              </span>
            </div>
          </div>

          {/* Pattern Card 2 */}
          <div className="bg-white border border-border-subtle p-5 hover:border-gray-400 transition-colors group cursor-pointer shadow-soft flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Strategic Pivot
              </span>
            </div>
            <h4 className="text-sm font-semibold text-text-main mb-2 leading-snug">
              The "Agentic" Shift
            </h4>
            <p className="text-xs text-text-muted leading-relaxed mb-4 flex-1">
              Infrastructure providers (OpenAI, Anthropic) moved up-stack to offer orchestration layers, creating conflict with middleware startups.
            </p>
            <span className="text-[10px] font-medium text-text-muted group-hover:text-black">
              Show 7 related events
            </span>
          </div>

          {/* Pattern Card 3 */}
          <div className="bg-white border border-border-subtle p-5 hover:border-gray-400 transition-colors group cursor-pointer shadow-soft flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Tech Stack
              </span>
            </div>
            <h4 className="text-sm font-semibold text-text-main mb-2 leading-snug">
              Reasoning over Retrieval
            </h4>
            <p className="text-xs text-text-muted leading-relaxed mb-4 flex-1">
              Context window wars ceased as 'Chain of Thought' became the primary differentiator for complex enterprise tasks.
            </p>
            <span className="text-[10px] font-medium text-text-muted group-hover:text-black">
              Show 4 related events
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

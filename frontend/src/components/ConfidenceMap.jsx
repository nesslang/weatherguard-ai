import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';

const getConfidenceColor = (confidence) => {
  if (confidence >= 80) return '#22c55e'; // Green
  if (confidence >= 60) return '#eab308'; // Yellow
  if (confidence >= 40) return '#f97316'; // Orange
  return '#ef4444'; // Red
};

function MapUpdater({ selectedRegion, regions }) {
  const map = useMap();
  useEffect(() => {
    if (selectedRegion && regions) {
      const region = regions.find(r => r.name === selectedRegion);
      if (region) {
        map.flyTo([region.lat, region.lng], 6, { animate: true, duration: 1 });
      }
    }
  }, [selectedRegion, regions, map]);
  return null;
}

export default function ConfidenceMap({ regions, selectedRegion, onRegionSelect }) {
  if (!regions || regions.length === 0) return <div className="h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>;

  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden border border-slate-200 shadow-sm z-0">
      <MapContainer center={[22.5937, 78.9629]} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapUpdater selectedRegion={selectedRegion} regions={regions} />
        
        {regions.map((region) => {
          const isSelected = selectedRegion === region.name;
          return (
            <CircleMarker
              key={region.name}
              center={[region.lat, region.lng]}
              radius={isSelected ? 16 : 10 + (region.bust_probability * 10)}
              fillColor={getConfidenceColor(region.confidence)}
              fillOpacity={isSelected ? 0.9 : 0.7}
              color={isSelected ? '#0f172a' : 'white'}
              weight={isSelected ? 3 : 1}
              eventHandlers={{ click: () => onRegionSelect(region.name) }}
            >
              <Tooltip>
                <div className="text-sm font-sans">
                  <strong className="block text-navy-900 mb-1">{region.name}</strong>
                  <div>Confidence: {region.confidence.toFixed(0)}%</div>
                  <div>Bust Risk: {(region.bust_probability * 100).toFixed(0)}%</div>
                  <div>Level: {region.risk_level}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded shadow-sm border border-slate-200 z-[1000] text-xs">
        <div className="font-bold mb-2">Confidence Level</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> High (80-100)</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Moderate (60-79)</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Low (40-59)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Very Low (0-39)</div>
      </div>
    </div>
  );
}

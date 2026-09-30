import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

export function BustProbabilityChart({ data }) {
  if (!data || !data.length) return <div className="h-64 flex items-center justify-center bg-slate-50 rounded animate-pulse">Loading...</div>;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="day" tickFormatter={(v) => `Day ${v}`} stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <RechartsTooltip 
            formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Bust Probability']}
            labelFormatter={(label) => `Forecast Day ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="bust_probability" name="Bust Probability" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ExpectedErrorChart({ data }) {
  if (!data || !data.length) return <div className="h-64 flex items-center justify-center bg-slate-50 rounded animate-pulse">Loading...</div>;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="day" tickFormatter={(v) => `Day ${v}`} stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <RechartsTooltip 
            formatter={(value) => [`${Number(value).toFixed(1)} mm`, 'Expected Error']}
            labelFormatter={(label) => `Forecast Day ${label}`}
          />
          <Legend />
          <Area type="monotone" dataKey="expected_error" name="Expected Error" stroke="#3b82f6" fill="#93c5fd" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RegionalComparisonChart({ data }) {
  if (!data || !data.length) return <div className="h-64 flex items-center justify-center bg-slate-50 rounded animate-pulse">Loading...</div>;

  const getRiskColor = (level) => {
    switch(level) {
      case 'LOW': return '#22c55e';
      case 'MODERATE': return '#eab308';
      case 'HIGH': return '#f97316';
      default: return '#ef4444';
    }
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
          <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} stroke="#64748b" fontSize={12} />
          <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={100} />
          <RechartsTooltip 
            formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Bust Probability']}
          />
          <Bar dataKey="bust_probability" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk_level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

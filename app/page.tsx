"use client";

import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Monitor, Network, Activity, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadAuditTool } from '@/lib/utils';

interface SystemData {
  SystemName?: string;
  Mobo?: string;
  CPU?: string;
  GPU?: string;
  VRAM?: string;
  Storage?: string;
  OS?: string;
  LocalIP?: string;
  Gateway?: string;
  MAC?: string;
  VirtualMem?: string;
}

export default function Dashboard() {
  const [inventory, setInventory] = useState<SystemData>({});
  const [metrics, setMetrics] = useState({ dl: "0.0", ul: "0.0", ping: "--" });
  const [publicIP, setPublicIP] = useState("Detecting...");

  const isAlertActive = parseFloat(inventory.VirtualMem || "0") > 8.5;

  // Simulate Real-time Metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        dl: (45 + Math.random() * 15).toFixed(1),
        ul: (12 + Math.random() * 8).toFixed(1),
        ping: (18 + Math.floor(Math.random() * 10)).toString()
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setInventory(json);
      } catch (err) { alert("Invalid JSON file."); }
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20">
              <Monitor className="text-sky-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">System Intel</h1>
              <p className="text-slate-500 text-sm">Enterprise PC Audit & Telemetry</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={downloadAuditTool} className="flex-1 md:flex-none gap-2 border-slate-800 bg-slate-900/50">
              <Download className="w-4 h-4" /> AGENT.BAT
            </Button>
            <Button onClick={() => document.getElementById('fileIn')?.click()} className="flex-1 md:flex-none gap-2 bg-sky-500 text-slate-950 hover:bg-sky-400 font-bold">
              <RefreshCw className="w-4 h-4" /> SYNC JSON
            </Button>
            <input type="file" id="fileIn" className="hidden" accept=".json" onChange={handleFileUpload} />
          </div>
        </div>

        {/* DATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PERFORMANCE CARD */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" /> Metrics
              </CardTitle>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">LIVE</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataField label="Avg Download" value={`${metrics.dl} Mbps`} highlight />
              <DataField label="Avg Upload" value={`${metrics.ul} Mbps`} highlight />
              <DataField label="Latency" value={`${metrics.ping} ms`} />
            </CardContent>
          </Card>

          {/* HARDWARE CARD */}
          <Card className={`bg-slate-900/40 border-slate-800 backdrop-blur-md transition-all ${isAlertActive ? 'ring-2 ring-red-500/50 animate-pulse' : ''}`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-500" /> Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataField label="Host" value={inventory.SystemName} />
              <DataField label="Mobo" value={inventory.Mobo} />
              <DataField label="CPU" value={inventory.CPU} />
              <DataField label="GPU" value={`${inventory.GPU} (${inventory.VRAM})`} />
              <DataField label="Storage" value={inventory.Storage} />
            </CardContent>
          </Card>

          {/* NETWORK CARD */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-500" /> IP Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataField label="IPv4" value={inventory.LocalIP} highlight />
              <DataField label="Gateway" value={inventory.Gateway} />
              <DataField label="MAC" value={inventory.MAC} isMono />
              <DataField label="OS Build" value={inventory.OS} isMono />
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}

function DataField({ label, value, highlight, isMono }: { label: string, value?: string, highlight?: boolean, isMono?: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
      <span className="text-slate-500 text-sm font-medium">{label}</span>
      <span className={`text-sm ${highlight ? 'text-sky-400 font-bold' : 'text-slate-200'} ${isMono ? 'font-mono text-[11px]' : 'font-mono'}`}>
        {value || '--'}
      </span>
    </div>
  );
}
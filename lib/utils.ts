import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadAuditTool = () => {
  const batContent = `@echo off
title Intel Agent
powershell -NoProfile -ExecutionPolicy Bypass -Command "$net=(Get-NetIPConfiguration|?{$_.IPv4Address -ne $null})[0]; $gpu=(Get-CimInstance Win32_VideoController|Select -First 1); $os=Get-CimInstance Win32_OperatingSystem; $cpu=Get-CimInstance Win32_Processor; $disk=Get-CimInstance Win32_LogicalDisk -Filter \\"DeviceID='C:'\\"; $i=@{SystemName=$os.CSName;Mobo=(Get-CimInstance Win32_BaseBoard).Product;CPU=$cpu.Name.Trim();GPU=$gpu.Name;VRAM=\\"$([Math]::Round($gpu.AdapterRAM/1GB,0)) GB\\";RAM=\\"$([Math]::Round($os.TotalVisibleMemorySize/1MB,0)).00 GB\\";VirtualMem=\\"$([Math]::Round($os.TotalVirtualMemorySize/1MB,2)) GB\\";OS=\\"$($os.Caption) ($($os.Version))\\";LocalIP=$net.IPv4Address.IPAddress;Gateway=$net.IPv4DefaultGateway.NextHop;MAC=(Get-NetAdapter|?{$_.Status -eq 'Up'})[0].MacAddress;Storage=\\"$([Math]::Round($disk.FreeSpace/1GB,0)) GB Free of $([Math]::Round($disk.Size/1GB,0)) GB\\"};$i|ConvertTo-Json|Out-File 'system.json' -Encoding utf8"
echo Success: system.json created.
pause`;

  const blob = new Blob([batContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'AuditAgent.bat';
  a.click();
};
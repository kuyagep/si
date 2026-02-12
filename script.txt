@echo off
title PC Inventory Collector
echo ---------------------------------------------------
echo Collecting System Data... Please wait.
echo ---------------------------------------------------

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$netConf = Get-NetIPConfiguration | Where-Object {$_.IPv4Address -ne $null} | Select-Object -First 1; " ^
    "$netAdapter = Get-NetAdapter | Where-Object {$_.Status -eq 'Up'} | Select-Object -First 1; " ^
    "$gpu = Get-CimInstance Win32_VideoController | Select-Object -First 1; " ^
    "$os = Get-CimInstance Win32_OperatingSystem; " ^
    "$cpu = Get-CimInstance Win32_Processor; " ^
    "$disk = Get-CimInstance Win32_LogicalDisk -Filter \"DeviceID='C:'\"; " ^
    "$i = @{ " ^
    "    SystemName = $os.CSName; " ^
    "    Mobo       = (Get-CimInstance Win32_BaseBoard).Product; " ^
    "    CPU        = $cpu.Name.Trim(); " ^
    "    GPU        = $gpu.Name; " ^
    "    VRAM       = \"$([Math]::Round($gpu.AdapterRAM / 1GB, 0)) GB\"; " ^
    "    RAM        = \"$([Math]::Round($os.TotalVisibleMemorySize / 1MB, 0)).00 GB\"; " ^
    "    VirtualMem = \"$([Math]::Round($os.TotalVirtualMemorySize / 1MB, 2)) GB\"; " ^
    "    OS         = \"$($os.Caption) ($($os.Version))\"; " ^
    "    LocalIP    = $netConf.IPv4Address.IPAddress; " ^
    "    Subnet     = '255.255.255.0'; " ^
    "    Gateway    = if($netConf.IPv4DefaultGateway) { $netConf.IPv4DefaultGateway.NextHop } else { 'N/A' }; " ^
    "    MAC        = $netAdapter.MacAddress; " ^
    "    Storage    = \"$([Math]::Round($disk.FreeSpace / 1GB, 0)) GB Free of $([Math]::Round($disk.Size / 1GB, 0)) GB\" " ^
    "}; " ^
    "$i | ConvertTo-Json | Out-File 'system.json' -Encoding utf8"

echo.
echo SUCCESS! 'system.json' has been created.
echo You can now upload this file to your Dashboard.
echo.
pause
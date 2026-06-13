param(
  [string]$SourceRoot = "C:\Users\Subeer\Downloads\Dhakhsade",
  [string]$Destination = "downloads\gaashaan-latest.apk"
)

$ErrorActionPreference = "Stop"

$workspace = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$destinationPath = Join-Path $workspace $Destination
$destinationParent = Split-Path -Parent $destinationPath

if (-not (Test-Path -LiteralPath $SourceRoot)) {
  throw "SourceRoot not found: $SourceRoot"
}

New-Item -ItemType Directory -Force -Path $destinationParent | Out-Null

$apkCandidates = @(
  Join-Path $SourceRoot "app\build\outputs\apk\debug\app-debug.apk"
  Join-Path $SourceRoot "android\app\build\outputs\apk\release\app-release.apk"
  Join-Path $SourceRoot "saradmin\build\outputs\apk\debug\saradmin-debug.apk"
) | Where-Object { Test-Path -LiteralPath $_ } | ForEach-Object { Get-Item -LiteralPath $_ }

if (-not $apkCandidates) {
  throw "No APK files found in known Dhakhsade build output folders."
}

$latestApk = $apkCandidates | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Copy-Item -LiteralPath $latestApk.FullName -Destination $destinationPath -Force

$copied = Get-Item -LiteralPath $destinationPath
$hash = (Get-FileHash -LiteralPath $destinationPath -Algorithm SHA256).Hash

[pscustomobject]@{
  Source = $latestApk.FullName
  Destination = $copied.FullName
  SizeBytes = $copied.Length
  LastWriteTime = $copied.LastWriteTime
  SHA256 = $hash
}

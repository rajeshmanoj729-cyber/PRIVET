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

$releaseApk = Join-Path $SourceRoot "app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path -LiteralPath $releaseApk)) {
  throw "Production customer APK not found: $releaseApk"
}

$sourceApk = Get-Item -LiteralPath $releaseApk
Copy-Item -LiteralPath $sourceApk.FullName -Destination $destinationPath -Force

$copied = Get-Item -LiteralPath $destinationPath
$hash = (Get-FileHash -LiteralPath $destinationPath -Algorithm SHA256).Hash

[pscustomobject]@{
  Source = $sourceApk.FullName
  Destination = $copied.FullName
  SizeBytes = $copied.Length
  LastWriteTime = $copied.LastWriteTime
  SHA256 = $hash
}

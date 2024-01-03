@echo off
setlocal enabledelayedexpansion
set "prefix=card"
set "extension=.jpg"
set "counter=57"

for %%f in (*.jpg) do (
    ren "!filePath!!fileName!.jpg" "!fileName!_2.jpg"
    set /a "counter+=1"
)

echo Đổi tên thành công!

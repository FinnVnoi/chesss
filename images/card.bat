@echo off
setlocal enabledelayedexpansion
set "prefix=card"
set "extension=.jpg"
set "counter=1"

for %%f in (*.jpeg) do (
    ren "%%f" "!prefix!!counter!!extension!"
    set /a "counter+=1"
)

echo Đổi tên thành công!

@echo off
setlocal enabledelayedexpansion

rem Thư mục chứa các tệp ảnh
set "imageFolder=E:\QUEP\chess\images\ABC"

rem Vòng lặp qua các tệp ảnh trong thư mục
for %%f in ("%imageFolder%\*.jpg") do (
    rem Lấy tên tệp và đường dẫn không có phần mở rộng
    set "fileName=%%~nf"
    set "filePath=%%~dpf"

    rem Đổi tên tệp thành tên mới (thêm _2 vào cuối)
    ren "!filePath!!fileName!.jpg" "!fileName!_2.jpg"
)

echo Done!

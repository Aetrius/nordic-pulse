cosign generate-key-pair
cosign sign --key .\cosign.key "file://C:\Users\AETHER-DESKTOP\Desktop\development\nordic-pulse\build\bin\nordic-pulse.exe"
cosign verify -key ./ -a ./build/bin/nordic-pulse.exe
cosign upload -a ./build/bin/nordic-pulse.exe
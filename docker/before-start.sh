cd ../
echo "安装依赖中，可能要很久..."
cnpm install
echo "构建React应用"
cnpm run build
mv -f build/ docker/

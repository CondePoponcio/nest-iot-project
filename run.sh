company_api_key=$(curl -d "name=CompanyName" -X POST https://nest-iot-server.fly.dev/company/)
echo -e $company_api_key[0]
company=( $( echo "$company_api_key" | sed 's/[][,]/ /g') )
echo ${company[0]}, ${company[1]}
location_id=$(curl -d "company_id=${company[0]}" -d "name=LocationName" -d "country=LocationCountry" -d "city=LocationCity" -d "meta=LocationMeta" -H "Token: ${company[1]}" -X POST https://nest-iot-server.fly.dev/locations/)
echo $location_id
sensor_api_key1=$(curl -d "location_id=${location_id}" -d "name=SensorName1" -d "category=SensorCategory1" -d "meta=SensorMeta1" -H "Token: ${company[1]}" -X POST https://nest-iot-server.fly.dev/sensor/)
sensor_api_key2=$(curl -d "location_id=${location_id}" -d "name=SensorName2" -d "category=SensorCategory2" -d "meta=SensorMeta2" -H "Token: ${company[1]}" -X POST https://nest-iot-server.fly.dev/sensor/)
echo -e $sensor_api_key1, $sensor_api_key2
curl -d "api_key=$sensor_api_key1" -X POST https://iot-sensor.fly.dev/getKey/
curl -d "api_key=$sensor_api_key2" -X POST https://iot-sensor-2.fly.dev/getKey/
curl -s -X POST https://iot-sensor.fly.dev/start/ &
curl -s -X POST https://iot-sensor-2.fly.dev/start/ &
curl -s -X GET https://nest-iot-server.fly.dev/api/v1/sensor_data/sensorData/
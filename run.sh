company_api_key=$(curl -d "name=CompanyName" -X POST http:nest-iot-server.fly.dev/company)
echo -e $company_api_key[0]
company=( $( echo "$company_api_key" | sed 's/[][,]/ /g') )
echo ${company[0]}, ${company[1]}
location_id=$(curl -d "company_id=${company[0]}" -d "name=LocationName" -d "country=LocationCountry" -d "city=LocationCity" -d "meta=LocationMeta" -H "Token: ${company[1]}" -X POST http://nest-iot-server.fly.dev/locations)
echo $location_id
sensor_api_key=$(curl -d "location_id=${location_id}" -d "name=SensorName" -d "category=SensorCategory" -d "meta=SensorMeta" -H "Token: ${company[1]}" -X POST http://nest-iot-server.fly.dev/sensor)
echo -e $sensor_api_key
curl -d "api_key=$sensor_api_key" -X POST http://iot-sensor.fly.dev/getKey
curl -s -X POST http://iot-sensor.fly.dev/start &
curl -s -X GET http://nest-iot-server.fly.dev/api/v1/sensor_data/sensorData

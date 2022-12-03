company_api_key=$(curl -d "name=CompanyName" -X POST http://localhost:8000/company)
echo -e $company_api_key[0]
company=( $( echo "$company_api_key" | sed 's/[][,]/ /g') )
echo ${company[0]}, ${company[1]}
curl -d "company_id=${company[0]}" -d "name=LocationName" -d "country=LocationCountry" -d "city=LocationCity" -d "meta=LocationMeta" -H "Token: ${company[1]}" -X POST http://localhost:8000/locations
sensor_api_key=$(curl -d "location_id=1" -d "name=SensorName" -d "category=SensorCategory" -d "meta=SensorMeta" -H "Token: ${company[1]}" -X POST http://localhost:8000/sensor)
echo -e $sensor_api_key
curl -d "api_key=$sensor_api_key" -X POST http://localhost:3000/getKey
curl -s -X POST http://localhost:3000/start &
curl -s -X GET http://localhost:8000/api/v1/sensor_data/sensorData

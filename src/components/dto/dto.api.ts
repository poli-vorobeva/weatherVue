export interface IGeoResponse {
	ip: string
	continent_code: string
	continent_name: string
	country_code2: string
	country_code3: string
	country_name: string
	country_capital: string
	state_prov: string
	district: string
	city: string
	zipcode: string
	latitude: string
	longitude: string
	is_eu: boolean
	calling_code: string
	country_tld: string
	languages: string
	country_flag: string
	geoname_id: string
	isp: string
	connection_type: string
	organization: string
	currency: Currency
	time_zone: TimeZone
}

export interface Currency {
	code: string
	name: string
	symbol: string
}

export interface TimeZone {
	name: string
	offset: number
	current_time: string
	current_time_unix: number
	is_dst: boolean
	dst_savings: number
}

export interface IWeatherResponse {
	coord: Coord
	weather: Weather[]
	base: string
	main: Main
	visibility: number
	wind: Wind
	clouds: Clouds
	dt: number
	sys: Sys
	timezone: number
	id: number
	name: string
	cod: number
}

export interface Coord {
	lon: number
	lat: number
}

export interface Weather {
	id: number
	main: string
	description: string
	icon: string
}

export interface Main {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	humidity: number
}

export interface Wind {
	speed: number
	deg: number
}

export interface Clouds {
	all: number
}

export interface Sys {
	type: number
	id: number
	country: string
	sunrise: number
	sunset: number
}


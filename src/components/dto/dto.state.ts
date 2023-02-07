import {tCityCardProps} from "./dto.main";

export interface IState{
	citiesCount:number,
	cities: string[],
	citiesData: tCityCardProps[],
	isIncorrectCity:boolean
}
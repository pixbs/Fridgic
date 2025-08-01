export interface SavedProduct {
	barcode: string;
	savedAt: string;
	savedDate: string;
	savedTime: string;
	product_name?: string;
	brands?: string;
	categories?: string;
	ingredients_text?: string;
	nutrition_grades?: string;
	nutriscore_grade?: string;
	image_url?: string;
	quantity?: string;
	packaging?: string;
	stores?: string;
	countries?: string;
	allergens?: string;
	labels?: string;
	nutriments?: {
		energy_100g?: number;
		fat_100g?: number;
		carbohydrates_100g?: number;
		proteins_100g?: number;
		salt_100g?: number;
		sugars_100g?: number;
	};
}

export interface Product {
	code: string;
	product?: {
		product_name?: string;
		brands?: string;
		categories?: string;
		ingredients_text?: string;
		nutrition_grades?: string;
		nutriscore_grade?: string;
		image_url?: string;
		quantity?: string;
		packaging?: string;
		stores?: string;
		countries?: string;
		allergens?: string;
		labels?: string;
		nutriments?: {
			energy_100g?: number;
			fat_100g?: number;
			carbohydrates_100g?: number;
			proteins_100g?: number;
			salt_100g?: number;
			sugars_100g?: number;
		};
	};
	status: number;
	status_verbose: string;
}

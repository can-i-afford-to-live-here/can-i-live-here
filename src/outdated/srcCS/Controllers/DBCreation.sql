drop table if exists location;
drop table if exists location_indexes;


create table location_indexes (
	location_index_id serial primary key,
	cost_of_living_index float,
	cost_of_living_plus_rent_index float,
	groceries_index float,
	last_updated_timestamp timestamp,
	local_purchasing_power_index float,
	rent_index float,
	restaurant_price_index float);

create table location (
	location_id serial primary key,
	country varchar(255),
	city varchar(255),
	region varchar(255),
	location_index_key serial,
	constraint location_index_key
		foreign key(location_index_key)
			references location_indexes(location_index_id)
);



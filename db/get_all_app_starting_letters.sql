SELECT ARRAY_AGG(DISTINCT SUBSTRING(app_name, 1, 1)) as starting_letters from app

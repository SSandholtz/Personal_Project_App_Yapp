select * from app
where app_name like $1
order by app_name;
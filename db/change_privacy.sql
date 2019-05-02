UPDATE app
set visibility = not visibility
where app_id = $1
returning visibility;
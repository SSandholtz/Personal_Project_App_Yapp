select analytics.date, app.app_owner 
from analytics
join app on analytics.clicked_id = app.app_id 
where clicked_id = $1;
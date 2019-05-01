insert into analytics (
    date,
    clicked_id
)
values (
    now()::date,
    $1
)
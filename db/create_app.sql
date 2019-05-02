insert into app (
    app_owner,
    app_name,
    app_download_link,
    app_logo,
    visibility
)
values (
    $1,
    $2,
    $3,
    $4,
    false
)

returning *;
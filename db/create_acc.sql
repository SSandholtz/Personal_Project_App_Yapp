insert into account (
    acc_email,
    acc_hash,
    company_name,
    company_logo
)
values (
    $1,
    $2,
    $3,
    $4
)

returning *;
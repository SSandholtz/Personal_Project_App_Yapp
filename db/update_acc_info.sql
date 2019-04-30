update account
set 
"acc_email" = $1,
"company_logo" =  $2
where "acc_id" = $3
returning *;
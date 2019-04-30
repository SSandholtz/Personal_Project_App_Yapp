select * from account
where company_name = $1 or acc_email = $2;
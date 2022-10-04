`SELECT name, count(*) as len
FROM ( select * from words WHERE length(name) = `+req.params.id+`) 
LIMIT 1 
OFFSET ABS( RANDOM() ) % MAX( len, 1)`;
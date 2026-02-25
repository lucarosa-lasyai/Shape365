SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'quiz_responses'
ORDER BY ordinal_position;

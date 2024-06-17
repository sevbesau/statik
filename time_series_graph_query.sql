WITH RECURSIVE date_series AS (
  SELECT 
    DATE('2024-06-01') AS reservation_date -- Start date
  UNION ALL
  SELECT
    DATE(reservation_date, '+1 day')
  FROM 
    date_series
  WHERE
    reservation_date < DATE('2024-06-31') -- End date
)

SELECT
  ds.reservation_date,
  COALESCE(COUNT(v.id), 0) AS visitors_count
FROM
  date_series as ds
LEFT JOIN 
  Reservation r ON ds.reservation_date = DATE(ROUND(r.date / 1000), 'unixepoch', 'localtime')
LEFT JOIN 
  Visitor v ON r.id = v.reservation_id
GROUP BY
  ds.reservation_date
ORDER BY
  ds.reservation_date


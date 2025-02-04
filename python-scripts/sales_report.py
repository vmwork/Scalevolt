import pandas as pd
from database_utils import get_db_connection

# Pull sales data from PostgreSQL
conn = get_db_connection()
query = """
    SELECT product_id, SUM(quantity) AS total_sold
    FROM orders
    GROUP BY product_id;
"""
df = pd.read_sql(query, conn)

# Export to Excel
df.to_excel("../data/exports/daily_sales.xlsx", index=False)

import sqlite3

conn = sqlite3.connect('ecom_db.sqlite')
cursor = conn.cursor()

# List all tables in the database
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())

conn.close()
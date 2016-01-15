__author__ = 'khoi'
# !/usr/bin/python
import pymysql.cursors


# Connect to the database
def get_connection():
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 db='3dapp',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

# try:
#     with connection.cursor() as cursor:
#         # Create a new record
#         sql = "select * from sample"
#         cursor.execute(sql)
#         result = cursor.fetchone()
#         print(result.get('id'))
#
#     # connection is not autocommit by default. So you must commit to save
#     # your changes.
#     connection.commit()
# finally:
#     connection.close()
